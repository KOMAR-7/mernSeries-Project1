import { useAuth } from "../store/auth"
export const About = ()=>{
    const {user} = useAuth();
    return (
    <>
    <h1>This is my about page</h1>
    {/* <h3>Hello, {user.username}</h3> */}
    <h3>Welcome, {user? `${user.username} to our website!!!`: "to our website!!!"}</h3>
    </>
    )
}