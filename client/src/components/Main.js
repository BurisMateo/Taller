import { Component } from 'react';
import AddItem from './AddProduct';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Orders from './Order';

class Main extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/'>
                        <Home/>
                    </Route>
                    <Route path='/home'>
                        <Home/>
                    </Route>
                    <Route path='/addItem'>
                        <AddItem/>
                    </Route>
                    <Route path='/cart'>
                        <Cart/>
                    </Route>
                    <Route path='/orders'>
                        <Orders/>
                    </Route>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect()(Main));