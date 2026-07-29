import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    fetch(`/log-nav?path=${encodeURIComponent(location.pathname)}`, {
      method: "GET",
    }).catch(() => {});
  }, [location]);

  return null;
};

export default RouteLogger;
