import React from "react";

export interface SimpleProject {
  title: string;
  description: string;
  projectUrl?: string;
  platform?: string;
}

interface Props {
  projects: SimpleProject[];
  color?: string;
}

const truncate = (s: string, n = 120) =>
  s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

export const SimplifiedProjects: React.FC<Props> = ({ projects, color = "#111827" }) => {
  return (
    <section aria-label="Projects" className="py-8 md:py-12 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects</h2>

        <ul className="space-y-4">
          {projects.map((p) => (
            <li key={p.title} className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {p.title}
                  {p.projectUrl && (
                    <a
                      href={p.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 text-sm text-indigo-600 hover:underline"
                    >
                      Live
                    </a>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{truncate(p.description || "", 160)}</div>
              </div>

              {p.platform && (
                <div className="mt-3 sm:mt-0 sm:ml-6 text-sm text-gray-500">{p.platform}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SimplifiedProjects;
