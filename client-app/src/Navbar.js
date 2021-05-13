import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
      },
    }));
export default function RecipeList() {
      const classes = useStyles();
      return (
            <div className={classes.root}>
                  <AppBar position="static" style={{ background: '#2E3B55' }}>
                  <Toolbar>
                        <Typography variant="h6">Recipe Web App</Typography>
                        <Typography variant="h6" className={classes.title}>
                        <Link to="/"><Button variant="contained" color="primary">Home</Button></Link>
                        <Link to="/AddRecipe"><Button variant="contained" color="primary">Add Recipe</Button></Link>
                        </Typography>
                        <Link to="/HelpRecipe"><Button variant="contained" color="primary">Help</Button></Link>
                  </Toolbar>
                  </AppBar>
            </div>
      )
}

