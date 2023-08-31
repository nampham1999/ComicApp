import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Layout from '../../constant/Layout';
import {useTheme, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import PostItem from '../Item/PostItem';
import Colors from '../../constant/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import TText from '../Text';

const CardPostScroll = (props: any) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  return (
    <View style={styles.wrapCard}>
      <View style={styles.headerCard}>
        <TText style={[styles.titleCard, {color: colors.text}]}>
          {props.title}
        </TText>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ListPost', {
              query: props.query,
              inList: props.inList,
              title: props.title,
            })
          }
          style={styles.wrapRightHeader}>
          <TText style={[styles.moreText, {color: Colors.Primary}]}>
            Danh sách
          </TText>
          <Entypo
            color={Colors.Primary}
            name="chevron-small-right"
            style={{marginTop: 2}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.data
            ? props.data?.map((item: any, index: number) => (
                <PostItem key={item.id} item={item} index={index} />
              ))
            : new Array(4)
                .fill(1)
                .map((it, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.loader,
                      {backgroundColor: '#eeeeee'},
                    ]}></View>
                ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CardPostScroll;

const styles = StyleSheet.create({
  wrapCard: {
    marginTop: 15,
    width: '100%',
    minHeight: Layout.window.width / 2,
  },
  headerCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  titleCard: {
    fontWeight: 'bold',
  },
  wrapRightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 13,
  },
  cardBody: {
    marginTop: 10,
  },
  loader: {
    width: Layout.window.width / 4,
    aspectRatio: 0.7,
    borderRadius: 10,
    marginLeft: 10,
  },
});
