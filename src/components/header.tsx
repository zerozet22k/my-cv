import React from "react";
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
	faDribbble
  } from "@fortawesome/free-brands-svg-icons";
  
import socialLinksData from './socialLinks.json';
type SocialLink = {
	platform: string;
	icon: keyof typeof iconMapping;
	url: string;
};

export function Header() {
	const socialLinks: SocialLink[] = socialLinksData as SocialLink[];
	return (
		<header className="relative h-screen text-white">
			<div className="relative z-10 flex flex-col items-center justify-center h-full z-[20]">
				<h1 className="text-6xl font-bold mb-4">Thi Ha Zaw</h1>
				<h2 className="text-3xl mb-6">Web Developer & Game Designer</h2>

				{/* Social Links */}
				<div className="mt-6 flex space-x-8">
					{socialLinks.map((link) => (
						<a
							key={link.platform}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-2xl hover:text-gray-400 transition duration-300"
						>
							<FontAwesomeIcon icon={iconMapping[link.icon]} />
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
	faDribbble
};
