import React from "react";

// Kept for the animated background data. The visible skills section intentionally
// avoids numeric proficiency scores because they imply more precision than is useful.
export interface Skill {
  name: string;
  proficiency: number;
  src: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

interface SkillsProps {
  groups: SkillGroup[];
}

export const SkillsShowcase: React.FC<SkillsProps> = ({ groups }) => {
  return (
    <section className="px-6 py-14 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200">
          Technologies I use across frontend, backend, data, integrations, and deployment.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-900"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
