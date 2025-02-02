// ConsoleContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ConsoleContext = createContext();

export const useConsole = () => useContext(ConsoleContext);

export const ConsoleProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  // Add log with timestamp, keeps max 100 logs
  const logMessage = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, { message, type, timestamp }];
      return newLogs.length > 100 ? newLogs.slice(1) : newLogs; // Keep max 100 logs
    });
  };

  useEffect(() => {
    let lastClickTime = 0;
    let lastZoomTime = 0;
    let lastPanTime = 0;
    let lastGestureTime = 0;

    // Capture ALL user clicks (debounced to prevent spam)
    const handleClick = (event) => {
      const now = Date.now();
      if (now - lastClickTime < 200) return;
      lastClickTime = now;

      // Ensure only clicks inside viewers (Point Cloud / GIS) are logged
      const viewerElement = event.target.closest("[data-viewer-type]");
      if (!viewerElement) return; // Ignore clicks outside viewer

      let elementName = event.target.tagName.toLowerCase();
      let elementClass = event.target.className || "no-class";
      logMessage(`User clicked: <${elementName}>.${elementClass}`, "info");
    };

    // Capture JavaScript runtime errors
    const handleError = (message, source, lineno, colno, error) => {
      logMessage(`⚠️ JS Error: ${message} at ${source}:${lineno}:${colno}`, "error");
      return false; // Prevent default error logging in DevTools
    };

    // Capture uncaught Promise rejections
    const handleUnhandledRejection = (event) => {
      logMessage(`⚠️ Unhandled Promise Rejection: ${event.reason}`, "error");
    };

    // Capture Zooming (Wheel Scroll)
    // const handleZoom = (event) => {
    //   const now = Date.now();
    //   if (now - lastZoomTime < 300) return;
    //   lastZoomTime = now;

    //   const direction = event.deltaY > 0 ? "Zoom Out" : "Zoom In";
    //   logMessage(`User zoomed: ${direction}`, "info");
    // };

    // Capture Panning (Mouse Drag)
    // const handlePan = (event) => {
    //   if (event.buttons !== 1) return; // Only log when dragging with left-click
    //   const now = Date.now();
    //   if (now - lastPanTime < 300) return;
    //   lastPanTime = now;

    //   logMessage(`User panned in viewer`, "info");
    // };

    // Capture Touch Gestures (Pinch & Rotate)
    // const handleGesture = (event) => {
    //   const now = Date.now();
    //   if (now - lastGestureTime < 500) return;
    //   lastGestureTime = now;

    //   logMessage(`User performed gesture: ${event.type}`, "info");
    // };

    // Add Event Listeners
    document.addEventListener("click", handleClick);
    window.onerror = handleError;
    window.addEventListener("error", (event) =>
      handleError(event.message, event.filename, event.lineno, event.colno, event.error)
    );
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // document.addEventListener("wheel", handleZoom, { passive: true });
    // document.addEventListener("mousemove", handlePan);
    // document.addEventListener("gesturestart", handleGesture);
    // document.addEventListener("gesturechange", handleGesture);
    // document.addEventListener("gestureend", handleGesture);

    return () => {
      // Remove Listeners on Unmount
      document.removeEventListener("click", handleClick);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);

      // document.removeEventListener("wheel", handleZoom);
      // document.removeEventListener("mousemove", handlePan);
      // document.removeEventListener("gesturestart", handleGesture);
      // document.removeEventListener("gesturechange", handleGesture);
      // document.removeEventListener("gestureend", handleGesture);
    };
  }, []);

  return (
    <ConsoleContext.Provider value={{ logs, logMessage }}>
      {children}
    </ConsoleContext.Provider>
  );
};
