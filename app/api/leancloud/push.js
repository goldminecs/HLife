/**
 * Created by zachary on 2017/3/4.
 */
import AV from 'leancloud-storage'
import {Map, List, Record} from 'immutable'
import ERROR from '../../constants/errorCode'

export function updateDeviceUserInfo(payload) {
  // console.log('updateDeviceUserInfo.payload===', payload)
  let installationId = payload.installationId
  let deviceToken = payload.deviceToken
  let deviceType = payload.deviceType
  let userId = payload.userId
  let removeUser = !!payload.removeUser

  return destroyAllUserDeviceInfos(payload).then(() => {
    return updateInstallationInfo(payload)
  }, () => {
    return updateInstallationInfo(payload)
  })
  

  // let query = new AV.Query('DeviceUserInfo')
  // if(installationId) {
  //   query.equalTo('installationId', installationId)
  // }else {
  //   query.equalTo('deviceToken', deviceToken)
  // }

  // return query.first().then((result)=>{
  //   let deviceUserInfo = null
  //   if(result && result.id) {
  //     deviceUserInfo = AV.Object.createWithoutData('DeviceUserInfo', result.id)
  //   }else {
  //     let DeviceUserInfo = AV.Object.extend('DeviceUserInfo')
  //     deviceUserInfo = new DeviceUserInfo()
  //   }

  //   if(installationId) {
  //     deviceUserInfo.set('installationId', installationId)
  //   }

  //   if(deviceToken) {
  //     deviceUserInfo.set('deviceToken', deviceToken)
  //   }

  //   if(deviceType) {
  //     deviceUserInfo.set('deviceType', deviceType)
  //   }

  //   if(removeUser) {
  //     deviceUserInfo.set('owner', null)
  //   }else {
  //     if(userId) {
  //       let owner = AV.Object.createWithoutData('_User', userId)
  //       deviceUserInfo.set('owner', owner)
  //     }
  //   }

  //   // console.log('deviceUserInfo.save===', deviceUserInfo)
  //   return deviceUserInfo.save().then((data)=>{
  //     return {
  //       objectId: data.id
  //     }
  //   }, (error)=>{
  //     console.log('updateDeviceUserInfo.save error=', error)
  //   })


  // }, (error)=>{
  //   console.log('updateDeviceUserInfo.find error=', error)
  // })

}

export function destroyAllUserDeviceInfos(payload) {
  return new Promise((resolve, reject) => {
    let userId = payload.userId
    // console.log('destroyAllUserDeviceInfos.userId===', userId)
    if(userId) {
      let query = new AV.Query('_Installation')
      let owner = AV.Object.createWithoutData('_User', userId)
      query.equalTo('owner', owner)
      query.find().then((results) => {
        // console.log('destroyAllUserDeviceInfos.results===', results)
        if(results && results.length) {
          let delObjects = []
          results.forEach((item) => {
            let installation = AV.Object.createWithoutData('_Installation', item.id)
            installation.set('owner', null)
            delObjects.push(installation)
          })

          // console.log('destroyAllUserDeviceInfos.delObjects===', delObjects)
          //destroyAll: 没有delete权限，尽量也不要从app端删除数据
          AV.Object.saveAll(delObjects).then(function () {
            // console.log('destroyAllUserDeviceInfos.resolve===')
            resolve()
          }, function (error) {
            reject()
          });
        }else {
          resolve()
        }
      })
    }else{
      resolve()
    }
  })
}

export function updateInstallationInfo(payload) {
  // console.log('updateInstallationInfo.payload===========', payload)
  let installationId = payload.installationId
  let deviceToken = payload.deviceToken
  let deviceType = payload.deviceType
  let userId = payload.userId
  let removeUser = !!payload.removeUser

  let query = new AV.Query('_Installation')
  if(installationId) {
    query.equalTo('installationId', installationId)
  }else {
    query.equalTo('deviceToken', deviceToken)
  }

  return query.first().then((result)=>{
    // console.log('updateInstallationInfo.result===========', result)
    let installationInfo = null
    if(result && result.id) {
      installationInfo = AV.Object.createWithoutData('_Installation', result.id)
    }else {
      let InstallationInfo = AV.Object.extend('_Installation')
      installationInfo = new InstallationInfo()
    }

    if(installationId) {
      installationInfo.set('installationId', installationId)
    }

    if(deviceToken) {
      installationInfo.set('deviceToken', deviceToken)
    }

    if(deviceType) {
      installationInfo.set('deviceType', deviceType)
    }

    if(removeUser) {
      installationInfo.set('owner', null)
    }else {
      if(userId) {
        let owner = AV.Object.createWithoutData('_User', userId)
        installationInfo.set('owner', owner)
      }
    }

    // console.log('updateInstallationInfo.save===', installationInfo)
    return installationInfo.save()
  }, (error)=>{
    console.log('updateInstallationInfo.first error=', error)
  })
}

