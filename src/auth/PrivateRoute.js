/*
 * Copyright (c) 2019 simplenodeorm.org
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, config: config, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem(config.appname + '-auth')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);