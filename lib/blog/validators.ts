import { z } from "zod";

export const PostStatusSchema = z.enum(["draft", "published"]);

export const CreatePostSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().min(1), // Quill HTML
  excerpt: z.string().max(500).optional().nullable(),
  status: PostStatusSchema.optional(),
  published_at: z.string().datetime().optional().nullable(),
author_id: z.string().uuid().nullable().optional(),
  category_id: z.string().uuid().optional().nullable(),

  cover_image_url: z.string().url().optional().nullable(),
  cover_image_path: z.string().optional().nullable(),

  meta_title: z.string().max(70).optional().nullable(), // SEO friendly range
  meta_description: z.string().max(160).optional().nullable(),
  canonical_url: z.string().url().optional().nullable(),
});

export const UpdatePostSchema = CreatePostSchema.partial().extend({
  // title/content can still be updated; all fields optional
  status: PostStatusSchema.optional(),
});