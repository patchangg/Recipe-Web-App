import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Paper, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const initialList = [];

export default function EditRecipe() {

      const [value, setValue] = React.useState('');
      const [list, setList] = React.useState(initialList);
      
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

      return (
            <div className="EditRecipe">
                  <Link to="/">
                  <Button variant="contained" color="primary">Back</Button>
                  </Link>
                  <center>
                        <h1>Recipe Name</h1>
                              <TextField style = {{width: "500px"}}/>
                        <h1>Description</h1>
                              <TextField
                              id="outlined-textarea"
                              label="Recipe Description"
                              rows={2}
                              style = {{width: "600px", marginRight: "10px"}}
                              multiline
                              variant="outlined"
                              />
                        <h1>Image</h1>
                              <input type="file"/>
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
                              />
                        <p>
                              <button>Add Recipe</button>
                        </p>
                  </center>
            </div>
      )
}

