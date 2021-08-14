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
                            <strong>{props.sender}</strong>:
                        </p>
                        <p>{props.text}</p>
                    </Message>
                </MsgContainer>
            ) : (
                <MsgContainerUser>
                    <Message lastElement={props.index === props.isFinish}>
                        <p>
                            <strong>{props.sender}</strong>:
                        </p>
                        <p>{props.text}</p>
                    </Message>
                </MsgContainerUser>
            )}
        </>
    );
};

export default MessageComponent;
