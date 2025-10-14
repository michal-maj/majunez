import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./PageTransition.css";

interface PageTransitionProps {
  children: ReactNode;
}

const TRANSITION_DURATION = 500;

type TransitionStage = "fadeIn" | "fadeOut";

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] =
    useState<TransitionStage>("fadeIn");
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(children);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
    }
  }, [location.pathname, displayLocation.pathname]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timer = window.setTimeout(() => {
        setDisplayLocation(location);
        setCurrentChildren(children);
        setTransitionStage("fadeIn");
      }, TRANSITION_DURATION);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [transitionStage, location, children]);

  useEffect(() => {
    if (
      transitionStage === "fadeIn" &&
      location.pathname === displayLocation.pathname
    ) {
      setCurrentChildren(children);
    }
  }, [children, transitionStage, location.pathname, displayLocation.pathname]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      <div className="page-content">{currentChildren}</div>
    </div>
  );
};

export default PageTransition;
