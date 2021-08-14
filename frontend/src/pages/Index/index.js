import { useContext } from "react";
import { ThemesContext } from "../../contexts /ThemesContext";

import { H1 } from "./styles";

function App() {
  const { toggleTheme } = useContext(ThemesContext);

  return (
    <>
      <H1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        Hello Word!
      </H1>
      <button onClick={toggleTheme}>Tema</button>
    </>
  );
}

export default App;
