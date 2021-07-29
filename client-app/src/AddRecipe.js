import axios from "axios";
import firebase from './util/Firebase.js';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, List, Paper, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
// Todo? Input Constrictions

const initialList = [];

const axiosAPI = axios.create({
      baseURL: 'https://localhost:5001',
      headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
                  "Content-type": "application/json"}
    });

export default function AddRecipe() {

      const [value, setValue] = React.useState('');
      const [ingredients, setIngredients] = React.useState(initialList);
      const [title, setTitle] = React.useState('');
      const [description, setDescription] = React.useState('');
      const [method, setMethod] = React.useState('');
      const [image, setImage] = React.useState("https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png");

      const validationSchema = yup.object({
            title: yup
                  .string('Enter the title of the recipe')
                  .min(1, 'Enter a title')
                  .required('Title is required'),
            description: yup
                  .string('Enter the description of the recipe')
                  .min(1, 'Cannot be empty')
                  .required('Description is required'),
            method: yup
                  .string('Write down the directions of the recipe.')
                  .min(1, 'Cannot be empty')
                  .required('Method is required'),
          });

      const formik = useFormik({
            initialValues: {
            title: '',
            description: '',
            method: '',
            },
            validationSchema: validationSchema,
            onSubmit: (values) => {
                  if (image === '') {
                        setImage("https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png");
                  };
                  axiosAPI.post('/api/Recipe', {
                        title: values.title,
                        description: values.description,
                        ingredients: JSON.stringify(ingredients),
                        method: values.method,
                        image: image, }).then(res =>{
                  });
            },
      });
      
      function handleChange(event) {
            setValue(event.target.value);
      };
         
      function handleAdd() {
            const newList = ingredients.concat({ value }); 
            setIngredients(newList);
            setValue('');
      };

      function handleRemove(value) {
            const newList = ingredients.filter((item) => item.value !== value);
            setIngredients(newList);
      };

      const handleTitle = event => {
            setTitle(event.target.value);
      };
      
      const handleDescription = event => {
            setDescription(event.target.value);
      };

      const handleImage = event => {
            setImage(event.target.value);
      };

      const handleMethod = event => {
            setMethod(event.target.value);
      };

      const handlePost = event => {
            if (image === "") {
                  setImage("https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png");
            };
            axiosAPI.post('/api/Recipe', {
                  title: title,
                  description: description,
                  ingredients: JSON.stringify(ingredients),
                  method: method,
                  image: image, }).then(res =>{
            });
      };

      async function firebasePost() {
            const recipeGDBRef = firebase.database().ref('RecipeWebApp');
            const gResponse = await recipeGDBRef.push({title: title,
                  description: description,
                  ingredients: JSON.stringify(ingredients),
                  method: method,
                  image: image, });
            return gResponse;
      };

      return (
            <div className="AddRecipe">
                  <center>
                  <form onSubmit={formik.handleSubmit}>
                        <h1>Recipe Name</h1>
                              <TextField 
                              id="title"
                              name="title"
                              label="Recipe Title"
                              type="title"
                              style = {{width: "500px"}}
                              value={formik.values.title}
                              onChange={formik.handleChange}
                              error={formik.touched.title && Boolean(formik.errors.title)}
                              helperText={formik.touched.title && formik.errors.title}
                              />
                        <h1>Description</h1>
                              <TextField
                              id="description"
                              name="description"
                              label="Recipe Description"
                              type="description"
                              rows={2}
                              style = {{width: "600px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              value={formik.values.description}
                              onChange={formik.handleChange}
                              error={formik.touched.description && Boolean(formik.errors.description)}
                              helperText={formik.touched.description && formik.errors.description}
                              />
                        <h1>Image</h1>
                        <TextField style = {{width: "500px"}} name="image" label="Provide a direct url link to an image"
                              onChange={(event)=>handleImage(event)}/>
                        <h1>Ingredients</h1>
                              <TextField style = {{width: "350px", marginRight: "10px"}}
                              type="text" value={value} onChange={handleChange}/>
                              <Button variant="contained" onClick={handleAdd}>Add Ingredient</Button>
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
                              id="method"
                              name="method"
                              label="Write out the recipe method/instructions here..."
                              type="method"
                              rows={6}
                              style = {{width: "550px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              value={formik.values.method}
                              onChange={formik.handleChange}
                              error={formik.touched.method && Boolean(formik.errors.method)}
                              helperText={formik.touched.method && formik.errors.method}
                              />
                        <p>
                              <button type="submit">Add Recipe</button>
                        </p>
                        </form>
                  </center>
            </div>
      )
}

