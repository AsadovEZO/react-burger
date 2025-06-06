import { useState, useEffect, RefObject } from "react";
import { TActiveTab } from "../utils/types";

type TDistances = { type: TActiveTab; top: number }[];

const useScrollSection = (
  containerRef: RefObject<HTMLElement>,
  bunRef: RefObject<HTMLElement>,
  sauceRef: RefObject<HTMLElement>,
  mainRef: RefObject<HTMLElement>
) => {
  const [activeTab, setActiveTab] = useState<TActiveTab>("bun");

  const scrollToSection = (type: TActiveTab) => {
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

      const distances: TDistances = [
        { type: "bun", top: bunTop },
        { type: "sauce", top: sauceTop },
        { type: "main", top: mainTop },
      ];

      const nearest: TActiveTab = distances
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

export default useScrollSection;
