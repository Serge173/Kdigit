"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { SERVICE_TYPES } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { hasCookieConsent } from "@/lib/cookies";
import { Send, Upload } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  company: z.string().optional(),
  serviceType: z.string().min(1),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(20),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function QuoteForm() {
  const t = useTranslations("quote.form");
  const tCookies = useTranslations("cookies");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (file) formData.append("file", file);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error();

      toast.dismiss(toastId);
      toast.success(t("success"));
      reset();
      setFile(null);
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
          {errors.phone && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("email")}</label>
          <input {...register("email")} type="email" className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">Invalid email</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("company")}</label>
          <input {...register("company")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("serviceType")}</label>
        <select {...register("serviceType")} className={inputClass}>
          <option value="">{t("selectService")}</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {locale === "fr" ? s.labelFr : s.labelEn}
            </option>
          ))}
        </select>
        {errors.serviceType && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("budget")}</label>
          <input {...register("budget")} placeholder="ex: 5000 - 10000 €" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">{t("deadline")}</label>
          <input {...register("deadline")} placeholder="ex: 3 mois" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("description")}</label>
        <textarea {...register("description")} rows={6} className={inputClass} placeholder="Décrivez votre projet en détail..." />
        {errors.description && <p className="text-red-500 text-xs mt-1">Min 20 characters</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">{t("file")}</label>
        <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-border cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {file ? file.name : "PDF, DOC, PNG (max 5 Mo)"}
          </span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        <Send className="w-4 h-4" />
        {loading ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
