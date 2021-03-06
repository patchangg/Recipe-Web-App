import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import HelpRecipe from './HelpRecipe';
import RecipeList from './RecipeList';
import Navbar from './Navbar';
import Footer from './Footer';
import PrivacyPolicy from './PrivacyPolicy';
import TOS from './TOS';

export default function App() {

      return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path ="/" component={withRouter(RecipeList)}/>
            <Route path ="/AddRecipe" component={withRouter(AddRecipe)}/>
            <Route path ="/EditRecipe" component={withRouter(EditRecipe)}/>
            <Route path ="/HelpRecipe" component={withRouter(HelpRecipe)}/>
            <Route path ="/PrivacyPolicy" component={withRouter(PrivacyPolicy)}/>
            <Route path ="/TOS" component={withRouter(TOS)}/>
          </Switch>
          <Footer />
        </div>
      );
      
}
