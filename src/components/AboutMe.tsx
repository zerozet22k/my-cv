import React, { useState, useEffect } from "react";
import { Profile } from "./Header";

interface AboutMeProps {
  color: string;
  profile: Profile;
}

interface BirthdayBadgeProps {
  color: string;
  value: string;
  onClick: () => void;
  percentComplete: number;
}

const AboutMe: React.FC<AboutMeProps> = ({ color, profile }) => {
  const birthDateString = profile.birthDate || "2000-09-22";
  const birthDate: Date = new Date(birthDateString);

  const formattedBirthDate = birthDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [badgeValue, setBadgeValue] = useState<string>(formattedBirthDate);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentComplete((prev) => {
        if (prev >= 100) {
          toggleBadgeValue();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [formattedBirthDate]);

  const toggleBadgeValue = () => {
    setBadgeValue((prevValue) =>
      prevValue === formattedBirthDate
        ? `${calculateAge(birthDate)} years old`
        : formattedBirthDate
    );
  };

  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        <div className="flex-shrink-0">
          <img
            src={profile.imageUrl || "profile.jpg"}
            alt={profile.name}
            className="h-48 w-48 rounded-full shadow-md object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{profile.about}</p>
          <div className="mt-4 space-x-4 flex">
            <BirthdayBadge
              color={color}
              value={badgeValue}
              onClick={toggleBadgeValue}
              percentComplete={percentComplete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BirthdayBadge: React.FC<BirthdayBadgeProps> = ({
  color,
  value,
  onClick,
  percentComplete,
}) => {
  const width = 340;
  const height = 50;
  const strokeWidth = 2;
  const rx = 25;
  const ry = 25;

  return (
    <div
      className="w-full h-[60px] relative inline-flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg
        width={width + strokeWidth}
        height={height + strokeWidth}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <defs>
          <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${percentComplete}%`} stopColor={color} />
            <stop offset={`${percentComplete}%`} stopColor="#000" />
          </linearGradient>
        </defs>

        {/* Outline Rectangle */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width}
          height={height}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="gray"
          strokeWidth={strokeWidth}
        />

        {/* Progress Fill */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width}
          height={height}
          rx={rx}
          ry={ry}
          fill="url(#progress-gradient)"
        />

        {/* Text */}
        <text
          x="50%"
          y="50%"
          alignmentBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="16px"
          fontWeight="500"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};

const calculateAge = (birthdate: Date): number => {
  const today: Date = new Date();
  const birthYear: number = birthdate.getFullYear();
  const birthMonth: number = birthdate.getMonth();
  const birthDay: number = birthdate.getDate();

  let age: number = today.getFullYear() - birthYear;
  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }
  return age;
};

export default AboutMe;
