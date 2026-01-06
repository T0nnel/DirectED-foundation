import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { SpotlightEffect } from "@/components/SpotlightEffect";
import { FloatingElements } from "@/components/FloatingElements";


interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Increased from 6s to 7s for better viewing

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden" data-hero-carousel>
      {/* Image slides with smooth crossfade */}
      <AnimatePresence initial={false}>
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0"
            >
              {/* Ken Burns effect layer */}
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.12 }}
                transition={{
                  duration: 12,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                  backgroundImage: `url(${slide.image})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Animated Background Effects */}
      <BackgroundBeams className="opacity-30" />
      <SpotlightEffect className="z-5" />
      <FloatingElements count={8} className="opacity-40" />


      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-24">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-bold mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
              <Link to={slides[currentSlide].link}>
                <Button
                  size="lg"
                  variant="accent"
                  className="text-lg px-8 py-6"
                >
                  {slides[currentSlide].cta}
                </Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
              ? "w-12 bg-[hsl(175_70%_50%)]"
              : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
