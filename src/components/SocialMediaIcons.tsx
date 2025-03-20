import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
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

export type SocialLink = {
  platform: string;
  url: string;
};

const iconMapping = {
  GitHub: faGithub,
  StackOverflow: faStackOverflow,
  Twitter: faTwitter,
  Instagram: faInstagram,
  Behance: faBehance,
  LinkedIn: faLinkedin,
  Facebook: faFacebook,
  YouTube: faYoutube,
  Twitch: faTwitch,
  Pinterest: faPinterest,
  Snapchat: faSnapchatGhost,
  Reddit: faRedditAlien,
  Tumblr: faTumblr,
  Dribbble: faDribbble,
};

const getIcon = (platform: string) =>
  iconMapping[platform as keyof typeof iconMapping] || faGithub;

type SocialMediaIconsProps = {
  socialLinks: SocialLink[];
  iconSize?: SizeProp;
  extraClasses?: string;
};

export function SocialMediaIcons({
  socialLinks,
  iconSize = "lg",
  extraClasses = "transition duration-300 hover:text-red-500",
}: SocialMediaIconsProps) {
  return (
    <>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.platform}
          className={extraClasses}
        >
          <FontAwesomeIcon icon={getIcon(link.platform)} size={iconSize} />
        </a>
      ))}
    </>
  );
}
