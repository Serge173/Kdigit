import { prisma } from "@/lib/prisma";
import { MessagesList } from "@/components/admin/MessagesList";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not connected
  }

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
