import { LayoutDashboard, Palette, Type, Box, ChevronRight, Menu, Search, Github, ExternalLink, Sparkles, Languages, CheckCircle2, AlertCircle, Info, AlertTriangle, Bell, User, Plus, Minus, AlignLeft, AlignCenter, AlignRight, AlignJustify, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/Button";
import { ButtonGroup } from "@/src/components/ui/ButtonGroup";
import { Input } from "@/src/components/ui/Input";
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
import { Badge } from "@/src/components/ui/Badge";
import { AnimatedIcon } from "@/src/components/ui/AnimatedIcon";
import anim1 from "@/src/assets/animations/anim1.json";
import anim2 from "@/src/assets/animations/anim2.json";
import anim3 from "@/src/assets/animations/anim3.json";
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
        { name: t.nav.icons, icon: Sparkles, id: "icons" },
      ],
    },
    {
      title: t.nav.components,
      items: [
        { name: t.nav.button, icon: Box, id: "button" },
        { name: t.nav.buttonGroup, icon: Box, id: "button-group" },
        { name: t.nav.combobox, icon: Search, id: "combobox" },
        { name: t.nav.accordion, icon: ChevronRight, id: "accordion" },
        { name: t.nav.alert, icon: Bell, id: "alert" },
        { name: t.nav.alertDialog, icon: AlertCircle, id: "alert-dialog" },
        { name: t.nav.avatar, icon: User, id: "avatar" },
        { name: t.nav.badge, icon: Sparkles, id: "badge" },
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
      case "icons":
        return <IconsPage />;
      case "button":
        return <ButtonPage />;
      case "button-group":
        return <ButtonGroupPage />;
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
      case "badge":
        return <BadgePage />;
      case "input":
        return <InputPage />;
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

function InputPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.nav.input} 
        subtitle="A basic input component for user text entry."
      />
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Default</CardTitle>
          </CardHeader>
          <CardContent className="py-10">
            <Input placeholder="Type something..." className="max-w-sm" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ButtonGroupPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.buttonGroup.title} 
        subtitle={t.buttonGroup.subtitle} 
        figmaLink={t.buttonGroup.figmaLink}
        shadcnLink={t.buttonGroup.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.buttonGroup.examples}</h2>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.horizontal}</CardTitle>
              <CardDescription>Default horizontal orientation.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.vertical}</CardTitle>
              <CardDescription>Vertical orientation for sidebars or specific layouts.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup orientation="vertical" className="w-48">
                <Button variant="outline">Top</Button>
                <Button variant="outline">Middle</Button>
                <Button variant="outline">Bottom</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mixed Variants</CardTitle>
              <CardDescription>Grouping different button variants (use with caution).</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button variant="default">Save</Button>
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.inputGroup}</CardTitle>
              <CardDescription>Mixing inputs with buttons for search or form fields.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <div className="space-y-4 w-full max-w-md">
                <ButtonGroup className="w-full">
                  <Input placeholder="Search..." className="rounded-none" />
                  <Button className="rounded-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </ButtonGroup>

                <ButtonGroup className="w-full">
                  <Button variant="outline" className="rounded-none">https://</Button>
                  <Input placeholder="example.com" className="rounded-none" />
                  <Button variant="secondary" className="rounded-none">Copy</Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.iconButtons}</CardTitle>
              <CardDescription>Grouping icon-only buttons for toolbars.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <Palette className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Type className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Box className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.segmented}</CardTitle>
              <CardDescription>Using Button Group as a segmented control for switching views.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup className="bg-slate-100 p-1 rounded-lg">
                <Button variant="ghost" className="rounded-md bg-white shadow-sm">Day</Button>
                <Button variant="ghost" className="rounded-md">Week</Button>
                <Button variant="ghost" className="rounded-md">Month</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.pagination}</CardTitle>
              <CardDescription>Numbered buttons for multi-page navigation.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button variant="outline" className="rounded-none">1</Button>
                <Button variant="outline" className="rounded-none">2</Button>
                <Button variant="outline" className="rounded-none bg-slate-50">3</Button>
                <Button variant="outline" className="rounded-none">4</Button>
                <Button variant="outline" className="rounded-none">5</Button>
                <Button variant="outline" className="rounded-none">6</Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.zoom}</CardTitle>
              <CardDescription>Vertical controls for zooming or incrementing values.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup orientation="vertical">
                <Button variant="outline" size="icon" className="rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <Minus className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.buttonGroup.textAlignment}</CardTitle>
              <CardDescription>Grouping buttons for text formatting options.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button variant="outline" size="icon" className="rounded-none">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-none">
                  <AlignJustify className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dropdown Group</CardTitle>
              <CardDescription>Combining a primary action with a dropdown for secondary options.</CardDescription>
            </CardHeader>
            <CardContent className="py-10 flex justify-center">
              <ButtonGroup>
                <Button className="rounded-none">Publish</Button>
                <Button size="icon" className="rounded-none border-l border-white/20">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.buttonGroup.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.buttonGroup.do1}</li>
              <li>{t.buttonGroup.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.buttonGroup.dont1}</li>
              <li>{t.buttonGroup.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function IconsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.icons.title} 
        subtitle={t.icons.subtitle} 
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="verified" className="rounded-md px-2 py-0.5">Official</Badge>
            </div>
            <CardTitle className="text-xl">Iconsax</CardTitle>
            <CardDescription>{t.icons.officialDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg mb-6">
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <g clipPath="url(#clip0_4482_3154)">
                    <path d="M12 13.34C10.6 13.34 9.45996 12.2 9.45996 10.79C9.45996 9.38999 10.6 8.25 12 8.25C13.4 8.25 14.55 9.38999 14.55 10.79C14.55 12.2 13.4 13.34 12 13.34ZM12 9.75C11.42 9.75 10.96 10.22 10.96 10.79C10.96 11.37 11.43 11.84 12 11.84C12.58 11.84 13.05 11.37 13.05 10.79C13.05 10.22 12.58 9.75 12 9.75Z" fill="currentColor"/>
                    <path d="M15.5999 18.7501C15.1899 18.7501 14.8499 18.4101 14.8499 18.0001C14.8499 16.8001 13.5699 15.8201 11.9999 15.8201C10.4299 15.8201 9.1499 16.8001 9.1499 18.0001C9.1499 18.4101 8.8099 18.7501 8.3999 18.7501C7.9899 18.7501 7.6499 18.4101 7.6499 18.0001C7.6499 15.9701 9.59991 14.3201 11.9999 14.3201C14.3999 14.3201 16.3499 15.9701 16.3499 18.0001C16.3499 18.4101 16.0099 18.7501 15.5999 18.7501Z" fill="currentColor"/>
                    <path d="M16 22.75H8C4.83 22.75 2.25 20.17 2.25 17V8C2.25 4.83 4.83 2.25 8 2.25H10.25C10.66 2.25 11 2.59 11 3V4.75C11 5.03 11.22 5.25 11.5 5.25H12.5C12.78 5.25 13 5.03 13 4.75V3C13 2.59 13.34 2.25 13.75 2.25H16C19.17 2.25 21.75 4.83 21.75 8V17C21.75 20.17 19.17 22.75 16 22.75ZM8 3.75C5.66 3.75 3.75 5.66 3.75 8V17C3.75 19.34 5.66 21.25 8 21.25H16C18.34 21.25 20.25 19.34 20.25 17V8C20.25 5.66 18.34 3.75 16 3.75H14.5V4.75C14.5 5.85 13.6 6.75 12.5 6.75H11.5C10.4 6.75 9.5 5.85 9.5 4.75V3.75H8Z" fill="currentColor"/>
                    <path d="M12.5 6.75H11.5C10.4 6.75 9.5 5.85 9.5 4.75V2.25C9.5 1.15 10.4 0.25 11.5 0.25H12.5C13.6 0.25 14.5 1.15 14.5 2.25V4.75C14.5 5.85 13.6 6.75 12.5 6.75ZM11.5 1.75C11.22 1.75 11 1.97 11 2.25V4.75C11 5.03 11.22 5.25 11.5 5.25H12.5C12.78 5.25 13 5.03 13 4.75V2.25C13 1.97 12.78 1.75 12.5 1.75H11.5Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4482_3154">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <g clipPath="url(#clip0_4482_4947)">
                    <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" fill="currentColor"/>
                    <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" fill="currentColor"/>
                    <path d="M15 22.7502H9C3.38 22.7502 2.25 20.1002 2.25 15.8202V9.64023C2.25 4.91023 3.85002 2.98023 7.96002 2.74023H16C16.01 2.74023 16.03 2.74023 16.04 2.74023C20.1 2.96023 21.75 4.96024 21.75 9.64023V15.8202C21.75 20.1002 20.62 22.7502 15 22.7502ZM8 4.25023C5.2 4.41023 3.75 5.29023 3.75 9.65023V15.8302C3.75 19.6602 4.48 21.2602 9 21.2602H15C19.52 21.2602 20.25 19.6602 20.25 15.8302V9.64023C20.25 5.28023 18.81 4.40023 15.98 4.24023H8V4.25023Z" fill="currentColor"/>
                    <path d="M9 22.75C8.59 22.75 8.25 22.41 8.25 22V11C8.25 10.59 8.59 10.25 9 10.25C9.41 10.25 9.75 10.59 9.75 11V22C9.75 22.41 9.41 22.75 9 22.75Z" fill="currentColor"/>
                    <path d="M15 22.75C14.59 22.75 14.25 22.41 14.25 22V11C14.25 10.59 14.59 10.25 15 10.25C15.41 10.25 15.75 10.59 15.75 11V22C15.75 22.41 15.41 22.75 15 22.75Z" fill="currentColor"/>
                    <path d="M21 17.25H3C2.59 17.25 2.25 16.91 2.25 16.5C2.25 16.09 2.59 15.75 3 15.75H21C21.41 15.75 21.75 16.09 21.75 16.5C21.75 16.91 21.41 17.25 21 17.25Z" fill="currentColor"/>
                    <path d="M21 11.75H3C2.59 11.75 2.25 11.41 2.25 11C2.25 10.59 2.59 10.25 3 10.25H21C21.41 10.25 21.75 10.59 21.75 11C21.75 11.41 21.41 11.75 21 11.75Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4482_4947">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <g clipPath="url(#clip0_4482_8885)">
                    <path d="M12.0597 9.68012C11.2097 9.68012 10.3397 9.35012 9.44969 8.69012C9.11969 8.44012 9.04969 7.97012 9.29969 7.64012C9.54969 7.31012 10.0197 7.24012 10.3497 7.49012C11.5697 8.40012 12.5397 8.41012 13.5897 7.52012C13.9097 7.25012 14.3797 7.29012 14.6497 7.61012C14.9197 7.93012 14.8797 8.40012 14.5597 8.67012C13.7497 9.35012 12.9197 9.69012 12.0597 9.69012V9.68012Z" fill="currentColor"/>
                    <path d="M17.0105 22.7499C15.6805 22.7499 14.4905 21.9499 14.0005 20.7099L12.8105 17.7199C12.6705 17.3799 12.3505 17.1499 11.9805 17.1499C11.6105 17.1499 11.2905 17.3699 11.1505 17.7199L9.96047 20.7099C9.47047 21.9499 8.29047 22.7499 6.95047 22.7499C5.61047 22.7499 4.48047 21.9799 3.97047 20.7799L3.58047 19.8599C2.02047 16.1999 1.23047 12.3199 1.23047 8.33991V8.21991C1.23047 6.94991 1.58047 5.70991 2.23047 4.62991C3.86047 1.94991 7.09047 0.669906 10.1005 1.50991L11.7605 1.97991C11.9105 2.01991 12.0705 2.01991 12.2205 1.97991L13.8805 1.50991C16.9005 0.659906 20.1305 1.94991 21.7405 4.62991C22.3905 5.70991 22.7405 6.95991 22.7405 8.21991V8.33991C22.7405 12.3199 21.9505 16.1899 20.3905 19.8599L20.0005 20.7799C19.4905 21.9799 18.3205 22.7499 17.0205 22.7499H17.0105ZM11.9905 15.6599C12.9805 15.6599 13.8505 16.2499 14.2105 17.1699L15.4005 20.1599C15.6605 20.8299 16.3005 21.2599 17.0105 21.2599C17.7205 21.2599 18.3405 20.8399 18.6105 20.1999L19.0005 19.2799C20.4805 15.7999 21.2305 12.1299 21.2305 8.34991V8.22991C21.2305 7.23991 20.9605 6.25991 20.4505 5.40991C19.1905 3.29991 16.6505 2.28991 14.2905 2.95991L12.6305 3.42991C12.2105 3.54991 11.7705 3.54991 11.3505 3.42991L9.69047 2.95991C7.32047 2.28991 4.79047 3.29991 3.52047 5.40991C3.01047 6.25991 2.74047 7.23991 2.74047 8.22991V8.34991C2.74047 12.1299 3.49047 15.7999 4.97047 19.2799L5.36047 20.1999C5.63047 20.8399 6.26047 21.2599 6.96047 21.2599C7.66047 21.2599 8.31047 20.8299 8.57047 20.1599L9.76047 17.1699C10.1205 16.2499 11.0005 15.6599 11.9805 15.6599H11.9905Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4482_8885">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <g clipPath="url(#clip0_4482_4958)">
                    <path d="M15 17.7998H9C8.59 17.7998 8.25 17.4598 8.25 17.0498C8.25 16.6398 8.59 16.2998 9 16.2998H15C15.41 16.2998 15.75 16.6398 15.75 17.0498C15.75 17.4598 15.41 17.7998 15 17.7998Z" fill="currentColor"/>
                    <path d="M15.78 22.6998H8.22C4.74 22.6998 2.75 20.7098 2.75 17.2298V9.61979C2.75 6.48979 4.33 4.55981 7.2 4.20981C7.43 4.17981 7.67 4.25979 7.83 4.42979C7.99 4.59979 8.07 4.83981 8.03 5.06981V5.6098C8.03 5.8498 8.21 6.0298 8.45 6.0298H15.55C15.79 6.0298 15.97 5.8498 15.97 5.6098V5.11979C15.93 4.88979 16.01 4.6198 16.17 4.4498C16.33 4.2798 16.57 4.1798 16.8 4.1998C19.67 4.5598 21.25 6.4798 21.25 9.6098V17.2198C21.25 20.6998 19.26 22.6998 15.78 22.6998ZM6.55 5.8598C5.01 6.3398 4.25 7.5698 4.25 9.6098V17.2198C4.25 19.8898 5.55 21.1898 8.22 21.1898H15.78C18.45 21.1898 19.75 19.8898 19.75 17.2198V9.6098C19.75 7.5698 19 6.3398 17.45 5.8598C17.32 6.7998 16.52 7.5198 15.55 7.5198H8.45C7.48 7.5298 6.67 6.7998 6.55 5.8598Z" fill="currentColor"/>
                    <path d="M15.5498 7.53006H8.44978C7.38978 7.53006 6.52979 6.67006 6.52979 5.61006V5.12006C6.52979 5.02006 6.52979 4.93006 6.54979 4.83006C6.69979 3.89006 7.49978 3.20006 8.44978 3.20006C8.59978 3.20006 8.74979 3.11006 8.81979 2.97006L9.11979 2.38007C9.44979 1.72007 10.0998 1.31006 10.8298 1.31006H13.1698C13.8798 1.31006 14.5498 1.72006 14.8798 2.36006L15.1798 2.97006C15.2498 3.11006 15.3898 3.19006 15.5498 3.19006C16.5198 3.19006 17.3198 3.88006 17.4498 4.84006C17.4598 4.95006 17.4698 5.03007 17.4698 5.13007V5.62006C17.4698 6.66006 16.6098 7.53006 15.5498 7.53006ZM10.8298 2.80006C10.6698 2.80006 10.5298 2.89005 10.4598 3.04005L10.1598 3.64006C9.82979 4.28006 9.15978 4.70006 8.44978 4.70006C8.23978 4.70006 8.05979 4.85007 8.02979 5.07007V5.61006C8.02979 5.85006 8.20978 6.03006 8.44978 6.03006H15.5498C15.7898 6.03006 15.9698 5.85006 15.9698 5.61006V5.12006C15.9698 5.09006 15.9698 5.07005 15.9698 5.04005C15.9398 4.83005 15.7698 4.69006 15.5498 4.69006C14.8198 4.69006 14.1598 4.29006 13.8398 3.64006L13.5398 3.04005C13.4698 2.91005 13.3198 2.81006 13.1698 2.81006H10.8298V2.80006Z" fill="currentColor"/>
                    <path d="M13.5098 13.1401H10.5098C10.0998 13.1401 9.75977 12.8001 9.75977 12.3901C9.75977 11.9801 10.0998 11.6401 10.5098 11.6401H13.5098C13.9198 11.6401 14.2598 11.9801 14.2598 12.3901C14.2598 12.8001 13.9198 13.1401 13.5098 13.1401Z" fill="currentColor"/>
                    <path d="M12.0098 14.6401C11.5998 14.6401 11.2598 14.3001 11.2598 13.8901V10.8901C11.2598 10.4801 11.5998 10.1401 12.0098 10.1401C12.4198 10.1401 12.7598 10.4801 12.7598 10.8901V13.8901C12.7598 14.3101 12.4198 14.6401 12.0098 14.6401Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4482_4958">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <g clipPath="url(#clip0_4482_4951)">
                    <path d="M9 22.7502C3.38 22.7502 2.25 20.1002 2.25 15.8202V9.64023C2.25 4.91023 3.84996 2.98023 7.95996 2.74023H16C20.1 2.96023 21.75 4.96024 21.75 9.64023C21.75 10.0502 21.41 10.3902 21 10.3902C20.59 10.3902 20.25 10.0502 20.25 9.64023C20.25 5.27024 18.8 4.39023 15.96 4.24023H8C5.2 4.40023 3.75 5.28023 3.75 9.64023V15.8202C3.75 19.6502 4.48 21.2502 9 21.2502C9.41 21.2502 9.75 21.5902 9.75 22.0002C9.75 22.4102 9.41 22.7502 9 22.7502Z" fill="currentColor"/>
                    <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" fill="currentColor"/>
                    <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" fill="currentColor"/>
                    <path d="M15.9301 21C15.8901 21 15.8401 21 15.8001 21C15.2501 20.96 14.72 20.71 14.26 20.25L13.36 19.34C13.35 19.33 13.1801 19.14 13.1801 19.14C12.6601 18.53 12.49 17.78 12.7 17.09C12.82 16.71 13.03 16.37 13.34 16.06L16.6 12.8C16.89 12.51 17.3601 12.51 17.6601 12.8L20.8001 15.94C21.0901 16.23 21.0901 16.71 20.8001 17L17.5401 20.27C16.9601 20.86 16.3701 21 15.9301 21ZM17.15 14.39L14.4201 17.12C14.2901 17.26 14.19 17.4 14.15 17.54C14.07 17.79 14.21 18.02 14.34 18.17L14.46 18.31L15.34 19.19C15.52 19.37 15.7301 19.48 15.9101 19.5C16.0801 19.5 16.3 19.41 16.5 19.21L19.23 16.47L17.15 14.39Z" fill="currentColor"/>
                    <path d="M14.0201 21.4299C14.0101 21.4299 14.0101 21.4299 14.0201 21.4299C13.6501 21.4299 13.3001 21.2899 13.0401 21.0199L12.5901 20.5699C12.0501 20.0299 12.0501 19.1499 12.5901 18.6099L13.0401 18.1599C13.3301 17.8699 13.8101 17.8699 14.1001 18.1599C14.3901 18.4499 14.3901 18.9299 14.1001 19.2199L13.7301 19.5899L14.0201 19.8699L14.3901 19.4999C14.6801 19.2099 15.16 19.2099 15.45 19.4999C15.74 19.7899 15.74 20.2699 15.45 20.5599L15.0001 21.0099C14.7301 21.2899 14.3901 21.4299 14.0201 21.4299Z" fill="currentColor"/>
                    <path d="M12 22.37C11.81 22.37 11.6199 22.3 11.4699 22.15C11.1799 21.86 11.1799 21.38 11.4699 21.09L12.8199 19.74C13.1099 19.45 13.59 19.45 13.88 19.74C14.17 20.03 14.17 20.51 13.88 20.8L12.53 22.15C12.38 22.29 12.19 22.37 12 22.37Z" fill="currentColor"/>
                    <path d="M20.7401 17.6601C20.5501 17.6601 20.3601 17.5901 20.2101 17.4401L19.7602 16.9901C19.4702 16.7001 19.4602 16.2201 19.7502 15.9301C20.0402 15.6401 20.5202 15.6301 20.8102 15.9201L21.2602 16.3701C21.5502 16.6601 21.5602 17.1401 21.2702 17.4301C21.1202 17.5901 20.9301 17.6601 20.7401 17.6601Z" fill="currentColor"/>
                    <path d="M17.1499 14.0801C16.9599 14.0801 16.7598 14.0101 16.6198 13.8601L16.1699 13.4101C15.8799 13.1201 15.8799 2.6401 16.1799 12.3501C16.4699 12.0601 16.9498 12.0601 17.2398 12.3601L17.6898 12.8101C17.9798 13.1001 17.9799 13.5801 17.6799 13.8701C17.5299 14.0101 17.3399 14.0801 17.1499 14.0801Z" fill="currentColor"/>
                    <path d="M19.6097 16.54C19.4197 16.54 19.2297 16.47 19.0797 16.32L17.2898 14.53C16.9998 14.24 16.9998 13.76 17.2898 13.47L19.0797 11.68C19.2197 11.54 19.4097 11.46 19.6097 11.46C19.8097 11.46 19.9997 11.54 20.1397 11.68L21.9298 13.47C22.0698 13.61 22.1498 13.8 22.1498 14C22.1498 14.2 22.0698 14.39 21.9298 14.53L20.1397 16.32C19.9997 16.47 19.7997 16.54 19.6097 16.54ZM18.8797 14L19.6097 14.73L20.3397 14L19.6097 13.27L18.8797 14Z" fill="currentColor"/>
                    <path d="M22.08 15.4199C21.89 15.4199 21.7001 15.3499 21.5501 15.1999L20.8801 14.5299C20.5901 14.2399 20.5901 13.7599 20.8801 13.4699C21.1701 13.1799 21.65 13.1799 21.94 13.4699L22.6101 14.1399C22.9001 14.4299 22.9001 14.9099 22.6101 15.1999C22.4601 15.3499 22.27 15.4199 22.08 15.4199Z" fill="currentColor"/>
                    <path d="M19.6098 12.96C19.4198 12.96 19.2298 12.89 19.0798 12.74L18.4099 12.07C18.1199 11.78 18.1199 11.3 18.4099 11.01C18.6999 10.72 19.1798 10.72 19.4698 11.01L20.1399 11.68C20.4299 11.97 20.4299 12.45 20.1399 12.74C19.9999 12.88 19.8098 12.96 19.6098 12.96Z" fill="currentColor"/>
                    <path d="M13.7601 19.3999H13.6201C13.2101 19.3999 12.8701 19.0599 12.8701 18.6499C12.8701 18.2399 13.2101 17.8999 13.6201 17.8999H13.7601C14.1701 17.8999 14.5101 18.2399 14.5101 18.6499C14.5101 19.0599 14.1701 19.3999 13.7601 19.3999Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4482_4951">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <AnimatedIcon animationData={anim1} className="text-slate-600" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <AnimatedIcon animationData={anim2} className="text-slate-600" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <AnimatedIcon animationData={anim3} className="text-slate-600" />
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href="https://app.iconsax.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t.icons.viewLibrary}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="rounded-md px-2 py-0.5">Alternative</Badge>
            </div>
            <CardTitle className="text-xl">Lucide React</CardTitle>
            <CardDescription>{t.icons.secondaryDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg mb-6">
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <Bell className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <User className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <Info className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <Github className="h-6 w-6 text-slate-400" />
              </div>
              <div className="aspect-square bg-white rounded-md border border-slate-200 flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-slate-400" />
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t.icons.viewLibrary}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-12 w-12 rounded-xl bg-brand-orange flex items-center justify-center shrink-0">
            <Info className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">{t.icons.policyTitle}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t.icons.policyDesc}
            </p>
            <Button className="gap-2">
              <Languages className="h-4 w-4" />
              {t.icons.requestDesignOps}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BadgePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <PageHeader 
        title={t.badge.title} 
        subtitle={t.badge.subtitle} 
        figmaLink={t.badge.figmaLink}
        shadcnLink={t.badge.shadcnLink}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.badge.variants}</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Badge variant="default">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="secondary">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="outline">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Outline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="destructive">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Destructive</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="verified" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {t.badge.verified}
                </Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="info">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Info</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="warning">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="success">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Success</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Light Variants</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Badge variant="infoLight">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Info Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="warningLight">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Warning Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="successLight">Badge</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Success Light</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.badge.shapes}</h2>
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Badge shape="default">Default</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge shape="square">Square</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Square</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge shape="pill">Pill Shape</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Pill</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge shape="circle" variant="destructive">8</Badge>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Circle / Counter</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.badge.dosAndDonts}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Dos
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800/80 list-disc pl-4">
              <li>{t.badge.do1}</li>
              <li>{t.badge.do2}</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-rose-100 bg-rose-50/50 p-6">
            <h3 className="font-bold text-rose-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 list-disc pl-4">
              <li>{t.badge.dont1}</li>
              <li>{t.badge.dont2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
