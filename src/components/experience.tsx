import React from "react";

export interface Endorsement {
  name: string;
  position: string;
  company: string;
  quote: string;
}

export interface ExperienceItem {
  title: string;
  company?: string;
  dateRange: string;
  location?: string;
  responsibilities: string[];
  skillsUsed: string;
  endorsements?: Endorsement[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section className="py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold mb-8 text-white">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow space-y-4">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p className="text-sm text-gray-700 italic">
              {exp.company ? `${exp.company}, ` : ""}
              {exp.dateRange}
              {exp.location ? ` · ${exp.location}` : ""}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {exp.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="font-semibold">Skills Used:</p>
            <p>{exp.skillsUsed}</p>
            {exp.endorsements && (
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h4 className="text-lg font-semibold">Endorsements:</h4>
                {exp.endorsements.map((endorsement, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="font-medium my-2 underline">
                      {endorsement.name}, {endorsement.position}
                      {endorsement.company ? `, ${endorsement.company}` : ""}
                    </p>
                    <p className="text-gray-700">“{endorsement.quote}”</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
