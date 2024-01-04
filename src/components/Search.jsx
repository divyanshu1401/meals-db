import { useState } from "react";
import { useGlobalContext } from '../context'

const Search = () =>{
    const {setSearchTerm, fetchRandomMeal}  = useGlobalContext()
    let [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        
        event.preventDefault()
        if(text){
            setSearchTerm(text)
        }
    }

    const handleRandomMeal = () => {
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }

    return(
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input className="form-input" type="text" value={text} placeholder="type your favourite meal" onChange={handleChange}/>
                <button className="btn" type="submit">submit</button>
                <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>surpise me!</button>
            </form>
        </header>
    )
}

export default Search;