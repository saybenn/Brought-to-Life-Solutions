// /components/dashboard/customers/CustomerEditorModal.tsx

import {
  useEffect,
  useMemo,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import DashboardModal from "@/components/dashboard/management/DashboardModal";
import DashboardField from "@/components/dashboard/management/DashboardField";
import { DashboardButton } from "@/components/dashboard/management/DashboardButton";
import type { CustomerRecord } from "@/components/dashboard/customers/CustomerLedgerTable";
import { tagsToArray } from "@/components/dashboard/customers/CustomerLedgerTable";

type CustomerEditorModalProps = {
  open: boolean;
  customer: CustomerRecord | null;
  writable: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onSave: (draft: CustomerRecord, tags: string[]) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

function normalizeTag(value: string): string {
  return value.trim().replace(/^#+/, "").toLowerCase();
}

export default function CustomerEditorModal({
  open,
  customer,
  writable,
  isSaving = false,
  isDeleting = false,
  onClose,
  onSave,
  onDelete,
}: CustomerEditorModalProps) {
  const [draft, setDraft] = useState<CustomerRecord | null>(customer);
  const [tags, setTags] = useState<string[]>(tagsToArray(customer?.tags));
  const [tagDraft, setTagDraft] = useState("");

  useEffect(() => {
    setDraft(customer);
    setTags(tagsToArray(customer?.tags));
    setTagDraft("");
  }, [customer]);

  const modalTitle = useMemo(() => {
    if (!draft?.id) return "New customer";
    return draft.name ? `Edit ${draft.name}` : "Edit customer";
  }, [draft]);

  if (!draft) return null;

  const currentDraft = draft;

  function updateDraft(next: Partial<CustomerRecord>) {
    setDraft((existingDraft) => {
      if (!existingDraft) return existingDraft;
      return { ...existingDraft, ...next };
    });
  }

  function addTag(raw: string) {
    const nextTag = normalizeTag(raw);

    if (!nextTag) return;

    setTags((currentTags) => {
      if (currentTags.includes(nextTag)) return currentTags;
      return [...currentTags, nextTag];
    });

    setTagDraft("");
  }

  function removeTag(tag: string) {
    setTags((currentTags) => currentTags.filter((item) => item !== tag));
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const shouldCommit =
      event.key === "Enter" || event.key === "," || event.key === "Tab";

    if (!shouldCommit) return;

    event.preventDefault();
    addTag(tagDraft);
  }

  function handleTagPaste(event: ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData("text");
    const parts = text
      .split(/[,\n\t]+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length <= 1) return;

    event.preventDefault();
    parts.forEach(addTag);
  }

  function handleSave() {
    if (!writable || isSaving || isDeleting) return;

    const payload: CustomerRecord = {
      ...currentDraft,
      tags,
    };

    onSave(payload, tags);
  }

  function handleDelete() {
    if (!currentDraft.id || !writable || isSaving || isDeleting) return;
    onDelete(currentDraft.id);
  }

  return (
    <DashboardModal
      open={open}
      title={modalTitle}
      description={
        writable
          ? "Update customer contact details, tags, and internal notes."
          : "Viewer role: this customer record is read-only."
      }
      onClose={onClose}
      footer={
        <>
          {currentDraft.id && writable ? (
            <DashboardButton
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </DashboardButton>
          ) : null}

          <DashboardButton
            variant="secondary"
            onClick={onClose}
            disabled={isSaving || isDeleting}
          >
            Cancel
          </DashboardButton>

          {writable ? (
            <DashboardButton
              variant="primary"
              onClick={handleSave}
              disabled={isSaving || isDeleting || !currentDraft.name.trim()}
            >
              {isSaving ? "Saving…" : "Save customer"}
            </DashboardButton>
          ) : null}
        </>
      }
    >
      <div className="dash-customer-editor">
        <DashboardField label="Name">
          <input
            className="dash-input"
            value={currentDraft.name}
            onChange={(event) => updateDraft({ name: event.target.value })}
            disabled={!writable || isSaving || isDeleting}
            placeholder="Customer name"
            autoComplete="name"
          />
        </DashboardField>

        <div className="dash-customer-editor__grid">
          <DashboardField label="Email">
            <input
              className="dash-input"
              value={currentDraft.email ?? ""}
              onChange={(event) =>
                updateDraft({ email: event.target.value || null })
              }
              disabled={!writable || isSaving || isDeleting}
              placeholder="name@example.com"
              autoComplete="email"
            />
          </DashboardField>

          <DashboardField label="Phone">
            <input
              className="dash-input"
              value={currentDraft.phone ?? ""}
              onChange={(event) =>
                updateDraft({ phone: event.target.value || null })
              }
              disabled={!writable || isSaving || isDeleting}
              placeholder="Phone number"
              autoComplete="tel"
            />
          </DashboardField>
        </div>

        <DashboardField
          label="Tags"
          hint="Type a tag and press Enter or comma."
        >
          <input
            className="dash-input"
            value={tagDraft}
            onChange={(event) => setTagDraft(event.target.value)}
            onKeyDown={handleTagKeyDown}
            onPaste={handleTagPaste}
            onBlur={() => addTag(tagDraft)}
            disabled={!writable || isSaving || isDeleting}
            placeholder="lead, referral, urgent…"
          />

          <div className="dash-editable-tag-list" aria-label="Customer tags">
            {tags.length ? (
              tags.map((tag) => (
                <span key={tag} className="dash-editable-tag">
                  {tag}

                  {writable ? (
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      disabled={isSaving || isDeleting}
                      aria-label={`Remove tag ${tag}`}
                    >
                      ×
                    </button>
                  ) : null}
                </span>
              ))
            ) : (
              <span className="dash-tag-list__empty">No tags yet</span>
            )}
          </div>
        </DashboardField>

        <DashboardField label="Notes">
          <textarea
            className="dash-textarea"
            value={currentDraft.notes ?? ""}
            onChange={(event) =>
              updateDraft({ notes: event.target.value || null })
            }
            disabled={!writable || isSaving || isDeleting}
            placeholder="Internal notes, context, next steps…"
          />
        </DashboardField>
      </div>
    </DashboardModal>
  );
}
