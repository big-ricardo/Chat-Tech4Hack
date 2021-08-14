import React from "react";

import ChatRoom from "../../components/ChatRoom";
import Forms from "../../components/ChatRoom/forms";

import { CardContainer, ChatWindow } from "./styles";

function App() {
    return (
        <>
            <CardContainer>
                <ChatWindow>
                    <ChatRoom />
                    <Forms />
                </ChatWindow>
            </CardContainer>
        </>
    );
}

export default App;
