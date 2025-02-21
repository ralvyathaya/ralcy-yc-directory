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
            title: 'ID',
            type: 'number', // Added type for the ID field
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string', // Basic text field for author's name
        }),
        defineField({
            name: 'username',
            title: 'Username',
            type: 'string', // Field for author's username
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string', // Email field (validation can be added later)
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image', // Image field for author's-profile picture
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'text', // Text field for author's bio (longer content)
        }),
    ]
});