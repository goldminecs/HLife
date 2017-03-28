/**
 * Created by yangyang on 2017/3/24.
 */
import {createAction} from 'redux-actions'
import * as uiTypes from '../constants/uiActionTypes'
import * as promoterActionTypes from '../constants/promoterActionTypes'
import * as lcAuth from '../api/leancloud/auth'
import * as lcPromoter from '../api/leancloud/promoter'
import {getInputFormData, isInputFormValid, getInputData, isInputValid} from '../selector/inputFormSelector'
import {activeUserId, activeUserInfo} from '../selector/authSelector'
import {calRegistPromoter} from '../action/pointActions'
import {IDENTITY_PROMOTER} from '../constants/appConfig'
import * as AuthTypes from '../constants/authActionTypes'
import {PromoterInfo} from '../models/promoterModel'

let formCheck = createAction(uiTypes.INPUTFORM_VALID_CHECK)
const addIdentity = createAction(AuthTypes.ADD_PERSONAL_IDENTITY)
let certificatePromoter = createAction(promoterActionTypes.CERTIFICATE_PROMOTER)
let setActivePromoter = createAction(promoterActionTypes.SET_ACTIVE_PROMOTER)
let updatePromoter = createAction(promoterActionTypes.UPDATE_PROMOTER_INFO)

export function getInviteCode(payload) {
  return (dispatch, getState) => {
    lcPromoter.generateInviteCode().then((code) => {
      if (code.status == 0) {
        let generateInviteCode = createAction(promoterActionTypes.GENERATE_INVITE_CODE)
        dispatch(generateInviteCode({code: code.result}))
      } else {
        if (payload.error) {
          payload.error({message: '生成验证码失败，请重新生成！'})
        }
      }
    })
  }
}

export function promoterCertification(payload) {
  return (dispatch, getState) => {
    dispatch(formCheck({formKey: payload.formKey}))
    let isFormValid = isInputFormValid(getState(), payload.formKey)
    if (!isFormValid.isValid) {
      if (payload.error) {
        payload.error({message: isFormValid.errMsg})
      }
      return
    }
    let formData = getInputFormData(getState(), payload.formKey)
    let smsPayload = {
      phone: formData.phoneInput.text,
      smsAuthCode: formData.smsAuthCodeInput.text,
    }
    lcAuth.verifySmsCode(smsPayload).then(() => {
      let promoterInfo = {
        inviteCode: formData.inviteCodeInput.text,
        name: formData.nameInput.text,
        phone: formData.phoneInput.text,
        address: formData.regionPicker.text,
        cardId: formData.IDInput.text,
      }
      lcPromoter.promoterCertification(promoterInfo).then((promoterInfo) => {
        let promoterId = promoterInfo.promoter.objectId
        let promoter = PromoterInfo.fromLeancloudObject(promoterInfo.promoter)
        dispatch(addIdentity({identity: IDENTITY_PROMOTER}))
        dispatch(setActivePromoter({promoterId}))
        dispatch(updatePromoter({promoterId, promoter}))
        if (payload.success) {
          payload.success(promoterInfo.message)
        }
      }).catch((error) => {
        if (payload.error) {
          payload.error(error)
        }
      })
    }).then(() => {
      let userId = activeUserId(getState())
      dispatch(calRegistPromoter({userId}))   // 计算注册成为推广员的积分
    })
  }
}