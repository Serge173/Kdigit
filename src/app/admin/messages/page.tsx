import { MessagesList } from "@/components/admin/MessagesList";
import { getAdminMessages } from "@/lib/admin-data";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();

  const serialized = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-2">Messages de contact</h1>
      <p className="text-muted-foreground mb-8">{messages.length} message(s)</p>
      <MessagesList messages={serialized} />
    </div>
  );
}
