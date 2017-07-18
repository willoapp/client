/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry, View, StatusBar, } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from './reducers';
export default class client extends Component {
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(StatusBar, { barStyle: 'dark-content' }),
                React.createElement(App, null))));
    }
}
AppRegistry.registerComponent('client', () => client);
//# sourceMappingURL=index.ios.js.map