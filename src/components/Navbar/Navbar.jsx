import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {

    const {user} = useUser();

    return (
        <nav class="bg-gray px-1 py-1">
            <div class="container flex flex-wrap justify-between items-start">
                {user == null &&
                <ul>
                    <li>Sign Language Translator</li>
                </ul>
                }
                
                {user !== null && 
                <ul class="flex flex-row space-x-4 text-sm font-medium">
                    <li class="btn-primary">
                        <NavLink to="/translations">Translations</NavLink>
                    </li>
                    <li class="btn-primary">
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    
                </ul>
                }
            </div>
        </nav>
    )
}
export default Navbar;