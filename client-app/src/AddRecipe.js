import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Paper, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

const initialList = [];

const axiosAPI = axios.create({
      baseURL: 'https://localhost:5001',
      headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
                  "Content-type": "application/json"}
})

export default function AddRecipe() {

      const [value, setValue] = React.useState('');
      const [ingredients, setIngredients] = React.useState(initialList);
      const [title,setTitle] = React.useState('');
      const [description,setDescription] = React.useState('');
      const [method,setMethod] = React.useState('');
      const [image,setImage] = React.useState('default');
      const [name,setName] = React.useState('');

      function handleChange(event) {
            setValue(event.target.value);
      }
         
      function handleAdd() {
            const newList = ingredients.concat({ value }); 
            setIngredients(newList);
            setValue('');
      }

      function handleRemove(value) {
            console.log(ingredients)
            console.log(value)
            const newList = ingredients.filter((item) => item.value !== value);
            console.log(newList)
            setIngredients(newList);
      }

      const handleFile = event => {
            console.log(event.target.files, "$$$$")
            console.log(event.target.files[0], "$$$$")
            let file = event.target.files[0]
            setImage(file)
      }

      const handleTitle = event => {
            setTitle(event.target.value)
      }

      const handleDescription = event => {
            setDescription(event.target.value)
      }

      const handleMethod = event => {
            setMethod(event.target.value)
      }

      const imageUpload = () => {
            let uploadData = new FormData();
            uploadData.append("file", image);
            uploadData.append("public_id", name);
            uploadData.append("upload_preset", 'recipeAPI');
        
            const res = fetch("https://api.cloudinary.com/v1_1/dhevhiahl/image/upload", {
                  method:'POST',
                  body:uploadData
            })

            const resultFile = res.json()
            console.log(resultFile)
            console.log(resultFile.secure_url)
            setName(resultFile.secure_url)
      }

      const handlePost = event => {
            event.preventDefault();
            console.log(typeof(image))
            console.log(image)
            if (image === 'default') {
                  setName('https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png')
            } else {
                  imageUpload()
            }
            axiosAPI.post('/api/Recipe', 
                  {title: title,
                  description: description,
                  ingredients: JSON.stringify(ingredients),
                  method: method,
                  image: name, }).then(res =>{
                  console.log(res)
                  console.log(res.data)
            });
      }


      return (
            <div className="AddRecipe">
                  <center>
                        <h1>Recipe Name</h1>
                              <TextField style = {{width: "500px"}} name="title" onChange={(event)=>handleTitle(event)}/>
                        <h1>Description</h1>
                              <TextField
                              id="outlined-textarea"
                              label="Recipe Description"
                              rows={2}
                              style = {{width: "600px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              name="description"
                              onChange={(event)=>handleDescription(event)}
                              />
                        <h1>Image</h1>
                              <input type="file" name="image" onChange={(event)=>handleFile(event)}/>
                        <h1>Ingredients</h1>
                              <TextField style = {{width: "350px", marginRight: "10px"}}
                              type="text" value={value} onChange={handleChange}/>
                              <Button variant="contained" type="submit" onClick={handleAdd}>Add Ingredient</Button>
                              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                                    <List>
                                          {ingredients.map((item) => (
                                          <li key={item}>{item.value}
                                          <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon onClick={() => handleRemove(item.value)}/>
                                          </IconButton>
                                          </li>
                                          ))}                  

                                    </List>
                        </Paper>
                        <h1>Directions</h1>
                              <TextField
                              id="outlined-textarea"
                              label="Write out the recipe method/instructions here..."
                              rows={6}
                              style = {{width: "550px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              name="method"
                              onChange={(event)=>handleMethod(event)}
                              />
                        <p>
                              <button type="submit" onClick={handlePost}>Add Recipe</button>
                        </p>
                  </center>
            </div>
      )
}

