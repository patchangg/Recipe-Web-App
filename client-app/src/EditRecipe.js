import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function EditRecipe() {

      return (
            <div className="EditRecipe">
                  <Link to="/">
                  <Button variant="contained" color="primary">Back</Button>
                  </Link>
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
                  <TextField style = {{width: "350px", marginRight: "10px"}}/>
                  <Button variant="contained">Add Ingredient</Button>
                  <List>100kg Bananas                   
                        <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                        </IconButton>
                  </List>
                  <h1>Step by Step</h1>
                  <input style={{height: "150px", width: "370px"}}
                        type="text"
                  />
                  <p>
                  <button>Append Changes</button>
                  </p>
                  </center>
            </div>
      )
}

