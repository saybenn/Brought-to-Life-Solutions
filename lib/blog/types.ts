export type PostStatus = "draft" | "published";

export type Category = {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
export type Author = {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
};
export type Post = {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: PostStatus;
  published_at: string | null;
  author?: { name: string; slug: string } | null;
  author_id: string | null;
  category_id: string | null;
  cover_image_url: string | null;
  cover_image_path: string | null;

  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;

  created_at: string;
  updated_at: string;
};

export type PostListItem = Pick<
  Post,
  "id" | "title" | "slug" | "excerpt" | "status" | "published_at" | "updated_at" | "cover_image_url" | "category_id"
> & {
  category?: { name: string; slug: string } | null;
    author?: { name: string; slug: string } | null;

};