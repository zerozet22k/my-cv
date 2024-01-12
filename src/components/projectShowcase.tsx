import React, { useState, useEffect, useRef } from "react";
import projectsData from "./projects.json";

interface Project {
  title: string;
  description: string;
  imageUrls: string[];
  projectUrl: string;
  platform: string;
}

const ProjectCard: React.FC<Project & { onClick: () => void }> = ({
  title,
  description,
  imageUrls,
  projectUrl,
  platform,
  onClick,
}) => {
  const renderPlatformIcons = (platform: string) => {
    const platforms = platform.split(", ");
    return platforms.map((pf) => {
      if (pf === "Web") {
        return (
          <span key={pf} className="inline-block mr-2">
            🌐
          </span>
        );
      } else if (pf === "Mobile") {
        return (
          <span key={pf} className="inline-block mr-2">
            📱
          </span>
        );
      }
    });
  };

  return (
    <div className="flex flex-col bg-white shadow-xl border rounded-lg overflow-hidden h-full">
      <div className="grid grid-cols-2 gap-2 p-2">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${title} image ${index + 1}`}
            className="object-cover w-full"
            style={{ height: "100px" }}
          />
        ))}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold">
            {title} {renderPlatformIcons(platform)}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block lg:hidden mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            View Project
          </a>
          <button
            onClick={onClick}
            className="hidden lg:block mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Open Project in Mini Program
          </button>
        </div>
      </div>
    </div>
  );
};
const ProjectWindow: React.FC<Project & { onClose: () => void }> = ({
  projectUrl,
  title,
  description,
  onClose,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.classList.contains("window-title-bar")) {
      return;
    }
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  useEffect(() => {
    const calculateSize = () => {
      const widthReduction = window.innerWidth * 0.2;
      const heightReduction = window.innerHeight * 0.2;
      setSize({
        width: window.innerWidth - widthReduction,
        height: window.innerHeight - heightReduction,
      });

      setPosition({
        x: widthReduction / 2,
        y: heightReduction / 2,
      });
    };

    calculateSize();

    window.addEventListener("resize", calculateSize);

    return () => window.removeEventListener("resize", calculateSize);
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

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const handleResizeMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX - startX + size.width;
      const newHeight = e.clientY - startY + size.height;
      setSize({
        width: Math.max(100, newWidth),
        height: Math.max(100, newHeight),
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
      setInitialSize(size); // Save the current size before maximizing
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setPosition({ x: 0, y: 0 });
    } else {
      setSize(initialSize); // Restore the previous size
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

  let windowStyle: React.CSSProperties = isMinimized
    ? {
        width: `${size.width}px`,
        height: "30px", // Height of the title bar when minimized
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
      }
    : {
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
        display: "block",
      };

  if (isMaximized) {
    windowStyle = {
      ...windowStyle,
      width: "100%",
      height: "100%",
      left: "0",
      top: "0",
    };
  }

  return (
    <div
      className="webView bg-gray-300 rounded-xl overflow-hidden shadow-md"
      ref={windowRef}
      style={windowStyle}
    >
      <div
        className="window-title-bar bg-indigo-500 text-white p-2 rounded-t-xl flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="window-title text-xs">{title}</span>
        <div className="window-controls flex space-x-2">
          <div
            className="maximize-btn bg-green-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={toggleMinimize}
          ></div>
          <div
            className="minimize-btn bg-yellow-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={toggleMaximize}
          ></div>
          <div
            className="close-btn bg-red-500 w-3 h-3 rounded-full cursor-pointer"
            onClick={onClose}
          ></div>
        </div>
      </div>
      {!isMinimized && (
        <>
          <iframe
            src={projectUrl}
            title={title}
            className="h-full w-full"
          ></iframe>
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              width: "20px",
              height: "20px",
              cursor: "nwse-resize",
            }}
          ></div>
        </>
      )}
    </div>
  );
};

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <>
      <section className="py-8 md:py-16 px-2 md:px-16 bg-white">
        <div className="flex flex-wrap -m-2">
          {projectsData.map((project, index) => (
            <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={index}>
              <ProjectCard
                {...project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Display selected project window */}
      {selectedProject && (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-75 z-50">
          <ProjectWindow
            projectUrl={selectedProject.projectUrl}
            title={selectedProject.title}
            description={selectedProject.description}
            imageUrls={selectedProject.imageUrls}
            platform={selectedProject.platform}
            onClose={() => setSelectedProject(null)}
          />
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;
