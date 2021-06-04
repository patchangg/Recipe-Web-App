import axios from "axios";
import React, { useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
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
      const [list, setList] = useState(initialList);
      const [title,setTitle] = useState('');
      const [description,setDescription] = useState('');
      const [method,setMethod] = useState('');
      const [image,setImage] = useState(null);
      const [recipe,setRecipe] = useState([])

      const locations = useLocation();

      useEffect(() => {
            const putURL = '/api/Recipe/' + locations.state.data
            axiosAPI.get(putURL).then(res =>{
                  console.log(res.data)
                  const dataSet = res.data;
                  setRecipe(dataSet)
                  setList(JSON.parse(dataSet.ingredients))
                  setTitle(dataSet.title)
                  setDescription(dataSet.description)
                  setMethod(dataSet.method)
            });
          }, [] );

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

      const handlePut = event => {
            event.preventDefault();
            const putURL = '/api/Recipe/' + locations.state.data
            axiosAPI.put(putURL, 
                  {id: locations.state.data,
                  title: title,
                  description: description,
                  ingredients: JSON.stringify(list),
                  method: method,
                  image: image, }).then(res =>{
                  console.log(res)
                  console.log(res.data)
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

