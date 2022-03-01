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
                    <li class="block py-2 pr-4 pl-3 text-gray-dark bg-blue hover:bg-green rounded md:bg-transparent">
                        <NavLink to="/translations">Translations</NavLink>
                    </li>
                    <li class="block py-2 pr-4 pl-3 text-gray-dark bg-blue hover:bg-green rounded md:bg-transparent">
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    
                </ul>
                }
            </div>
            

            
        </nav>
    )
}
export default Navbar;