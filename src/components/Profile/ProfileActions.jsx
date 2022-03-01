import { Link } from "react-router-dom"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../context/UserContext"
import { storageSave, storageDelete } from "../../utils/storage"

const ProfileActions = () => {

    const { user, setUser } = useUser()

    const handleLogoutClick = () => {
        if (window.confirm("Are you sure?")) {
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    const handleClearHistoryClick = () => {
        if (window.confirm("This cannot be undone!")) {

            const updatedUser = {
                ...user,
                translations: []
            }

            storageSave(updatedUser)
            setUser(updatedUser)
        }
    }

    return (
        <div class="flex">
            <span class="py-2 px-4 bg-blue font-semibold rounded-lg shadow-md hover:bg-green"><Link to="/translations">Translate</Link></span>
            <button class="btn-primary" onClick={ handleClearHistoryClick }>Clear</button>
            <button class="btn-primary" onClick={ handleLogoutClick }>Logout</button>
        </div>
    )
}

export default ProfileActions