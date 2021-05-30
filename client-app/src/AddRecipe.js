import React from 'react';
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
      const [list, setList] = React.useState(initialList);
      const [title,setTitle] = React.useState('');
      const [description,setDescription] = React.useState('');
      const [method,setMethod] = React.useState('');
      const [image,setImage] = React.useState(null);

      const handleChange = event => {
            setValue(event.target.value);
          };
         
      const handleSubmit = event => {
      if (value) {
            setList(list.concat(value));
      }
      setValue('');
      event.preventDefault();
      };

      const handleClick = id => {
            setList(list.filter(item => item.id !== id));
      };

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

      const handlePost = event => {
            event.preventDefault();
            axiosAPI.post('/api/Recipe', 
                  {title: title,
                  description: description,
                  ingredients: JSON.stringify(list),
                  method: method,
                  image: image, }).then(res =>{
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
                              <form onSubmit={handleSubmit}>
                                    <TextField style = {{width: "350px", marginRight: "10px"}}
                                    type="text" value={value} onChange={handleChange}/>
                                    <Button variant="contained" type="submit">Add Ingredient</Button>
                              </form>
                              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                                    <List>
                                          {list.map(item => (
                                          <li key={item}>{item}
                                          <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon onClick={() => handleClick(item.id)}/>
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

