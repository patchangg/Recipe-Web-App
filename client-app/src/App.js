import { Route, Switch, withRouter } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import HelpRecipe from './HelpRecipe';
import RecipeList from './RecipeList';

export default function App() {
      return (
        <div className="App">
          <Switch>
            <Route exact path ="/" component={withRouter(RecipeList)}/>
            <Route path ="/AddRecipe" component={withRouter(AddRecipe)}/>
            <Route path ="/HelpRecipe" component={withRouter(HelpRecipe)}/>
          </Switch>
        </div>
      );
}
