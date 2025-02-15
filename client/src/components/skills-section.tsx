import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "Cloud (Azure / AWS / GCP)", level: 90 },
  { name: "Team Leadership & Mentoring", level: 85 },
  { name: "SQL & PL/SQL", level: 95 },
  { name: "C, C++, C#", level: 85 },
  { name: "Delphi", level: 80 },
  { name: "Insurance Domain Knowledge", level: 90 }
];

const certifications = [
  "GCP Cloud Practitioner - Google (March 2023)",
  "Azure Data Engineer - Microsoft",
  "Azure Data Lake, Azure Data Factory, Azure Data Bricks"
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
          <h2 className="text-3xl font-bold">Skills & Certifications</h2>
          <p className="text-muted-foreground mt-4">
            Technical expertise and professional certifications
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-6">
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

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Certifications</h3>
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('right', 0.3 * (index + 1))}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-4 bg-primary/5 rounded-lg text-center"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}