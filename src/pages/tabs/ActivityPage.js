import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PostList from '../../components/PostList';

import colors from '../../assets/styles/colors';
import spacing from '../../assets/styles/spacing';
import fontSizes from '../../assets/styles/fontSizes';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../../actions/postActions';

class ActivityPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.postActions.getPosts();
  }

  composeActivity(user) {
    this.props.navigation.navigate('AddActivityPage', user);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.bottomBorder]}>
          <TouchableOpacity style={styles.textInputMock} onPress={() => this.composeActivity(state.sessionState.user)}>
            <Text style={styles.placeholder}>Post something</Text>
          </TouchableOpacity>
        </View>
        <PostList posts={state.postsState.posts} {...actions}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bglightgray,
  },
  bottomBorder: {
    height: 50,
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInputMock: {
    marginLeft: spacing.normal,
    flex: 1,
    justifyContent: 'center'
  },
  placeholder: {
    fontSize: fontSizes.normal,
    color: colors.gray,
    fontStyle: 'italic'
  },

});

// These become the component state.
// This is auto-subscription to the state changes
export default connect(state => ({
    state
  }),
  dispatch => ({
    postActions: bindActionCreators(postActions, dispatch)
  })
)(ActivityPage);