import styled from "styled-components";
import { motion } from "framer-motion";

import FormsAPI from "../../components/Forms";
import TextAreaAPI from "../../components/Forms/textarea";

export const MsgContainer = styled(motion.div)`
    width: 100%;
    padding: 10px;
    height: 90vh;
    overflow-y: scroll;
    background-color: azure;
    scroll-behavior: smooth;
`;

export const TapContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;

    hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #263238;
        width: 100%;
    }
    a {
        font-size: 16;
        font-weight: bold;
        color: #263238;
        text-decoration: none;
        align-items: center;
    }
`;

export const Button = styled(motion.button)`
    color: #fff;
    font-size: 16px;
    background: #da5c5c;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
`;


export const Forms = styled(FormsAPI)`
    flex-direction: column;
`;

export const TextArea = styled(TextAreaAPI)``;
