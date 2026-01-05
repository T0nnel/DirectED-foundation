import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useCMS } from "@/contexts/CMSContext";
import { EditableText } from "@/components/cms/EditableText";

const ContactUs = () => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { loadPageContent } = useCMS();

    useEffect(() => {
        loadPageContent('contact');
    }, []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);

        // Show success message
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you soon.",
        });

        // Reset form
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            content: "info@directed.dev",
            link: "mailto:info@directed.dev",
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            content: "+254 700 000 000",
            link: "tel:+254700000000",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            content: "Nairobi, Kenya",
            link: null,
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(175_70%_50%)] to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <EditableText
                                pageName="contact"
                                contentKey="hero_title"
                                defaultValue="Get in Touch"
                                as="h1"
                                className="font-serif text-4xl md:text-5xl font-bold mb-6"
                            />
                            <EditableText
                                pageName="contact"
                                contentKey="hero_subtitle"
                                defaultValue="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
                                as="p"
                                className="text-lg md:text-xl text-primary-foreground/80"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Contact Information Cards */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card rounded-2xl p-8 text-center shadow-soft hover:shadow-elevated transition-all"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                                        {info.icon}
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                                        {info.title}
                                    </h3>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            className="text-muted-foreground hover:text-accent transition-colors"
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p className="text-muted-foreground">{info.content}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    Send Us a Message
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Fill out the form below and we'll get back to you shortly
                                </p>
                            </motion.div>

                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                onSubmit={handleSubmit}
                                className="bg-card rounded-2xl p-8 md:p-12 shadow-soft"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div className="mb-8">
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="accent"
                                    size="lg"
                                    className="w-full md:w-auto px-8"
                                >
                                    Send Message
                                    <Send className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.form>
                        </div>
                    </div>
                </section>

                {/* Social Media Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                                Follow Us
                            </h3>
                            <p className="text-muted-foreground mb-8">
                                Stay connected on social media
                            </p>
                            <div className="flex justify-center gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Map Section (Optional - placeholder) */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                                        <p className="text-muted-foreground">Map integration coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUs;
