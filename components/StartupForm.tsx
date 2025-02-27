'use client'

import React, { useActionState, useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '../lib/validation'
import { z } from 'zod'
import { toast } from 'sonner'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState('')

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues)

            console.log(formValues)
            return { ...prevState, error: "", status: "SUCCESS" }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors
                setErrors(
                    Object.fromEntries(
                        Object.entries(fieldErrors).map(([key, value]) => [key, value[0]])
                    )
                )
                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }
            console.error(error)
            return { ...prevState, error: "An unexpected error occurred", status: "ERROR" }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })

    // Add toast notifications based on state changes
    useEffect(() => {
        if (state.status === "SUCCESS") {
            toast.success('Your startup pitch has been created successfully')
        } else if (state.status === "ERROR" && state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input 
                    id='title' 
                    name='title' 
                    className='startup-form_input' 
                    required 
                    placeholder="Enter the startup title"
                />
                {errors.title && <p className='startup-form_error'>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Textarea 
                    id='description' 
                    name='description' 
                    className='startup-form_textarea' 
                    required 
                    placeholder="Enter the startup description"
                />
                {errors.description && <p className='startup-form_error'>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input 
                    id='category' 
                    name='category' 
                    className='startup-form_input' 
                    required 
                    placeholder="Enter the startup category (Tech, Health, Education...)"
                />
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input 
                    id='link' 
                    name='link' 
                    className='startup-form_input' 
                    required 
                    placeholder="Enter the image URL"
                />
                {errors.link && <p className='startup-form_error'>{errors.link}</p>}
            </div>

            <div data-color-mode='light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value || '')}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }} 
                    textareaProps={{ 
                        placeholder: 'Briefly describe your startup idea...',
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />
                {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
            </div>

            <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
                {isPending ? "Submitting ..." : "Submit Your Pitch"}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default StartupForm