import ReactDOM from "react-dom";
import UserProvider from "./contexts/UserContext";
import Routes from "./routes";


ReactDOM.render(<UserProvider><Routes /></UserProvider>, document.getElementById("root"));
