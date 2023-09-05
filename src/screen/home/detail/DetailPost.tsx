
import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import TText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../constant/Colors';
import {IMAGE_SERVER} from '../../../constant/hosts';
import Layout from '../../../constant/Layout';
import {formatMoney} from '../../../constant/ultis';
import Chaps from '../../../components/Chaps/Chaps';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
const AnimatedBackgroud = Animated.createAnimatedComponent(ImageBackground);
let offsetY = 0;
const HEADER_HEIGHT = Layout.isPad
  ? Layout.window.width / 2.5
  : Layout.window.width / 1.3;
const DISTANCE_HEADER = HEADER_HEIGHT - (Layout.statusbarHeight + 50);
const scrollY = new Animated.Value(0);
const onScroll = Animated.event(
  [
    {
      nativeEvent: {
        contentOffset: {
          y: scrollY,
        },  
      },
    },
  ],
  {
    useNativeDriver: true,
    listener: (event: any) => {
      const y = event.nativeEvent.contentOffset.y;
      offsetY = y;
    },
  },
);

const DetailPost = (props: any) => {
  const {item} = props.route.params;

  const chaps = useSelector((state: any) => state.chapReducer.chaps[item.id]);
  const historyState = useSelector((state: any) => state.history.history);
  const historyIndex = chaps?.findIndex(
    (i: any) => i.id == historyState[item.id]?.chap?.id,
  );
  const chapActive = historyIndex > -1 ? chaps[historyIndex] : undefined;

  const [index, setIndex] = React.useState(0);
  const [chapLength, setChapLength] = React.useState(0);
  const [firstChap, setFirstChap] = React.useState({});

  const refInfo = React.useRef();
  const [routes] = React.useState([
    {key: 'first', title: 'DS Chương'},
    {key: 'second', title: 'Giới thiệu'},
  ]);
  const savedState = useSelector((state: any) => state.history.saved);
  const isSave = savedState[item.id];
  const dispatch = useDispatch();
  useEffect(() => {
    if (refInfo.current) {
      refInfo.current.scrollTo({x: 0, y: 0});
      scrollY.setValue(0);
    }
  }, [index]);

  useEffect(() => {
    return () => {
      scrollY.setValue(0);
    };
  }, []);

  const renderScene = useMemo(
    () =>
      SceneMap({
        // eslint-disable-next-line react/no-unstable-nested-components
        first: () => (
          <Chaps
            onChapReady={(length: number, firstC: any) => {
              setChapLength(length);
              setFirstChap(firstC);
            }}
            data={item}
            onScroll={onScroll}
            headerHeight={HEADER_HEIGHT}
          />
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        second: () => (
          <Animated.ScrollView
            style={{
              padding: 10,
            }}
            ref={refInfo}
            onScroll={onScroll}>
            <View style={{height: HEADER_HEIGHT + 60}} />
            <TText style={{fontWeight: '600'}}>
              {item.info?.split('/').join('').split('<p>').join('')}
            </TText>
          </Animated.ScrollView>
        ),
      }),
    [],
  );

  const rederTabar = (props: any) => (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: '100%',
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 100,
        transform: [
          {
            translateY: translateYTab,
          },
        ],
      }}>
      <TabBar
        pressOpacity={0.1}
        pressColor={Colors.Primary}
        {...props}
        style={{backgroundColor: '#fff'}}
        indicatorStyle={{backgroundColor: Colors.Primary}}
        renderLabel={payload => {
          return (
            <TText
              style={{
                color: payload.focused ? Colors.Primary : '#000',
              }}>
              {payload.route.title}
            </TText>
          );
        }}
      />
    </Animated.View>
  );

  let marginHeader = scrollY.interpolate({
    inputRange: [0, DISTANCE_HEADER],
    outputRange: [0, -DISTANCE_HEADER],
    extrapolate: 'clamp',
  });
  let translateYTab = scrollY.interpolate({
    inputRange: [0, DISTANCE_HEADER],
    outputRange: [HEADER_HEIGHT, HEADER_HEIGHT - DISTANCE_HEADER],
    extrapolate: 'clamp',
  });

  let opacityHeader = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - DISTANCE_HEADER, DISTANCE_HEADER],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <AnimatedBackgroud
        source={{uri: IMAGE_SERVER + item.image}}
        blurRadius={10}
        style={{
          height: HEADER_HEIGHT,
          width: '100%',
          flexDirection: 'row',
          paddingTop: Layout.statusbarHeight + 50,
          alignItems: 'center',
          zIndex: 2,
          position: 'absolute',
          transform: [
            {
              translateY: marginHeader,
            },
          ],
        }}>
        <FastImage
          style={styles.thumbnail}
          source={{uri: IMAGE_SERVER + item.image}}
        />
        <View style={styles.wrapRight}>
          <TText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {item.name}
          </TText>
          <TText style={styles.nomal}>
            Trạng thái: {item.status_qq == 0 ? 'Đang cập nhật' : 'Hoàn tất'}
          </TText>
          <TText style={styles.nomal}>Nguồn: Sưu tầm</TText>

          <View style={styles.wrapInfo}>
            <View style={styles.infoItem}>
              <AntDesign name="eye" color="#fff" size={18} />
              <TText
                style={[
                  styles.nomal,
                  {fontWeight: '600', marginLeft: 3, marginTop: 0},
                ]}>
                {formatMoney(item.total_view)}
              </TText>
            </View>
          </View>
          <View style={styles.wrapTag}>
            {item.array_category.map((i: any, idx: number) => (
              <View key={idx} style={styles.wrapTxtCate}>
                <TText style={styles.txtCate}>{i.name}</TText>
              </View>
            ))}
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: '#fff',
              marginVertical: 7,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            {/* <TouchableOpacity style={{
                            height: 30,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor: Colors.Primary
                        }}>
                            <AntDesign
                                name='download'
                                color='#fff'
                                size={20}

                            />
                        </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                if (isSave)
                  return SimpleToast.show(
                    'Bạn đã thêm truyện này vào tủ trước đó rồi nhé !',
                    SimpleToast.SHORT,
                  );
                dispatch({type: 'ADD_SAVED', data: item});
                SimpleToast.show('Đã thêm vào tủ truyện', SimpleToast.SHORT);
              }}
              style={{
                height: 30,
                width: 40,
                opacity: isSave ? 0.7 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: isSave ? 'gray' : Colors.Primary,
                marginLeft: 5,
              }}>
              <Entypo name={'add-to-list'} color="#fff" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!chapLength)
                  return SimpleToast.show(
                    'Đợi 1 xíu nha,chúng mình đang tải thông tin truyện !',
                    SimpleToast.SHORT,
                  );
                props.navigation.navigate('ReadPost', {
                  item: chapActive || firstChap,
                  dataBook: item,
                  index: historyIndex > -1 ? historyIndex : chapLength - 1,
                  length: chapLength,
                });
              }}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: Colors.Primary,
                marginLeft: 5,
                paddingHorizontal: 5,
              }}>
              <TText style={{color: '#fff', fontWeight: '600'}}>
                {historyIndex > -1
                  ? `Đọc tiếp (${chapActive?.name})`
                  : 'Đọc Truyện'}
              </TText>
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedBackgroud>
      <View style={{flex: 1}}>
        <TabView
          renderTabBar={rederTabar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Layout.window.width}}
        />
      </View>

      <View
        style={{
          width: '100%',
          height: Layout.statusbarHeight + 90,
          // backgroundColor: '#fff',
          position: 'absolute',
          paddingTop: Layout.statusbarHeight,
          paddingHorizontal: 10,
          zIndex: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="arrowleft" color="#fff" size={25} />
        </TouchableOpacity>

        <TText
          style={{
            color: Colors.Primary,
            fontSize: 16,
            fontWeight: '600',
            textTransform: 'uppercase',
          }}>
          Thông tin truyện
        </TText>
        <View style={{width: 40}} />
      </View>
      <Animated.View
        style={{
          width: '100%',
          height: Layout.statusbarHeight + 50,
          backgroundColor: '#fff',
          position: 'absolute',
          paddingTop: Layout.statusbarHeight,
          paddingHorizontal: 10,
          zIndex: 15,
          opacity: opacityHeader,
        }}
      />
    </View>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txtTab: {
    fontSize: 16,
    width: Layout.window.width / 2,
    textAlign: 'center',
  },
  tabActive: {
    borderBottomWidth: 1,
    borderColor: Colors.Primary,
  },
  wrapTab: {
    width: '100%',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nomal: {
    color: '#fff',
    marginTop: 3,
  },
  thumbnail: {
    width: Layout.isPad ? Layout.window.width * 0.2 : Layout.window.width * 0.3,
    aspectRatio: 163 / 212,
    borderRadius: 10,
    marginLeft: 10,
  },
  wrapRight: {
    padding: 10,
    flex: 1,
  },
  wrapInfo: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 3,
  },
  title: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 16,
  },
  txtCate: {
    fontSize: 12,
    color: 'gray',
  },
  wrapTxtCate: {
    backgroundColor: '#eeeeee',
    marginLeft: 3,
    marginTop: 3,
    borderRadius: 3,
    padding: 2,
  },
  wrapTag: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  txtTabActive: {
    color: Colors.Primary,
    fontWeight: '600',
  },
});
