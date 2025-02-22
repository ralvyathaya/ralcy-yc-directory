import {defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            type: 'string', // Field for the startup's title
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            } // Slug generated from the title
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: {type: "author"} // Reference to the author document
        }),
        defineField({
            name: 'views',
            type: 'number', // Field for the number of views
        }),
        defineField({
            name: 'description',
            type: 'text', // Field for the startup's description
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error('Please enter a category') // Field for the startup's category
        }),
        defineField({
            name: 'image',
            type: 'url', 
            validation: (Rule) => Rule.required()// Field for the startup's description
        }),
        defineField({
            name: 'pitch',
            type: 'markdown', // Field for the startup's description
        }),
    ],
    preview: { // Preview configuration
        select: {
            title: 'title', // Selecting the startup's title for preview
        },
    }, 
});