import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function submit(event :any) {
        event.preventDefault();

        if (username == "" || password == "") {
            setError("Username and Password are required");
        }

        const data = {
            username: username,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:8081/auth/login", data);
            login(response.data);
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid Username or Password");
        }
    }

    return (
        <div className="p-10">
        <div className="max-w-[600px] p-8 shadow rounded-lg mx-auto">
            <div className="text-center mb-5">
                <h1 className="text-2xl font-semibold text-green-700">Login</h1>
            </div>

            <form>
                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input type="text" className="block w-full p-2 border border-green-200 rounded-lg" placeholder="Enter your Username"/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input type="text" className="block w-full p-2 border border-green-200 rounded-lg" placeholder="Enter your Password"/>
                </div>

                {error && <div className="text-sm text-red-500">{error}</div> }

                <div className="mt-8">
                    <button type={"submit"} className={"bg-green-800 text-white rounded-lg px-4 py-2 w-full hover:bg-gray-950"}>Login</button>
                </div>
            </form>

        </div>
    </div>
    )
}

export default Login;