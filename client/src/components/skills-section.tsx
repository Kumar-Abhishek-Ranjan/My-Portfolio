import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Skill } from "@shared/schema";
import { Loader2 } from "lucide-react";

export function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

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
            Technical expertise and professional proficiency
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : skills?.length === 0 ? (
            <p className="text-center text-muted-foreground">No skills added yet.</p>
          ) : (
            <div className="space-y-6">
              {skills?.map((skill, index) => (
                <motion.div
                  key={skill.id}
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
          )}
        </div>
      </motion.div>
    </section>
  );
}