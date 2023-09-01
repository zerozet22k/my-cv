import React, { useState, useEffect } from "react";

interface BirthdayBadgeProps {
	value: string;
	onClick: () => void;
	percentComplete: number;
}

const Summary: React.FC = () => {
	const birthDate: Date = new Date("2000-09-22");
	const [badgeValue, setBadgeValue] = useState<string>("September 22, 2000");
	const [percentComplete, setPercentComplete] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPercentComplete((prev) => {
				if (prev >= 100) {
					toggleBadgeValue();
					return 0;
				}
				return prev + 1; // Smaller increment to make it smoother
			});
		}, 50); // Reduced interval time for smoother transitions

		return () => clearInterval(interval);
	}, []);

	const toggleBadgeValue = () => {
		setBadgeValue((prevValue) =>
			prevValue === "September 22, 2000"
				? `${calculateAge(birthDate)} years old`
				: "September 22, 2000"
		);
	};

	return (
		<section className="py-16 px-4 md:px-16 bg-white">
			<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
				<div className="flex-shrink-0">
					<img
						src="profile.jpg"
						alt="Thi Ha Zaw"
						className="h-48 w-48 rounded-full shadow-md object-cover"
					/>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">About Me</h2>
					<p className="text-gray-700 leading-relaxed">
						A passionate software development engineer with extensive experience
						in web development. Invited to participate in Google&apos;s Foobar
						challenge. Skilled in a wide range of web development tools and
						languages with a focus on user interface design, responsiveness, and
						game development.
					</p>
					<div className="mt-4 space-x-4 flex">
						<BirthdayBadge
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
	value,
	onClick,
	percentComplete,
}) => {
	const strokeWidth = 2;
	const width = 280;
	const height = 40;
	const rx = 20;
	const ry = 20;
	const length = 2 * (width + height) - 8 * rx;

	return (
		<div
			className="w-full h-20 relative inline-flex items-center justify-center cursor-pointer"
			onClick={onClick}
		>
			<svg
				width={width + 4}
				height={height + 4}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<defs>
					<linearGradient
						id="progress-gradient"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
					>
						<stop
							offset={`${percentComplete}%`}
							stopColor="gray"
						/>
						<stop
							offset={`${percentComplete}%`}
							stopColor="#0d47a1"
						/>
					</linearGradient>
				</defs>
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
				<rect
					x={strokeWidth / 2}
					y={strokeWidth / 2}
					width={width}
					height={height}
					rx={rx}
					ry={ry}
					fill="url(#progress-gradient)"
				/>
				<text
					x="50%"
					y="50%"
					dy=".3em"
					textAnchor="middle"
					fill="white"
					fontSize="14px"
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

export default Summary;
