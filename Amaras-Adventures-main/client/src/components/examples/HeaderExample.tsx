import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header
        stars={7}
        totalStars={15}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    </div>
  );
}
