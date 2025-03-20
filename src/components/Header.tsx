import React, { useEffect, useState } from "react";
import { SocialMediaIcons, SocialLink } from "./SocialMediaIcons";

export interface Profile {
  name: string;
  title: string;
  email: string;
  birthDate: string;
  imageUrl: string;
  about: string;
}

interface HeaderProps {
  color: string;
  profile: Profile;
  social: SocialLink[];
}

export function Header({ color, profile, social }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const [displayedName, setDisplayedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [typingName, setTypingName] = useState(true);

  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [typingTitle, setTypingTitle] = useState(false);

  const [showContactButton, setShowContactButton] = useState(false);

  const targetText = profile.name;
  const titleText = profile.title;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typingName && nameIndex < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayedName((prev) => prev + targetText[nameIndex]);
        setNameIndex((prev) => prev + 1);
      }, 100);
      if (nameIndex === targetText.length - 1) {
        setTimeout(() => setTypingTitle(true), 500);
      }
      return () => clearTimeout(timeout);
    }
  }, [typingName, nameIndex, targetText]);

  useEffect(() => {
    if (typingTitle && titleIndex < titleText.length) {
      const timeout = setTimeout(() => {
        setDisplayedTitle((prev) => prev + titleText[titleIndex]);
        setTitleIndex((prev) => prev + 1);
      }, 50);
      if (titleIndex === titleText.length - 1) {
        setTimeout(() => setShowContactButton(true), 500);
      }
      return () => clearTimeout(timeout);
    }
  }, [typingTitle, titleIndex, titleText]);

  useEffect(() => {
    document.title = displayedName || profile.name;
  }, [displayedName, profile.name]);

  return (
    <>
      {scrolled && (
        <header
          className="fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300"
          style={{ backgroundColor: color }}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white">
                {displayedName || profile.name}
              </h1>
              {(scrolled || titleIndex >= titleText.length) && (
                <span className="hidden md:block text-sm text-gray-300">
                  {displayedTitle || profile.title}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-white">
              <SocialMediaIcons socialLinks={social} iconSize="1x" />
            </div>
          </div>
        </header>
      )}

      <section className="h-screen text-white w-full px-4">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {displayedName}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl">{displayedTitle}</h2>
          {showContactButton ? (
            <a
              href={`mailto:${profile.email}`}
              className="border p-4 rounded contact-button text-xl md:text-2xl lg:text-3xl transition-all duration-500 ease-in-out transform scale-100 opacity-100 hover:-translate-y-1 hover:scale-110"
            >
              Get in Touch
            </a>
          ) : (
            <a
              href={`mailto:${profile.email}`}
              className="border p-4 rounded contact-button text-xl md:text-2xl lg:text-3xl transition-all duration-500 ease-in-out transform scale-90 opacity-0"
            >
              Get in Touch
            </a>
          )}

          <div className="flex flex-wrap justify-center items-center">
            <SocialMediaIcons
              socialLinks={social}
              iconSize="2x"
              extraClasses="m-4 group transition duration-300"
            />
          </div>
        </div>
      </section>
    </>
  );
}
