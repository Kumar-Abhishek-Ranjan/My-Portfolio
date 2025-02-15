import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, LineChart } from "lucide-react";

const achievements = [
  {
    title: "Client Collaboration",
    description: "Collaborated directly with clients from London, Bermuda, and Romania, resulting in a 25% increase in client satisfaction.",
    highlights: ["Requirements gathering", "Solution design", "Client communication"],
    icon: Users
  },
  {
    title: "Team Leadership",
    description: "Trained and mentored 10+ freshers and junior developers, contributing to a 30% improvement in team performance.",
    highlights: ["Mentoring", "Task management", "Knowledge sharing"],
    icon: Trophy
  },
  {
    title: "Project Management",
    description: "Led the SUBSCRIBE project for non-life insurance, achieving a 15% reduction in project costs and 25% improvement in task resolution.",
    highlights: ["Project planning", "Resource allocation", "Performance optimization"],
    icon: LineChart
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Professional Experience</h2>
          <p className="text-muted-foreground mt-4">
            Key achievements and contributions at Coforge Ltd.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{achievement.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {achievement.highlights.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}