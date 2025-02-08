import React, { useState } from "react";
import { Palette } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const themes = [
  { name: "light", label: "light" },
  { name: "dark", label: "dark" },
];

const ThemeSelector = () => {
  const [showThemes, setShowThemes] = useState(false);
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowThemes(!showThemes)}
        className={`cursor-pointer flex items-center space-x-2 p-2 rounded-md ${
          showThemes ? "bg-blue-800/10" : ""
        }`}
      >
        <Palette className="size-6" /> 
      </button>

      {showThemes && (
        <div className="absolute z-50 top-10 left-[-10px] bg-primary/10 shadow-lg rounded-md w-32 p-2">
          {themes.map((themeOption, index) => (
            <button
              key={index}
              onClick={() => setTheme(themeOption.name)}
              className={`block mb-2 w-full text-left px-2 py-1 rounded-full ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-blue-100 hover:text-black"
              }`}
            >
              {themeOption.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
