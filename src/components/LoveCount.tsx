import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import colors from '../assets/styles/colors'
import get from 'lodash-es/get'

function LC(props) {
  const { loveCount, lovedByCurrentUser } = props
  // Box 1
  if (loveCount > 2) {
    if (lovedByCurrentUser) {
      return <Text style={styles.text}>You and {loveCount - 1} love this</Text>
    } else {
      return <Text style={styles.text}>{loveCount} people love this </Text>
    }
  }

  // Box 2
  else if (loveCount === 2) {
    if (lovedByCurrentUser) {
      return <Text style={styles.text}>You and 1 other love this</Text>
    } else {
      return <Text style={styles.text}>2 people love this</Text>
    }
  }

  // Box 3
  else if (loveCount === 1) {
    if (lovedByCurrentUser) {
      return <Text style={styles.text}>You love this</Text>
    } else {
      return <Text style={styles.text}>1 person loves this</Text>
    }
  }

  // Box 4
  else {
    return <Text style={styles.text}>Be the first to love this</Text>
  }
}

interface ILoveCountProps {
  loveCount: number,
  lovedByCurrentUser: boolean
}

export default class LoveCount extends Component<ILoveCountProps> {
  constructor(props) {
    super(props)
  }

  loveCount(post) {
    return Object.keys(get(post, 'lovedBy', {})).length
  }

  render() {
    const { loveCount, lovedByCurrentUser } = this.props
    return (
      <View>
        <LC loveCount={loveCount} lovedByCurrentUser={lovedByCurrentUser} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.textMuted
  }
})