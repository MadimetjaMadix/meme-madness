
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMemePost = mutation({
    args: {
        name: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;
        const taskId = await ctx.db.insert("memePost", { name: args.name, userId: user.subject });
    },
});


export const getMemePostsForUser = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;

        return await ctx.db
            .query("memePost")
            .filter((q) => q.eq(q.field("userId"), user.subject))
            .collect();
    },
});
