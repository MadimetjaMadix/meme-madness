import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    memePost: defineTable({
        name: v.string(),
        userId: v.string(),
    }),
});