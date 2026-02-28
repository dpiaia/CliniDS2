import { LayoutDashboard, Palette, Type, Box, ChevronRight, Menu, Search, Github, ExternalLink, Sparkles, Languages, CheckCircle2, AlertCircle, Info, AlertTriangle, Bell, User } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/Card";
import { Combobox } from "@/src/components/ui/Combobox";
import { Accordion, AccordionItem } from "@/src/components/ui/Accordion";
import { Alert, AlertTitle, AlertDescription } from "@/src/components/ui/Alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/AlertDialog";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/src/components/ui/Avatar";
import { motion, AnimatePresence } from "motion/react";
import { translations, Language } from "./translations";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
} | null>(null);

function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
}

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <AppContent />
    </LanguageContext.Provider>
  );
}

function AppContent() {
  const { lang, setLang, t } = useTranslation();
  const [activeTab, setActiveTab] = useState("intro");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const NAVIGATION = [
    {
      title: t.nav.gettingStarted,
      items: [
        { name: t.nav.intro, icon: LayoutDashboard, id: "intro" },
        { name: t.nav.install, icon: Box, id: "install" },
      ],
    },
    {
      title: t.nav.foundations,
      items: [
        { name: t.nav.colors, icon: Palette, id: "colors" },
        { name: t.nav.typography, icon: Type, id: "typography" },
      ],
    },
    {
      title: t.nav.components,
      items: [
        { name: t.nav.button, icon: Box, id: "button" },
        { name: t.nav.combobox, icon: Search, id: "combobox" },
        { name: t.nav.accordion, icon: ChevronRight, id: "accordion" },
        { name: t.nav.alert, icon: Bell, id: "alert" },
        { name: t.nav.alertDialog, icon: AlertCircle, id: "alert-dialog" },
        { name: t.nav.avatar, icon: User, id: "avatar" },
        { name: t.nav.card, icon: LayoutDashboard, id: "card" },
        { name: t.nav.input, icon: Type, id: "input" },
      ],
    },
  ];

  const isIntro = activeTab === "intro";
  const isExpanded = !isIntro || isHovered;

  const renderContent = () => {
    switch (activeTab) {
      case "intro":
        return <IntroPage />;
      case "colors":
        return <ColorsPage />;
      case "typography":
        return <TypographyPage />;
      case "button":
        return <ButtonPage />;
      case "combobox":
        return <ComboboxPage />;
      case "accordion":
        return <AccordionPage />;
      case "alert":
        return <AlertPage />;
      case "alert-dialog":
        return <AlertDialogPage />;
      case "avatar":
        return <AvatarPage />;
      default:
        return <IntroPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r border-slate-200 bg-white transition-all duration-300 lg:translate-x-0 overflow-hidden",
          !isSidebarOpen && "-translate-x-full",
          isExpanded ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center border-b border-slate-200 px-6 overflow-hidden">
          <div className="flex items-center gap-2 min-w-max">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-brand-orange text-white font-bold">
              C
            </div>
            <span className={cn("text-xl font-bold tracking-tight text-slate-900 transition-opacity duration-300", !isExpanded && "opacity-0 invisible")}>
              CliniDS
            </span>
            <span className={cn("ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 transition-opacity duration-300", !isExpanded && "opacity-0 invisible")}>
              v2.0
            </span>
          </div>
        </div>
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden p-4">
          {NAVIGATION.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className={cn("mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 transition-opacity duration-300", !isExpanded && "opacity-0 invisible h-0 mb-0")}>
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors min-w-max",
                      activeTab === item.id
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
                    <span className={cn("transition-opacity duration-300", !isExpanded && "opacity-0 invisible")}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn("flex-1 transition-all duration-300", isSidebarOpen ? (isExpanded ? "lg:pl-64" : "lg:pl-20") : "pl-0")}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setLang("en")}
                  className={cn(
                    "rounded px-2 py-1 text-xs font-bold transition-colors",
                    lang === "en" ? "bg-white text-brand-orange shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("pt")}
                  className={cn(
                    "rounded px-2 py-1 text-xs font-bold transition-colors",
                    lang === "pt" ? "bg-white text-brand-orange shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  PT
                </button>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Github className="mr-2 h-4 w-4" />
                {t.header.github}
              </Button>
              <Button size="sm">{t.header.getStarted}</Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-8 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8 px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              {t.footer.copy}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-brand-orange">{t.footer.docs}</a>
              <a href="#" className="text-sm text-slate-500 hover:text-brand-orange">{t.footer.support}</a>
              <a href="#" className="text-sm text-slate-500 hover:text-brand-orange">{t.footer.changelog}</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function IntroPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">{t.intro.title}</h1>
        <p className="text-xl text-slate-600">
          {t.intro.subtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-orange" />
              {t.intro.aiFirstTitle}
            </CardTitle>
            <CardDescription>
              {t.intro.aiFirstDesc}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.intro.clinicalPrecisionTitle}</CardTitle>
            <CardDescription>
              {t.intro.clinicalPrecisionDesc}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">{t.intro.userProfiles}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900">{t.intro.dentists}</h3>
            <p className="text-sm text-slate-500">{t.intro.dentistsDesc}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900">{t.intro.secretaries}</h3>
            <p className="text-sm text-slate-500">{t.intro.secretariesDesc}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900">{t.intro.managers}</h3>
            <p className="text-sm text-slate-500">{t.intro.managersDesc}</p>
          </div>
        </div>
      </section>

      <div className="ai-border-glow bg-slate-50 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-brand-orange" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">{t.intro.aiSuggestion}</span>
        </div>
        <p className="text-sm text-slate-600 italic">
          {t.intro.aiSuggestionText}
        </p>
      </div>
    </div>
  );
}

function ColorsPage() {
  const { t } = useTranslation();
  
  const primaryScale = [
    { label: "50", hex: "#FDF1EB", oklch: "0.96 0.01 42.97" },
    { label: "100", hex: "#FBE3D7", oklch: "0.92 0.03 42.97" },
    { label: "200", hex: "#F7C7AF", oklch: "0.85 0.07 42.97" },
    { label: "300", hex: "#F3AB87", oklch: "0.78 0.11 42.97" },
    { label: "400", hex: "#EF8F5F", oklch: "0.72 0.15 42.97" },
    { label: "500", hex: "#EC6726", oklch: "0.6698 0.1803 42.9750", isPrimary: true },
    { label: "600", hex: "#D45D22", oklch: "0.60 0.16 42.97" },
    { label: "700", hex: "#BC521E", oklch: "0.54 0.14 42.97" },
    { label: "800", hex: "#A4481A", oklch: "0.48 0.12 42.97" },
    { label: "900", hex: "#8C3D16", oklch: "0.42 0.10 42.97" },
  ];

  const semanticColors = [
    { name: t.colors.success, hex: "#4CAF50", description: t.colors.successDesc, var: "--color-success" },
    { name: t.colors.warning, hex: "#FFC107", description: t.colors.warningDesc, var: "--color-warning" },
    { name: t.colors.danger, hex: "#D32F2F", description: t.colors.dangerDesc, var: "--color-danger" },
    { name: t.colors.info, hex: "#2196F3", description: t.colors.infoDesc, var: "--color-info" },
  ];

  const neutrals = [
    { label: "Background", hex: "#FFFFFF", oklch: "1.00 0 0", var: "--color-background" },
    { label: "Foreground", hex: "#141414", oklch: "0.14 0.004 49.25", var: "--color-foreground" },
    { label: "Muted", hex: "#F1F5F9", oklch: "0.96 0.01 250", var: "--color-muted" },
    { label: "Border", hex: "#E2E8F0", oklch: "0.92 0.01 250", var: "--color-border" },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">{t.colors.title}</h1>
        <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
          {t.colors.subtitle}
        </p>
      </div>

      {/* Brand Primary Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{t.colors.primaryIdentity}</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="h-full overflow-hidden p-0 border-none shadow-xl">
              <div className="h-48 w-full bg-brand-orange flex items-end p-6">
                <span className="text-white font-black text-3xl">Clinicorp Orange</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">HEX</p>
                  <p className="font-mono text-lg font-bold text-slate-900">#EC6726</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">OKLCH</p>
                  <p className="font-mono text-sm text-slate-600">0.6698 0.1803 42.9750</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t.colors.brandOrangeDesc}
                </p>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t.colors.colorScale}</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {primaryScale.map((color) => (
                <div key={color.label} className="space-y-2">
                  <div 
                    className={cn(
                      "h-16 w-full rounded-md shadow-sm transition-transform hover:scale-105 cursor-pointer",
                      color.isPrimary && "ring-2 ring-brand-orange ring-offset-2"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-900">{color.label}</p>
                    <p className="text-[8px] font-mono text-slate-400 uppercase">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Colors Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.colors.statusFeedback}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {semanticColors.map((color) => (
            <Card key={color.name} className="p-4 flex flex-col gap-4">
              <div className="h-12 w-full rounded" style={{ backgroundColor: color.hex }} />
              <div>
                <h3 className="font-bold text-slate-900">{color.name}</h3>
                <p className="text-[10px] font-mono text-slate-400 mb-2">{color.hex}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{color.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Neutrals Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">{t.colors.neutrals}</h2>
          <p className="text-sm text-slate-500">{t.colors.neutralsDesc}</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-bold text-slate-900">Token</th>
                <th className="px-6 py-3 font-bold text-slate-900">Preview</th>
                <th className="px-6 py-3 font-bold text-slate-900">HEX</th>
                <th className="px-6 py-3 font-bold text-slate-900">OKLCH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {neutrals.map((color) => (
                <tr key={color.label}>
                  <td className="px-6 py-4 font-medium text-slate-900">{color.label}</td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-12 rounded border border-slate-200 shadow-sm" style={{ backgroundColor: color.hex }} />
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{color.hex}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{color.oklch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">{t.colors.tailwindImplementation}</h2>
        <div className="rounded-lg bg-slate-900 p-6 font-mono text-xs text-slate-300 overflow-x-auto">
          <pre>
{`@theme {
  --color-brand-orange: oklch(0.6698 0.1803 42.9750);
  --color-success: #4CAF50;
  --color-warning: #FFC107;
  --color-danger: #D32F2F;
  --color-info: #2196F3;
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

function TypographyPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t.typography.title}</h1>
        <p className="text-slate-500">{t.typography.subtitle}</p>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t.typography.h1}</p>
            <h1 className="text-4xl font-black">{t.typography.sampleText}</h1>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t.typography.h2}</p>
            <h2 className="text-3xl font-bold">{t.typography.sampleText}</h2>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t.typography.body}</p>
            <p className="text-base text-slate-600">
              {t.typography.desc}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  figmaLink?: string;
  shadcnLink?: string;
}

function PageHeader({ title, subtitle, figmaLink, shadcnLink }: PageHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">{title}</h1>
        <div className="flex items-center gap-2">
          {figmaLink && (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(figmaLink, "_blank")}>
              <Box className="h-4 w-4" />
              Figma
            </Button>
          )}
          {shadcnLink && (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(shadcnLink, "_blank")}>
              <ExternalLink className="h-4 w-4" />
              Shadcn
            </Button>
          )}
        </div>
      </div>
      <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

function ButtonPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.button.title} 
        subtitle={t.button.subtitle} 
        figmaLink={t.button.figmaLink}
        shadcnLink={t.button.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.button.variants}</h2>
        <Card>
          <CardHeader>
            <CardTitle>{t.button.variants}</CardTitle>
            <CardDescription>{t.button.variantsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="default">{t.button.primary}</Button>
            <Button variant="secondary">{t.button.secondary}</Button>
            <Button variant="outline">{t.button.outline}</Button>
            <Button variant="ghost">{t.button.ghost}</Button>
            <Button variant="destructive">{t.button.destructive}</Button>
            <Button variant="success">{t.button.success}</Button>
            <Button variant="link">{t.button.link}</Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.button.sizes.title}</h2>
        <Card>
          <CardHeader>
            <CardTitle>{t.button.sizes.title}</CardTitle>
            <CardDescription>Different sizes for different visual hierarchy.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-sm"><Palette className="h-4 w-4" /></Button>
            <Button size="icon"><Palette className="h-4 w-4" /></Button>
            <Button size="icon-lg"><Palette className="h-5 w-5" /></Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">With Icons</h2>
        <Card>
          <CardHeader>
            <CardTitle>Icons</CardTitle>
            <CardDescription>Buttons can include icons to provide more context.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="secondary" className="gap-2">
              Settings
              <Palette className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Box className="h-4 w-4" />
              Packages
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Full Width</h2>
        <Card>
          <CardHeader>
            <CardTitle>Block Level</CardTitle>
            <CardDescription>Buttons can take up the full width of their container.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Primary Action</Button>
            <Button variant="secondary" className="w-full">Secondary Action</Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.button.states}</h2>
        <Card>
          <CardHeader>
            <CardTitle>{t.button.states}</CardTitle>
            <CardDescription>{t.button.statesDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button isLoading>{t.button.loading}</Button>
            <Button disabled>{t.button.disabled}</Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.button.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.button.do1}</li>
              <li>{t.button.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.button.dont1}</li>
              <li>{t.button.dont2}</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="ai-border-glow bg-slate-900 p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-brand-orange" />
          <h3 className="text-lg font-bold">{t.button.aiEnhanced}</h3>
        </div>
        <p className="text-slate-400 mb-6">
          {t.button.aiEnhancedDesc}
        </p>
        <Button className="ai-glow bg-white text-slate-900 hover:bg-slate-100">
          {t.button.generateReport}
        </Button>
      </div>
    </div>
  );
}

function ComboboxPage() {
  const { t } = useTranslation();
  const frameworks = [
    { value: "next.js", label: "Next.js", icon: LayoutDashboard, group: "React" },
    { value: "sveltekit", label: "SvelteKit", icon: Palette, group: "Svelte" },
    { value: "nuxt.js", label: "Nuxt.js", icon: Box, group: "Vue" },
    { value: "remix", label: "Remix", icon: Sparkles, group: "React" },
    { value: "astro", label: "Astro", icon: Type, group: "Static" },
  ];

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.combobox.title} 
        subtitle={t.combobox.subtitle} 
        figmaLink={t.combobox.figmaLink}
        shadcnLink={t.combobox.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.combobox.examples}</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.combobox.basic}</CardTitle>
              <CardDescription>{t.combobox.basicDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                options={frameworks.map(f => ({ value: f.value, label: f.label }))}
                placeholder={t.combobox.selectFramework}
                searchPlaceholder={t.combobox.searchPlaceholder}
                emptyText={t.combobox.emptyResult}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.combobox.withIcons}</CardTitle>
              <CardDescription>{t.combobox.withIconsDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                options={frameworks}
                placeholder={t.combobox.selectFramework}
                searchPlaceholder={t.combobox.searchPlaceholder}
                emptyText={t.combobox.emptyResult}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grouped</CardTitle>
              <CardDescription>Options categorized by groups.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                options={frameworks}
                placeholder={t.combobox.selectFramework}
                searchPlaceholder={t.combobox.searchPlaceholder}
                emptyText={t.combobox.emptyResult}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
              <CardDescription>Combobox in a loading state.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                isLoading
                options={frameworks}
                placeholder={t.combobox.selectFramework}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.combobox.variants}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.combobox.label}</CardTitle>
              <CardDescription>{t.combobox.basicDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                options={frameworks}
                label={t.combobox.label}
                helperText={t.combobox.helperText}
                placeholder={t.combobox.selectFramework}
                className="w-full max-w-xs"
                clearable
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.combobox.error}</CardTitle>
              <CardDescription>{t.combobox.disabledDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                options={frameworks}
                label={t.combobox.label}
                error={t.combobox.error}
                placeholder={t.combobox.selectFramework}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.combobox.disabled}</CardTitle>
              <CardDescription>{t.combobox.disabledDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <Combobox 
                disabled
                options={frameworks}
                placeholder={t.combobox.selectFramework}
                className="w-full max-w-xs"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.combobox.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.combobox.do1}</li>
              <li>{t.combobox.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.combobox.dont1}</li>
              <li>{t.combobox.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function AccordionPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.accordion.title} 
        subtitle={t.accordion.subtitle} 
        figmaLink={t.accordion.figmaLink}
        shadcnLink={t.accordion.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.accordion.examples}</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>{t.accordion.basic}</CardTitle>
            <CardDescription>{t.accordion.basicDesc}</CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <Accordion type="single" className="max-w-md mx-auto">
              <AccordionItem value="item-1" trigger={t.accordion.item1}>
                {t.accordion.item1Content}
              </AccordionItem>
              <AccordionItem value="item-2" trigger={t.accordion.item2}>
                {t.accordion.item2Content}
              </AccordionItem>
              <AccordionItem value="item-3" trigger={t.accordion.item3}>
                {t.accordion.item3Content}
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.accordion.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.accordion.do1}</li>
              <li>{t.accordion.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.accordion.dont1}</li>
              <li>{t.accordion.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function AlertPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.alert.title} 
        subtitle={t.alert.subtitle} 
        figmaLink={t.alert.figmaLink}
        shadcnLink={t.alert.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.alert.variants}</h2>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.alert.default}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>
                  This is an alert description.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.alert.destructive}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>
                  This is an alert description.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.alert.success}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>
                  This is an alert description.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.alert.info}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>
                  This is an alert description.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.alert.warning}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>
                  This is an alert description.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.alert.withAction}</h2>
        <Card>
          <CardContent className="py-6 space-y-4">
            <Alert className="flex items-center justify-between">
              <div className="flex gap-3">
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
                <div>
                  <AlertTitle>Alert Title</AlertTitle>
                  <AlertDescription>This is an alert description.</AlertDescription>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="bg-brand-orange text-white hover:bg-brand-orange/90">Undo</Button>
            </Alert>

            <Alert variant="destructive" className="flex items-center justify-between">
              <div className="flex gap-3">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <div>
                  <AlertTitle>Alert Title</AlertTitle>
                  <AlertDescription>This is an alert description.</AlertDescription>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="bg-brand-danger text-white">Undo</Button>
            </Alert>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.alert.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.alert.do1}</li>
              <li>{t.alert.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.alert.dont1}</li>
              <li>{t.alert.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function AlertDialogPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.alertDialog.title} 
        subtitle={t.alertDialog.subtitle} 
        figmaLink={t.alertDialog.figmaLink}
        shadcnLink={t.alertDialog.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.alertDialog.examples}</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.alertDialog.basic}</CardTitle>
              <CardDescription>Horizontal layout for actions.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">{t.alertDialog.trigger}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t.alertDialog.dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t.alertDialog.dialogDesc}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter layout="horizontal">
                    <AlertDialogCancel>{t.alertDialog.cancel}</AlertDialogCancel>
                    <AlertDialogAction>{t.alertDialog.continue}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.alertDialog.vertical}</CardTitle>
              <CardDescription>Vertical layout for mobile or specific UI patterns.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">{t.alertDialog.trigger}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="text-center sm:text-center">
                    <AlertDialogTitle>{t.alertDialog.dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t.alertDialog.dialogDesc}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter layout="vertical">
                    <AlertDialogAction className="w-full">{t.alertDialog.continue}</AlertDialogAction>
                    <AlertDialogCancel className="w-full">{t.alertDialog.cancel}</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.alertDialog.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.alertDialog.do1}</li>
              <li>{t.alertDialog.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.alertDialog.dont1}</li>
              <li>{t.alertDialog.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function AvatarPage() {
  const { t } = useTranslation();
  const avatarUrl = "https://picsum.photos/seed/avatar/200/200";

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.avatar.title} 
        subtitle={t.avatar.subtitle} 
        figmaLink={t.avatar.figmaLink}
        shadcnLink={t.avatar.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.avatar.sizes}</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-wrap items-end gap-6">
              {["5", "6", "8", "10", "12", "14", "16", "20"].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Avatar size={size as any}>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.avatar.fallbacks}</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-wrap items-end gap-6">
              {["5", "6", "8", "10", "12", "14", "16", "20"].map((size) => (
                <Avatar key={size} size={size as any}>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.avatar.group}</h2>
        <Card>
          <CardContent className="py-10">
            <AvatarGroup limit={3}>
              <Avatar><AvatarImage src="https://picsum.photos/seed/1/100/100" /></Avatar>
              <Avatar><AvatarImage src="https://picsum.photos/seed/2/100/100" /></Avatar>
              <Avatar><AvatarImage src="https://picsum.photos/seed/3/100/100" /></Avatar>
              <Avatar><AvatarImage src="https://picsum.photos/seed/4/100/100" /></Avatar>
              <Avatar><AvatarImage src="https://picsum.photos/seed/5/100/100" /></Avatar>
            </AvatarGroup>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Profile Example</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex items-center gap-4">
              <Avatar size="16">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant="outline">{t.avatar.changePhoto}</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.avatar.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.avatar.do1}</li>
              <li>{t.avatar.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.avatar.dont1}</li>
              <li>{t.avatar.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
