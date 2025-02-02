// ConsoleContext.jsx
import React, { createContext, useContext, useState } from "react";

const ConsoleContext = createContext();

export const useConsole = () => useContext(ConsoleContext);

export const ConsoleProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const logMessage = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [...prevLogs, { message, type, timestamp }]);
  };

  return (
    <ConsoleContext.Provider value={{ logs, logMessage }}>
      {children}
    </ConsoleContext.Provider>
  );
};
