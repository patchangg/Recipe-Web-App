import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, 
  Container, Grid, makeStyles, TextField, Typography, Modal } from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';
// Modal Alignment
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
// Endpoint API access
const axiosAPI = axios.create({
  baseURL: 'https://localhost:5001',
  headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
              "Content-type": "application/json"}
});
// Styling for the recipe grid so they are consistently sized
const useStyles = makeStyles((theme) => ({
      cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
      },

      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },

      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },

      cardContent: {
        flexGrow: 1,
      },

      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },

}));

export default function RecipeList() {
      const classes = useStyles();
      // Store the recipes into variables and modal opening and closing states
      const [open, setOpen] = useState(false);
      const [modalStyle] = useState(getModalStyle);
      const [currRecipe, setRecipe] = useState({id:'', title:'', description:'', ingredients:'', method:'', image:''});
      const [modalOpen, setmodalOpen] = useState(false);
      const [recipes,setRecipes] = useState([]);
      const [filter,setFilter] = useState('');
      // Helper Functions for the modals
      const showModal = () => {
        setmodalOpen(true);
      };

      const closeModal = () => {
        setmodalOpen(false);
      };

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleFilter = event => {
        setFilter(event.target.value)
      };
      // Gathers information from the Firestore Database through an Endpoint API call 
      useEffect(() => {
        axiosAPI.get('/api/Recipe').then(res =>{
              const recipeData = res.data;
              for (let id in recipeData) {
                const ingredArray = Array.from(JSON.parse(recipeData[id].ingredients));
                recipeData[id].ingredients = ingredArray.map(item => item.value);
              }
              setRecipes(recipeData);
        });
      }, []);
      // Sends a Delete Endpoint API call for the recipe
      const handleDelete = event => {
        const delUrl = '/api/Recipe/' + event;
        axiosAPI.delete(delUrl).then(res =>{
          window.location.reload();
        })
      };
      // Sends the user input back to the endpoint to get filtered recipes based on what they want
      const handleSearch = () => {
        const filterUrl = '/api/recipe/Filter/' + filter;
        axiosAPI.get(filterUrl).then(res =>{
          const recipeData = res.data;
          for (let id in recipeData) {
            const ingredArray = Array.from(JSON.parse(recipeData[id].ingredients));
            recipeData[id].ingredients = ingredArray.map(item => item.value);
          }
          setRecipes(Array.from(recipeData));
        });
      };

      return (
            <div className="RecipeMain">
              <Grid justifyContent="space-between" container>
                <Grid item xs={2}></Grid>
                <Grid item>
                    <div alignitems='center'>
                    <center><h1> Recipe List</h1></center>
                    </div>
                </Grid>
                <Grid item >
                  <div style={{ padding: 20 }}>
                    <TextField id="outlined-basic" label="Search" variant="outlined" style = {{width: "300px"}} onChange={(event)=>handleFilter(event)}/>
                    <Button variant="contained" size="small" color="primary" style = {{height: "55px"}} onClick={(event) => handleSearch() }>
                      Search
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {recipes.map((recipe) => (
                    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={recipe.image}
                          title="Default"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {recipe.title}
                          </Typography>
                          <Typography>
                            {recipe.description}
                          </Typography>
                        </CardContent>
                        <CardActions style={{ paddingLeft: '13px' }}>
                          <Button variant="contained" size="small" color="default" className={classes.button} onClick={() => { setRecipe({...recipe}); showModal();}} startIcon={<Visibility />}>
                            View
                          </Button>
                    
                          <Link to={{pathname: "/EditRecipe", state: { data: recipe.id }}} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" size="small" color="primary" onClick={handleOpen} className={classes.button} startIcon={<Edit />}>
                              Edit
                            </Button>
                          </Link>
                          <Button variant="contained" size="small" color="secondary" onClick={(event) => handleDelete( recipe.id ) } className={classes.button} startIcon={<Delete />}>
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Modal
                  open={modalOpen}
                  onClose={closeModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                      <h2 id="simple-modal-title">{currRecipe.title}</h2>
                        <p id="simple-modal-description">
                          {currRecipe.description}
                        </p>
                        <p>{Array.from(currRecipe.ingredients).map((ingredient) => {
                          return <li key={ingredient}>{ingredient}</li>
                        })}</p>
                        <p>{currRecipe.method}</p>     
                    </div>
                </Modal>
              </Container>
            </div>
      )
}

