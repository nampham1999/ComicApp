import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Barcode from 'react-native-barcode-svg';
import FastImage from 'react-native-fast-image';
import TText from '../Text';

const BarCodeOffline = (props: any) => {
  let navigation = useNavigation<any>();
  const data = props.item;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInfo', {code: data.barCode})}
      activeOpacity={1}
      style={styles.wrapItem}>
      <Barcode value={data.barCode} />
      <View style={styles.row}>
        <View style={styles.rightView}>
          <TText style={styles.title}>{data.name}</TText>
          <TText>Mã: {data.barCode}</TText>
          <TText>
            <TText>Ngày quét</TText>:{' '}
            {moment(data.scanDate).format('MM-DD-YYYY')}
          </TText>
        </View>
        <TouchableOpacity
          onPress={() => props.onDelete(data.barCode)}
          style={styles.btnDelete}>
          <TText>Xóa</TText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BarCodeOffline;

const styles = StyleSheet.create({
  wrapItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 3,
  },
  rightView: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  btnDelete: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
