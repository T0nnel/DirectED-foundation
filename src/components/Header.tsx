import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "Our Programs", href: "/programs", description: "Training and development initiatives" },
      { label: "Education & Skills", href: "/focus/education-access", description: "World-class educational opportunities" },
      { label: "Youth Employment", href: "/focus/youth-employment", description: "Career development and placements" },
      { label: "Technology & Innovation", href: "/focus/technology-innovation", description: "Tech skills for the future" },
      { label: "Gender Equality", href: "/focus/gender-equality", description: "Women in tech initiatives" },
    ],
  },
  {
    label: "Research & Reports",
    href: "/research",
    children: [
      { label: "Publications", href: "/publications", description: "Reports and research papers" },
      { label: "Data & Statistics", href: "/data", description: "Impact metrics and analytics" },
      { label: "Annual Reports", href: "/publications", description: "Yearly achievements" },
    ],
  },
  {
    label: "Stories",
    href: "/stories",
    children: [
      { label: "Success Stories", href: "/success-stories", description: "Transformative journeys" },
      { label: "Blog", href: "/blog", description: "Latest news and insights" },
      { label: "Impact Data", href: "/data", description: "See our impact in numbers" },
    ],
  },
  {
    label: "Who We Are",
    href: "/about",
    children: [
      { label: "Our Mission", href: "/mission", description: "Vision and values" },
      { label: "Team", href: "/team", description: "Meet our people" },
      { label: "Partners", href: "/partners", description: "Organizations we work with" },
      { label: "About Us", href: "/about", description: "Learn more about DirectEd Development Foundation" },
    ],
  },
  {
    label: "Take Action",
    href: "/take-action",
    children: [
      { label: "Donate", href: "/donate", description: "Support our mission" },
      { label: "Volunteer", href: "/volunteer", description: "Give your time" },
      { label: "Partner With Us", href: "/partnerships", description: "Collaborate for impact" },
    ],
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="container mx-auto px-6 flex justify-end items-center gap-4">
          <button className="flex items-center gap-1 hover:text-accent transition-colors">
            <Globe className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-3 h-3" />
          </button>
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
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">D</span>
              </div>
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
              <Link to="/stories">
                <Button variant="outline" className="hidden md:inline-flex">
                  Press Centre
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="accent" className="hidden sm:inline-flex">
                  Donate
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
                  <span className="text-xl font-serif font-bold text-primary">Menu</span>
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
                      Donate
                    </Button>
                  </Link>
                  <Link to="/stories" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Press Centre
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
