import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Passionate software engineer with a focus on building scalable web applications
            and solving complex problems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">
                B.Tech in Computer Science
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                5+ years of professional software development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Interests</h3>
              <p className="text-muted-foreground">
                Web Development, Cloud Computing, System Design
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
