import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Message from "../../components/Message";
import { UserContext } from "../../contexts/UserContext";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { MsgContainer } from "./styles";

function App() {
    const [chat, setChat] = useState([]);
    const { room_id } = useParams();
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
                    "x-ms-client-principal-id": username,
                    "x-ms-client-principal-room_id": room_id
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

    return (
        <>
            <MsgContainer ref={scrollToFinish}>
                <ChatWindow chat={chat} sendMessage={sendMessage} />
            </MsgContainer>
        </>
    );
}

export default App;

const ChatWindow = (props) => {
    const chat = props.chat.map((m, i) => (
        <Message
            key={Date.now() * Math.random()}
            sendMessage={props.sendMessage}
            index={i}
            isFinish={props.chat.length - 1}
            {...m}
        />
    ));
    return <>{chat}</>;
};
