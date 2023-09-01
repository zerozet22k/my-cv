import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import projectsData from "./projects.json";

interface ProjectProps {
	title: string;
	description: string;
	imageUrls: string[];
	projectUrl: string;
	platform: string;
	techStack?: string[];
}

const Project: React.FC<
	ProjectProps & { onSelectImage: (imageUrl: string | null) => void }
> = ({
	title,
	description,
	imageUrls,
	projectUrl,
	platform,
	techStack,
	onSelectImage,
}) => {
	return (
		<div className="p-4 md:p-6">
			{/* Images List */}
			<h2 className="text-3xl font-bold mb-8">
				Completed High Scaled Web Projects
			</h2>
			<div className="flex space-x-2 md:space-x-4 overflow-x-auto">
				{imageUrls.map((imageUrl, idx) => (
					<img
						key={idx}
						src={imageUrl}
						alt={`${title}-screenshot-${idx}`}
						onClick={() => onSelectImage(imageUrl)}
						className="w-32 md:w-48 h-32 md:h-48 object-cover rounded-md cursor-pointer hover:border-blue-400 border-2 transition"
					/>
				))}
			</div>
			<h3 className="text-lg md:text-xl mt-4 font-semibold">{title}</h3>
			<p className="text-xs md:text-sm mt-2 text-gray-700">{description}</p>
			<p className="text-xs md:text-sm mt-1 text-gray-500">
				Platform: {platform}
			</p>
			<p className="text-xs md:text-sm mt-1 text-gray-500">{techStack}</p>
			<a
				href={projectUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-500 mt-4 inline-block hover:underline"
			>
				View Project
			</a>
		</div>
	);
};

const ProjectShowcase: React.FC = () => {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		if (selectedImage) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [selectedImage]);

	return (
		<>
			<section className="py-8 md:py-16 px-2 md:px-16 bg-white">
				<Slider {...sliderSettings}>
					{projectsData.map((project, index) => (
						<Project
							key={index}
							{...project}
							onSelectImage={setSelectedImage}
						/>
					))}
				</Slider>
			</section>
			{/* Overlay */}
			{selectedImage && (
				<div
					className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-75 z-50"
					onClick={() => setSelectedImage(null)}
				>
					<div
						className="relative max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto my-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedImage}
							alt="overlay-screenshot"
							className="w-full h-auto object-contain shadow-lg rounded"
						/>
						<span
							className="absolute text-4xl sm:text-5xl md:text-6xl top-2 right-2 text-white cursor-pointer hover:text-red-500 transition duration-200"
							onClick={() => setSelectedImage(null)}
						>
							&times;
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectShowcase;
