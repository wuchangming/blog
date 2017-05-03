import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';

import rootRoute from './rootRoute';

render(
    <Router history={hashHistory} routes={rootRoute} />,
    document.getElementById('root')
);
