import axios from "axios";
import firebase from './util/Firebase.js';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, 
  Container, Grid, makeStyles, TextField, Typography, Modal } from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const axiosAPI = axios.create({
//   baseURL: 'https://localhost:5001',
//   headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
//               "Content-type": "application/json"}
// })

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
      const [open, setOpen] = useState(false);
      const [modalStyle] = useState(getModalStyle);
      const [currRecipe, setRecipe] = useState({id:'', title:'', description:'', ingredients:'', method:'', image:''});
      const [modalOpen, setmodalOpen] = useState(false);
      const [recipes,setRecipes] = useState([]);

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

      useEffect(() => {
      //   axiosAPI.get('/api/Recipe').then(res =>{
      //         const recipeData = res.data;
      //         //setAppState({ recipes: recipeData })
      //         //console.log(recipeData);
      //         setRecipes(recipeData);
      //   });
        const recipeGDBRef = firebase.database().ref('RecipeWebApp')
        recipeGDBRef.on('value',(snapshot) =>{
          const recipesGot = snapshot.val();
          console.log(recipesGot)
          const recipesList = [];
          const counter = 0
          for (let id in recipesGot) {
            //console.log(recipesGot[id])
            //console.log(recipesGot[id].ingredients)
            const title = recipesGot[id].title
            const description = recipesGot[id].description
            const image = recipesGot[id].image
            const ingredArray = JSON.parse(recipesGot[id].ingredients)
            const ingredients = [] 
            for (var i=0;i<ingredArray.length;i++) {
                ingredients.push(ingredArray[i].value+"\n")
            }
            console.log(typeof(ingredients),ingredients)
            //const recIngred = recipesGot[id].ingredients
            const method = recipesGot[id].method
            //recipesList.push({id,recTitle,recDesc,recImage,recIngred,recMethod})
            recipesList.push({id,title,description,image,ingredients,method})
             //recipesList.push({id, ... recipesGot[id]});
            // console.log(recipesList[counter].ingredients)
            
          }
          console.log(recipesList)
          setRecipes(recipesList)
        })
      }, []);

      const handleDelete = event => {
        //event.preventDefault();
        // const delUrl = '/api/Recipe/' + event
        // console.log(delUrl + "hello")
        // axiosAPI.delete(delUrl).then(res =>{
        //   console.log(res.data)
        //   window.location.reload();
        // })
        // const recipeGDBRef = firebase.database().ref('RecipeWebApp')
        firebase.database().ref('RecipeWebApp/'+event).remove()
      };

      return (
            <div className="RecipeMain">
              <Grid justify="space-between" container>
                <Grid item xs={2}></Grid>
                <Grid item>
                    <div alignItems='center'>
                    <center><h1> Recipe List</h1></center>
                    </div>
                </Grid>
                <Grid item >
                  <div style={{ padding: 20 }}>
                    <TextField id="outlined-basic" label="Search" variant="outlined" style = {{width: "300px"}}/>
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
                                  <p>{currRecipe.ingredients}</p>
                                  <p>{currRecipe.method}</p>
                                  
                            </div>
                          </Modal>
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
              </Container>
            </div>
      )
}

