import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
    '/placeholders/1.svg',
    '/placeholders/2.svg',
    '/placeholders/3.svg',
    '/placeholders/4.svg',
    '/placeholders/5.svg',
    '/placeholders/6.svg',
    '/placeholders/7.svg',
    '/placeholders/8.svg',
    '/placeholders/9.svg',
    '/placeholders/10.svg',
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const indentity = await ctx.auth.getUserIdentity();

        if(!indentity) {
            throw new Error("Unuthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: indentity.subject,
            authorName: indentity.name!,
            imageUrl: randomImage

        })

        return board;
    },
})