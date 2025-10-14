import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TimeoutId = ReturnType<typeof window.setTimeout>;

const useNavigationTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutIdsRef = useRef<TimeoutId[]>([]);

  const clearPendingTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  useEffect(() => clearPendingTimeouts, [clearPendingTimeouts]);

  const handleNavigation = useCallback(
    (to: string) => {
      if (!to || location.pathname === to) {
        return;
      }

      clearPendingTimeouts();

      const content = document.getElementById("content0");
      const footer = document.getElementById("footer");

      const addTimeout = (callback: () => void, delay: number) => {
        const timeoutId = window.setTimeout(() => {
          callback();
          timeoutIdsRef.current = timeoutIdsRef.current.filter(
            (id) => id !== timeoutId
          );
        }, delay);

        timeoutIdsRef.current.push(timeoutId);
      };

      if (content && footer) {
        const slideOutTransition =
          "opacity 0.4s ease-in, transform 0.4s ease-in";

        content.style.opacity = "0";
        content.style.transform = "translateY(-10vh)";
        content.style.transition = slideOutTransition;

        footer.style.opacity = "0";

        addTimeout(() => {
          navigate(to);
          window.scrollTo(0, 0);

          const slideInTransition =
            "opacity 0.4s ease-out, transform 0.4s ease-out";

          content.style.transform = "translateY(-10vh)";
          content.style.transition = slideInTransition;

          addTimeout(() => {
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
            footer.style.opacity = "1";
            footer.style.transform = "translateY(0)";
          }, 100);
        }, 500);
      } else {
        clearPendingTimeouts();
        navigate(to);
      }
    },
    [clearPendingTimeouts, location.pathname, navigate]
  );

  return handleNavigation;
};

export default useNavigationTransition;
