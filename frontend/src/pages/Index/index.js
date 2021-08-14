import React, { useContext } from "react";
import api from "../../services/api";
import Forms from "../../components/Forms";
import Input from "../../components/Forms/input";
import { UserContext } from "../../contexts/UserContext";

import { useHistory } from "react-router-dom";
import { H1, CardContainer, Button } from "./styles";

function App() {
    const history = useHistory();

    const { dispatch: userDispatch } = useContext(UserContext);

    async function handleSubmitLogin(inputs = []) {
        if (inputs.find((input) => input.ref.value === "")) {
            alert("Preencha todos os dados");
            return;
        }
        // eslint-disable-next-line no-sequences
        const { username, password } = inputs.reduce(
            (obj, item) => ((obj[item.name] = item.ref.value), obj),
            {}
        );

        const response = await api
            .get("/api/auth", {
                auth: {
                    username: username,
                    password: password
                }
            })
            .then(({ data }) => data)
            .catch((e) => console.error(e));

        if (response) {
            userDispatch({
                type: "setUser",
                payload: {
                    token: response.accessToken,
                    authenticated: true,
                    ...response
                }
            });

            window.location.href = "/rooms";
        }
    }

    return (
        <>
            <CardContainer
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Forms onSubmit={handleSubmitLogin}>
                    <H1 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        Sign In
                    </H1>
                    <Input name="username" />
                    <Input name="password" type="password" />
                    <Button
                        name="submit"
                        type="submit"
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Sign in
                    </Button>
                    <hr />
                    <Button
                        name="submit"
                        onClick={() => history.push("/user")}
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Sign up for free
                    </Button>
                </Forms>
            </CardContainer>
        </>
    );
}

export default App;
