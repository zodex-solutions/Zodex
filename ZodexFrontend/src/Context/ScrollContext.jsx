// ScrollContext.jsx
import { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [isAtTop, setIsAtTop] = useState(false);
  return (
    <ScrollContext.Provider value={{ isAtTop, setIsAtTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
