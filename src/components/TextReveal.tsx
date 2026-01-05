import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
}

export const TextReveal = ({ children, className }: TextRevealProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.9", "start 0.25"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <motion.div
            ref={targetRef}
            style={{ opacity, scale }}
            className={cn("relative", className)}
        >
            {children}
        </motion.div>
    );
};

export const TextRevealByWord = ({ text, className }: { text: string; className?: string }) => {
    const targetRef = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.8", "start 0.4"],
    });

    const words = text.split(" ");

    return (
        <p ref={targetRef} className={cn("flex flex-wrap", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
};

const Word = ({
    children,
    progress,
    range,
}: {
    children: ReactNode;
    progress: any;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <span className="relative mr-2">
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity }} className="text-foreground">
                {children}
            </motion.span>
        </span>
    );
};
