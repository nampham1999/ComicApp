import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Layout from '../../constant/Layout';
import {useTheme, useNavigation} from '@react-navigation/native';
import Colors from '../../constant/Colors';
import {IMAGE_SERVER} from '../../constant/hosts';
import TText from '../Text';

const PostItem = ({item, index, width}: any) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailPost', {item})}
      style={[
        styles.wrapItem,
        {
          width:
            width || Layout.isPad
              ? Layout.window.width / 3.5
              : Layout.window.width / 2.5,
        },
      ]}>
      <FastImage
        source={{
          uri: IMAGE_SERVER + item?.image,
        }}
        style={[styles.thumbnail, {backgroundColor: '#eeeeee'}]}
      />
      <TText
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.txtItemBanner, {color: Colors.Text}]}>
        {item.name?.trim()}
      </TText>

      <View style={styles.wrapTag}>
        {item.array_category?.slice(0, 3).map((i: any, idx: number) => (
          <View key={idx} style={styles.wrapTxtCate}>
            <TText style={styles.txtCate}>{i.name}</TText>
          </View>
        ))}
        <TText>...</TText>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
    wrapItem: {
        paddingHorizontal: 5,
        marginTop: 10,
    },
    wrapTxtCate: {
        backgroundColor: '#eeeeee',
        marginLeft: 2,
        marginTop: 2,
        borderRadius: 3,
        padding: 2
    },
    wrapTag: {
        flexDirection: 'row',
        width: Layout.window.width / 3,
        flexWrap: 'wrap'
    },
    txtCate: {
        fontSize: 11,
        color: 'gray'
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 0.7,
        borderRadius: 10,
    },
    txtItemBanner: {
        marginTop: 5,
        fontWeight: '600',
        fontSize: 13,
        width: '100%',
        textAlign: 'left',
    },
    txtCatePost: {
        width: '100%',
        textAlign: 'left',
        fontSize: 10,
    },
    wrapStar: { width: '100%', flexDirection: 'row' },
    fullStar: {
        color: '#FFCC00',
    },
    lineStar: {
        color: '#FFCC00',
    },
});
