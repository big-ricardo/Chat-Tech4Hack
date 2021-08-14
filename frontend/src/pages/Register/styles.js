import styled from "styled-components";
import { motion } from "framer-motion";

export const H1 = styled(motion.h1)`
    color: #da5c5c;
    margin-bottom: 15px;
    border: 1px solid #da5c5c;
    padding: 10px;
    width: 100%;
    text-align: center;
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

export const CardContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    width: 90vw;
    justify-content: center;
    height: 90vh;
    margin: auto;
    margin-top: 20px;
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
