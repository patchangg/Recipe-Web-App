import axios from "axios";
import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Button, List, Paper, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
      const [recipe,setRecipe] = useState([]);
      const [state,setState] = useState(false);

      const locations = useLocation();

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

      useEffect(() => {
            const putURL = '/api/Recipe/' + locations.state.data;
            axiosAPI.get(putURL).then(res =>{
                  const dataSet = res.data;
                  setRecipe(dataSet);
                  setIngredients(JSON.parse(dataSet.ingredients));
                  setTitle(dataSet.title);
                  setDescription(dataSet.description);
                  setMethod(dataSet.method);
                  setImage(dataSet.image);
            });
          }, [] );

      const formik = useFormik({
            initialValues: {
            title: title,
            description: description,
            method: method,
            },
            validationSchema: validationSchema,
            enableReinitialize: true,
            onSubmit: (values) => {
                  if (image === '') {
                        setImage("https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png");
                  };
                  console.log(values)
                  const putURL = '/api/Recipe/' + locations.state.data;
                  axiosAPI.put(putURL, 
                        {id: locations.state.data,
                        title: values.title,
                        description: values.description,
                        ingredients: JSON.stringify(ingredients),
                        method: values.method,
                        image: image, }).then(res =>{
                  });
                  setState(true);
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
            console.log(ingredients);
            console.log(value);
            const newList = ingredients.filter((item) => item.value !== value);
            console.log(newList);
            setIngredients(newList);
      };

      const handleImage = event => {
            setImage(event.target.value);
      };

      if (state === true) {
            return <Redirect to='/' />
      }
      
      return (
            <div className="EditRecipe">
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
                              <button type="submit">Edit Recipe</button>
                        </p>
                        </form>
                  </center>
            </div>
      )
}

