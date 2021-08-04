import React from 'react';
import titleImage from './images/titleexample.png';
import descriptionImage from './images/descriptionexample.png';
import imageImage from './images/Imageexample.png';
import ingredientImage from './images/ingredientsexample.png';
import methodImage from './images/directionsexample.png';
import addRecipeButton from './images/addrecipebutton.png';

export default function HelpRecipe() {

      return (
            <div className="HelpRecipe">
                  <center>
                        <h1>Welcome to help</h1>
                        <h1>Press Home to look at recipes on the website</h1>
                        <h1>Press Add Recipes to add recipes on the website</h1>
                        <h2>To create a recipe, provide a title, description, the ingredients needed and a method</h2>
                        <h2>An Image is not necessary to include</h2>
                        <h2>Step By Step Tutorial to Create a recipe</h2>
                        <h3>Write the title of the recipe</h3>
                        <img src={titleImage} alt="titleExample" />
                        <h3>Write a simple description about the recipe</h3>
                        <img src={descriptionImage} alt="descriptionExample" />
                        <h3>Provide a direct url link to an image that resembles the finished product</h3>
                        <img src={imageImage} alt="imageExample" />
                        <h3>Provide the necessary ingredients by pressing add ingredient and filling out the text box</h3>
                        <h3>You can delete the ingredient by pressing the trash icon</h3>
                        <img src={ingredientImage} alt="ingredientsExample" />
                        <h3>Write a Method on how to create the recipe</h3>
                        <img src={methodImage} alt="methodExample" />
                        <h3>Then press Add Recipe to add the recipe to the website</h3>
                        <img src={addRecipeButton} alt="addRecipeButton" />
                        <h3>Make sure to not leave any text boxes empty (except image)</h3>
                  </center>
            </div>
      )
}

