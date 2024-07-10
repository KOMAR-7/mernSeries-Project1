import { useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';


export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",

    });


    const [userData, setUserData] = useState(true)
    const { user } = useAuth();
    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }


    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setContact({
            ...contact,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact)
                
            })
            if(response.ok){
                // navigate("/contact")
                setContact("")
                toast.success("Message Sent Successfully");
            }else{
                toast.error("Message Not Sent");
            }
        } catch (error) {
         console.log("Error from the contact form ", error);   
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
                                <h1>Contact Form:</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" name="username" placeholder="Enter username " id="username" value={contact.username} onChange={handleInput} required />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" name="email" placeholder="Enter email " id="email" value={contact.email} onChange={handleInput} required />
                                    </div>

                                    <div>
                                        <label htmlFor="message">Message:</label>
                                        <textarea type="text" name="message" placeholder="Enter message" id="message" value={contact.message} onChange={handleInput} required
                                        ></textarea>
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit">Send Message</button>

                                </form>
                            </div>


                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};