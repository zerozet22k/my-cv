import React, { useState, useEffect } from "react";

interface SkillBarProps {
	skill: string;
	proficiency: number; // 0-100%
}
const skillset = [
	{ name: "JavaScript", proficiency: 95 },
	{ name: "HTML/HTML5", proficiency: 90 },
	{ name: "CSS/SASS", proficiency: 85 },
	{ name: "MYSQL", proficiency: 80 },
	{ name: "PHP", proficiency: 75 },
	{ name: "C++", proficiency: 10 },
	{ name: "C#", proficiency: 10 },
	{ name: "Next.js", proficiency: 95 },
	{ name: "React.js", proficiency: 90 },
	{ name: "Vue.js", proficiency: 80 },
	{ name: "Bootstrap", proficiency: 85 },
	{ name: "Tailwind CSS", proficiency: 100 },
	{ name: "Node.js", proficiency: 75 },
	{ name: "Unity", proficiency: 50 },
	{ name: "Unreal Engine 4", proficiency: 5 },
	{ name: "AWS", proficiency: 25 },
];
const SkillBar: React.FC<SkillBarProps> = ({ skill, proficiency }) => {
    const [displayProficiency, setDisplayProficiency] = useState<number>(0);

    useEffect(() => {
        const animateProficiency = () => {
            let start: number;

            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / 1000, 1); // Adjust the divisor for speed. Smaller = slower.

                setDisplayProficiency(progress * proficiency);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        };

        animateProficiency();
    }, [proficiency]);

    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-white">
                        {skill}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-lg font-semibold inline-block text-white">
                        {Math.round(displayProficiency)}%
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
                <div
                    style={{ width: `${displayProficiency}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-1000 ease-in-out"
                ></div>
            </div>
        </div>
    );
};

export const Skills: React.FC = () => {
    const sortedSkills = skillset.sort((a, b) => b.proficiency - a.proficiency);
    return (
        <section className="py-16 px-8 md:px-32">
            <div className="max-w-7xl mx-auto space-y-12">
                <h2 className="text-3xl font-bold mb-8 text-white">Technical Skills</h2>
                {sortedSkills.map((skillObj, index) => (
                    <SkillBar
                        key={index}
                        skill={skillObj.name}
                        proficiency={skillObj.proficiency}
                    />
                ))}
            </div>
        </section>
    );
};

export default Skills;