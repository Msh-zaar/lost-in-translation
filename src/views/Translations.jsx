import TranslationForm from "../components/Translations/TranslationForm";
import { useUser } from "../context/UserContext";
import { translationAdd } from "../api/translation"
import { storageSave } from "../utils/storage";
import { STORAGE_KEY_USER } from "../const/storageKeys";

const Translation = () => {

    const { user, setUser } = useUser()

    const handleTranslationClicked = async translation => {
        console.log(translation)

        const [error, updatedUser] = await translationAdd(user, translation)

        if (error !== null){

        }
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)
        
        console.log("error: " + error)
        console.log("result:" + updatedUser)
    }

    return (
        <>
            <div class="flex">
                <h1 class="py-2 px-4 bg-gray font-semibold shadow-md">TRANSLATION</h1>
            </div>
            <TranslationForm onTranslate={ handleTranslationClicked }/>
        </>
    )
}

export default Translation