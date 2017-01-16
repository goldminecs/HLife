/**
 * Created by zachary on 2017/1/10.
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
  Image,
  Platform,
  InteractionManager
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Symbol from 'es6-symbol'
import {Actions} from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {em, normalizeW, normalizeH, normalizeBorder} from '../../../util/Responsive'
import THEME from '../../../constants/themes/theme1'
import * as appConfig from '../../../constants/appConfig'
import Header from '../../common/Header'
import ImageInput from '../../common/Input/ImageInput'
import {submitFormData, submitInputData,INPUT_FORM_SUBMIT_TYPE} from '../../../action/authActions'
import * as Toast from '../../common/Toast'

const PAGE_WIDTH = Dimensions.get('window').width
const PAGE_HEIGHT = Dimensions.get('window').height

let commonForm = Symbol('commonForm')
const shopCoverInput = {
  formKey: commonForm,
  stateKey: Symbol('shopCoverInput'),
  type: 'shopCoverInput'
}


class UpdateShopCover extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(()=>{

    })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

    })
  }

  componentWillReceiveProps(nextProps) {

  }

  updateShopCover() {
    this.props.submitFormData({
      formKey: commonForm,
      id: this.props.id,
      submitType: INPUT_FORM_SUBMIT_TYPE.UPDATE_SHOP_COVER,
      success: this.submitSuccessCallback,
      error: this.submitErrorCallback
    })
  }

  submitSuccessCallback() {
    Toast.show('更新成功', {
      duration: 1500,
      onHidden: () =>{
        Actions.SHOP_MANAGE_INDEX()
      }
    })
  }

  submitErrorCallback(error) {
    Toast.show(error.message || '更新失败')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftType="text"
          leftText="取消"
          leftPress={() => Actions.pop()}
          title="编辑封面"
          headerContainerStyle={styles.headerContainerStyle}
          leftStyle={styles.headerLeftStyle}
          titleStyle={styles.headerTitleStyle}
          rightType="text"
          rightText="完成"
          rightPress={()=>{this.updateShopCover()}}
          rightStyle={styles.headerRightStyle}
        />
        <View style={styles.body}>
          <View style={{}}>
            <ImageInput
              {...shopCoverInput}
              containerStyle={{width: PAGE_WIDTH, height: 156,borderWidth:0}}
              addImageBtnStyle={{top:0, left: 0, width: PAGE_WIDTH, height: 156}}
              choosenImageStyle={{width: PAGE_WIDTH, height: 156}}
              addImage={require('../../../assets/images/default_upload.png')}
              closeModalAfterSelectedImg={true}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  submitFormData,
  submitInputData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShopCover)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  headerContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: THEME.colors.green,
    ...Platform.select({
      ios: {
        paddingTop: 20,
        height: 64
      },
      android: {
        height: 44
      }
    }),
  },
  headerLeftStyle: {
    color: '#fff',
    fontSize: em(17)
  },
  headerTitleStyle: {
    color: '#fff',
    fontSize: em(17)
  },
  headerRightStyle: {
    color: '#fff',
    fontSize: em(17)
  },
  body: {
    ...Platform.select({
      ios: {
        paddingTop: 64,
      },
      android: {
        paddingTop: 44
      }
    }),
    flex: 1,
    backgroundColor: '#fff'
  },

})