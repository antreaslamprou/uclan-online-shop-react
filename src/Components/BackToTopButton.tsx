import React, { useState, useEffect } from "react";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top position-fixed badge rounded-circle fs-3 bg-primary text-white border-0 btn"
      aria-label="Scroll to top"
      style={{
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
