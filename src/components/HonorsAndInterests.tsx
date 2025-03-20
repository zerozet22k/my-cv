import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faGamepad,
  faBook,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

/* =====================================================
   Honors & Awards
===================================================== */

export interface HonorItem {
  icon: string;
  title: string;
  description: string;
}

interface HonorsProps {
  honors: HonorItem[];
}

// Mapping for Honors icons
const honorsIconMapping = {
  faTrophy: faTrophy,
  faGamepad: faGamepad,
  faBook: faBook,
  faCode: faCode,
};

export function Honors({ honors }: HonorsProps) {
  return (
    <section className="py-16 px-8 md:px-32 z-10 bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-8 text-white">
        <h2 className="text-3xl font-bold mb-8">Honors & Awards</h2>
        {honors.map((honor, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <div className="bg-blue-500 p-4 rounded-full">
              <FontAwesomeIcon
                icon={
                  honorsIconMapping[
                    honor.icon as keyof typeof honorsIconMapping
                  ]
                }
                className="text-4xl text-white"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{honor.title}</h3>
              <p className="text-white">{honor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =====================================================
   Personal Interests
===================================================== */

export interface InterestItem {
  icon: string;
  title: string;
}

interface InterestsProps {
  interests?: InterestItem[];
}

// Mapping for Interests icons
const interestsIconMapping = {
  faGamepad: faGamepad,
  faBook: faBook,
  faCode: faCode,
};

export function Interests({ interests }: InterestsProps) {
  const interestData: InterestItem[] = interests || [
    { icon: "faGamepad", title: "Gaming" },
    { icon: "faBook", title: "Reading" },
    { icon: "faCode", title: "Coding" },
  ];

  return (
    <section className="py-16 px-4 md:px-16 bg-white z-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Personal Interests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interestData.map((interest, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <FontAwesomeIcon
                icon={
                  interestsIconMapping[
                    interest.icon as keyof typeof interestsIconMapping
                  ]
                }
                className="text-6xl text-gray-500 mb-4"
              />
              <h3 className="text-xl font-semibold">{interest.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   Combined Honors & Interests Component
===================================================== */

interface HonorsAndInterestsProps {
  honors: HonorItem[];
  interests?: InterestItem[];
}

export function HonorsAndInterests({
  honors,
  interests,
}: HonorsAndInterestsProps) {
  return (
    <div>
      <Honors honors={honors} />
      <Interests interests={interests} />
    </div>
  );
}

export default HonorsAndInterests;
