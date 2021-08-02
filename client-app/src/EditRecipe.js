import axios from "axios";
import { Formik, getIn, FieldArray } from 'formik';
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Button, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';

const axiosAPI = axios.create({
      baseURL: 'https://localhost:5001',
      headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
                  "Content-type": "application/json"}
    })

const useStyles = makeStyles(theme => ({
      delete: {
        margin: theme.spacing(1)
      },
      field: {
        margin: theme.spacing(1)
      }
}));

export default function EditRecipe() {
      const classes = useStyles();

      const [value, setValue] = useState('');
      const [ingredients, setIngredients] = useState([]);
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
            ingredients: yup
                  .array('Enter the ingredients of the recipe')
                  .of(yup.object({value: yup.string('Ingredient')}))
                  .min(1, 'Cannot be empty')
                  .required('Ingredients are required'),
            method: yup
                  .string('Write down the directions of the recipe.')
                  .min(1, 'Cannot be empty')
                  .required('Method is required'),
      });

      const initialValues = {
            title: title, 
            description: description, 
            image: image ,
            ingredients: ingredients,
            method: method,
     }

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

      if (state === true) {
            return <Redirect to='/' />
      }
      
      return (
            <div className="EditRecipe">
                  <center>
                  <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                              if (values.image === '') {
                                    values.image = "https://res.cloudinary.com/dhevhiahl/image/upload/v1623412439/recipeAPI/default.png";
                              };
                              const putURL = '/api/Recipe/' + locations.state.data;
                              axiosAPI.put(putURL, 
                                    {id: locations.state.data,
                                    title: values.title,
                                    description: values.description,
                                    ingredients: JSON.stringify(values.ingredients),
                                    method: values.method,
                                    image: values.image, }).then(res =>{
                              });
                              setState(true);
                        }} 
                  >
                  {({values, touched, errors, handleChange, handleSubmit, handleBlur}) => (
                  <form onSubmit={handleSubmit}>
                        <h1>Recipe Name</h1>
                              <TextField 
                              id="title"
                              name="title"
                              label="Recipe Title"
                              type="title"
                              style = {{width: "500px"}}
                              value={values.title}
                              onChange={handleChange}
                              error={touched.title && Boolean(errors.title)}
                              helperText={touched.title && errors.title}
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
                              value={values.description}
                              onChange={handleChange}
                              error={touched.description && Boolean(errors.description)}
                              helperText={touched.description && errors.description}
                              />
                        <h1>Image</h1>
                              <TextField
                                    id="image"
                                    name="image" 
                                    label="Provide a direct url link to an image"
                                    value={values.image}
                                    style = {{width: "500px"}} 
                                    onChange={handleChange}
                              />
                        <h1>Ingredients</h1>
                              <FieldArray name="ingredients">
                                    {({ push, remove }) => (
                                          <div>
                                          {values.ingredients.length > 0 && values.ingredients.map((p, index) => {

                                          const ingredient = `ingredients[${index}].value`;
                                          const touchedingredient = getIn(touched, ingredient);
                                          const erroringredient = getIn(errors, ingredient);

                                          return (
                                                <div key={index}>
                                                <TextField
                                                className={classes.field}
                                                margin="normal"
                                                variant="outlined"
                                                label="Ingredient"
                                                name={ingredient}
                                                value={p.value}
                                                required
                                                helperText={
                                                      touchedingredient && erroringredient
                                                      ? erroringredient
                                                      : ""
                                                }
                                                error={Boolean(touchedingredient && erroringredient)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <IconButton edge="end" aria-label="delete">
                                                            <DeleteIcon className={classes.delete} onClick={() => remove(index)}/>
                                                </IconButton>
                                                </div>
                                          );
                                          })}
                                          <Button
                                          type="button"
                                          variant="outlined"
                                          onClick={() =>
                                                push({ value: "" })
                                          }
                                          >
                                          Add Ingredient
                                          </Button>
                                          </div>
                                    )}
                              </FieldArray>
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
                              value={values.method}
                              onChange={handleChange}
                              error={touched.method && Boolean(errors.method)}
                              helperText={touched.method && errors.method}
                              />
                        <p>
                              <Button variant="contained" color="primary" type="submit">Edit Recipe</Button>
                        </p>
                        </form>
                  )}
                        </Formik>
                  </center>
            </div>
      )
}

