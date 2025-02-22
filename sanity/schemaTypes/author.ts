import {defineField, defineType } from "sanity";
import {UserIcon} from '@sanity/icons'; // Added proper icon import

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: 'id',
            type: 'number', // Added type for the ID field
        }),
        defineField({
            name: 'name',
    
            type: 'string', // Basic text field for author's name
        }),
        defineField({
            name: 'username',
            type: 'string', // Field for author's username
        }),
        defineField({
            name: 'email',
            type: 'string', // Email field (validation can be added later)
        }),
        defineField({
            name: 'image',
            type: 'image', // Image field for author's-profile picture
        }),
        defineField({
            name: 'bio',
            type: 'text', // Text field for author's bio (longer content)
        }),
    ],
    preview: { // Correctly placed preview object
        select: {
            title: 'name', // Selecting the author's name for preview
        },
    }, 
});