"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";
import { hasCookieConsent } from "@/lib/cookies";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tCookies = useTranslations("cookies");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!hasCookieConsent()) {
      toast.warning(tCookies("consentRequired"));
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("sending"));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.dismiss(toastId);
      toast.success(t("success"));
      reset();
    } catch {
      toast.dismiss(toastId);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("name")}</label>
          <input {...register("name")} className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("phone")}</label>
          <input {...register("phone")} type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("email")}</label>
        <input {...register("email")} type="email" className={inputClass} />
        {errors.email && <p className="text-red-500 text-xs mt-1">Invalid email</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("subject")}</label>
        <input {...register("subject")} className={inputClass} />
        {errors.subject && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("message")}</label>
        <textarea {...register("message")} rows={5} className={inputClass} />
        {errors.message && <p className="text-red-500 text-xs mt-1">Min 10 characters</p>}
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        <Send className="w-4 h-4" />
        {loading ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
