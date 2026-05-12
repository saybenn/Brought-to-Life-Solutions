export type Role = string; // tighten later if you want ("viewer" | "editor" | "admin")

export function canRead(role: Role) {
  // After getSiteConfig succeeds, user is authenticated + has membership.
  return true;
}

export function canWrite(role: Role) {
  return role === "editor" || role === "admin" || role === "owner";
}
