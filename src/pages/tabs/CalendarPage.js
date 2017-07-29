import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import spacing from '../../assets/styles/spacing'
import colors from '../../assets/styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from '../../utils/moment'

export default class CalendarPage extends Component {
  selectedMonth() {
    return moment().format('MMMM')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendarNav}>

          <View style={styles.side}>
            <TouchableOpacity>
              <Icon name="search" style={styles.icon} />
            </TouchableOpacity>
          </View>


          <View style={styles.center}>
            <TouchableOpacity style={styles.center}>
              <Text style={{ color: colors.gray, fontSize: 20 }}>{this.selectedMonth()}</Text>
              <Icon name="caret-down" style={[styles.icon, {marginLeft: spacing.xxsmall, fontSize: 14}]}/>
            </TouchableOpacity>
          </View>


          <View style={styles.side}>
            <TouchableOpacity>
              <Icon name="plus" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bggray,
  },
  calendarNav: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xsmall,
    paddingBottom: spacing.xsmall,
    backgroundColor: colors.white,
  },
  side: {
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: colors.gray
  }
})