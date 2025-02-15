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
            I am a software engineer with over four years of experience, dedicated to problem-solving 
            and enhancing team performance. My journey has been marked by successful project management, 
            client collaboration, mentoring budding developers, and the thrust to learn and implement 
            cutting-edge solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">
                B.Tech in Electronics & Communication<br />
                GL Bajaj Institute of Technology & Management<br />
                CGPA: 9.2
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                Senior Software Engineer at Coforge Ltd.<br />
                4+ years of professional experience<br />
                Specializing in Non-life Insurance Software
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Achievements</h3>
              <p className="text-muted-foreground">
                Best Performer of the Year<br />
                Multiple PAT ON BACK awards<br />
                Head of Innovation Cell
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}