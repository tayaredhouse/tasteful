import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* React Router's solution for Link components that carry
the state if previous scroll. Scrolls to top of page on
every navigation.   */

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}