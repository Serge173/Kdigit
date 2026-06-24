import { UserForm } from "@/components/admin/UserForm";
import { requireAdminPage } from "@/lib/admin-guard";

export default async function NewUserPage() {
  await requireAdminPage("ADMIN");
  return <UserForm />;
}
