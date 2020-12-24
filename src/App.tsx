import React, {PureComponent} from 'react';
import './App.less';
import {RouterOutlet} from './core/router';
import appRoutes from './App.routes';

class App extends PureComponent {
    render() {
        return <RouterOutlet routes={appRoutes}/>;
    }
}

export default App;
