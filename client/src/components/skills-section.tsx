import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "React & React Native", level: 95 },
  { name: "Node.js", level: 80 },
  { name: "TypeScript", level: 85 },
  { name: "Database Design", level: 75 }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
          <p className="text-muted-foreground mt-4">
            Here's an overview of my technical skills and proficiency levels
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={fadeIn('left', 0.3 * (index + 1))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
