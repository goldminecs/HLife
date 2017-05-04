/**
 * Created by yangyang on 2016/12/8.
 */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native'

import {em, normalizeW, normalizeH} from '../../util/Responsive'
import THEME from '../../constants/themes/theme1'

const PAGE_WIDTH=Dimensions.get('window').width

export default class CommonButton extends Component {
  constructor(props) {
    super(props)
  }

  pressAction() {
    // console.log("onPress", this.props.onPress)
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  renderTrip() {
    if(this.props.disabled && this.props.trip) {
      return(
        <Text style={styles.trip}>{this.props.trip}</Text>
      )
    } else {
      return(
        null
      )
    }

  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity style={[styles.defaultBtnStyle, this.props.buttonStyle]}
                          onPress={() => this.pressAction()}
                          disabled={this.props.disabled}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.defaultTitleStyle, this.props.titleStyle]}>{this.props.title}</Text>
            {this.renderTrip()}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

CommonButton.defaultProps = {
  title: '完成',
  disabled: false,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBtnStyle: {
    width: PAGE_WIDTH - normalizeW(34),
    height: normalizeH(50),
    backgroundColor: THEME.base.mainColor,
  },
  defaultTitleStyle: {
    fontSize: em(18),
    color: 'white'
  },
  trip: {
    fontSize: em(14),
    color: 'white'
  }
})