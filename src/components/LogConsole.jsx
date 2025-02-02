// LogConsole.jsx
import React, { useState } from "react";
import { useConsole } from "./ConsoleContext";
import classes from "./LogConsole.module.css"; // Import styles

export default function LogConsole() {
  const { logs } = useConsole();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={`${classes.console} ${isVisible ? classes.visible : classes.hidden}`}>
      <button className={classes.toggleButton} onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Console" : "Show Console"}
      </button>
      <div className={classes.logContainer}>
        {logs.map((log, index) => (
          <div key={index} className={`${classes.log} ${classes[log.type]}`}>
            <strong>[{log.timestamp}]</strong> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
