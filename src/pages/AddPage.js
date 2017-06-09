import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import colors from '../assets/styles/colors';

import graphqlService from '../services/graphql.service'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../actions/post.actions';

function AddActivity(props) {
  const isLoggedIn = props.isLoggedIn;
  if (!isLoggedIn) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No user profile yet...</Text>
      </View>
    )
  } else {
    return (
      <View style={{ padding: 20 }}>
        <TextInput
          autoFocus={true}
          style={{height: 150, fontSize: 16}}
          placeholder="What's on your mind?"
          onChangeText={(text) => this.onTextChange(text)}
          multiline={true}/>
        <Button title="Post" onPress={() => this.addPost()}/>
      </View>
    )
  }
}

class AddPage extends Component {

  constructor(props) {
    super(props);
  }

  onTextChange(text) {
    this.setState({ text });
  }

  addPost() {
    const post = { content: this.state.text, userId: "58d9eafafa8beec1b2c33cbb" }
    graphqlService.mutate(`mutation ($post: PostInput!) { addPost(post: $post) { _id state content createdAt user {username} } }`, { post }).then(data => {
      const post = data.addPost;
      this.props.actions.addPost(post);
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>

        <AddActivity isLoggedIn={false}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bglightgray,
  }
});

export default connect(null,
  (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(AddPage);