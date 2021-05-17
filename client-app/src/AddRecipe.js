import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';

const initialList = [];

export default function AddRecipe() {
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
            <div className="AddRecipe">
                  <center>
                  <h1>Recipe Name</h1>
                  <TextField style = {{width: "500px"}}/>
                  <h1>Description</h1>
                  <input style={{height: "50px", width: "370px"}}
                        type="text"
                  />
                  <h1>Image</h1>
                  <input 
                        type="file"
                  />
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
                  <h1>Step by Step</h1>
                  <input style={{height: "150px", width: "370px"}}
                        type="text"
                  />
                  <p>
                  <button>Add Recipe</button>
                  </p>
                  </center>
            </div>
      )
}

