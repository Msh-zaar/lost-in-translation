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
            <form class="flex flex-col" onSubmit={ handleSubmit(onSubmit) }>
                <fieldset class="flex flex-col items-center">
                    <label htmlFor="username">Please Enter Your Name: </label>
                    <input 
                    type="text" 
                    placeholder="..." 
                    class="form-input px-4 py-3 rounded-full"
                    { ...register("username", usernameConfig) } />
                    { errorMessage }
                </fieldset>
                <button class="btn-primary" type="submit">Continue</button>

                {loading && <button class="bg-blue mt-1" disabled>
                                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                </svg> Loading...
                            </button>}
                {apiError && <p>{ apiError }</p>}
            </form>
        </>
    )
}
export default LoginForm;
