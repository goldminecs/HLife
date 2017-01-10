/**
 * Created by yangyang on 2017/1/9.
 */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  InteractionManager,
  ScrollView,
  ListView,
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions} from 'react-native-router-flux'
import Header from '../common/Header'
import {em, normalizeW, normalizeH, normalizeBorder} from '../../util/Responsive'
import {activeUserId} from '../../selector/authSelector'
import {INQUIRY_CONVERSATION, PERSONAL_CONVERSATION, WUAI_SYSTEM_DOCTOR} from '../../constants/messageActionTypes'
import {fetchConversation} from '../../action/messageAction'
import {getConversations} from '../../selector/messageSelector'
import MessageBoxCell from './MessageBoxCell'

const PAGE_WIDTH = Dimensions.get('window').width
const PAGE_HEIGHT = Dimensions.get('window').height

class InquiryMessageBox extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchConversation({type: INQUIRY_CONVERSATION})
    })
  }

  renderInquiryMsgBox(rowData) {
    let members = rowData.members
    let memberId = members.find((member) => {
      if (member === WUAI_SYSTEM_DOCTOR) {
        return false
      }
      if (member === this.props.currentUser) {
        return false
      }
      return true
    })
    return (
      <MessageBoxCell memberId={memberId} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftType="icon"
          leftIconName="ios-arrow-back"
          leftPress={() => Actions.pop()}
          title="问诊"
        />
        <View style={styles.itemContainer}>
          <ScrollView style={{height: PAGE_HEIGHT}}>
            <ListView
              dataSource={this.props.dataSource}
              renderRow={(rowData) => this.renderInquiryMsgBox(rowData)}
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  let conversations = getConversations(state)
  return {
    currentUser: activeUserId(state),
    dataSource: ds.cloneWithRows(conversations)
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchConversation,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InquiryMessageBox)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    width: PAGE_WIDTH,
    ...Platform.select({
      ios: {
        paddingTop: normalizeH(65),
      },
      android: {
        paddingTop: normalizeH(45)
      }
    }),
  },
  itemView: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
  },
  selectItem: {
    flexDirection: 'row',
    height: normalizeH(63),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  titleStyle: {
    fontSize: 17,
    color: '#4A4A4A',
    letterSpacing: 0.43,
  },
  msgTip: {
    fontSize: 14,
    color: '#9B9B9B',
    letterSpacing: 0.43,
  },
  timeTip: {
    fontSize: 14,
    color: '#9B9B9B',
    letterSpacing: 0.43,
    marginRight: normalizeW(15)
  },
  noticeIconView: {
    marginLeft: normalizeW(15),
    marginRight: normalizeW(19)
  },
  noticeIcon: {
    width: 35,
    height: 35,
  },
  noticeTip: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
  },
})