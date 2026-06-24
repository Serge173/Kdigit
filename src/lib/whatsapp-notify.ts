import { SITE } from "@/lib/constants";

const MAX_WHATSAPP_LENGTH = 3500;

export async function sendWhatsAppNotification(message: string) {
  const phone = process.env.WHATSAPP_NOTIFY_NUMBER || SITE.whatsapp;
  const text = message.slice(0, MAX_WHATSAPP_LENGTH);

  if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: { body: text },
          }),
        }
      );

      if (res.ok) {
        return { success: true, channel: "cloud-api" as const };
      }

      console.error("[WhatsApp] Cloud API error:", await res.text());
    } catch (error) {
      console.error("[WhatsApp] Cloud API failed:", error);
    }
  }

  if (process.env.CALLMEBOT_API_KEY) {
    try {
      const url = new URL("https://api.callmebot.com/whatsapp.php");
      url.searchParams.set("phone", phone);
      url.searchParams.set("text", text);
      url.searchParams.set("apikey", process.env.CALLMEBOT_API_KEY);

      const res = await fetch(url.toString());
      if (res.ok) {
        return { success: true, channel: "callmebot" as const };
      }

      console.error("[WhatsApp] CallMeBot error:", await res.text());
    } catch (error) {
      console.error("[WhatsApp] CallMeBot failed:", error);
    }
  }

  console.log("[WhatsApp] Not configured. Would notify", phone, ":", text.slice(0, 200));
  return { success: false, channel: "none" as const };
}
