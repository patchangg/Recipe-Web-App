import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
      BrowserRouter as Router,
      Link,
      Route,
      Switch,
    } from 'react-router-dom';
import React from 'react';

export default function RecipeList() {
      const preventDefault = (event) => event.preventDefault();

      return (
            <div className="RecipeMain">
                  <AppBar position="static" style={{ background: '#2E3B55' }}>
                  <Toolbar>
                        <Grid container spacing={10}>
                        <Grid item xs={11}>
                        <Typography variant="h6">Recipe Web App</Typography>
                        <Link to="/">
                              <Button color="inherit">
                                    Home
                              </Button>
                        </Link>
                        <Link to="/AddRecipe">
                              <Button color="inherit">
                                    Add Recipe
                              </Button> 
                        </Link>
                        </Grid>

                        <Grid item xs={1}>
                              <div>
                              <Button color="inherit" onClick={() => { alert('I died') }}>
                              Help
                              </Button>
                              </div>
                        </Grid>
                        </Grid>
                  </Toolbar>
                  </AppBar>
                  <Grid container spacing={2} justify="center">
                        <Grid item>
                              <Paper style={{height:75,width:50,}}/>
                        </Grid>
                        <Grid item>
                              <Paper style={{height:75,width:50,}}/>
                        </Grid>
                        <Grid item>
                              <Paper style={{height:75,width:50,}}/>
                        </Grid>
                  </Grid>
            </div>
      )
}

