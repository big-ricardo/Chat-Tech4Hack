import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import ThemeProvider from "./contexts/ThemesContext";
import GlobalStyle from "./styles/globalstyles";
import api from "./services/api";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";

const browserHistory = createBrowserHistory();

export default function Routes() {
    const {
        dispatch: userDispatch,
        state: { authenticated }
    } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return false;
        }

        api.post("/api/auth", null, {
            headers: {
                token: token
            }
        })
            .then(({ data }) => {
                if (data) {
                    userDispatch({
                        type: "setUser",
                        payload: {
                            authenticated: true,
                            accessToken: token,
                            ...data
                        }
                    });
                }
            })
            .catch((e) => {
                userDispatch({
                    type: "setUser",
                    payload: {
                        authenticated: false
                    }
                });
            });
    }, [userDispatch]);

    return (
        <ThemeProvider>
            <GlobalStyle />

            <Router history={browserHistory}>
                <Switch>
                    <Route path="/user" exact component={Register} />
                    <Route path="/" exact component={Index} />

                    {authenticated && (
                        <Route path="/chat" exact component={Chat} />
                    )}

                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}
