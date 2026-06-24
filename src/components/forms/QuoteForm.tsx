"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  needsAssessmentSchema,
  type NeedsAssessmentData,
  type SolutionType,
  QUOTE_DELIVERY,
  QUOTE_EXTRA_FEATURES,
  QUOTE_GOALS,
  QUOTE_HOSTING_NEEDS,
  QUOTE_INTEGRATIONS,
  QUOTE_PAGES,
  QUOTE_PAYMENTS,
  QUOTE_PLATFORMS,
  QUOTE_SHOP_FEATURES,
  QUOTE_SOFTWARE_MODULES,
  type QuoteOption,
} from "@/lib/quote-form-schema";
import { SERVICE_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";
import { hasCookieConsent } from "@/lib/cookies";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  calculateQuoteProgress,
  getQuoteSections,
  type QuoteSectionConfig,
  type QuoteSectionId,
} from "./quote/quote-sections";
import { QuoteSidebar } from "./quote/QuoteSidebar";
import { QuoteMobileNav } from "./quote/QuoteMobileNav";

function FormSection({
  id,
  section,
  title,
  subtitle,
  children,
  isComplete,
}: {
  id: string;
  section: QuoteSectionConfig;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isComplete: boolean;
}) {
  const Icon = section.icon;

  return (
    <motion.section
      id={`quote-section-${id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-white/90 p-4 shadow-lg shadow-secondary/[0.04] backdrop-blur-sm sm:rounded-3xl sm:p-6 lg:p-8 scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-primary via-primary-light to-accent transition-transform duration-500 group-focus-within:scale-x-100" />

      <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary shadow-inner sm:h-14 sm:w-14 sm:rounded-2xl">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-white sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-[10px]">
              {section.number}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight text-secondary sm:text-xl lg:text-2xl">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{subtitle}</p>
            )}
          </div>
        </div>
        {isComplete && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-dark"
          >
            <Check className="h-3.5 w-3.5" />
            OK
          </motion.span>
        )}
      </div>

      {children}
    </motion.section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary/90">{label}</label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function CheckboxGroup({
  options,
  locale,
  values,
  onChange,
  columns = 2,
}: {
  options: QuoteOption[];
  locale: string;
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2;
}) {
  const toggle = (id: string) => {
    onChange(values.includes(id) ? values.filter((v) => v !== id) : [...values, id]);
  };

  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      )}
    >
      {options.map((option) => {
        const checked = values.includes(option.id);
        const label = locale === "fr" ? option.labelFr : option.labelEn;

        return (
          <motion.label
            key={option.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-xl border px-3 py-3 transition-all duration-300 sm:items-center sm:rounded-2xl sm:px-4 sm:py-4",
              checked
                ? "border-primary/50 bg-gradient-to-br from-primary/8 to-accent/5 shadow-md shadow-primary/10"
                : "border-border/80 bg-white hover:border-primary/30 hover:shadow-sm"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
                checked ? "border-primary bg-primary text-white" : "border-border bg-white"
              )}
            >
              {checked && <Check className="h-3.5 w-3.5" />}
            </span>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(option.id)}
              className="sr-only"
            />
            <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-secondary">{label}</span>
          </motion.label>
        );
      })}
    </div>
  );
}

function RadioYesNo({
  name,
  value,
  onChange,
  locale,
  label,
}: {
  name: string;
  value: "yes" | "no" | undefined;
  onChange: (value: "yes" | "no") => void;
  locale: string;
  label: string;
}) {
  const options: { value: "yes" | "no"; label: string }[] = [
    { value: "yes", label: locale === "fr" ? "Oui" : "Yes" },
    { value: "no", label: locale === "fr" ? "Non" : "No" },
  ];

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-secondary/90">{label}</p>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        {options.map((option) => (
          <label
            key={`${name}-${option.value}`}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 sm:inline-flex sm:min-w-[120px] sm:rounded-2xl sm:px-5",
              value === option.value
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : "border-border bg-white text-secondary hover:border-primary/40"
            )}
          >
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full min-w-0 rounded-xl border border-border/80 bg-white px-4 py-3.5 text-base text-secondary shadow-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 sm:rounded-2xl sm:text-sm";

const QUOTE_DEFAULT_VALUES: Partial<NeedsAssessmentData> = {
  solutionType: "website",
  goals: [],
  pages: [],
  platforms: [],
  softwareModules: [],
  integrations: [],
  hostingNeeds: [],
  shopFeatures: [],
  payments: [],
  delivery: [],
  extraFeatures: [],
  onlineShop: "no",
  hasLogo: "no",
  hasImages: "no",
};

function SolutionTypeSelector({
  locale,
  value,
  onChange,
  label,
  error,
}: {
  locale: string;
  value: SolutionType | undefined;
  onChange: (value: SolutionType) => void;
  label: string;
  error?: string;
}) {
  return (
    <div className="md:col-span-2 space-y-3">
      <p className="text-sm font-semibold text-secondary/90">{label}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICE_TYPES.map((type) => {
          const selected = value === type.value;
          const typeLabel = locale === "fr" ? type.labelFr : type.labelEn;

          return (
            <motion.button
              key={type.value}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(type.value)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 sm:rounded-2xl sm:px-5 sm:py-4",
                selected
                  ? "border-primary/50 bg-gradient-to-br from-primary/8 to-accent/5 shadow-md shadow-primary/10"
                  : "border-border/80 bg-white hover:border-primary/30 hover:shadow-sm"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                  selected ? "border-primary bg-primary text-white" : "border-border bg-white"
                )}
              >
                {selected && <Check className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-secondary">{typeLabel}</span>
            </motion.button>
          );
        })}
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

interface QuoteFormProps {
  trustItems: string[];
  sidebarTitle: string;
}

export function QuoteForm({ trustItems, sidebarTitle }: QuoteFormProps) {
  const t = useTranslations("quote.form");
  const tQuote = useTranslations("quote");
  const tCookies = useTranslations("cookies");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<QuoteSectionId>("general");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NeedsAssessmentData>({
    resolver: zodResolver(needsAssessmentSchema),
    defaultValues: QUOTE_DEFAULT_VALUES,
  });

  const formValues = watch();
  const solutionType = formValues.solutionType;
  const sections = useMemo(() => getQuoteSections(solutionType), [solutionType]);
  const sectionById = useMemo(
    () => Object.fromEntries(sections.map((section) => [section.id, section])) as Partial<Record<string, QuoteSectionConfig>>,
    [sections]
  );
  const visibleIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const progress = calculateQuoteProgress(formValues);

  const onlineShop = formValues.onlineShop;
  const goals = formValues.goals || [];
  const pages = formValues.pages || [];
  const platforms = formValues.platforms || [];
  const softwareModules = formValues.softwareModules || [];
  const integrations = formValues.integrations || [];
  const hostingNeeds = formValues.hostingNeeds || [];
  const shopFeatures = formValues.shopFeatures || [];
  const payments = formValues.payments || [];
  const delivery = formValues.delivery || [];
  const extraFeatures = formValues.extraFeatures || [];
  const hasLogo = formValues.hasLogo;
  const hasImages = formValues.hasImages;

  const sectionLabels = useMemo(
    () => ({
      navigation: t("navigation"),
      generalInfo: t("generalInfo"),
      activityTitle: t("activityTitle"),
      goalsTitle: t("goalsTitle"),
      pagesTitle: t("pagesTitle"),
      shopTitle: t("shopTitle"),
      platformsTitle: t("platformsTitle"),
      modulesTitle: t("modulesTitle"),
      paymentTitle: t("paymentTitle"),
      deliveryTitle: t("deliveryTitle"),
      integrationsTitle: t("integrationsTitle"),
      hostingTitle: t("hostingTitle"),
      scopeTitle: t("scopeTitle"),
      designTitle: t("designTitle"),
      extraTitle: t("extraTitle"),
      budgetTitle: t("budgetTitle"),
    }),
    [t]
  );

  const isSectionComplete = (id: QuoteSectionId) =>
    sections.find((section) => section.id === id)?.isComplete(formValues) ?? false;

  useEffect(() => {
    if (!visibleIds.includes(activeSection)) {
      setActiveSection("general");
    }
  }, [visibleIds, activeSection]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(`quote-section-${section.id}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sections]);

  const scrollToSection = (id: QuoteSectionId) => {
    const element = document.getElementById(`quote-section-${id}`);
    if (!element) return;
    const offset = window.innerWidth >= 1024 ? 120 : 168;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const onSubmit = async (data: NeedsAssessmentData) => {
    if (!hasCookieConsent()) {
      toast.warning(tCookies("consentRequired"));
      return;
    }

    setLoading(true);
    const toastId = toast.loading(t("sending"));

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.dismiss(toastId);
      toast.success(t("success"));
      reset(QUOTE_DEFAULT_VALUES);
    } catch {
      toast.dismiss(toastId);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-0">
      <QuoteMobileNav
        sections={sections}
        activeSection={activeSection}
        progress={progress}
        labels={sectionLabels}
        onNavigate={scrollToSection}
        isSectionComplete={isSectionComplete}
        progressLabel={t("progressLabel")}
      />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <QuoteSidebar
        sections={sections}
        activeSection={activeSection}
        progress={progress}
        labels={sectionLabels}
        onNavigate={scrollToSection}
        isSectionComplete={isSectionComplete}
        trustItems={trustItems}
        sidebarTitle={sidebarTitle}
        sidebarNote={tQuote("sidebarNote")}
        progressLabel={t("progressLabel")}
      />

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="min-w-0 space-y-4 pb-4 sm:space-y-6 sm:pb-6">
        <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-white to-accent/5 p-4 sm:rounded-3xl sm:p-6 lg:p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-primary/25">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t("premiumBadge")}
              </div>
              <h2 className="text-xl font-bold leading-tight text-secondary sm:text-2xl lg:text-3xl">{t("sheetTitle")}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("sheetIntro")}
              </p>
            </div>
          </div>
        </motion.div>

        {sectionById.general && (
        <FormSection
          id="general"
          section={sectionById.general}
          title={t("generalInfo")}
          subtitle={t("generalHint")}
          isComplete={isSectionComplete("general")}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SolutionTypeSelector
              locale={locale}
              value={solutionType}
              onChange={(value) => setValue("solutionType", value, { shouldValidate: true })}
              label={t("solutionType")}
              error={errors.solutionType ? t("required") : undefined}
            />
            <Field label={t("appName")} error={errors.appName ? t("required") : undefined}>
              <input {...register("appName")} className={inputClass} />
            </Field>
            <Field label={t("name")} error={errors.name ? t("required") : undefined}>
              <input {...register("name")} className={inputClass} />
            </Field>
            <Field label={t("phone")} error={errors.phone ? t("required") : undefined}>
              <input {...register("phone")} type="tel" className={inputClass} />
            </Field>
            <Field label={t("email")} error={errors.email ? t("invalidEmail") : undefined}>
              <input {...register("email")} type="email" className={inputClass} />
            </Field>
            <div className="md:col-span-2">
              <Field label={t("address")} error={errors.address ? t("required") : undefined}>
                <input {...register("address")} className={inputClass} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label={t("sector")} error={errors.sector ? t("required") : undefined}>
                <input {...register("sector")} className={inputClass} placeholder={t("sectorPlaceholder")} />
              </Field>
            </div>
          </div>
        </FormSection>
        )}

        {sectionById.activity && (
        <FormSection
          id="activity"
          section={sectionById.activity}
          title={t("activityTitle")}
          subtitle={t("activityHint")}
          isComplete={isSectionComplete("activity")}
        >
          <Field label={t("activityPresentation")} error={errors.activityPresentation ? t("minChars") : undefined}>
            <textarea
              {...register("activityPresentation")}
              rows={5}
              className={cn(inputClass, "min-h-[140px] resize-y")}
              placeholder={t("activityPlaceholder")}
            />
          </Field>
        </FormSection>
        )}

        {sectionById.goals && (
        <FormSection
          id="goals"
          section={sectionById.goals}
          title={t("goalsTitle")}
          subtitle={t("goalsHint")}
          isComplete={isSectionComplete("goals")}
        >
          <CheckboxGroup
            options={QUOTE_GOALS}
            locale={locale}
            values={goals}
            onChange={(values) => setValue("goals", values, { shouldValidate: true })}
          />
          {errors.goals && <p className="mt-3 text-xs font-medium text-red-500">{t("selectOne")}</p>}
        </FormSection>
        )}

        {sectionById.pages && (
        <FormSection
          id="pages"
          section={sectionById.pages}
          title={t("pagesTitle")}
          subtitle={t("pagesHint")}
          isComplete={isSectionComplete("pages")}
        >
          <CheckboxGroup
            options={QUOTE_PAGES}
            locale={locale}
            values={pages}
            onChange={(values) => setValue("pages", values, { shouldValidate: true })}
          />
          {errors.pages && <p className="mt-3 text-xs font-medium text-red-500">{t("selectOne")}</p>}
        </FormSection>
        )}

        {sectionById.platforms && (
        <FormSection
          id="platforms"
          section={sectionById.platforms}
          title={t("platformsTitle")}
          subtitle={t("platformsHint")}
          isComplete={isSectionComplete("platforms")}
        >
          <CheckboxGroup
            options={QUOTE_PLATFORMS}
            locale={locale}
            values={platforms}
            onChange={(values) => setValue("platforms", values, { shouldValidate: true })}
          />
          {errors.platforms && <p className="mt-3 text-xs font-medium text-red-500">{t("selectOne")}</p>}
        </FormSection>
        )}

        {sectionById.modules && (
        <FormSection
          id="modules"
          section={sectionById.modules}
          title={t("modulesTitle")}
          subtitle={t("modulesHint")}
          isComplete={isSectionComplete("modules")}
        >
          <CheckboxGroup
            options={QUOTE_SOFTWARE_MODULES}
            locale={locale}
            values={softwareModules}
            onChange={(values) => setValue("softwareModules", values, { shouldValidate: true })}
          />
          {errors.softwareModules && <p className="mt-3 text-xs font-medium text-red-500">{t("selectOne")}</p>}
        </FormSection>
        )}

        {sectionById.shop && (
        <FormSection
          id="shop"
          section={sectionById.shop}
          title={t("shopTitle")}
          subtitle={t("shopHint")}
          isComplete={isSectionComplete("shop")}
        >
          <RadioYesNo
            name="onlineShop"
            label={t("onlineShop")}
            locale={locale}
            value={onlineShop}
            onChange={(value) => setValue("onlineShop", value, { shouldValidate: true })}
          />
          <AnimatePresence>
            {onlineShop === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6 space-y-5 overflow-hidden"
              >
                <Field label={t("productCount")} error={errors.productCount ? t("required") : undefined}>
                  <input {...register("productCount")} className={inputClass} placeholder="ex: 50" />
                </Field>
                <div>
                  <p className="mb-3 text-sm font-semibold text-secondary/90">{t("shopFeatures")}</p>
                  <CheckboxGroup
                    options={QUOTE_SHOP_FEATURES}
                    locale={locale}
                    values={shopFeatures}
                    onChange={(values) => setValue("shopFeatures", values)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FormSection>
        )}

        {sectionById.integrations && (
        <FormSection
          id="integrations"
          section={sectionById.integrations}
          title={t("integrationsTitle")}
          subtitle={t("integrationsHint")}
          isComplete={isSectionComplete("integrations")}
        >
          <CheckboxGroup
            options={QUOTE_INTEGRATIONS}
            locale={locale}
            values={integrations}
            onChange={(values) => setValue("integrations", values)}
          />
        </FormSection>
        )}

        {sectionById.payment && (
        <FormSection
          id="payment"
          section={sectionById.payment}
          title={t("paymentTitle")}
          subtitle={t("paymentHint")}
          isComplete={isSectionComplete("payment")}
        >
          <CheckboxGroup
            options={QUOTE_PAYMENTS}
            locale={locale}
            values={payments}
            onChange={(values) => setValue("payments", values)}
          />
        </FormSection>
        )}

        {sectionById.delivery && (
        <FormSection
          id="delivery"
          section={sectionById.delivery}
          title={t("deliveryTitle")}
          subtitle={t("deliveryHint")}
          isComplete={isSectionComplete("delivery")}
        >
          <CheckboxGroup
            options={QUOTE_DELIVERY}
            locale={locale}
            values={delivery}
            onChange={(values) => setValue("delivery", values)}
          />
        </FormSection>
        )}

        {sectionById.hosting && (
        <FormSection
          id="hosting"
          section={sectionById.hosting}
          title={t("hostingTitle")}
          subtitle={t("hostingHint")}
          isComplete={isSectionComplete("hosting")}
        >
          <CheckboxGroup
            options={QUOTE_HOSTING_NEEDS}
            locale={locale}
            values={hostingNeeds}
            onChange={(values) => setValue("hostingNeeds", values, { shouldValidate: true })}
          />
          {errors.hostingNeeds && <p className="mt-3 text-xs font-medium text-red-500">{t("selectOne")}</p>}
        </FormSection>
        )}

        {sectionById.scope && (
        <FormSection
          id="scope"
          section={sectionById.scope}
          title={t("scopeTitle")}
          subtitle={t("scopeHint")}
          isComplete={isSectionComplete("scope")}
        >
          <Field label={t("projectScope")} error={errors.projectScope ? t("minChars") : undefined}>
            <textarea
              {...register("projectScope")}
              rows={6}
              className={cn(inputClass, "min-h-[160px] resize-y")}
              placeholder={t("scopePlaceholder")}
            />
          </Field>
        </FormSection>
        )}

        {sectionById.design && (
        <FormSection
          id="design"
          section={sectionById.design}
          title={t("designTitle")}
          subtitle={t("designHint")}
          isComplete={isSectionComplete("design")}
        >
          <div className="space-y-6">
            <RadioYesNo
              name="hasLogo"
              label={t("hasLogo")}
              locale={locale}
              value={hasLogo}
              onChange={(value) => setValue("hasLogo", value, { shouldValidate: true })}
            />
            <RadioYesNo
              name="hasImages"
              label={t("hasImages")}
              locale={locale}
              value={hasImages}
              onChange={(value) => setValue("hasImages", value, { shouldValidate: true })}
            />
            <Field label={t("preferredColors")}>
              <input {...register("preferredColors")} className={inputClass} placeholder={t("colorsPlaceholder")} />
            </Field>
            <Field label={t("likedSites")}>
              <textarea
                {...register("likedSites")}
                rows={3}
                className={cn(inputClass, "resize-y")}
                placeholder={t("likedSitesPlaceholder")}
              />
            </Field>
          </div>
        </FormSection>
        )}

        {sectionById.extra && (
        <FormSection
          id="extra"
          section={sectionById.extra}
          title={t("extraTitle")}
          subtitle={t("extraHint")}
          isComplete={isSectionComplete("extra")}
        >
          <CheckboxGroup
            options={QUOTE_EXTRA_FEATURES}
            locale={locale}
            values={extraFeatures}
            onChange={(values) => setValue("extraFeatures", values)}
          />
        </FormSection>
        )}

        {sectionById.budget && (
        <FormSection
          id="budget"
          section={sectionById.budget}
          title={t("budgetTitle")}
          subtitle={t("budgetHint")}
          isComplete={isSectionComplete("budget")}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label={t("budget")} error={errors.budget ? t("required") : undefined}>
              <input {...register("budget")} className={inputClass} placeholder={t("budgetPlaceholder")} />
            </Field>
            <Field label={t("deadline")} error={errors.deadline ? t("required") : undefined}>
              <input {...register("deadline")} className={inputClass} placeholder={t("deadlinePlaceholder")} />
            </Field>
          </div>
        </FormSection>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sticky bottom-0 z-20 overflow-hidden rounded-t-2xl border border-white/20 bg-secondary p-4 shadow-2xl shadow-secondary/30 sm:bottom-4 sm:rounded-3xl sm:p-5 lg:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
          <div className="relative flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 text-white">
              <p className="text-base font-bold sm:text-lg">{t("ctaTitle")}</p>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">{t("privacyNote")}</p>
              <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/15"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate sm:hidden">{locale === "fr" ? "Email" : "Email"}</span>
                  <span className="hidden truncate sm:inline">{SITE.email}</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/15"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                  WhatsApp
                </a>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full shrink-0 bg-white text-secondary hover:bg-white/90 sm:mr-14 lg:mr-0 lg:w-auto lg:min-w-[240px]"
            >
              {loading ? t("sending") : t("submit")}
              {!loading && <ArrowRight className="h-5 w-5" />}
              {loading && <Send className="h-4 w-4 animate-pulse" />}
            </Button>
          </div>
        </motion.div>
      </form>
      </div>
    </div>
  );
}
