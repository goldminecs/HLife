/**
 * Created by zachary on 2016/12/13.
 */
import React, {Component} from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Platform,
  RefreshControl,
  ProgressBarAndroid,
  ActivityIndicator,
} from "react-native";

export default class CommonListView extends Component {

  /**
   * hideHeader
   * hideFooter,
   * headerLoadRefresh:第一次是否默认显示刷新
   * @param props
   */
  constructor(props) {
    super(props)
    this.setState({
      hasMore: true,
      headerLoadRefresh: props.headerLoadRefresh === true,
      hideHeader: props.hideHeader === true,
      hideFooter: props.hideFooter === true,
      separatorStyle: props.separatorStyle ? props.separatorStyle : styles.separator,
      hideSeparator: props.hideSeparator === true,
    })
  }

  // componentDidMount() {
  //   this.onRefresh()
  // }

  render() {
    return (
      <ListView
        {...this.props}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        onEndReached={this.onLoadMore.bind(this)}
        onEndReachedThreshold={10}
        contentContainerStyle={{backgroundColor: 'white'}}
        renderSeparator={(sectionID, rowID) => this.state.hideSeparator ?
          <View key={`${sectionID}-${rowID}`} style={this.state.separatorStyle}/> : null}
        renderFooter={() => this.state.hideFooter ? null : this.showFootView() }
        refreshControl={
          this.state.hideHeader ?
            null : this.showRefreshControl()
        }
      />
    )
  }

  showRefreshControl() {
    return (
      <RefreshControl
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshing={this.state.headerLoadRefresh}
        onRefresh={this.onRefresh.bind(this)}
        tintColor="#969696"
        colors={['#0081F0']}
        enabled={this.state.hideHeader ? false : true}
      />
    )
  }

  showFootView = ()=> {
    return (
      this.state.hasMore
        ? this.footLoad()
        : this.footNoMore()
    )
  }

  footLoad = () => {
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator
          animating={true}
          size="small"
          color={'#C8C8C8'}
        />
        <Text style={styles.footText}>{'加载中...'}</Text>
      </View>
    )
  }

  footNoMore = ()=> {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footLine}/>
        <Text style={styles.footText}>{'已经到底啦!!!'}</Text>
        <View style={styles.footLine}/>
      </View>
    )
  }

  /**
   * PullDown
   */
  onRefresh = () => {
    this.props.loadNewData()
  }

  /**
   * LoadMore
   */
  onLoadMore = () => {
    return this.props.loadMoreData()
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  footerContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footText: {
    color: '#b4b4b4',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 12
  },
  footLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#e0e0e0',
  },
  separator: {
    height: 10,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F5F5F5',
  }
})