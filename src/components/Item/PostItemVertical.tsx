import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../constant/Colors';
import {IMAGE_SERVER} from '../../constant/hosts';
import Layout from '../../constant/Layout';
import TText from '../Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatMoney} from '../../constant/ultis';
import {useNavigation} from '@react-navigation/core';

const PostItemVertical = ({item}: any) => {
  let navigation: any = useNavigation();
  console.log(IMAGE_SERVER + item.image);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailPost', {item})}
      style={{
        width: Layout.isPad ? '50%' : '100%',
        flexDirection: 'row',
        marginTop: 2,
        padding: 10,
        backgroundColor: '#fff',
      }}>
      <FastImage
        source={{
          uri: IMAGE_SERVER + item.image || item.link_image,
          priority: FastImage.priority.normal,
        }}
        style={{width: '20%', aspectRatio: 0.7, borderRadius: 10}}
      />

      <View style={{flex: 1, paddingLeft: 10}}>
        <TText
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{color: Colors.Text, fontWeight: '600'}}>
          {item.name?.trim()}
        </TText>

        <View style={styles.wrapTag}>
          {item.array_category.map((i: any, idx: number) => (
            <View key={idx} style={styles.wrapTxtCate}>
              <TText style={styles.txtCate}>{i.name}</TText>
            </View>
          ))}
        </View>

        <View style={styles.wrapInfo}>
          <View style={styles.infoItem}>
            <AntDesign name="eye" color="gray" size={15} />
            <TText
              style={[
                styles.nomal,
                {fontWeight: '600', marginLeft: 3, marginTop: 0},
              ]}>
              {formatMoney(item.total_view)}
            </TText>
          </View>
        </View>

        {item.chap ? (
          <View style={styles.wrapTag}>
            <TText
              style={[
                styles.nomal,
                {fontSize: 12, fontWeight: '600', color: '#222222'},
              ]}>
              Đang đọc: {item.chap?.name}
            </TText>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default PostItemVertical;

const styles = StyleSheet.create({
  wrapTxtCate: {
    backgroundColor: '#eeeeee',
    marginLeft: 2,
    marginTop: 2,
    borderRadius: 3,
    padding: 2,
  },
  wrapTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  txtCate: {
    fontSize: 11,
    color: 'gray',
  },
  nomal: {
    marginTop: 3,
    fontSize: 10,
    color: 'gray',
  },
  wrapInfo: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
