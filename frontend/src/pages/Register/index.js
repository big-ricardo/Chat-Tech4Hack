import React from "react";

import api from "../../services/api";

import Forms from "../../components/Forms";
import Input from "../../components/Forms/input";
import { useHistory } from "react-router-dom";

import { H1, CardContainer, Button } from "./styles";
import { GlobalStyle } from "../../styles/globalstyles";

function App() {
    const history = useHistory();

    async function handleSubmitRegister(inputs = []) {
        if (inputs.find((input) => input.ref.value === "")) {
            alert("Preencha todos os dados");
            return;
        }
        // eslint-disable-next-line no-sequences
        const { name, username, password, email } = inputs.reduce(
            (obj, item) => ((obj[item.name] = item.ref.value), obj),
            {}
        );

        console.log(name, username, password, email);

        const response = await api
            .post("/api/user", {
                name,
                username,
                password,
                email
            })
            .then(({ data }) => data)
            .catch((e) => console.error(e));

        if (response) {
            history.push("/");
        }
    }

    return (
        <>
            <GlobalStyle />
            <CardContainer
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Forms onSubmit={handleSubmitRegister}>
                    <H1 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        Make an account
                    </H1>
                    <Input name="name" />
                    <Input name="username" />
                    <Input name="password" type="password" />
                    <Input name="email" />
                    <Button
                        name="submit"
                        type="submit"
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Sign up
                    </Button>
                    <hr />
                    <Button
                        name="submit"
                        type="submit"
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => history.push("/")}
                    >
                        Already have an account? Sign in
                    </Button>
                </Forms>
            </CardContainer>
        </>
    );
}

export default App;
