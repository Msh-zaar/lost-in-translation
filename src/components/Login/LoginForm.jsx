import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import { useState, useEffect } from "react";
import { storageRead } from "../../utils/storage";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY_USER } from "../../const/storageKeys";

const usernameConfig = {
    required: true,
    minLength: 3,
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        console.log("user", user);
        if (user !== null) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const onSubmit = async ({username}) => {

        setLoading(true);
        const [error, userResponse] = await loginUser(username);
        if (error !== null) {
            setApiError(error);
        }
        if (userResponse !== null) {
            storageRead(STORAGE_KEY_USER, userResponse);
            setUser(userResponse);
        }
        setLoading(false);
    }

    const errorMessage = (() => {
        if (!errors.username) {
            return null;
        }
        if (errors.username.type === "required") {
            return <span>Username is required</span>;
        }
        if (errors.username.type === "minLength") {
            return <span>Username is too short</span>;
        }
    })(); 

    return (
        <>
            <h2>Please Enter Your Name</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor="username">Username: </label>
                    <input 
                    type="text" 
                    placeholder="your name" 
                    { ...register("username", usernameConfig) } />
                    { errorMessage }
                </fieldset>
                <button type="submit">Continue</button>

                {loading && <p>Logging in...</p>}
                {apiError && <p>{ apiError }</p>}
            </form>
        </>
    )
}
export default LoginForm;
