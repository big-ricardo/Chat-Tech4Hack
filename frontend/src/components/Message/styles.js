import styled from "styled-components";
import { motion } from "framer-motion";

export const MsgContainer = styled.div`
    display: flex;
    flex: 1;
    width: 98%;

    div {
        border-radius: 0px 50px 20px 40px;
        cursor: pointer;
        padding: 20px;
        margin-bottom: 10px;
        height: min-content;
        max-width: 50%;
        background-color: ${(props) =>
            props.backgroundColor ? props.backgroundColor : "aqua"};
        p {
            padding: 5px;
        }
        label {
            font-size: 10px;
            color: red;
        }
    }
    &:last-child {
        margin-bottom: 20px;
    }
`;

export const MsgContainerUser = styled(MsgContainer)`
    flex-direction: row-reverse;
    div {
        background-color: aquamarine;
        cursor: initial;
        border-radius: 40px 10px 50px 20px;
    }
`;

export const Message = styled(motion.div).attrs(({ lastElement }) => ({
    initial: lastElement
        ? {
              opacity: 0,
              y: -50,
              x: -50
          }
        : null,
    animate: lastElement
        ? {
              opacity: 1,
              y: 0,
              x: 0
          }
        : null,
    transition: lastElement ? { duration: 1 } : null
}))``;
