import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

export default function AddRecipe() {
      const preventDefault = (event) => event.preventDefault();

      return (
            <div className="AddRecipe">
                  <AppBar position="static" style={{ background: '#2E3B55' }}>
                  <Toolbar>
                        <Grid container spacing={10}>
                        <Grid item xs={11}>
                        <Button color="inherit" onClick={() => { alert('added') }}>
                              Home
                        </Button> 
                        <Button color="inherit" onClick={() => { alert('added') }}>
                              Add Recipe
                        </Button> 
                        </Grid>

                        <Grid item xs={1}>
                              <div>
                              <Button color="inherit" onClick={() => { alert('I dieded') }}>
                              Help
                              </Button>
                              </div>
                        </Grid>
                        </Grid>
                  </Toolbar>
                  </AppBar>
            </div>
      )
}

