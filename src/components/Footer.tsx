import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    [t('nav.what_we_do', "What We Do")]: [
      { label: t('nav.programs', "Our Programs"), href: "/programs" },
      { label: t('nav.education_skills', "Education & Skills"), href: "/focus/education-access" },
      { label: t('nav.youth_employment', "Youth Employment"), href: "/focus/youth-employment" },
      { label: t('nav.tech_innovation', "Technology"), href: "/focus/technology-innovation" },
    ],
    [t('nav.research_reports', "Research & Reports")]: [
      { label: t('nav.publications', "Publications"), href: "/publications" },
      { label: t('nav.data_statistics', "Data & Statistics"), href: "/data" },
      { label: t('nav.annual_reports', "Annual Reports"), href: "/publications" },
      { label: t('nav.impact_stories', "Impact Stories"), href: "/data" },
    ],
    [t('nav.who_we_are', "Who We Are")]: [
      { label: t('nav.about_us', "About Us"), href: "/about" },
      { label: t('nav.our_mission', "Our Mission"), href: "/mission" },
      { label: t('nav.team', "Our Team"), href: "/team" },
      { label: t('nav.partners', "Partners"), href: "/partners" },
    ],
    [t('cta.get_involved', "Get Involved")]: [
      { label: t('nav.donate', "Donate"), href: "/donate" },
      { label: t('nav.volunteer', "Volunteer"), href: "/volunteer" },
      { label: t('nav.partner_with_us', "Partner With Us"), href: "/partnerships" },
      { label: t('nav.success_stories', "Success Stories"), href: "/success-stories" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-lg bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
                <span className="text-primary-foreground font-serif text-2xl font-bold">D</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold">DirectED</span>
                <p className="text-sm text-primary-foreground/70">Development Foundation</p>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              {t('footer.brand_desc', "Empowering Africa's next generation of tech leaders through world-class training and remote paid internships.")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-[hsl(175_70%_50%/0.2)] hover:text-[hsl(175_70%_50%)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-semibold text-lg mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-[hsl(175_70%_50%)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[hsl(175_70%_50%)] mt-0.5" />
              <div>
                <p className="font-medium">{t('footer.headquarters', "Headquarters")}</p>
                <p className="text-sm text-primary-foreground/70">Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[hsl(175_70%_50%)] mt-0.5" />
              <div>
                <p className="font-medium">{t('footer.email', "Email")}</p>
                <a href="mailto:info@directed.dev" className="text-sm text-primary-foreground/70 hover:text-[hsl(175_70%_50%)] transition-colors">
                  info@directed.dev
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[hsl(175_70%_50%)] mt-0.5" />
              <div>
                <p className="font-medium">{t('footer.phone', "Phone")}</p>
                <p className="text-sm text-primary-foreground/70">+254 700 000 000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} DirectEd Development Foundation. {t('footer.rights', "All rights reserved.")}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/70 hover:text-[hsl(175_70%_50%)] transition-colors">
                {t('footer.privacy', "Privacy Policy")}
              </Link>
              <Link to="/terms" className="text-primary-foreground/70 hover:text-accent transition-colors">
                {t('footer.terms', "Terms of Use")}
              </Link>
              <Link to="/accessibility" className="text-primary-foreground/70 hover:text-accent transition-colors">
                {t('footer.accessibility', "Accessibility")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
