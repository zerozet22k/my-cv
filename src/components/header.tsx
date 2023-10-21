import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faStackOverflow,
	faTwitter,
	faInstagram,
	faBehance,
	faLinkedin,
	faFacebook,
	faYoutube,
	faTwitch,
	faPinterest,
	faSnapchatGhost,
	faRedditAlien,
	faTumblr,
	faDribbble,
} from "@fortawesome/free-brands-svg-icons";

import socialLinksData from "./socialLinks.json";
type SocialLink = {
	platform: string;
	icon: keyof typeof iconMapping;
	url: string;
};
const targetText = "Thi Ha Zaw";
export function Header() {
	const [displayedName, setDisplayedName] = useState("");
	const [nameIndex, setNameIndex] = useState(0);
	const [typingName, setTypingName] = useState(true);

	const [displayedTitle, setDisplayedTitle] = useState("");
	const [titleIndex, setTitleIndex] = useState(0);
	const [typingTitle, setTypingTitle] = useState(false); // Start as false

	const titleText = "Web Developer & Game Designer";
	const [showContactButton, setShowContactButton] = useState(false);
	useEffect(() => {
		if (typingName && nameIndex < targetText.length) {
			const timeout = setTimeout(() => {
				setDisplayedName((prevText) => prevText + targetText[nameIndex]);
				setNameIndex((prevIndex) => prevIndex + 1);
			}, 100); // Faster typing effect for name

			if (nameIndex === targetText.length - 1) {
				setTimeout(() => setTypingTitle(true), 500);
			}

			return () => clearTimeout(timeout);
		}
	}, [typingName, nameIndex]);

	useEffect(() => {
		if (typingTitle && titleIndex < titleText.length) {
			const timeout = setTimeout(() => {
				setDisplayedTitle((prevText) => prevText + titleText[titleIndex]);
				setTitleIndex((prevIndex) => prevIndex + 1);
			}, 50); // Faster typing effect for title

			if (titleIndex === titleText.length - 1) {
				setTimeout(() => setShowContactButton(true), 500);
			}

			return () => clearTimeout(timeout);
		}
	}, [typingTitle, titleIndex]);
	useEffect(() => {
        document.title = displayedName || "Thi Ha Zaw";
    }, [displayedName]);
	const socialLinks: SocialLink[] = socialLinksData as SocialLink[];
	return (
		<header className="h-screen text-white w-full px-4">
			<div className="flex flex-col items-center justify-center h-full space-y-8">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
					{displayedName}
				</h1>
				<h2 className="text-xl md:text-2xl lg:text-3xl">{displayedTitle}</h2>
				{showContactButton ? (
					<a
						href="mailto:catyx2292000@gmail.com"
						className="border p-4 rounded contact-button text-xl md:text-2xl lg:text-3xl transition-all duration-500 ease-in-out transform scale-100 opacity-100 hover:-translate-y-1 hover:scale-110"
					>
						Get in Touch
					</a>
				) : (
					<a
						href="mailto:catyx2292000@gmail.com"
						className="border p-4 rounded contact-button text-xl md:text-2xl lg:text-3xl transition-all duration-500 ease-in-out transform scale-90 opacity-0"
					>
						Get in Touch
					</a>
				)}

				<div className="flex flex-wrap justify-center items-center">
					{socialLinks.map((link) => (
						<a
							key={link.platform}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="m-4 text-4xl md:text-2xl lg:text-2xl group transition duration-300 "
						>
							<FontAwesomeIcon
								className="group-hover:text-red-500 "
								icon={iconMapping[link.icon]}
							/>
						</a>
					))}
				</div>
			</div>
		</header>
	);
}

const iconMapping = {
	faGithub,
	faStackOverflow,
	faTwitter,
	faInstagram,
	faBehance,
	faLinkedin,
	faFacebook,
	faYoutube,
	faTwitch,
	faPinterest,
	faSnapchatGhost,
	faRedditAlien,
	faTumblr,
	faDribbble,
};
