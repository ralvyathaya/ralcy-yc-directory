'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session.user.id,
            },
            pitch,
            views: 0, // Initialize views to 0
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.error(error);
        return parseServerActionResponse({
            error: "Failed to create startup pitch",
            status: "ERROR",
        });
    }
};