import {StackActions, useNavigation} from '@react-navigation/core';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import dataService from '../../network/dataService';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import TText from '../Text';
import Colors from '../../constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-community/async-storage';
import SimpleToast from 'react-native-simple-toast';
import * as Progress from 'react-native-progress';
const Promise = require('bluebird');

const imgToBase64 = (url: string) => {
  let curl =
    url.replace('http', 'https') +
    (url?.includes('mobile=2') ? '' : '&mobile=2');
  // console.log(curl)
  return ImgToBase64.getBase64String(curl);
};

const ChapItem = ({
  deleteDownload,
  onRead,
  item,
  data,
  index,
  chaps,
  chapJson,
  downLoadChap,
  onDownload,
}: any) => {
  const navigation: any = useNavigation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chapJson[item.id]) {
      setShowDelete(true);
    }
  }, [chapJson[item.id]]);

  const onPressDownload = async () => {
    if (chapJson[item.id]) return;
    if (onDownload)
      return SimpleToast.show(
        'Vui lòng tải chậm chút nha !',
        SimpleToast.SHORT,
      );
    let itv = setInterval(() => {
      setPercent(val => {
        if (val > 70) {
          clearInterval(itv);
          downLoadChap(item, () => {
            setIsDownloading(false);
            setPercent(120);
          });
          return val;
        }
        return val + Math.floor(Math.random() * 11);
      });
    }, 500);
    setIsDownloading(true);
  };
  const onPressDelete = async () => {
    console.log(Object.keys(chapJson).length);
    if (Object.keys(chapJson).length == 1) {
      await AsyncStorage.removeItem(data.id + '');
      dispatch({type: 'DELETE_DOWNLOAD_CHAP', data});
    }
    deleteDownload(item, () => {
      setShowDelete(false);
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (onRead) {
          return navigation.dispatch(
            StackActions.replace('ReadPost', {
              item,
              dataBook: data,
              index,
              length: chaps.length,
            }),
          );
        }
        navigation.navigate('ReadPost', {
          item,
          dataBook: data,
          index,
          length: chaps.length,
        });
      }}
      style={styles.itemChap}>
      <TText style={styles.chapName}>{item.name}</TText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TText style={styles.txtNote}>
          Cập nhật: {moment(1e3 * Number(item.created)).format('DD/MM/YYYY')}
        </TText>
        {isDownloading ? (
          <View style={{width: 50, alignItems: 'flex-end'}}>
            <Progress.Circle
              textStyle={{
                fontSize: 11,
                color: Colors.Primary,
              }}
              showsText
              progress={percent / 100}
              borderColor={Colors.Primary}
              color={Colors.Primary}
              size={30}
              indeterminate={percent < 3}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity
                    onPress={onPressDownload}
                    style={{
                        width: 50,
                        // justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        // backgroundColor: 'red',
                        height: 45,
                        justifyContent: 'center'
                    }}
                >
                    <MaterialCommunityIcons
                        color={chapJson[item.id] ? Colors.Primary : '#444444'}
                        size={25}
                        name={!chapJson[item.id] ? 'download' : 'check-underline'}
                    />
                </TouchableOpacity> */}

            {chapJson[item.id] ? (
              <TouchableOpacity
                onPress={onPressDelete}
                style={{
                  width: 50,
                  // justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  // backgroundColor: 'red',
                  height: 45,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  color={chapJson[item.id] ? 'red' : '#444444'}
                  size={25}
                  name={'delete'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onPressDownload}
                style={{
                  width: 50,
                  // justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  // backgroundColor: 'red',
                  height: 45,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  color={chapJson[item.id] ? Colors.Primary : '#444444'}
                  size={25}
                  name={!chapJson[item.id] ? 'download' : 'check-underline'}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {isDownloading ? (
        <View
          style={{
            height: 45,
            position: 'absolute',
            backgroundColor: 'rgba(0,191,255,0.2)',
            width: `${percent}%`,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const Chaps = ({data, onScroll, headerHeight, onRead, onChapReady}: any) => {
  const navigation: any = useNavigation();
  const chaps = useSelector((state: any) => state.chapReducer.chaps[data.id]);
  const chapDowload = useSelector(
    (state: any) => state.history.dowload[data.id],
  )?.chaps;
  let chapJson: any = {};
  if (chapDowload) {
    chapJson = JSON.parse(chapDowload);
  }
  console.log(chapJson);
  const [loading, setLoading] = useState(false);
  const [onDownload, setOnDowload] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getChap();
  }, []);

  const downLoadChap = async (chap: any, callBack: any) => {
    try {
      console.log('--------start dowload-------');
      setOnDowload(true);
      let c: any = await dataService.readPost({
        id: Number(chap.book_id),
        order: Number(chap.order),
      });
      // let listPromise = c.listPhoto.map((i: any) => imgToBase64(i))
      // let rs: any = await Promise.all(listPromise)
      let rs: any = await Promise.map(
        c.listPhoto,
        (i: any) => {
          return imgToBase64(i);
        },
        {concurrency: 3},
      );

      await AsyncStorage.setItem(chap.id + '', JSON.stringify(rs));
      setOnDowload(false);
      dispatch({type: 'ADD_DOWNLOAD', data, chap: {...chap}});
      callBack();
      SimpleToast.show('Tải xuống thành công ' + chap.name, SimpleToast.SHORT);
      console.log('-------- dowload done-------');
    } catch (error) {
      console.log(error);
      callBack();
      SimpleToast.show('Không thể tải xuống ' + chap.name, SimpleToast.SHORT);
    }
  };

  const deleteDownload = async (chap: any, callBack: any) => {
    try {
      dispatch({type: 'DELETE_DOWNLOAD', data, chap: {...chap}});
      callBack();
      SimpleToast.show('Xoá thành công ' + chap.name, SimpleToast.SHORT);
    } catch (error) {
      callBack();
      SimpleToast.show('Không thể xoá ' + chap.name, SimpleToast.SHORT);
    }
  };

  const getChap = async () => {
    setLoading(true);
    let rs: any = await dataService.getChap({
      book_id: data.id,
    });
    setLoading(false);
    if (!rs) return;

    dispatch({
      type: 'ADD_CHAP',
      book_id: data.id,
      data: rs.reverse(),
    });
    onChapReady(rs.length, rs[rs.length - 1]);
  };
  return (
    <Animated.FlatList
      contentContainerStyle={{paddingTop: headerHeight + 60}}
      scrollEventThrottle={16}
      onScroll={onScroll}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator style={{marginTop: 20}} color={Colors.Primary} />
        ) : null
      }
      data={chaps}
      keyExtractor={(item, idx) => idx + ''}
      renderItem={({item, index}: any) => (
        <ChapItem
          onDownload={onDownload}
          onRead={onRead}
          item={item}
          data={data}
          index={index}
          chaps={chaps}
          chapJson={chapJson}
          downLoadChap={downLoadChap}
          deleteDownload={deleteDownload}
        />
      )}
    />
  );
};

export default Chaps;

const styles = StyleSheet.create({
  itemChap: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtNote: {
    color: 'gray',
  },
  chapName: {
    fontWeight: '600',
  },
});
