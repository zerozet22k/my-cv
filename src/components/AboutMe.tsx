import React from "react";
import { Profile } from "./Header";

interface AboutMeProps {
  color: string;
  profile: Profile;
}

const AboutMe: React.FC<AboutMeProps> = ({ profile }) => {
  return (
    <section className="bg-white px-4 py-16 md:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        <div className="flex-shrink-0">
          <img
            src={profile.imageUrl || "profile.png"}
            alt={profile.name}
            className="h-44 w-44 rounded-full object-cover shadow-md md:h-48 md:w-48"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
          <p className="max-w-3xl leading-7 text-gray-700">{profile.about}</p>

          <div className="flex flex-wrap gap-2 pt-2 text-sm font-medium text-gray-700">
            <span className="rounded-full bg-gray-100 px-3 py-1.5">Full-Stack Engineering</span>
            <span className="rounded-full bg-gray-100 px-3 py-1.5">Backend Systems</span>
            <span className="rounded-full bg-gray-100 px-3 py-1.5">Realtime Applications</span>
            <span className="rounded-full bg-gray-100 px-3 py-1.5">Systems & Simulation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
