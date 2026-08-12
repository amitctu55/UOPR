import { auditLogs, systemServices } from "@/lib/mock-data";
import { demoUsers, roleLabels } from "@/lib/types";

export { auditLogs, systemServices };

export const demoUsersList = Object.values(demoUsers).map((u) => ({
  name: u.name,
  email: u.email,
  role: roleLabels[u.role],
  org: u.organization || "—",
}));
