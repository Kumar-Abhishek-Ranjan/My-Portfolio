import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, LineChart, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Achievement } from "@shared/schema";

export function ProjectsSection() {
  const { data: achievements, isLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

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
          <h2 className="text-3xl font-bold">Professional Achievements</h2>
          <p className="text-muted-foreground mt-4">
            Key accomplishments and contributions throughout my career
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : achievements?.length === 0 ? (
          <p className="text-center text-muted-foreground">No achievements added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements?.map((achievement, index) => (
              <Card key={achievement.id}>
                <CardHeader className="space-y-1">
                  <CardTitle>{achievement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}