import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center space-y-6">
        <motion.h1 
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-[#00B894] text-transparent bg-clip-text"
        >
          KUMAR ABHISHEK RANJAN
        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          animate="show"
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          Senior Software Engineer at Coforge Ltd.
        </motion.p>

        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          animate="show"
          className="flex justify-center gap-4"
        >
          <Button asChild size="lg">
            <a href="#contact">Contact Me</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#about">
              Learn More
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}