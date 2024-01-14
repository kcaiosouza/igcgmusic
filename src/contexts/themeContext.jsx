import { useState, createContext, useContext } from "react";

export const ThemeContext = createContext({});

export function ThemeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  function toggleTheme() {
    setIsDark(!isDark)
  }

  return(
    <ThemeContext.Provider value={{
      toggleTheme,
      isDark
    }}>
      { children }
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
