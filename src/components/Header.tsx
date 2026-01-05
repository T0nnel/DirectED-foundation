import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/Facebook profile-01.jpg";
import { useTranslation } from "react-i18next";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Derive navItems from translations
  const navItems: NavItem[] = [
    {
      label: t('nav.what_we_do', 'What We Do'),
      href: "/what-we-do",
      children: [
        { label: t('nav.programs', "Our Programs"), href: "/programs", description: t('nav.programs_desc', "Training and development initiatives") },
        { label: t('nav.education_skills', "Education & Skills"), href: "/focus/education-access", description: t('nav.education_desc', "World-class educational opportunities") },
        { label: t('nav.youth_employment', "Youth Employment"), href: "/focus/youth-employment", description: t('nav.employment_desc', "Career development and placements") },
        { label: t('nav.tech_innovation', "Technology & Innovation"), href: "/focus/technology-innovation", description: t('nav.tech_desc', "Tech skills for the future") },
        { label: t('nav.gender_equality', "Gender Equality"), href: "/focus/gender-equality", description: t('nav.gender_desc', "Women in tech initiatives") },
      ],
    },
    {
      label: t('nav.research_reports', 'Research & Reports'),
      href: "/research",
      children: [
        { label: t('nav.publications', "Publications"), href: "/publications", description: t('nav.reports_desc', "Reports and research papers") },
        { label: t('nav.data_statistics', "Data & Statistics"), href: "/data", description: t('nav.impact_metrics', "Impact metrics and analytics") },
        { label: t('nav.annual_reports', "Annual Reports"), href: "/publications", description: t('nav.yearly_achievements', "Yearly achievements") },
      ],
    },
    {
      label: t('nav.stories', 'Stories'),
      href: "/stories",
      children: [
        { label: t('nav.success_stories', "Success Stories"), href: "/success-stories", description: t('nav.transformative_journeys', "Transformative journeys") },
        { label: t('nav.blog', "Blog"), href: "/blog", description: t('nav.latest_news', "Latest news and insights") },
        { label: t('nav.impact_data', "Impact Data"), href: "/data", description: t('nav.impact_numbers', "See our impact in numbers") },
      ],
    },
    {
      label: t('nav.who_we_are', 'Who We Are'),
      href: "/about",
      children: [
        { label: t('nav.our_mission', "Our Mission"), href: "/mission", description: t('nav.vision_values', "Vision and values") },
        { label: t('nav.team', "Team"), href: "/team", description: t('nav.meet_people', "Meet our people") },
        { label: t('nav.partners', "Partners"), href: "/partners", description: t('nav.orgs_work_with', "Organizations we work with") },
        { label: t('nav.about_us', "About Us"), href: "/about", description: t('nav.learn_more', "Learn more about DirectEd Development Foundation") },
      ],
    },
    {
      label: t('nav.take_action', 'Take Action'),
      href: "/take-action",
      children: [
        { label: t('nav.donate', "Donate"), href: "/donate", description: t('nav.support_mission', "Support our mission") },
        { label: t('nav.volunteer', "Volunteer"), href: "/volunteer", description: t('nav.give_time', "Give your time") },
        { label: t('nav.partner_with_us', "Partner With Us"), href: "/partnerships", description: t('nav.collaborate', "Collaborate for impact") },
      ],
    },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "sw", name: "Kiswahili" },
    { code: "ar", name: "العربية" },
    { code: "pt", name: "Português" },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Get current language name for display
  const currentLanguageName = languages.find(l => l.code === i18n.language)?.name || languages.find(l => l.code === i18n.language.split('-')[0])?.name || "English";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-language-dropdown]')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="container mx-auto px-6 flex justify-end items-center gap-4">
          <div className="relative z-[60]" data-language-dropdown>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguageName}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 bg-card text-card-foreground rounded-lg shadow-elevated border border-border min-w-[160px] overflow-hidden z-[70]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors ${i18n.language === lang.code ? 'bg-muted font-medium' : ''
                        }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-background"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImage} alt="DirectED Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div className="hidden sm:block">
                <span className="text-xl font-serif font-bold text-primary">DirectED</span>
                <p className="text-xs text-muted-foreground">Development Foundation</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="nav-link flex items-center gap-1 text-foreground hover:text-primary"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-popover rounded-lg shadow-elevated border border-border min-w-[280px] overflow-hidden">
                          {item.children.map((child, idx) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-5 py-4 hover:bg-muted transition-colors border-b border-border last:border-0"
                            >
                              <span className="font-medium text-foreground">{child.label}</span>
                              {child.description && (
                                <p className="text-sm text-muted-foreground mt-0.5">{child.description}</p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>
              <Link to="/contactus">
                <Button variant="outline" className="hidden md:inline-flex">
                  {t('nav.press_centre', "Press Centre")}
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="accent" className="hidden sm:inline-flex">
                  {t('nav.donate', "Donate")}
                </Button>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-background z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-serif font-bold text-primary">{t('nav.menu', "Menu")}</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-border pb-4 mb-4">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-2 text-lg font-medium"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && item.children && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-2 space-y-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                <div className="mt-8 space-y-3">
                  <Link to="/donate" className="block">
                    <Button variant="accent" className="w-full" size="lg">
                      {t('nav.donate', "Donate")}
                    </Button>
                  </Link>
                  <Link to="/stories" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      {t('nav.press_centre', "Press Centre")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
