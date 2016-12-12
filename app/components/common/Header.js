import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {em, normalizeW, normalizeH, normalizeBorder} from '../../util/Responsive'
import THEME from '../../constants/themes/theme1'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  renderLeft() {
  	if(this.props.leftType == 'icon'){
  		return (
        <View style={styles.leftWrap}>
          <TouchableOpacity style={[styles.leftContainer, this.props.leftContainerStyle]} onPress={() => this.props.leftPress()}>
            <Icon
              name={this.props.leftIconName}
              style={[styles.left, this.props.leftStyle]} />
            {this.props.leftIconLabel
              ? <Text style={[styles.leftIconLabel, this.props.leftIconLabelStyle]}>{this.props.leftIconLabel}</Text>
              : <View/>}
          </TouchableOpacity>
        </View>
      )
  	}else if(this.props.leftType == 'image') {
			return (
        <View style={styles.leftWrap}>
          <TouchableOpacity style={[styles.leftContainer, this.props.leftContainerStyle]} onPress={() => this.props.leftPress()}>
            <Image source={this.props.leftImageSource} style={[styles.leftImage, this.props.leftStyle]}></Image>
            {this.props.leftImageLabel
              ? <Text style={[styles.leftImageLabel, this.props.leftImageLabelStyle]}>{this.props.leftImageLabel}</Text>
              : <View/>}
          </TouchableOpacity>
        </View>
      )
  	}else if(this.props.leftType == 'text') {
			return (
        <View style={styles.leftWrap}>
          <TouchableOpacity style={[styles.leftContainer, this.props.leftContainerStyle]} onPress={() => this.props.leftPress()}>
          	<Text style={[styles.left, this.props.leftStyle]}>{this.props.leftText}</Text>  
          </TouchableOpacity>
        </View>
      )
  	}else {
      return (
        <View />
      )
    }
  }

  renderRight() {
  	if(this.props.rightType == 'icon'){
  		return (
      <View style={styles.rightWrap}>
        <TouchableOpacity style={[styles.rightContainer, this.props.rightContainerStyle]} onPress={() => this.props.rightPress()}>
          <Icon
            name={this.props.rightIconName}
            style={[styles.right, this.props.rightStyle]} />
          {this.props.rightIconLabel
            ? <Text style={[styles.rightIconLabel, this.props.rightIconLabelStyle]}>{this.props.rightIconLabel}</Text>
            : <View/>}
        </TouchableOpacity>
      </View>
    )
  	}else if(this.props.rightType == 'image') {
			return (
        <View style={styles.rightWrap}>
          <TouchableOpacity style={[styles.rightContainer, this.props.rightContainerStyle]} onPress={() => this.props.rightPress()}>
            {this.props.rightImageLabel
              ? <Text style={[styles.rightImageLabel, this.props.rightImageLabelStyle]}>{this.props.rightImageLabel}</Text>
              : <View/>}
            <Image source={this.props.rightImageSource} style={[styles.rightImage, this.props.rightStyle]}></Image>
          </TouchableOpacity>
        </View>
      )
  	}else if(this.props.rightType == 'text') {
			return (
        <View style={styles.rightWrap}>
          <TouchableOpacity style={[styles.rightContainer, this.props.rightContainerStyle]} onPress={() => this.props.rightPress()}>
          	<Text style={[styles.right, this.props.rightStyle]}>{this.props.rightText}</Text>  
          </TouchableOpacity>
        </View>
      )
  	}else {
      return (
        <View />
      )
    }
  }

  render() {
    return (
      <View style={styles.header}>
      	{this.renderLeft()}
        <View style={styles.titleWrap}>
          <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        </View>
        {this.renderRight()}
      </View>
    )
  }

}

Header.defaultProps = {
	leftType: 'icon',
	leftIconName: 'ios-arrow-back',
	title: '登录',
	rightType: 'text',
	rightText: '快速注册'
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    backgroundColor: '#f3f3f3',
    ...Platform.select({
      ios: {
        paddingTop: normalizeH(20)
      }
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottomWidth: normalizeBorder(),
    borderBottomColor: '#B2B2B2',
    height: normalizeH(64)
  },
  leftWrap: {
    flex: 1,
    paddingLeft: 12
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  left: {
    fontSize: em(24),
    color: '#50E3C2',
  },
  leftImage: {
    marginRight: 3
  },
  leftImageLabel: {
    color: THEME.colors.gray
  },
  titleWrap: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  title: {
    fontSize: em(17),
    color: '#030303',
    alignSelf: 'center'
  },
  rightWrap: {
    flex: 1,
    paddingRight: 12
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  right: {
    fontSize: em(17),
    color: '#50E3C2',
  },
  rightImage: {
    marginLeft: 3
  }
})