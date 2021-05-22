import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
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

  
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function RecipeList() {
      const classes = useStyles();
      const [modalStyle] = React.useState(getModalStyle);
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Hello There
          </p>
        </div>
      );

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
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Recipe
                          </Typography>
                          <Typography>
                            Delicious Cake
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button variant="contained" size="small" color="default" onClick={handleOpen} className={classes.button} startIcon={<VisibilityIcon />}>
                            View
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                          >
                            {body}
                          </Modal>
                          <Link to="/EditRecipe" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" size="small" color="primary" onClick={handleOpen} className={classes.button} startIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </Link>
                          <Button variant="contained" size="small" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>
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

