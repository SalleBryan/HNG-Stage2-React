import React from 'react';
import  {useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    function handleFakeLogin() {
        // LocalStorage key
        localStorage.setItem("ticketapp_session", JSON.stringify({
            user: "demo",
            createdAt: Date.now()
        }));
        navigate("/tickets")
    }

    return (
        <div>
            <h2>Login</h2>
            <p>This is a stub login form for beginners - we will make it real later</p>
            <button onClick={handleFakeLogin}>Log in (demo)</button>
        </div>
    );
}