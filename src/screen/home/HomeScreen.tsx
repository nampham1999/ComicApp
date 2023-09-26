import React, {Component} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import HomeBanner from '../../components/banner/HomeBanner';
import CardPostScroll from '../../components/card/CardPost';
import Nointernet from '../../components/network/Nointernet';
import dataService from '../../network/dataService';
// import NetInfo from '@react-native-community/netinfo';
// import Nointernet from '../components/network/Nointernet';
// import SimpleToast from 'react-native-simple-toast';
import RankComic from '../../components/rank/RankComic';
// var DOMParser = require('react-native-html-parser').DOMParser;
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import ads from '../../constant/ads';
interface Props {
  banner: any;
  newpost: any;
  compeletePost: any;
  pendingPost: any;
  dispatch: any;
  isConnect: any;
}

interface State {
  banners: any[];
  newPost: any[];
  compeletePost: any[];
  getPendingPost: any[];
}
let unsubscribe = () => {};
export class HomeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      banners: [],
      newPost: [],
      compeletePost: [],
      getPendingPost: [],
    };
  }

  componentDidMount() {
    this.getBanner();
    this.getNewPost();
    this.getCompeletePost();
    this.getPendingPost();

    // unsubscribe = NetInfo.addEventListener(state => {
    //   if (!state.isConnected) {
    //     SimpleToast.show(
    //       'Bạn đang ngoại tuyến , bạn chỉ có thể đọc truyện đã tải trong tủ truyện',
    //       SimpleToast.SHORT,
    //     );
    //     this.props.dispatch({
    //       type: 'SET_NETWORK',
    //       data: state.isConnected,
    //     });
    //   }
    // });
  }

  componentWillUnmount() {
    unsubscribe();
  }
  getBanner = async () => {
    let banners: any = await dataService.getListBook();
    if (!banners) return;
    if (typeof banners != 'object') return;

    this.props.dispatch({
      type: 'SET_BANNER',
      data: banners,
    });
  };
  getNewPost = async () => {
    let newPost: any = await dataService.getListBook({
      offset: 10,
      limit: 10,
    });
    if (!newPost) return;
    if (typeof newPost != 'object') return;

    this.props.dispatch({
      type: 'SET_NEWPOST',
      data: newPost,
    });
  };

  getCompeletePost = async () => {
    let compeletePost: any = await dataService.getListBook({
      col: 'modified',
      order: 'DESC',
      typeList: 'category',
      type: 'manga',
      arrayPending: 2,
    });
    if (!compeletePost) return;
    if (typeof compeletePost.list != 'object') return;

    this.props.dispatch({
      type: 'SET_COMPELETE',
      data: compeletePost.list,
    });
  };

  getPendingPost = async () => {
    let getPendingPost: any = await dataService.getListBook({
      col: 'modified',
      order: 'DESC',
      typeList: 'category',
      type: 'manga',
      arrayPending: 0,
    });
    if (!getPendingPost) return;
    if (typeof getPendingPost.list != 'object') return;

    this.props.dispatch({
      type: 'SET_PENDING_POST',
      data: getPendingPost.list,
    });
  };

  render() {
    if (
      !this.props.isConnect &&
      !this.props.banner.length &&
      !this.props.newpost.length &&
      !this.props.compeletePost.length &&
      !this.props.pendingPost.length
    ) {
      return <Nointernet />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <ScrollView
          contentContainerStyle={{paddingBottom: 30}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <HomeBanner data={this.props.banner} />

          <RankComic />
          <BannerAd
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            unitId={ads.idBanner}
          />
          <CardPostScroll
            data={this.props.newpost}
            title="TRUYỆN MỚI CẬP NHẬT"
            query={{
              offset: 10,
              limit: 10,
            }}
          />

          <CardPostScroll
            data={this.props.compeletePost}
            title="TRUYỆN ĐÃ HOÀN THÀNH"
            inList
            query={{
              col: 'modified',
              order: 'DESC',
              typeList: 'category',
              type: 'manga',
              arrayPending: 2,
            }}
          />

          <CardPostScroll
            data={this.props.pendingPost}
            title="TRUYỆN ĐANG CẬP NHẬT"
            inList
            query={{
              col: 'modified',
              order: 'DESC',
              typeList: 'category',
              type: 'manga',
              arrayPending: 0,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state: any) => ({
  banner: state.home.banner,
  newpost: state.home.newpost,
  compeletePost: state.home.compeletePost,
  pendingPost: state.home.pendingPost,
  isConnect: state.network.isConnect,
});

export default connect(mapStateToProps)(HomeScreen);
