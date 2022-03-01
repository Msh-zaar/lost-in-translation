import ProfileTranslateHistoryItem from "./ProfileTranslationHistoryItem"

const ProfileTranslateHistory = ({ translations }) => {
    return (
        <section class="btn-secondary flex flex-col items-center">
            <h4>Your translation history:</h4>
            <ul class="m-2">
                { translations.map((translation, index) => <ProfileTranslateHistoryItem key={ index + "-" + translation } translation={ translation }/>) }
            </ul>
        </section>
    )
}

export default ProfileTranslateHistory