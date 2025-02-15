import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const [showExperience, setShowExperience] = useState(false);

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

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowExperience(true)}>
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

      <Dialog open={showExperience} onOpenChange={setShowExperience}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Professional Experience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">Coforge Ltd.</h3>
              <p>Senior Software Engineer (GET / SE / SSE)</p>
              <p>Gurugram(IN)</p>
              <p>Nov2020 - Present</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Project: SUBSCRIBE (Non-life Insurance Software)</h4>
              <p>Clients: London, Bermuda, Romania, etc.</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Roles and Responsibilities:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Collaborated directly with clients to define and understand solution requirements for applicable development variables, resulting in a 25% increase in client satisfaction.</li>
                <li>Analyzed proposed technical solutions based on customer requirements, budget, and product goals, leading to a 15% reduction in project costs.</li>
                <li>Prepared detailed reports on updates to project specifications, progress, identified connections, and team activities, enhancing project transparency by 30%.</li>
                <li>Developed logic, debugged codes, and created scripts to fix issues raised by clients, reducing client-reported matters by 15%.</li>
                <li>Prioritized tickets, assigned tasks, tracked tickets, and directed reports to the manager, improving task resolution time by 25%.</li>
                <li>Trained and mentored 10+ freshers, junior developers, and engineers, teaching skills in SQL and Lloyds of London Insurance, contributing to a 30% improvement in overall team performance.</li>
                <li>Discussed project (BAU) progress with customers, collected feedback at different stages, and directly addressed concerns, resulting in a 22% improvement in project feedback ratings.</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}