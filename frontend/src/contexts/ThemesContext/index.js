import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import themes from "../../styles/themes";

export const ThemesContext = createContext(null);

const ThemesProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    const ToggleTheme = () => {
        setTheme(theme.title === "0" ? themes.dark : themes.light);
    };

    return (
        <ThemesContext.Provider value={{ theme, toggleTheme: ToggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemesContext.Provider>
    );
};

export default ThemesProvider;
