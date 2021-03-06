/**
 * Created by zachary on 2016/12/9.
 */

import * as AuthTypes from '../constants/authActionTypes'
import {REHYDRATE} from 'redux-persist/constants'
import {Map, List} from 'immutable'
import {UserState, UserInfo, HealthProfile} from '../models/userModels'
import {activeUserId} from '../selector/authSelector'


const initialState = new UserState()

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case AuthTypes.REGISTER_SUCCESS:
      return handleRegisterSuccess(state, action)
    case AuthTypes.LOGIN_SUCCESS:
      return handleLoginSuccess(state, action)
    case AuthTypes.LOGIN_OUT:
      return handleUserLogout(state, action)
    case AuthTypes.SHOP_CERTIFICATION_SUCCESS:
      return handleShopCertificationSuccess(state, action)
    case AuthTypes.PROFILE_SUBMIT_SUCCESS:
      return handleProfileSubmitSuccess(state, action)
    case AuthTypes.ADD_USER_PROFILE:
      return handleAddUserProfile(state, action)
    case AuthTypes.ADD_USER_PROFILES:
      return handleAddUserProfiles(state, action)  
    case AuthTypes.FETCH_USER_FOLLOWERS_SUCCESS:
      return handleFetchUserFollowersSuccess(state, action)
    case AuthTypes.FETCH_USER_FOLLOWERS_PAGING_SUCCESS:
      return handleFetchUserFollowersPagingSuccess(state, action)  
    case AuthTypes.FETCH_USER_FOLLOWERS_TOTAL_COUNT_SUCCESS:
      return handleFetchUserFollowersTotalCountSuccess(state, action)
    case AuthTypes.FETCH_USER_FOLLOWEES_SUCCESS:
      return handleFetchUserFolloweesSuccess(state, action)
    case AuthTypes.FETCH_USER_FOLLOWEES_PAGING_SUCCESS:
      return handleFetchUserFolloweesPagingSuccess(state, action)
    case AuthTypes.FETCH_USER_FAVORITEARTICLE_SUCCESS:
      return handleFetchUserFavoriteArticleSuccess(state,action)
    case AuthTypes.ADD_HEALTH_PROFILE:
      return handleAddHealthProfile(state, action)
    case AuthTypes.ADD_PERSONAL_IDENTITY:
      return handleAddPersonalIdentity(state, action)
    case AuthTypes.UPDATE_USER_POINT:
      return handleUserPoint(state, action)
    case AuthTypes.UPDATE_USER_IDENTITY:
      return handleUpdateUserIdentity(state, action)
    case REHYDRATE:
      return onRehydrate(state, action)
    default:
      return state
  }
}

function handleUpdateUserIdentity(state, action){
  let newIdentity = action.payload.identity
  let activeUser = state.get('activeUser')
  state = state.setIn(['profiles', activeUser, 'identity'], newIdentity)
  return state
}

function handleRegisterSuccess(state, action) {
  let userInfo = action.payload.userInfo
  state = state.set('activeUser', userInfo.id)
  state = state.set('token', action.payload.token)
  state = state.setIn(['profiles', userInfo.id], userInfo)
  return state
}

function handleLoginSuccess(state, action) {
  const userInfo = action.payload.userInfo
  state = state.set('activeUser', userInfo.get('id'))
  state = state.set('token', userInfo.get('token'))
  state = state.setIn(['profiles', userInfo.id], userInfo)
  return state
}

function handleUserLogout(state, action) {
  let activeUser = state.get('activeUser')
  state = state.set('activeUser', undefined)
  state = state.set('token', undefined)
  state = state.deleteIn(['profiles', activeUser])
  return state
}

function handleShopCertificationSuccess(state, action) {
  let payload = action.payload
  let shop = payload.shop
  state = state.set('shop',  shop)
  return state
}

function handleProfileSubmitSuccess(state, action) {
  let userInfo = action.payload.userInfo

  state = state.setIn(['profiles', userInfo.id], userInfo)
  return state
}

function handleAddUserProfile(state, action) {
  let userInfo = action.payload.userInfo
  state = state.setIn(['profiles', userInfo.id], userInfo)
  return state
}

function handleAddUserProfiles(state, action) {
  let userProfiles = action.payload.userProfiles
  userProfiles.forEach((userInfo) => {
    state = state.setIn(['profiles', userInfo.id], userInfo)
  })
  return state
}

function handleFetchUserFolloweesSuccess(state, action) {
  let currentUserId = action.payload.currentUserId
  let followees = action.payload.followees
  state = state.setIn(['followees', currentUserId], followees)
  return state
}

function handleFetchUserFolloweesPagingSuccess(state, action) {
  let payload = action.payload
  let currentUserId = payload.currentUserId
  let followees = payload.followees
  let _followees = state.getIn(['followees', currentUserId])
  let newFollowees = _followees.concat(followees)
  state = state.setIn(['followees', currentUserId], newFollowees)
  return state
}

function handleFetchUserFollowersSuccess(state, action) {
  let userId = action.payload.userId
  let followers = action.payload.followers
  state = state.setIn(['followers', userId], followers)
  return state
}

function handleFetchUserFollowersPagingSuccess(state, action) {
  let payload = action.payload
  let userId = payload.userId
  let followers = payload.followers
  let _followers = state.getIn(['followers', userId])
  let newFollowers = _followers.concat(followers)
  state = state.setIn(['followers', userId], newFollowers)
  return state
}

function handleFetchUserFollowersTotalCountSuccess(state, action) {
  let userId = action.payload.userId
  let followersTotalCount = action.payload.followersTotalCount
  state = state.setIn(['followersTotalCount', userId], followersTotalCount)
  return state
}

function handleFetchUserFavoriteArticleSuccess(state,action){
  let currentUserId = action.payload.currentUserId
  let favoriteArticles = action.payload.favoriteArticles
  state = state.setIn(['favoriteArticles',currentUserId],favoriteArticles)
  return state
}

function handleAddHealthProfile(state, action) {
  let healthProfile = action.payload.result.healthProfile
  // console.log("handleAddHealthProgfile healthProfile", healthProfile)
  state = state.setIn(['healthProfiles', healthProfile.get('id')], healthProfile)
  return state
}

function handleAddPersonalIdentity(state, action) {
  let newIdentity = action.payload.identity
  let activeUser = state.get('activeUser')
  let identity = state.getIn(['profiles', activeUser, 'identity'])
  if (!identity) {
    state = state.setIn(['profiles', activeUser, 'identity'], new List([newIdentity]))
  } else if (-1 == identity.indexOf(newIdentity)) {
    identity = identity.push(newIdentity)
    state = state.setIn(['profiles', activeUser, 'identity'], identity)
  }
  return state
}

function handleUserPoint(state, action) {
  let point = action.payload.point
  let userId = action.payload.userId
  state = state.setIn(['points', userId], point)
  return state
}

function onRehydrate(state, action) {
  var incoming = action.payload.AUTH
  console.log("onRehydrate incoming", incoming)
  if (incoming) {
    if (!incoming.activeUser) {
      return state
    }
    state = state.set('activeUser', incoming.activeUser)
    state = state.set('token', incoming.token)

    const profiles = Map(incoming.profiles)
    try {
      for (let [userId, profile] of profiles) {
        if (userId && profile) {
          const userInfo = new UserInfo({...profile})
          state = state.setIn(['profiles', userId], userInfo)
        }
      }
    } catch (e) {
      profiles.clear()
    }

    const healthProfiles = Map(incoming.healthProfiles)
    try {
      for (let [userId, profile] of healthProfiles) {
        if (userId && profile) {
          const healthProfile = new HealthProfile({...profile})
          state = state.setIn(['healthProfiles', userId], healthProfile)
        }
      }
    } catch (e) {
      healthProfiles.clear()
    }
  }
  return state
}