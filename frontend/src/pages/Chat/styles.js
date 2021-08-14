import styled from "styled-components";
import { motion } from "framer-motion";

export const CardContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    background-color: azure;
    height: 100vh;
    justify-content: left;
    flex-direction: row-reverse;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
    button {
        color: #fff;
        font-size: 16px;
        background: #da5c5c;
        height: 56px;
        border: 0;
        border-radius: 5px;
        width: 100%;
    }
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

export const TapContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 25px;
    justify-content: left;

    form {
        height: 80vh;
    }
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

export const MsgContainer = styled(motion.div)`
    width: 100%;
    padding: 10px;
    height: 90vh;
    overflow-y: scroll;
    background-color: azure;
    scroll-behavior: smooth;
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
