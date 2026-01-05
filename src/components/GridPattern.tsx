import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridPatternProps {
    className?: string;
    gridColor?: string;
    gridSize?: number;
}

export const GridPattern = ({
    className,
    gridColor = "hsl(var(--border))",
    gridSize = 50
}: GridPatternProps) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    maskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
            />
        </div>
    );
};
