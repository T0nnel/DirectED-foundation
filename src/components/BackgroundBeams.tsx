import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
    className?: string;
    beamColor?: string;
}

export const BackgroundBeams = ({
    className,
    beamColor = "hsl(var(--accent))"
}: BackgroundBeamsProps) => {
    const beams = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {beams.map((beam) => (
                <motion.div
                    key={beam}
                    className="absolute w-px h-full"
                    style={{
                        left: `${(beam + 1) * 12}%`,
                        background: `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0.2, 0.5, 0],
                        scaleY: [0, 1, 0.8, 1, 0],
                    }}
                    transition={{
                        duration: 4 + beam * 0.5,
                        repeat: Infinity,
                        delay: beam * 0.3,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Horizontal beams for grid effect */}
            {Array.from({ length: 5 }, (_, i) => i).map((beam) => (
                <motion.div
                    key={`h-${beam}`}
                    className="absolute h-px w-full"
                    style={{
                        top: `${(beam + 1) * 20}%`,
                        background: `linear-gradient(90deg, transparent, ${beamColor}, transparent)`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                        opacity: [0, 0.3, 0.1, 0.4, 0],
                        scaleX: [0, 1, 0.8, 1, 0],
                    }}
                    transition={{
                        duration: 5 + beam * 0.4,
                        repeat: Infinity,
                        delay: beam * 0.4 + 1,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
