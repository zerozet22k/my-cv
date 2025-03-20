import React from "react";
import { SocialLink, SocialMediaIcons } from "./SocialMediaIcons";

interface FooterProps {
  social: SocialLink[];
}

export function Footer({ social }: FooterProps) {
  // Optionally, you could filter out any invalid platforms here.
  const filteredSocial = social.filter((item) => !!item.platform);

  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 text-white">
          <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
          <p>Follow me on my social media platforms.</p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-4 text-white">
          <SocialMediaIcons socialLinks={filteredSocial} iconSize="lg" />
        </div>

        <div className="text-white">
          <p>
            &copy; {new Date().getFullYear()} Thi Ha Zaw[Zet]. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
