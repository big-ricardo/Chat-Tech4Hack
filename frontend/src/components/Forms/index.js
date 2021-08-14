import React, { useState, useCallback } from "react";
import FormContext from "./context";
import { Form } from "./styles";

export default function Forms({ children, onSubmit }) {
    const [inputs, setInputs] = useState([]);

    const registerField = useCallback((name, ref) => {
        setInputs((oldInputs) => [...oldInputs, { name, ref }]);
    }, []);

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputs);
            }}
        >
            <FormContext.Provider value={{ registerField }}>
                {children}
            </FormContext.Provider>
        </Form>
    );
}
