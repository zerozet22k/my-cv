import React, { useState, useEffect, useRef } from "react";

export interface Skill {
  name: string;
  proficiency: number; // Expected value between 0 and 100.
  src: string;
}

/**
 * Returns a qualitative proficiency label based on the numeric value.
 */
function getProficiencyLabel(proficiency: number): string {
  if (proficiency < 50) return "Novice";
  if (proficiency < 70) return "Intermediate";
  if (proficiency < 90) return "Proficient";
  return "Expert";
}

/**
 * Custom hook to animate a value from 0 to the target over the specified duration.
 */
function useAnimatedProficiency(target: number, duration = 1000): number {
  const [value, setValue] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(progress * target);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [target, duration]);

  return value;
}

interface SkillCardProps {
  skill: Skill;
  color: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, color }) => {
  const animatedProficiency = useAnimatedProficiency(skill.proficiency, 1000);

  return (
    <div
      className="
        rounded-lg p-6 border border-gray-600 shadow-sm
        transform transition duration-300 hover:scale-105
        bg-transparent
      "
    >
      {/* Icon, Skill Name, and Proficiency Label */}
      <div className="flex items-center mb-4">
        <img
          src={skill.src}
          alt={skill.name}
          className="w-12 h-12 mr-4 object-contain"
        />
        <div>
          <h3 className="text-xl font-bold text-white">{skill.name}</h3>
          <p className="text-sm text-gray-200">
            {getProficiencyLabel(skill.proficiency)}
          </p>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-4 bg-gray-800/80 rounded-full overflow-hidden">
        <div
          className="
            h-full
            bg-white/80
            transition-all duration-500 ease-in-out
          "
          style={{ width: `${animatedProficiency}%`,}}
        />
      </div>
    </div>
  );
};

interface SkillsProps {
  skills: Skill[];
  color: string;
}

export const SkillsShowcase: React.FC<SkillsProps> = ({ skills, color }) => {
  const sortedSkills = [...skills].sort(
    (a, b) => b.proficiency - a.proficiency
  );

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">
          My Technical Skills
        </h2>
        <p className="text-gray-200 mb-10">
          A showcase of my expertise with various tools and technologies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} color={color} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
