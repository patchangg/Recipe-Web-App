import axios from "axios";
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, 
  Container, Grid, Modal, makeStyles, TextField, Typography } from '@material-ui/core';
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
const axiosAPI = axios.create({
  baseURL: 'https://localhost:5001',
  headers: {'Access-Control-Allow-Origin': 'https://localhost:5001',
              "Content-type": "application/json"}
})

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

    //const cards = [0,1,2,2123132132];

export default function RecipeList() {
      const classes = useStyles();
      const [modalStyle] = useState(getModalStyle);
      const [open, setOpen] = useState(false);
      // const [appState, setAppState] = useState({
      //   recipes: []
      // });
      const [recipes,setRecipes] = useState([])
      //const [cardz,setCardz] = useState(0)
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      // const body = (
      //   <div style={modalStyle} className={classes.paper}>
      //     <h2 id="simple-modal-title">Text in a modal</h2>
      //     <p id="simple-modal-description">
      //       Hello There
      //     </p>
      //   </div>
      // );

      useEffect(() => {
        axiosAPI.get('/api/Recipe').then(res =>{
              console.log(res.data)
              const databby = res.data;
              //setAppState({ recipes: databby })
              setRecipes(databby)
        });
      }, [] );

      const handleDelete = event => {
        //event.preventDefault();
        const delUrl = '/api/Recipe/' + event
        console.log(delUrl + "hello")
        axiosAPI.delete(delUrl).then(res =>{
          console.log(res.data)
          window.location.reload();
        })
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
                          image="https://source.unsplash.com/random"
                          title="Image title"
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
                          <Button variant="contained" size="small" color="default" onClick={handleOpen} className={classes.button} startIcon={<Visibility />}>
                            View
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                          >
                              <div style={modalStyle} className={classes.paper}>
                                <h2 id="simple-modal-title">{recipe.title}</h2>
                                  <p id="simple-modal-description">
                                    {recipe.description}
                                    {recipe.ingredients}
                                    {recipe.method}
                                  </p>
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

