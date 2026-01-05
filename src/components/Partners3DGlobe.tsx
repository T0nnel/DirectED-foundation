import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Partner {
    name: string;
    logo?: string;
}

interface Partners3DGlobeProps {
    title: string;
    subtitle?: string;
    partners: Partner[];
}

// Helper to generate a Clearbit logo URL based on partner name
const getClearbitLogo = (name: string) => {
    // Simplistic domain guess: take first word, lower case, append .com
    const domain = name.split(/\s+/)[0].toLowerCase() + ".com";
    return `https://logo.clearbit.com/${domain}`;
};

export const Partners3DGlobe = ({ title, subtitle, partners }: Partners3DGlobeProps) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prev) => (prev + 0.3) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Calculate positions on a 3D sphere
    const getPosition = (index: number, total: number, currentRotation: number) => {
        const angleStep = (360 / total) * (Math.PI / 180);
        const currentAngle = angleStep * index + currentRotation * (Math.PI / 180);

        // Sphere radius
        const radius = 280;
        const verticalSpread = 120;

        // Calculate 3D position
        const x = Math.sin(currentAngle) * radius;
        const z = Math.cos(currentAngle) * radius;
        const y = Math.sin(currentAngle * 2) * verticalSpread;

        // Calculate scale based on z-depth (items further away are smaller)
        const scale = (z + radius) / (radius * 2) * 0.5 + 0.5;

        // Calculate opacity based on position (items in back are more transparent)
        const opacity = (z + radius) / (radius * 2) * 0.4 + 0.6;

        return { x, y, z, scale, opacity };
    };

    // Duplicate partners for smoother infinite rotation
    const allPartners = [...partners, ...partners];

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-muted-foreground text-lg">{subtitle}</p>
                    )}
                </motion.div>

                {/* 3D Globe Container */}
                <div className="relative h-[500px] flex items-center justify-center perspective-1000">
                    <div className="relative w-full h-full preserve-3d">
                        {allPartners.map((partner, index) => {
                            const { x, y, z, scale, opacity } = getPosition(
                                index,
                                allPartners.length,
                                rotation
                            );
                            const logoUrl = partner.logo ?? getClearbitLogo(partner.name);

                            return (
                                <motion.div
                                    key={`${partner.name}-${index}`}
                                    className="absolute left-1/2 top-1/2"
                                    style={{
                                        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                                        opacity,
                                        zIndex: Math.round(z + 300),
                                    }}
                                    animate={{
                                        filter: z > 0 ? "blur(0px)" : `blur(${Math.abs(z) / 100}px)`,
                                    }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <motion.div
                                        className="bg-card rounded-2xl p-6 shadow-elevated border border-border/50 backdrop-blur-sm"
                                        whileHover={{
                                            scale: 1.15,
                                            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.3)",
                                            zIndex: 1000,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={logoUrl}
                                            alt={partner.name}
                                            className="h-16 w-auto object-contain transition-all duration-300"
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Orbital rings for effect */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="absolute w-[500px] h-[500px] rounded-full border-2 border-accent/10"
                            style={{
                                transform: `rotateX(75deg)`,
                            }}
                        />
                        <div
                            className="absolute w-[600px] h-[600px] rounded-full border border-accent/5"
                            style={{
                                transform: `rotateX(75deg)`,
                            }}
                        />
                    </div>

                    {/* Center glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Interaction hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-center text-sm text-muted-foreground mt-8"
                >
                    Hover over partners to view details
                </motion.p>
            </div>
        </section>
    );
};
