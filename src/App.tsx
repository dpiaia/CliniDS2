import { LayoutDashboard, Palette, Type, Box, ChevronRight, Menu, Search, Github, ExternalLink, Sparkles, Languages } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/Card";
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
  const colors = [
    { name: t.colors.brandOrange, hex: "#EC6726", oklch: "0.6698 0.1803 42.9750", description: t.colors.brandOrangeDesc },
    { name: t.colors.success, hex: "#4CAF50", description: t.colors.successDesc },
    { name: t.colors.warning, hex: "#FFC107", description: t.colors.warningDesc },
    { name: t.colors.danger, hex: "#D32F2F", description: t.colors.dangerDesc },
    { name: t.colors.info, hex: "#2196F3", description: t.colors.infoDesc },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t.colors.title}</h1>
        <p className="text-slate-500">{t.colors.subtitle}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">{t.colors.brandStatus}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <Card key={color.name} className="overflow-hidden p-0">
              <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
              <div className="p-4">
                <h3 className="font-bold">{color.name}</h3>
                <p className="text-xs font-mono text-slate-500">{color.hex}</p>
                {color.oklch && <p className="text-[10px] font-mono text-slate-400 mt-1">OKLCH: {color.oklch}</p>}
                <p className="mt-2 text-sm text-slate-600">{color.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
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

function ButtonPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t.button.title}</h1>
        <p className="text-slate-500">{t.button.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.button.variants}</CardTitle>
          <CardDescription>{t.button.variantsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="primary">{t.button.primary}</Button>
          <Button variant="secondary">{t.button.secondary}</Button>
          <Button variant="outline">{t.button.outline}</Button>
          <Button variant="ghost">{t.button.ghost}</Button>
          <Button variant="danger">{t.button.danger}</Button>
          <Button variant="success">{t.button.success}</Button>
        </CardContent>
      </Card>

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
