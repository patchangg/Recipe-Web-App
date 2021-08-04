import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Navbar Styling to get consistent spacing
const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        marginRight: theme.spacing(2),
      },
    }));

export default function RecipeList() {
      const classes = useStyles();
      return (
            <div className={classes.root}>
                  <AppBar position="static" style={{ background: '#2E3B55' }}>
                  <Toolbar>
                        <Typography variant="h6">Recipe Manager</Typography>
                              <Typography variant="h6" className={classes.title}>
                                    <Box m={2}>
                                          <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">Home</Button></Link>
                                          &nbsp;&nbsp;
                                          <Link to="/AddRecipe" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">Add Recipe</Button></Link>
                                    </Box>
                        </Typography>
                        <Link to="/HelpRecipe" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">Help</Button></Link>
                  </Toolbar>
                  </AppBar>
            </div>
      )
}

