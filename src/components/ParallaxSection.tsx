import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    offset?: number;
}

export const ParallaxSection = ({ children, className, offset = 50 }: ParallaxSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
};
