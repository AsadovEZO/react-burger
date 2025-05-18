import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useScrollSection = (containerRef, bunRef, sauceRef, mainRef) => {
  const [activeTab, setActiveTab] = useState("bun");

  const scrollToSection = (type) => {
    setActiveTab(type);
    if (type === "bun") bunRef.current?.scrollIntoView({ behavior: "smooth" });
    if (type === "sauce")
      sauceRef.current?.scrollIntoView({ behavior: "smooth" });
    if (type === "main")
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;

      const bunTop = bunRef.current.getBoundingClientRect().top - containerTop;
      const sauceTop =
        sauceRef.current.getBoundingClientRect().top - containerTop;
      const mainTop =
        mainRef.current.getBoundingClientRect().top - containerTop;

      const distances = [
        { type: "bun", top: bunTop },
        { type: "sauce", top: sauceTop },
        { type: "main", top: mainTop },
      ];

      const nearest = distances
        .filter((distance) => distance.top <= 1)
        .sort((a, b) => b.top - a.top)[0].type;
      setActiveTab(nearest);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, bunRef, sauceRef, mainRef]);

  return { activeTab, scrollToSection };
};

useScrollSection.propTypes = {
  containerRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
  bunRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
  sauceRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
  mainRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
};

export default useScrollSection;
