import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TText from '../Text';

const Nointernet = () => {
  return (
    <View style={styles.ae4af103036ed11ecbed27d9b363f8fd0}>
      <FastImage
        resizeMode="contain"
        style={styles.ae4af103136ed11ecbed27d9b363f8fd0}
        source={require('../../assets/images/cloud.png')}
      />
      <TText style={styles.ae4af103236ed11ecbed27d9b363f8fd0}>
        Vui lòng kết nối internet để sử dụng
      </TText>
    </View>
  );
};

export default Nointernet;
const styles = StyleSheet.create({
  ae4af103036ed11ecbed27d9b363f8fd0: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ae4af103136ed11ecbed27d9b363f8fd0: {
    width: 70,
    height: 70,
  },
  ae4af103236ed11ecbed27d9b363f8fd0: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
