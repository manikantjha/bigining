import React, { useEffect, useState } from "react";

const MoveToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isVisible = scrollY > 300;
    setIsVisible(isVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-8 right-8 p-3 bg-accentDark text-white rounded-full shadow-lg transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      aria-label="Move to Top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default MoveToTopButton;
