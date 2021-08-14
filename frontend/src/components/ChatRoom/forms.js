import React, { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import api from "../../services/api";
import { useHistory, useParams } from "react-router-dom";
import { TapContainer, Button, Forms, TextArea } from "./styles";

export default function FormsChatRoom() {
    const history = useHistory();
    const { room_id } = useParams();
    const {
        state: { accessToken }
    } = useContext(UserContext);

    const sendMessage = async (messageText, recipient = null) => {
        if (messageText === "") {
            return;
        }

        return api
            .post(`/api/messages?token=${accessToken}`, {
                recipient: recipient,
                text: messageText,
                room_id
            }, {
                headers:{
                    "x-ms-client-principal-room": `${room_id.replace(/[0-9,-]+/g, '')}`
                }
            })
            .then((resp) => resp.data);
    };

    async function handleSubmit(inputs = []) {
        if (inputs.find((input) => input.ref.value === "")) {
            alert("Preencha todos os dados");
            return;
        }

        const data = inputs.map((input) => ({ [input.name]: input.ref.value }));

        await sendMessage(data[0].message);

        inputs.map((input) => {
            input.ref.value = "";
            return "";
        });
    }

    return (
        <>
            <TapContainer>
                <Forms onSubmit={handleSubmit}>
                    <TextArea name="message" cols={10} />
                    <Button
                        name="submit"
                        type="submit"
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Enviar Mensagem
                    </Button>
                    <hr></hr>
                    <Button
                        name="submit"
                        onClick={() => history.push("/")}
                        whileHover={{ scale: 1.05, background: "#469536" }}
                        animate={{ background: "#DA5C5C" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Sair
                    </Button>
                </Forms>
            </TapContainer>
        </>
    );
}
