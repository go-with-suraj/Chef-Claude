import {useState} from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipeFromMistral} from '../api'

const Main = () => {

    const [ingredients, setIngredients] = useState([])

    const [recipe, setRecipe] = useState(null)

   function getRecipe(ingredients){
       setRecipe(null)
       getRecipeFromMistral(ingredients)
       .then(recipeContent => {
        if(recipeContent) {
            setRecipe(recipeContent)
        } else {
            setRecipe("No recipe could be generated. Please try again!")
        }
       })
       .catch(err => {
        console.error('Error fetching recipe:', err)
        setRecipe("An error occurred while fetching the recipe. Please try again later.")
       })
   }


    function addIngredient(formData){
        const newIngredient = formData.get('ingredients')
        setIngredients((prev) => [...prev, newIngredient])
    }


    return (
        <main>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            addIngredient(formData)
          }} 
          className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredients"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList 
               ingredients = {ingredients}
               getRecipe={() => getRecipe(ingredients)}
            />}
            {recipe && <ClaudeRecipe recipe = {recipe}/>}
        </main>
    )
}

export default Main