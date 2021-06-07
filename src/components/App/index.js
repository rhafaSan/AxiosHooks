import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Add, List, Edit } from '../../components/Category/index';
import Login from '../User/Login/index';

const App = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/user">
                    Full Stack Devs
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/category"} className="nav-link">
                            Categories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>
            <div className="container mt-3"> 
                <Switch>
                    <Route exact path={["/", '/user']} component={Login} />
                    <Route exact path={"/category"} component={List} />
                    <Route exact path="/add" component={Add} />
                    <Route exact path="/category/:id" component={Edit} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
