
import {createAction} from 'redux-actions'
import * as topicActionTypes from '../constants/topicActionTypes'
import * as uiTypes from '../constants/uiActionTypes'
import {getInputFormData, isInputFormValid} from '../selector/inputFormSelector'
import * as lcTopics from '../api/leancloud/topics'

export const TOPIC_FORM_SUBMIT_TYPE = {
  PUBLISH_TOPICS: 'PUBLISH_TOPICS',
}

export function publishTopicFormData(payload) {
  return (dispatch, getState) => {
    let formCheck = createAction(uiTypes.INPUTFORM_VALID_CHECK)
    dispatch(formCheck({formKey: payload.formKey}))
    let isFormValid = isInputFormValid(getState(), payload.formKey)
    if (!isFormValid.isValid) {
      if (payload.error) {
        payload.error({message: isFormValid.errMsg})
      }
      return
    }
    const formData = getInputFormData(getState(), payload.formKey)
    switch (payload.submitType) {
      case TOPIC_FORM_SUBMIT_TYPE.PUBLISH_TOPICS:
        dispatch(handlePublishTopic(payload, formData))
        break
    }
  }
}


function handlePublishTopic(payload, formData) {
  return (dispatch, getState) => {
    let publishTopicPayload = {
      title: formData.articleName.text,
      content: formData.articleContent.text,
      categoryId: payload.categoryId,
    }
    lcTopics.pubishTopics(publishTopicPayload).then(() => {
      if(payload.success){
        console.log("----><___444444_________public tosssss")
        payload.success()
      }
      let publishAction = createAction(topicActionTypes.PUBLISH_SUCCESS)
      dispatch(publishAction({stateKey: payload.stateKey}))
    }).catch((error) => {
      if(payload.error){
        payload.error(error)
      }
    })
  }
}