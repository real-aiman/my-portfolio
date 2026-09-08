import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "../../ui/SectionHeading";
import { PROJECTS } from "../../../data/projects";
import type { Project } from "../../../types";

export function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="A handful of projects worth showing."
          description="Client sites, storefronts and applications — chosen because each one solved a real, specific problem."
        />
        <div className="mt-14 grid grid-cols-1 gap-x-8 md:grid-cols-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </div>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
