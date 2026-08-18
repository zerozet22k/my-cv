import React from "react";

export interface SimpleProject {
  title: string;
  description: string;
  technologies?: string[];
  platform?: string;
}

interface Props {
  projects: SimpleProject[];
  color?: string;
}

export const SimplifiedProjects: React.FC<Props> = ({ projects }) => {
  return (
    <section aria-label="Projects" className="bg-white px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <h2 className="text-2xl font-semibold text-gray-900">Selected Projects</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Product, client, and independent work across full-stack web applications,
            realtime systems, integrations, and business platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-xl bg-gray-50 p-5 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                {project.platform && (
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-500">
                    {project.platform}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-600">{project.description}</p>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimplifiedProjects;
