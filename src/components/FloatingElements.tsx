import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementsProps {
    className?: string;
    count?: number;
}

export const FloatingElements = ({ className, count = 6 }: FloatingElementsProps) => {
    const elements = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 10 + Math.random() * 10,
    }));

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute rounded-full"
                    style={{
                        width: el.size,
                        height: el.size,
                        left: el.left,
                        top: el.top,
                        background: `radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)`,
                        border: "1px solid hsl(var(--accent) / 0.1)",
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, -15, 0],
                        scale: [1, 1.1, 0.9, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
