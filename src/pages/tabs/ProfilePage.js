import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Button,
} from 'react-native'
import ProfileHeader from '../../components/ProfileHeader'
import ImagePicker from 'react-native-image-crop-picker'

import { currentUserWithId } from '../../utils'
import colors from '../../assets/styles/colors'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase'

import firebaseHelper from '../../utils/firebaseHelper'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.firebase.auth().logout()
  }

  onEditPress() {
    console.log('Edit was pressed')
  }

  changeAvatar(user) {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      const imagePath = image.path
      firebaseHelper.uploadImage(this.props.firebase, 'users', user.id, imagePath).then(photoURL => {
        firebaseHelper.updateUser(this.props.firebase, user.id, { photoURL })
      })
    })
  }

  render() {
    const { currentUser } = this.props
    return (
      <View style={styles.container}>
        <ProfileHeader user={currentUser} onChangeAvatar={() => this.changeAvatar(currentUser)} onEditPress={() => this.onEditPress()}/>
        <Button
          onPress={() => this.logout()}
          title="Log out"
        />
      </View>
    )
  }
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})

export default compose(
  firebaseConnect([
    'users'
  ]),
  connect(
    ({ firebase: { auth, data: { users } } }) => ({
      currentUser: currentUserWithId(users, auth)
    })
  )
)(ProfilePage)