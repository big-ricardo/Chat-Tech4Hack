import ReactDOM from "react-dom";
import UserProvider from "./contexts/UserContext";
import Routes from "./routes";

require("dotenv").config();

ReactDOM.render(
    <UserProvider>
        <Routes />
    </UserProvider>,
    document.getElementById("root")
);
