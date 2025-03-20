import React, { useState, useEffect, useRef } from "react";

/** Each project has a title, description, images, a URL, and target platform(s). */
export interface Project {
  title: string;
  description: string;
  imageUrls: string[];
  projectUrl: string;
  platform: string;
}

/**
 * Props for the main ProjectShowcase component:
 * - `projects`: list of projects to display
 * - `color`: optional accent color (e.g., "#3B82F6" or "tomato")
 */
interface ProjectShowcaseProps {
  projects: Project[];
  color?: string;
}

/** Card for a single project in the grid. */
interface ProjectCardProps extends Project {
  onClick: () => void;
  accentColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrls,
  projectUrl,
  platform,
  onClick,
  accentColor = "#3B82F6",
}) => {
  const renderPlatformIcons = (platformStr: string) => {
    return platformStr.split(", ").map((pf) => {
      if (pf === "Web") {
        return (
          <span key={pf} className="inline-block mr-1">
            🌐
          </span>
        );
      } else if (pf === "Mobile") {
        return (
          <span key={pf} className="inline-block mr-1">
            📱
          </span>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow">
      {/* Image grid
      <div className="grid grid-cols-2 gap-1 p-2">
        {imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`${title} image ${idx + 1}`}
            className="w-full h-24 object-cover"
          />
        ))}
      </div> */}

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center mb-1">
            {title}
            <span className="ml-2 text-sm">
              {renderPlatformIcons(platform)}
            </span>
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="mt-3">
          {/* Mobile only: direct link */}
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: accentColor }}
            className="block lg:hidden text-white py-2 px-3 rounded-md text-center hover:opacity-90"
          >
            View Project
          </a>

          {/* Desktop only: open mini window */}
          <button
            onClick={onClick}
            style={{ backgroundColor: accentColor }}
            className="hidden lg:block text-white py-2 px-3 rounded-md hover:opacity-90"
          >
            Open Project
          </button>
        </div>
      </div>
    </div>
  );
};

/** The draggable/resizable iframe "window" that shows the project. */
interface ProjectWindowProps extends Project {
  onClose: () => void;
  accentColor?: string;
}

const ProjectWindow: React.FC<ProjectWindowProps> = ({
  projectUrl,
  title,
  onClose,
  accentColor = "#3B82F6",

  description,
  imageUrls,
  platform,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState({ width: 0, height: 0 });

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const calcInitial = () => {
      const wReduction = window.innerWidth * 0.2;
      const hReduction = window.innerHeight * 0.2;

      setSize({
        width: window.innerWidth - wReduction,
        height: window.innerHeight - hReduction,
      });
      setPosition({
        x: wReduction / 2,
        y: hReduction / 2,
      });
    };
    calcInitial();

    window.addEventListener("resize", calcInitial);
    return () => window.removeEventListener("resize", calcInitial);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.classList.contains("window-title-bar")) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initW = size.width;
    const initH = size.height;

    const handleResizeMouseMove = (evt: MouseEvent) => {
      const newW = initW + (evt.clientX - startX);
      const newH = initH + (evt.clientY - startY);
      setSize({
        width: Math.max(200, newW),
        height: Math.max(150, newH),
      });
    };

    const handleResizeMouseUp = () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
    e.stopPropagation();
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setInitialSize(size);
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setPosition({ x: 0, y: 0 });
    } else {
      setSize(initialSize);
      setPosition({
        x: (window.innerWidth - initialSize.width) / 2,
        y: (window.innerHeight - initialSize.height) / 2,
      });
    }
    setIsMaximized(!isMaximized);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  let windowStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  if (isMaximized) {
    windowStyle = {
      ...windowStyle,
      width: "100%",
      height: "100%",
      left: "0",
      top: "0",
    };
  } else if (isMinimized) {
    windowStyle = {
      ...windowStyle,
      width: `${size.width}px`,
      height: "2rem",
    };
  } else {
    windowStyle = {
      ...windowStyle,
      width: `${size.width}px`,
      height: `${size.height}px`,
    };
  }

  return (
    <div
      ref={windowRef}
      className="
        bg-white
        text-black
        rounded-lg
        shadow-2xl
        overflow-hidden
        flex
        flex-col
      "
      style={windowStyle}
    >
      {/* TITLE BAR */}
      <div
        className="
          window-title-bar
          px-3
          py-2
          flex
          justify-between
          items-center
          cursor-move
        "
        style={{ backgroundColor: accentColor, color: "#fff" }}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold truncate window-title">
          {title}
        </span>
        <div className="window-controls flex items-center space-x-2">
          <div
            className="bg-green-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={toggleMinimize}
            title="Minimize"
          />
          <div
            className="bg-yellow-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={toggleMaximize}
            title="Maximize"
          />
          <div
            className="bg-red-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={onClose}
            title="Close"
          />
        </div>
      </div>

      {/* IFRAME or minimized */}
      {!isMinimized && (
        <div className="relative flex-grow">
          <iframe
            src={projectUrl}
            title={title}
            className="w-full h-full border-none"
          />
          {/* Resize handle at bottom-right corner */}
          {!isMaximized && (
            <div
              className="absolute w-4 h-4 bg-transparent right-0 bottom-0 cursor-nwse-resize"
              onMouseDown={handleResizeMouseDown}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  color = "#3B82F6",
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
    <>
      <section className="py-8 md:py-16 px-2 md:px-16 bg-white">
        <div className="flex flex-wrap -m-2">
          {projects.map((project, idx) => (
            <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={idx}>
              <ProjectCard
                {...project}
                onClick={() => setSelectedProject(project)}
                accentColor={color}
              />
            </div>
          ))}
        </div>
      </section>
      {selectedProject && (
        <div
          className="
            fixed
            inset-0
            flex
            justify-center
            items-center
            bg-black
            bg-opacity-75
            z-50
          "
        >
          <ProjectWindow
            {...selectedProject}
            onClose={() => setSelectedProject(null)}
            accentColor={color}
          />
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;
