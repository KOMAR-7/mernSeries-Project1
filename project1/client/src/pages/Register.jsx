import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value
    })
  }

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    console.log(response);
    
    
    const res_data = await response.json();
    console.log("Response form the server: ", res_data);

    if(response.ok){
      storeTokenInLS(res_data.token);
      // localStorage.setItem("token", res_data.token);
      setUser({
        username: "",
        email: "",
        phone: "",
        password: ""
      })
      navigate('/');
    }else{
      console.log("Else part of registeration Error tak")
      alert(res_data.extraDetails? res_data.extraDetails:res_data.message);
    }
    } catch (error) {
      console.log("Register Error:", error);
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
                <h1>Register Here</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" placeholder="Enter username " id="username" value={user.username} onChange={handleInput} required />
                  </div>

                  <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Enter email " id="email" value={user.email} onChange={handleInput} required />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="number" name="phone" placeholder="Enter phone " id="phone" value={user.phone} onChange={handleInput} required />
                  </div>

                  <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter password " id="password" value={user.password} onChange={handleInput} required />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">Register Now</button>

                </form>
              </div>


            </div>
          </div>
        </main>
      </section>
    </>
  );
};