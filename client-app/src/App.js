import { Route, Switch, withRouter } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import HelpRecipe from './HelpRecipe';
import RecipeList from './RecipeList';
import Navbar from './Navbar';
import Footer from './Footer';

export default function App() {

      return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path ="/" component={withRouter(RecipeList)}/>
            <Route path ="/AddRecipe" component={withRouter(AddRecipe)}/>
            <Route path ="/HelpRecipe" component={withRouter(HelpRecipe)}/>
          </Switch>
          <Footer />
        </div>
      );
      
}
