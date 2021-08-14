import styled from "styled-components";

export const Form = styled.form`
    width: 400px;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const Input = styled.input`
    height: 30px;
    margin-bottom: 15px;
    padding: 10px 6px;
    color: #777;
    font-size: 16px;
    border: 1px solid #ddd;
    &::placeholder {
        color: #777;
    }
`;

export const TextArea = styled.textarea`
    min-height: 30px;
    margin-bottom: 15px;
    padding: 10px 6px;
    color: #777;
    font-size: 16px;
    border: 1px solid #ddd;
    &::placeholder {
        color: #777;
    }
`;

export const Label = styled.label`
    align-items: start;
    font-size: 16;
    font-weight: bold;
    padding: 0 6px;
    color: #263238;
    text-decoration: none;
    margin-bottom: 6px;
    text-transform: capitalize;
`;
