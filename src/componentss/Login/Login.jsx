import React, { useState } from "react";
import "./Login.css"; 
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const key = "updatable";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "  ",
        password: "",
    });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            // console.log("Logged in user:", user);

            message.success("Login successful..!");
            navigate("/"); 
        } catch (error) {
            console.error("Login error:", error);
            message.error({ content: error.message || "Error occurred. Try again!", key });
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="primary" htmlType="submit" disabled={loading}>
                    {loading ? <Spin size="small" /> : "Login"}
                </Button>
                <p>
                    New user?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        style={{
                            textDecoration: "underline",
                            color: "blue",
                            cursor: "pointer",
                        }}
                    >
                        Signup
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;








