/**
 * Created by lilu on 2016/12/24.
 */
import {createAction} from 'redux-actions'
import * as laArticle from '../api/leancloud/article'
import * as articleTypes from '../constants/articleActionTypes'

const addArticleAction = createAction(articleTypes.ADD_ARTICLES)
const addUpsAction = createAction(articleTypes.ADD_UPS)
const addUpCountAction = createAction(articleTypes.ADD_UP_COUNT)
const addCommentAction = createAction(articleTypes.ADD_COMMENT)
const addCommentCountAction = createAction(articleTypes.ADD_COMMENT_COUNT)
const addIsUpAction = createAction(articleTypes.UPDATE_ISUP)
const addIsFavoriteAction = createAction(articleTypes.UPDATE_ISFAVORITE)
const addIsUpByCAction = createAction(articleTypes.UPDATE_ISUP_BYC)
export function fetchArticle(payload) {
  return (dispatch, getState) => {
    let columnId = payload
   // console.log('columnId======>',columnId)

    laArticle.getArticle(columnId).then((articleList) => {
     // console.log('articleListh======>',articleList)
    //  console.log('columnId======>',columnId)

      dispatch(addArticleAction({columnId: columnId, articleList: articleList}))
    }).catch((error) => {
      if(payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchIsFavorite(payload){
  return (dispatch, getState) => {
    laArticle.getIsFavorite(payload).then((userInfo) => {
      //let updateAction = createAction(articleTypes.UPDATE_ISUP)
      dispatch(addIsFavoriteAction({articleId: payload.articleId, userInfo: userInfo}))
      if (payload.success) {
        payload.success()
      }
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}

export function favoriteArticle(payload) {
  return (dispatch, getState) => {
    laArticle.favoriteArticle(payload).then(() => {
      if (payload.success) {
        payload.success()
      }
      let publishAction = createAction(articleTypes.FAVORITE_ARTICLE)
      dispatch(publishAction({articleId: payload.articleId}))
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}
export function unFavoriteArticle(payload) {
  return (dispatch, getState) => {
    laArticle.unFavoriteArticle(payload).then(() => {
      if (payload.success) {
        payload.success()
      }
      let publishAction = createAction(articleTypes.FAVORITE_ARTICLE)
      dispatch(publishAction({articleId: payload.articleId}))
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchUps(payload) {
  //console.log('<><><><><>fetchLikers',payload)
  return (dispatch, getState) => {
    let articleId = payload.articleId
    laArticle.getUps(payload).then((upList) => {
     // console.log('likersList======>',upList)
      dispatch(addUpsAction({upList:upList,articleId:articleId}))
    }).catch((error) => {
      if(payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchUpCount(payload) {
  // console.log('<><><><><>fetchLikers',payload)
  return (dispatch, getState) => {
    // let articleId = payload
    laArticle.getUpCount(payload).then((upCount) => {
      //console.log('likersList======>',upList)
      dispatch(addUpCountAction({upCount:upCount,articleId:payload.articleId}))
    }).catch((error) => {
      if(payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchIsUP(payload){
  return (dispatch, getState) => {
    laArticle.getIsUps(payload).then((userUpInfo) => {
      //let updateAction = createAction(articleTypes.UPDATE_ISUP)
      dispatch(addIsUpAction({articleId: payload.articleId, userUpInfo: userUpInfo}))
      if (payload.success) {
        payload.success()
      }
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}

export function upArticle(payload) {
  return (dispatch, getState) => {
    laArticle.upArticle(payload).then(() => {
      if (payload.success) {
        payload.success()
      }
      let publishAction = createAction(articleTypes.UP_ARTICLE_SUCCESS)
      dispatch(publishAction({articleId: payload.articleId}))
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}

export function unUpArticle(payload) {
 // console.log('hereiscode')
  return (dispatch, getState) => {
    laArticle.unUpArticle(payload).then(() => {
      if (payload.success) {
        payload.success()
      }
      let publishAction = createAction(articleTypes.UNUP_ARTICLE_SUCCESS)
      dispatch(publishAction({articleId: payload.articleId}))
    }).catch((error) => {
      if (payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchCommentsArticle(payload) {
  //console.log('comment========>>',payload)
  return (dispatch, getState) => {
   // let articleId = payload
    laArticle.getComment(payload.articleId).then((commentList) => {
      dispatch(addCommentAction({commentList:commentList,articleId:payload.articleId}))
    }).catch((error) => {
      if(payload.error) {
        payload.error(error)
      }
    })
  }
}

export function fetchCommentByCloud(payload){
  return (dispatch,getState)=>{
    laArticle.getCommentByCloud(payload).then((comments)=>{
      dispatch(addCommentAction({commentList:comments,articleId:payload.articleId}))
    //   comments.countList.forEach((upCount)=>{
    //     dispatch(addUpCountAction({upCount:upCount.upCount,articleId:upCount.commentId}))
    // })
    //  console.log('here is word',comments.isUpList)

    //   if(comments.isUpList && comments.isUpList.length){
    // // console.log('here is word')
    //   comments.isUpList.forEach((isUp)=>{
    //     dispatch(addIsUpByCAction({articleId: isUp.commentId, isUp: isUp.isUp}))
    //   })
    //  //    dispatch(addIsUpByCAction({isUpList:comments.isUpList}))
    //   }
    })
  }
}

export function fetchCommentsCount(articleId,columnId) {
  return (dispatch, getState) => {
    // let articleId = payload
    laArticle.getCommentCount(articleId).then((commentsCount) => {
     // console.log('commentsCount',commentsCount)
      dispatch(addCommentCountAction({commentsCount:commentsCount,articleId:articleId}))
    }).catch((error) => {
      if(payload.error) {
        payload.error(error)
      }
    })
  }
}


export function submitArticleComment(payload) {
  //console.log('payLoad====>>>>>>>>>>>>',payload)
  return (dispatch, getState) => {
    laArticle.submitArticleComment(payload).then((result) => {
      let updateAction = createAction(articleTypes.SUBMIT_ARTICLE_COMMENT_SUCCESS)
      dispatch(updateAction(result))
      if(payload.success){
        payload.success(result)
      }
    }).catch((error) => {
      if(payload.error){
        payload.error(error)
      }
    })
  }
}

