import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../assets/styles/colors'
import spacing from '../assets/styles/spacing'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HeaderNav extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.mainContainer}>
          <View style={{flex: 1}}/>

          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Willo</Text>
            </View>
          </View>

          {this.props.noButtons ? null : <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => this.props.onProfilePress()}>
              <Icon name="user" style={styles.icon} />
            </TouchableOpacity>
          </View>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairlinegray,
    paddingTop: 15,
    height: 65,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    height: 40,
    overflow: 'hidden'
  },
  logo: {
    marginLeft: 10,
    fontFamily: 'Sacramento-Regular',
    fontSize: 36,
    color: colors.seaside
  },
  icon: {
    fontSize: 24,
    color: colors.seaside,
    marginRight: spacing.small
  }
})
