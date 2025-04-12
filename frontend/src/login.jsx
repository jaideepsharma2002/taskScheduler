import React from 'react';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");


    const loginIn = async (e) => {
        e.preventDefault();

        setPasswordError("");
        const payload = {email, password};
        console.log("Sending to backend to validate", payload);
        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            console.log("data", data);
            console.log("token",data.accesstoken);
            

            if (response.ok) {

                // alert("Logged In successful!");
                // Optionally reset form
                setEmail("");
                setPassword("");
                localStorage.setItem("token", data.accesstoken);
                navigate("/task");
            }
            else {
                alert(data.message || "Email or Password incorrect!.");
              }

        }
        catch(e) {
            console.error("Error submitting signup:", error);
            alert("Something went wrong. Please try again later.");
        }

    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={loginIn}>
                <h2>Login</h2>
                <input type='text' placeholder='enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input type='password' placeholder='enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}


export default Login;