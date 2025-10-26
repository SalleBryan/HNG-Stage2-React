import React, {useState} from "react";
import {createTicket} from "../utils/storage";

export default function TicketForm({ onCreate}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            const ticket = createTicket({ title, description, priority });
            setTitle("");
            setDescription("");
            setPriority("Medium");
            if (onCreate) onCreate(ticket);
        } catch (err) {
            setError(err.message || "Failed to create ticket");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="ticket-form" aria-label="Create ticket form">
            <h3>Create A New Ticket</h3>

            <label>
                Title
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Short Summary"
                />
            </label>

            <label htmlFor="">
                Description
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="More details (Optional)"
                />
            </label>

            <label>
                Priority
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>

            {error && <div className = "form-error" role = "alert">{error}</div>}

            <div style = {{marginTop: 8}}>
                <button type="submit">Create Ticket</button>
            </div>
        </form>
    )
}