import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MsgContainer, MsgContainerUser, Message } from "./styles";

const MessageComponent = (props) => {
    const {
        state: { username }
    } = useContext(UserContext);

    return (
        <>
            {username !== props.sender ? (
                <MsgContainer
                    backgroundColor={props.isPrivate ? "#00cccc" : null}
                >
                    <Message
                        lastElement={props.index === props.isFinish}
                        onClick={() =>
                            props.sendMessage(
                                prompt("Qual a mensagem para " + props.sender),
                                props.sender
                            )
                        }
                    >
                        {props.isPrivate && <label>Mensagem Privada</label>}
                        <p>
                        <label>
                            {/* { score: 0, label: 'NEUTRAL' } */}
                            Sentimento: {props.sentiments.label}
                        </label>
                        </p>
                        <p>
                            <strong>{props.sender}</strong>:
                        </p>
                        <p>{props.text}</p>
                    </Message>
                </MsgContainer>
            ) : (
                <MsgContainerUser>
                    <Message lastElement={props.index === props.isFinish}>
                        <label>
                            {/* { score: 0, label: 'NEUTRAL' } */}
                            Sentimento: {props.sentiments.label}
                        </label>
                        <p>
                            <strong>{props.sender}</strong>:
                        </p>

                        {props.isPrivate && <label>Mensagem Privada</label>}

                        <p>{props.text}</p>
                    </Message>
                </MsgContainerUser>
            )}
        </>
    );
};

export default MessageComponent;
