/**
 * Created by zachary on 2017/1/3.
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  InteractionManager
} from 'react-native'

import {em, normalizeW, normalizeH, normalizeBorder} from '../../util/Responsive'
import THEME from '../../constants/themes/theme1'

export default class ScoreShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scoreWidth : (this.props.score || 0) / 5.0 * 62
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.score != newProps.score) {
      this.state = {
        scoreWidth : (newProps.score || 0) / 5.0 * 62
      }
    }
  }

  renderStart() {
    if (this.props.bgColor === 'grey') {
      return (
        <Image style={styles.scoreIcon} source={require('../../assets/images/star_grey_unselect.png')}/>
      )
    }
    return (
      <Image style={styles.scoreIcon} source={require('../../assets/images/star_empty.png')}/>
    )
  }

  render() {
    return (
      <View style={[styles.scoresWrap, this.props.containerStyle]}>
        <View style={styles.scoreIconGroup}>
          <View style={[styles.scoreBackDrop, {width: this.state.scoreWidth}]}></View>
          {this.renderStart()}
        </View>
        <Text style={styles.score}>{this.props.score}</Text>
      </View>
    )
  }
}

ScoreShow.defaultProps = {
  bgColor: 'white',
}

const styles = StyleSheet.create({
  scoresWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: normalizeW(36)
  },
  scoreIconGroup: {
    width: 62,
    height: 11,
    backgroundColor: '#d8d8d8'
  },
  scoreBackDrop: {
    height: 11,
    backgroundColor: '#f5a623'
  },
  scoreIcon: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  score: {
    marginLeft: 5,
    color: '#f5a623',
    fontSize: em(12)
  },
})