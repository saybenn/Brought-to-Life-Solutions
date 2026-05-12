// /components/dashboard/content/PostEditor.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { Author, Category } from "@/lib/blog/types";
import LexicalHtmlEditor from "@/components/dashboard/content/LexicalHtmlEditor";
import { toast } from "@/components/ui/Toast";

type PostForm = {
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  published_at: string | null;
  category_id: string | null;
  author_id: string | null;

  cover_image_url: string | null;
  cover_image_path: string | null;

  meta_title: string;
  meta_description: string;
  canonical_url: string;
};

type Props = {
  mode: "create" | "edit";
  postId?: string;
  role: string;
  canWrite: boolean;
  categories: Category[];
  authors: Author[];
  initial?: Partial<PostForm>;
};

function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

async function uploadImageToServer(file: File) {
  const dataUrl = await toDataUrl(file);
  const r = await fetch("/api/posts/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl, filename: file.name }),
  });

  const json = await r.json().catch(() => null);
  if (!r.ok || !json?.ok) throw new Error(json?.error || "Upload failed");
  return { publicUrl: json.publicUrl as string, path: json.path as string };
}

export default function PostEditor({
  mode,
  postId,
  role,
  canWrite,
  categories,
  authors,
  initial,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // default is EDIT (not preview)
  const [view, setView] = useState<"preview" | "edit">("edit");

  const [form, setForm] = useState<PostForm>(() => ({
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    status: (initial?.status as any) ?? "draft",
    published_at: initial?.published_at ?? null,
    category_id: initial?.category_id ?? null,
    author_id: (initial as any)?.author_id ?? null,
    cover_image_url: initial?.cover_image_url ?? null,
    cover_image_path: initial?.cover_image_path ?? null,
    meta_title: initial?.meta_title ?? "",
    meta_description: initial?.meta_description ?? "",
    canonical_url: initial?.canonical_url ?? "",
  }));

  // keep state in sync if initial loads after mount (edit page)
  useEffect(() => {
    if (!initial) return;
    setForm((f) => ({
      ...f,
      title: initial.title ?? f.title,
      excerpt: initial.excerpt ?? f.excerpt,
      content: initial.content ?? f.content,
      status: (initial.status as any) ?? f.status,
      published_at: initial.published_at ?? f.published_at,
      category_id: initial.category_id ?? f.category_id,
      author_id: (initial as any).author_id ?? f.author_id,
      cover_image_url: initial.cover_image_url ?? f.cover_image_url,
      cover_image_path: initial.cover_image_path ?? f.cover_image_path,
      meta_title: initial.meta_title ?? f.meta_title,
      meta_description: initial.meta_description ?? f.meta_description,
      canonical_url: initial.canonical_url ?? f.canonical_url,
    }));
  }, [initial]);

  const readonly = !canWrite;

  const inlineFileInputRef = useRef<HTMLInputElement | null>(null);

  const pickInlineImage = useCallback(async () => {
    if (readonly) return null;

    if (!inlineFileInputRef.current) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      inlineFileInputRef.current = input;
    }

    const input = inlineFileInputRef.current;

    return new Promise<string | null>((resolve) => {
      input.onchange = async () => {
        const file = input.files?.[0];
        input.value = "";
        if (!file) return resolve(null);

        try {
          setError(null);
          const { publicUrl } = await uploadImageToServer(file);
          resolve(publicUrl);
        } catch (e: any) {
          const msg = e?.message ?? "Inline image upload failed";
          setError(msg);
          toast(msg);
          resolve(null);
        }
      };

      input.click();
    });
  }, [readonly]);

  async function uploadCover(file: File) {
    setSaving(true);
    setError(null);

    try {
      const { publicUrl, path } = await uploadImageToServer(file);

      setForm((f) => ({
        ...f,
        cover_image_url: publicUrl,
        cover_image_path: path,
      }));
      toast("Cover uploaded.");
    } catch (e: any) {
      const msg = e?.message ?? "Cover upload failed";
      setError(msg);
      toast(msg);
    } finally {
      setSaving(false);
    }
  }

  async function save() {
    if (!canWrite) return;
    setSaving(true);
    setError(null);

    try {
      const payload: any = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || null,
        content: form.content,
        status: form.status,
        published_at:
          form.status === "published" ? (form.published_at ?? null) : null,
        category_id: form.category_id,
        author_id: form.author_id,
        cover_image_url: form.cover_image_url,
        cover_image_path: form.cover_image_path,
        meta_title: form.meta_title.trim() || null,
        meta_description: form.meta_description.trim() || null,
        canonical_url: form.canonical_url.trim() || null,
      };

      if (!payload.title) throw new Error("Title is required");
      if (!payload.content) throw new Error("Content is required");

      if (mode === "create") {
        const r = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await r.json().catch(() => null);
        if (!r.ok || !json?.ok) throw new Error(json?.error || "Create failed");

        toast("Post created.");
        router.push(`/dashboard/content/${json.id}`);
        return;
      }

      const r = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json().catch(() => null);
      if (!r.ok || !json?.ok) throw new Error(json?.error || "Update failed");

      toast("Saved.");
    } catch (e: any) {
      const msg = e?.message ?? "Save failed";
      setError(msg);
      toast(msg);
    } finally {
      setSaving(false);
    }
  }

  async function hardDelete() {
    if (!canWrite || !postId) return;
    if (!confirm("Delete this post? This is permanent.")) return;

    setSaving(true);
    setError(null);
    try {
      const r = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      const json = await r.json().catch(() => null);
      if (!r.ok || !json?.ok) throw new Error(json?.error || "Delete failed");
      toast("Deleted.");
      router.push("/dashboard/content");
    } catch (e: any) {
      const msg = e?.message ?? "Delete failed";
      setError(msg);
      toast(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="dash-grid"
      style={{ gridTemplateColumns: "1fr", gap: "var(--space-6)" }}
    >
      <div className="card dash-card dash-span-2">
        <div className="dash-header" style={{ marginBottom: "var(--space-6)" }}>
          <div>
            <div className="eyebrow">Content</div>
            <h1 className="dash-title">
              {mode === "create" ? "New Post" : "Edit Post"}
            </h1>
            <div className="dash-meta">
              Role: <span className="dash-num">{role}</span>
              {readonly ? " • Read-only" : null}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {mode === "edit" ? (
              <button
                className="btn btn-secondary"
                onClick={hardDelete}
                disabled={saving || readonly}
              >
                Delete
              </button>
            ) : null}

            <button
              className="btn btn-primary"
              onClick={save}
              disabled={saving || readonly}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {error ? (
          <div
            style={{
              marginBottom: "var(--space-5)",
              padding: "12px 12px",
              borderRadius: "var(--r-md)",
              border:
                "1px solid color-mix(in oklab, var(--error) 45%, var(--border))",
              background:
                "color-mix(in oklab, var(--bg-ivory) 70%, var(--white))",
            }}
          >
            <div className="caption" style={{ color: "var(--error)" }}>
              {error}
            </div>
          </div>
        ) : null}

        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <div>
            <div className="eyebrow">Title</div>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              disabled={readonly}
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                fontFamily: "var(--font-body)",
              }}
            />
          </div>

          <div>
            <div className="eyebrow">Excerpt</div>
            <textarea
              value={form.excerpt}
              onChange={(e) =>
                setForm((f) => ({ ...f, excerpt: e.target.value }))
              }
              disabled={readonly}
              rows={3}
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                fontFamily: "var(--font-body)",
              }}
            />
            <div className="caption" style={{ marginTop: 6 }}>
              Used for previews and SEO fallback.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "var(--space-4)",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <div>
              <div className="eyebrow">Category</div>
              <select
                value={form.category_id ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category_id: e.target.value || null,
                  }))
                }
                disabled={readonly}
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="eyebrow">Author</div>
              <select
                value={form.author_id ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author_id: e.target.value || null }))
                }
                disabled={readonly}
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <option value="">No author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="eyebrow">Status</div>
              <select
                value={form.status}
                onChange={(e) => {
                  const next = e.target.value as "draft" | "published";
                  setForm((f) => ({
                    ...f,
                    status: next,
                    published_at:
                      next === "published"
                        ? (f.published_at ?? new Date().toISOString())
                        : null,
                  }));
                }}
                disabled={readonly}
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <div className="caption" style={{ marginTop: 6 }}>
                Publishing sets published_at if missing.
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow">Cover image</div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                disabled={readonly}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadCover(file);
                  e.currentTarget.value = "";
                }}
                style={{ display: "none" }}
              />

              <label
                htmlFor="cover-upload"
                className="btn btn-secondary"
                style={{ cursor: readonly ? "not-allowed" : "pointer" }}
              >
                {form.cover_image_url ? "Replace cover" : "Choose cover"}
              </label>

              {form.cover_image_url ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={readonly}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      cover_image_url: null,
                      cover_image_path: null,
                    }))
                  }
                >
                  Remove
                </button>
              ) : null}

              {form.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.cover_image_url}
                  alt=""
                  style={{
                    width: 160,
                    height: 92,
                    objectFit: "cover",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                  }}
                />
              ) : null}
            </div>

            <div className="caption" style={{ marginTop: 6 }}>
              File inputs cannot display previously selected files; preview
              reflects stored URL.
            </div>
          </div>

          {/* CONTENT AREA */}
          {view === "edit" ? (
            <div>
              <div className="eyebrow">Content</div>
              <LexicalHtmlEditor
                valueHtml={form.content}
                onChangeHtml={(html: string) =>
                  setForm((f) => ({ ...f, content: html }))
                }
                readOnly={readonly}
                onUploadImage={pickInlineImage}
                rightSlot={
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={readonly}
                    onClick={() => setView("preview")}
                  >
                    Preview
                  </button>
                }
              />
              <div className="caption" style={{ marginTop: 6 }}>
                Preview shows how lists/quotes/headings render.
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div className="eyebrow">Preview</div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={readonly}
                  onClick={() => setView("edit")}
                >
                  Edit
                </button>
              </div>

              <div
                className="card dash-card"
                style={{ padding: "var(--space-6)", marginTop: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {form.category_id ? (
                    <span className="dash-badge">
                      {categories.find((c) => c.id === form.category_id)
                        ?.name ?? "Category"}
                    </span>
                  ) : null}
                  {form.author_id ? (
                    <span className="dash-badge">
                      By{" "}
                      {authors.find((a) => a.id === form.author_id)?.name ??
                        "Author"}
                    </span>
                  ) : null}
                  <span className="dash-badge">{form.status}</span>
                </div>

                <h2 className="h2" style={{ marginTop: "var(--space-4)" }}>
                  {form.title || "Untitled"}
                </h2>

                {form.excerpt ? (
                  <p
                    className="subhead"
                    style={{ marginTop: "var(--space-3)", maxWidth: 760 }}
                  >
                    {form.excerpt}
                  </p>
                ) : null}

                {form.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.cover_image_url}
                    alt=""
                    style={{
                      width: "100%",
                      maxHeight: 360,
                      objectFit: "cover",
                      borderRadius: "var(--r-lg)",
                      border: "1px solid var(--border)",
                      marginTop: "var(--space-6)",
                      marginBottom: "var(--space-6)",
                      background: "var(--bg-elevated)",
                    }}
                  />
                ) : null}

                <div
                  className="blog-content"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--size-lg)",
                    lineHeight: "var(--leading-relaxed)",
                    color: "var(--ink-700)",
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      form.content || "<p class='caption'>No content yet.</p>",
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: "var(--space-6)" }}>
            <div className="eyebrow">SEO</div>

            <div style={{ display: "grid", gap: "var(--space-4)" }}>
              <div>
                <div className="caption">Meta title (optional)</div>
                <input
                  value={form.meta_title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, meta_title: e.target.value }))
                  }
                  disabled={readonly}
                  style={{
                    width: "100%",
                    padding: "12px 12px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              <div>
                <div className="caption">Meta description (optional)</div>
                <textarea
                  value={form.meta_description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, meta_description: e.target.value }))
                  }
                  disabled={readonly}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px 12px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              <div>
                <div className="caption">Canonical URL (optional)</div>
                <input
                  value={form.canonical_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, canonical_url: e.target.value }))
                  }
                  disabled={readonly}
                  placeholder="https://..."
                  style={{
                    width: "100%",
                    padding: "12px 12px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
