import {defineField, defineType } from "sanity";

export const playlist = defineType({
    name: "playlist",
    title: "Playlist",
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
            name: 'select',
            type: 'array',
            of: [{type: 'reference', to: [{ type: 'startup'}] }]// Reference to the author document
        }),
    ],
});