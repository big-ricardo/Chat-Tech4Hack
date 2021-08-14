import React, { useContext, useEffect, useRef, memo } from "react";
import FormContext from "./context";
import { Input, Label } from "./styles";

const Forms = ({ name, type, ...rest }) => {
    const inputRef = useRef();
    const { registerField } = useContext(FormContext);

    useEffect(() => {
        if (inputRef.current && type !== "submit") {
            registerField(name, inputRef.current);
        }
    }, [name, type, registerField]);

    return (
        <>
            {type !== "submit" && <Label htmlFor={name}>{name}:</Label>}
            <Input name={name} id={name} ref={inputRef} type={type} {...rest} />
            <br />
        </>
    );
};

export default memo(Forms);
