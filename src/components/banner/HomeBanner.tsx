import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';
import Layout from '../../constant/Layout';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {IMAGE_SERVER} from '../../constant/hosts';
import TText from '../Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatMoney} from '../../constant/ultis';
import {useDispatch, useSelector} from 'react-redux';
import dataService from '../../network/dataService';

const HomeBanner = (props: any) => {
  const [slideBannerActive, setSlideBannerActive] = useState(0);
  const navigation: any = useNavigation();
  const isConnect = useSelector((state: any) => state.network.isConnect);
  const rank = useSelector((state: any) => state.home.rank);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getRank();
  }, []);

  const getRank = async () => {
    let rs: any = await dataService.getRank();
    if (!rs) return;
    if (typeof rs.list != 'object') return;
    dispatch({
      type: 'SET_RANK',
      data: rs.list,
    });
  };
  const renderRank = (index: number) => {
    switch (index + 1) {
      case 1:
        return (
          <FastImage
            style={styles.a2cef328039ff11ec8ae839f315486395}
            source={require('../../assets/images/rank1.png')}
          />
        );

      case 2:
        return (
          <FastImage
            style={styles.a2cef599039ff11ec8ae839f315486395}
            source={require('../../assets/images/rank2.png')}
          />
        );

      case 3:
        return (
          <FastImage
            style={styles.a2cef599139ff11ec8ae839f315486395}
            source={require('../../assets/images/rank3.png')}
          />
        );

      default:
        return null;
    }
  };
  // vvvvvv BANNER vvvvvvv
  const _renderItemBanner = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailPost', {item})}
        style={{
          flex: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.a2ceff5d039ff11ec8ae839f315486395}>
          {renderRank(index)}
        </View>
        <FastImage
          resizeMode="stretch"
          style={{borderRadius: 10, width: '100%', height: '70%'}}
          source={{
            uri: IMAGE_SERVER + item.image,
          }}
        />

        <TText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.txtItemBanner}>
          {item.name?.trim()}
        </TText>
        {/* <Text style={styles.txtCate}>{item.category?.trim()}</Text> */}
        <View style={styles.wrapInfo}>
          <View style={styles.infoItem}>
            <AntDesign name="eye" color="#fff" size={10} />
            <TText
              style={[
                styles.nomal,
                {fontWeight: '600', marginLeft: 3, marginTop: 0},
              ]}>
              {formatMoney(item.total_view)}
            </TText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _animatedStyles = (_index: number, animatedValue: any) => {
    return {
      opacity: animatedValue.interpolate({
        inputRange: [-3, -2, -1, 0, 1, 2, 3],
        outputRange: [0, 0.5, 0.9, 1, 0.9, 0.5, 0],
      }),
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: [0.5, 0.6, 0.7, 1, 0.7, 0.6, 0.5],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

  const _scrollInterpolator = (index: number, carouselProps: any) => {
    const range = [3, 2, 1, 0, -1, -2, -3];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return {inputRange, outputRange};
  };

  // ^^^^^^^^^^^^^^BANNER^^^^^^^^^^^^
  return (
    <ImageBackground
      source={
        isConnect
          ? {uri: IMAGE_SERVER + props.data[slideBannerActive]?.image}
          : require('../../assets/images/defautbg.jpg')
      }
      blurRadius={10}
      style={{
        height: Layout.isPad
          ? Layout.window.width / 2
          : Layout.window.width / 1.3,
      }}>
      <View style={{height: Layout.statusbarHeight + 20}} />
      {rank.length ? (
        <Carousel
          loop
          //   autoplay={true}
          firstItem={2}
          activeSlideAlignment="center"
          data={rank}
          renderItem={_renderItemBanner}
          sliderWidth={Layout.window.width}
          itemWidth={
            Layout.isPad ? Layout.window.width / 4 : Layout.window.width / 2.7
          }
          scrollInterpolator={_scrollInterpolator}
          slideInterpolatedStyle={_animatedStyles}
          onBeforeSnapToItem={(index: number) => {
            setSlideBannerActive(index);
          }}
        />
      ) : (
        <View
          style={{
            backgroundColor: '#dddddd',
            width: '100%',
            height: Layout.window.width / 1.5,
          }}
        />
      )}
    </ImageBackground>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  txtItemBanner: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 11,
    width: '100%',
    textAlign: 'left',
  },
  wrapStar: {width: '100%', flexDirection: 'row'},
  fullStar: {
    color: '#FFCC00',
  },
  lineStar: {
    color: '#FFCC00',
  },
  txtCate: {
    width: '100%',
    textAlign: 'left',
    color: '#fff',
    fontSize: 10,
  },
  nomal: {
    color: '#fff',
    marginTop: 3,
    fontSize: 10,
  },
  wrapInfo: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  a2cef328039ff11ec8ae839f315486395: {
    flex: 1,
    aspectRatio: 1,
  },
  a2cef599039ff11ec8ae839f315486395: {
    flex: 1,
    aspectRatio: 1,
  },
  a2cef599139ff11ec8ae839f315486395: {
    flex: 1,
    aspectRatio: 1,
  },
  a2ceff5d039ff11ec8ae839f315486395: {
    width: 50,
    height: 50,
    // backgroundColor: 'green',
    borderRadius: 40,
    position: 'absolute',
    top: 10,
    left: -10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
