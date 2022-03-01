import { useForm } from "react-hook-form"
import { useState } from "react"
import { individual_signs } from "../../utils/signLink"

const TranslationForm = ( {onTranslate} ) => {

    const [input, setInput] = useState([]);

    const { register, handleSubmit} = useForm()

    const onSubmit = ({translation}) => {
        onTranslate(translation)
    }
 
    const handleInput = (event) => {
        if (event.target.value) {
            let images = []
            let translation = event.target.value.split("")
            translation.map(char => {
                individual_signs.map(x => {   
                    if (x.letter === char) {
                        images.push(<img src={x.img}></img>)
                    }
                })
            })
            setInput(images)
        } else {
            setInput([])
        }
    }
    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit)}>
                <fieldset>
                    <input class="form-input px-4 py-3 rounded-full" type="text" { ...register("translation")} placeholder="translate" onChange={handleInput}/>
                    <button class="btn-primary" type="submit">Save Translation</button>
                </fieldset>
            </form>
            <div class="flex flex-row items-center">
                {input.map(x => x)}
            </div>
        </>
    )
}

export default TranslationForm