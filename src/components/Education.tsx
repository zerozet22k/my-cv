import React from "react";

export interface EducationItem {
  institution: string;
  date: string;
  qualification: string;
  skills: string;
  iconText: string;
}

interface EducationProps {
  education: EducationItem[];
}

const currentEducation: EducationItem[] = [
  {
    institution: "Stamford International University",
    date: "Jul 2026 - Present",
    qualification: "Computer Science — Current Undergraduate Student",
    skills: "Computer Science, Programming, Mathematics, Information Systems",
    iconText: "SIU",
  },
  {
    institution: "University of Greenwich",
    date: "Jun 2026 - Present",
    qualification: "BSc (Hons) Computing — Final Year Top-up (Level 6)",
    skills: "Computing, Software Development, Systems, Final-Year Project Work",
    iconText: "UoG",
  },
  {
    institution: "NCC Education",
    date: "Completed",
    qualification: "Level 4 & Level 5 Diplomas in Computing",
    skills: "Programming, Web Development, Databases, Networking, Systems Analysis",
    iconText: "NCC",
  },
];

export function Education({ education: _education }: EducationProps) {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        {currentEducation.map((edu, index) => (
          <div key={`${edu.institution}-${index}`} className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">
                  {edu.iconText}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold">{edu.institution}</h4>
              <p className="text-gray-600">{edu.date}</p>
              <p className="text-gray-600">{edu.qualification}</p>
              <p className="text-gray-700">Focus: {edu.skills}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
