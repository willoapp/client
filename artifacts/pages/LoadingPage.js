import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import colors from '../assets/styles/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
class LoadingPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { state, actions } = this.props;
        return (React.createElement(View, { style: styles.container }));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bggray,
    },
});
// These become the component state.
// This is auto-subscription to the state changes
export default connect(state => ({
    state,
}), dispatch => ({
    sessionActions: bindActionCreators(sessionActions, dispatch),
}))(LoadingPage);
//# sourceMappingURL=LoadingPage.js.map