import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

export const Login = () => {

    const URL = `http://localhost:5000/api/auth/login`
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json();
            console.log("Response form the server: ", res_data);
            if (response.ok) {
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token", res_data.token);
                alert("Login Successful")
                setUser({
                    email: "",
                    password: ""
                })
                navigate("/");
            } else {
                // alert("Invalid Credentials")
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);

            }
            console.log("Response of login form:", response);
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image reg-img">
                                <img
                                    src="/images/register.png"
                                    alt="a nurse with a cute look"
                                    width="400"
                                    height="500"
                                />
                            </div>
                            {/* Lets go with registration form */}
                            <div className="registration-form">
                                <h1>Login Here</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" name="email" placeholder="Enter email " id="email" value={user.email} onChange={handleInput} required />
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" name="password" placeholder="Enter password " id="password" value={user.password} onChange={handleInput} required />
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>

                                </form>
                            </div>


                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};