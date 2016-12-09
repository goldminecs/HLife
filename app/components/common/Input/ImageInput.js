/**
 * Created by yangyang on 2016/12/7.
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import  ImagePicker from 'react-native-image-crop-picker'
import ActionSheet from 'react-native-actionsheet'

class ImageInput extends Component {
  constructor(props) {
    super(props)
  }

  selectImg() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.defaultContainerStyle, this.props.containerStyle]}>
          <TouchableOpacity style={{flex: 1}} onPress={this.selectImg()}>
            <View style={styles.addImageViewStyle}>
              <Image style={[styles.defaultAddImageBtnStyle, this.props.addImageBtnStyle]}
                     source={require('../../../assets/images/default_picture.png')}/>
              <Text style={[styles.defaultAddImageTextStyle, this.props.addImageTextStyle]}>{this.props.prompt}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ImageInput.defaultProps = {
  containerStyle: {},
  addImageViewStyle: {},
  addImageBtnStyle: {},
  addImageTextStyle: {},
  addImage: '../../../assets/images/home_more.png',
  prompt: "选择图片",
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ImageInput)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultContainerStyle: {
    height: 100,
    width: 100,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    backgroundColor: '#F3F3F3',
  },
  defaultAddImageBtnStyle: {
    position: 'absolute',
    top: 20,
    left: 25,
    width: 50,
    height: 50,
  },
  defaultAddImageTextStyle: {
    fontSize: 12,
    position: 'absolute',
    bottom: 6,
    left: 25,
  },
})