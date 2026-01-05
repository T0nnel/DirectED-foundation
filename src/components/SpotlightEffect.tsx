import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightEffectProps {
    className?: string;
    spotlightColor?: string;
}

export const SpotlightEffect = ({
    className,
    spotlightColor = "hsl(var(--accent) / 0.15)"
}: SpotlightEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
        >
            <div
                className="absolute w-96 h-96 rounded-full blur-3xl transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                    opacity: isHovering ? 1 : 0,
                }}
            />
        </div>
    );
};
