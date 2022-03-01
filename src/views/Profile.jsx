import ProfileActions from "../components/Profile/ProfileActions";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

const Profile = () => {

    const {user} = useUser();

    return (
        <>
            <div class="flex">
                <h1 class="py-2 px-4 bg-gray font-semibold shadow-md">Profile</h1>
            </div>
            
            <ProfileHeader username={user.username} />
            <ProfileActions />
            <ProfileTranslationHistory translations={user.translations} />
        </>

    )
}
export default withAuth(Profile);