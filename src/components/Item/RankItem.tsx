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

const RankItem = ({item, index}: any) => {
  let navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailPost', {
          item,
        })
      }
      style={styles.a2cef80a039ff11ec8ae839f315486395}>
      <FastImage
        source={{
          uri: IMAGE_SERVER + item.image,
        }}
        style={styles.a2cef80a139ff11ec8ae839f315486395}
      />

      <View style={styles.a2cefa7b039ff11ec8ae839f315486395}>
        <TText
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.a2cefa7b139ff11ec8ae839f315486395}>
          {item.name?.trim()}
        </TText>

        <View style={styles.wrapInfo}>
          <View style={styles.infoItem}>
            <AntDesign name="eye" color="gray" size={15} />
            <TText
              style={[
                styles.nomal,
                {
                  fontWeight: '600',
                  marginLeft: 3,
                  marginTop: 0,
                },
              ]}>
              {formatMoney(item.total_view)}
            </TText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RankItem;
const styles = StyleSheet.create({
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
  a2cef80a039ff11ec8ae839f315486395: {
    width: Layout.isPad ? Layout.window.width / 3 : Layout.window.width / 1.5,
    flexDirection: 'row',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#F5F5F5',
    height: 100,
    borderRadius: 10,
    // borderWidth: 1,
    marginLeft: 5, // borderColor: '#dddddd'
  },
  a2cef80a139ff11ec8ae839f315486395: {
    width: '25%',
    aspectRatio: 0.7,
    borderRadius: 10,
  },
  a2cefa7b039ff11ec8ae839f315486395: {
    flex: 1,
    paddingLeft: 10,
  },
  a2cefa7b139ff11ec8ae839f315486395: {
    color: Colors.Text,
    fontWeight: '600',
  },
  a2ceff5d039ff11ec8ae839f315486395: {
    width: 40,
    height: 40,
    // backgroundColor: 'green',
    borderRadius: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
