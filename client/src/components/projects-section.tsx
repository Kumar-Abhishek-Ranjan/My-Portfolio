import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project 1",
    description: "A full-stack web application built with React and Node.js",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Project 2",
    description: "Mobile-first responsive design with modern animations",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Project 3",
    description: "Real-time collaboration platform with WebSocket integration",
    tech: ["TypeScript", "WebSocket", "Express"],
    github: "https://github.com",
    demo: "https://demo.com"
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
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-4">
            Here are some of my recent projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
