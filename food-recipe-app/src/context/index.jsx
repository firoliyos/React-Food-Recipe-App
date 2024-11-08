import { createContext, useState } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState(null)
    const [loading, setLoading] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetails, setRecipeDetails] = useState(null)
    async function handleSubmit(event) {
        event.preventDefault()
         try{
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)

            const data = await response.json()
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam('')
            }
            console.log(data)
         }catch(error) {
            console.log(error)
            setLoading(false)
            setSearchParam('')
         }
    }

    console.log(loading, recipeList)

    return (
        <GlobalContext.Provider value={{searchParam, loading, recipeList, setSearchParam, handleSubmit, recipeDetails, setRecipeDetails}}>{children}</GlobalContext.Provider>
    )
}