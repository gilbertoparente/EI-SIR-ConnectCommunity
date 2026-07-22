import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import socket from "../../socket";
import { getConversation } from "../../services/privateMessageService";

function PrivateChat({ selectedUser }) {

    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {

        if (!selectedUser) return;

        const loadConversation = async () => {

            try {

                const history = await getConversation(selectedUser._id);

                console.log("Histórico:", history);

                setMessages(history);

            }

            catch (error) {

                console.error(error);

            }

        };

        loadConversation();

        const receiveMessage = (message) => {

            console.log("Mensagem recebida:", message);

            const senderId = message.sender._id;
            const receiverId = message.receiver._id;

            if (

                senderId === selectedUser._id ||

                receiverId === selectedUser._id

            ) {

                setMessages(previous => [

                    ...previous,

                    message

                ]);

            }

        };

        socket.off("receivePrivateMessage");

        socket.on(

            "receivePrivateMessage",

            receiveMessage

        );

        return () => {

            socket.off(

                "receivePrivateMessage",

                receiveMessage

            );

        };

    }, [selectedUser]);

    const handleSend = () => {

        if (!newMessage.trim()) return;

        socket.emit(

            "privateMessage",

            {

                receiverId: selectedUser._id,

                message: newMessage

            }

        );

        setNewMessage("");

    };

    if (!selectedUser) {

        return (

            <div className="card shadow-sm">

                <div className="card-body text-center">

                    Selecione um utilizador.

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-header bg-primary text-white">

                <strong>

                    Conversa com {selectedUser.name}

                </strong>

            </div>

            <div

                className="card-body"

                style={{

                    height: "420px",

                    overflowY: "auto"

                }}

            >

                {

                    messages.map(message => {

                        const mine = message.sender._id === user.id;

                        return (

                            <div

                                key={message._id}

                                className={`d-flex mb-3 ${mine ? "justify-content-end" : "justify-content-start"}`}

                            >

                                <div

                                    className={`p-2 rounded ${mine ? "bg-primary text-white" : "bg-light border"}`}

                                    style={{

                                        maxWidth: "70%"

                                    }}

                                >

                                    <small>

                                        <strong>

                                            {message.sender.name}

                                        </strong>

                                    </small>

                                    <br />

                                    {message.message}

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="card-footer">

                <div className="input-group">

                    <input

                        className="form-control"

                        value={newMessage}

                        placeholder="Escreva uma mensagem..."

                        onChange={(e) =>

                            setNewMessage(e.target.value)

                        }

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSend();

                            }

                        }}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={handleSend}

                    >

                        Enviar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default PrivateChat;