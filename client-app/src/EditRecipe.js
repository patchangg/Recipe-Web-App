import axios from "axios";
import React, { useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Button, List, Paper, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from './util/Firebase.js';

const initialList = [];

const axiosAPI = axios.create({
      baseURL: 'https://localhost:5001',
      headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
                  "Content-type": "application/json"}
    })

export default function EditRecipe() {

      const [value, setValue] = useState('');
      const [ingredients, setIngredients] = React.useState(initialList);
      const [title,setTitle] = useState('');
      const [description,setDescription] = useState('');
      const [method,setMethod] = useState('');
      const [image,setImage] = useState("");
      const [recipe,setRecipe] = useState([])

      const locations = useLocation();

      useEffect(() => {
            // const putURL = '/api/Recipe/' + locations.state.data
            // axiosAPI.get(putURL).then(res =>{
            //       console.log(res.data)
            //       const dataSet = res.data;
            //       setRecipe(dataSet)
            //       setIngredients(JSON.parse(dataSet.ingredients))
            //       setTitle(dataSet.title)
            //       setDescription(dataSet.description)
            //       setMethod(dataSet.method)
            // });
            firebase.database().ref('RecipeWebApp/'+locations.state.data).on('value',function(snapshot){
                  setTitle(snapshot.val().title)
                  setImage(snapshot.val().image)
                  setIngredients(JSON.parse(snapshot.val().ingredients))
                  setDescription(snapshot.val().description)
                  setMethod(snapshot.val().method)
            });
          }, [] );

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

      // const handleFile = event => {
      //       console.log(event.target.files, "$$$$")
      //       console.log(event.target.files[0], "$$$$")
      //       let file = event.target.files[0]
      //       setImage(file)
      // }

      const handleTitle = event => {
            setTitle(event.target.value)
      }

      const handleImage = event => {
            setImage(event.target.value)
      }

      const handleDescription = event => {
            setDescription(event.target.value)
      }

      const handleMethod = event => {
            setMethod(event.target.value)
      }

      const handlePut = event => {
            // event.preventDefault();
            // const putURL = '/api/Recipe/' + locations.state.data
            // axiosAPI.put(putURL, 
            //       {id: locations.state.data,
            //       title: title,
            //       description: description,
            //       ingredients: JSON.stringify(ingredients),
            //       method: method,
            //       image: image, }).then(res =>{
            //       console.log(res)
            //       console.log(res.data)
            // });
            firebase.database().ref('RecipeWebApp/'+locations.state.data).update({
                  title: title,
                  description: description,
                  ingredients: JSON.stringify(ingredients),
                  method: method,
                  image: image,
            });
      }
      return (
            <div className="EditRecipe">
                  <Link to="/">
                  <Button variant="contained" color="primary">Back</Button>
                  </Link>
                  <center>
                        <h1>Recipe Name</h1>
                              <TextField value={title} style = {{width: "500px"}} onChange={(event)=>handleTitle(event)}/>
                        <h1>Description</h1>
                              <TextField
                              id="outlined-textarea"
                              value={description}
                              rows={2}
                              style = {{width: "600px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              onChange={(event)=>handleDescription(event)}
                              />
                        <h1>Image</h1>
                              <TextField value={image} style = {{width: "500px"}} onChange={(event)=>handleImage(event)}/>
                        <h1>Ingredients</h1>
                              <TextField style = {{width: "350px", marginRight: "10px"}}
                              type="text" value={value} onChange={handleChange}/>
                              <Button variant="contained" type="submit" onClick={handleAdd}>Add Ingredient</Button>
                              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                                    <List>
                                          {ingredients.map(item => (
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
                              value={method}
                              rows={6}
                              style = {{width: "550px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              onChange={(event)=>handleMethod(event)}
                              />
                        <p>
                              <Link to="/">
                              <button type="submit" onClick={handlePut}>Edit Recipe</button>
                              </Link>
                        </p>
                  </center>
            </div>
      )
}

