import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Forms from "../../components/Forms";
import TextArea from "../../components/Forms/textarea";
import Message from "../../components/Message";
import { UserContext } from "../../contexts/UserContext";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { CardContainer, MsgContainer, TapContainer, Button } from "./styles";

function App() {
    const history = useHistory();
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    const scrollToFinish = useRef(null);
    const {
        state: { username, accessToken }
    } = useContext(UserContext);

    latestChat.current = chat;

    const connection = useMemo(() => {
        if (!username) {
            return null;
        }

        return new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_MYAPI_URI}/api`, {
                headers: {
                    "x-ms-client-principal-id": username
                }
            })
            .configureLogging(LogLevel.Information)
            .build();
    }, [username]);

    useMemo(() => {
        if (connection) {
            connection
                .start()
                .then((result) => {
                    console.log("Connected!", username);
                    connection.on("newMessage", (message) => {
                        if (!message.sender) {
                            message.sender = "anonymous";
                        }

                        console.log(message);

                        setChat((lastChat) => [...lastChat, message]);
                    });
                })
                .catch((e) => console.log("Connection failed: ", e));
        }
    }, [username, connection]);

    useEffect(() => {
        if (!scrollToFinish.current) {
            return;
        }

        scrollToFinish.current.scrollTop = scrollToFinish.current.scrollHeight;
    }, [chat]);

    const sendMessage = async (messageText, recipient = null) => {
        if (messageText === "") {
            return;
        }

        return api
            .post(`/api/messages?token=${accessToken}`, {
                recipient: recipient,
                text: messageText
            })
            .then((resp) => resp.data);
    };

    function handlerSignOut() {
        localStorage.removeItem("token");
        history.push("/");
    }

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
            <CardContainer>
                <MsgContainer ref={scrollToFinish}>
                    <ChatWindow chat={chat} sendMessage={sendMessage} />
                </MsgContainer>

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

                        <hr />
                        <Button
                            onClick={handlerSignOut}
                            whileHover={{ scale: 1.05, background: "#ff4040" }}
                            animate={{ background: "#DA5C5C" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Sair
                        </Button>
                    </Forms>
                </TapContainer>
            </CardContainer>
        </>
    );
}

export default App;

const ChatWindow = (props) => {
    const chat = props.chat.map((m, i) => (
        <Message
            key={Date.now() * Math.random()}
            {...m}
            sendMessage={props.sendMessage}
            index={i}
            isFinish={props.chat.length - 1}
        />
    ));
    return <>{chat}</>;
};
