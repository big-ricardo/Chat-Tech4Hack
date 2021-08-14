import React, { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import { Container } from "./styles";

function App() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, []);

    async function getRooms() {
        const response = await api
            .get("/api/room", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(({ data }) => data)
            .catch((e) => console.error(e));

        if (response) {
            setRooms(response);
            console.log(response);
        }
    }

    return (
        <>
            <Container>
                {rooms.map((room) => (
                    <Link
                        key={Date.now() * Math.random()}
                        to={`${room.id}/chat`}
                    >
                        {room.name}
                    </Link>
                ))}
            </Container>
        </>
    );
}

export default App;
