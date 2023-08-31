import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Nointernet from '../../../components/network/Nointernet';
import TText from '../../../components/Text';
import Colors from '../../../constant/Colors';
import Layout from '../../../constant/Layout';
import dataService from '../../../network/dataService';

const Categories = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);
  const isConnect = useSelector((state: any) => state.network?.isConnect);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    let rs: any = await dataService.getCategories();
    setLoading(false);
    if (!rs) return;
    if (typeof rs != 'object') return;

    rs = rs.map((item: any, index: any) => {
      if (item.name?.toLowerCase().includes('shoujo')) return {};
      if (item.name?.toLowerCase().includes('đam')) return {};
      if (item.name?.toLowerCase().includes('adult')) return {};
      return item;
    });

    dispatch({
      type: 'SET_CATEGORY',
      categories: rs,
    });
  };

  const renderItem = ({item, index}: any) => {
    if (!item.name) return null;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListPost', {
            query: {
              typeList: 'category',
              type: 'manga',
              arrayCategory: item.id,
            },
            inList: true,
            title: 'Thể loại ' + item.name,
          })
        }
        activeOpacity={0.9}
        style={styles.af8a17120348411ec92980fa8d3b47c02}>
        <TText style={styles.af8a19830348411ec92980fa8d3b47c02}>
          {item?.name?.trim()}
        </TText>

        <TText
          style={styles.af8a19831348411ec92980fa8d3b47c02}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item?.info?.trim()}
        </TText>
      </TouchableOpacity>
    );
  };

  // if (!isConnect) return <Nointernet />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id + ''}
        data={categories}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={styles.af8a1bf40348411ec92980fa8d3b47c02}
              color={Colors.Primary}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Categories;
const styles = StyleSheet.create({
  af8a17120348411ec92980fa8d3b47c02: {
    width: Layout.window.width / 2.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: Colors.grey400,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
  },
  af8a19830348411ec92980fa8d3b47c02: {
    color: Colors.TextBlack,
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  af8a19831348411ec92980fa8d3b47c02: {
    fontSize: 12,
    color: Colors.TextBlack,
    fontStyle: 'italic',
  },
  af8a1bf40348411ec92980fa8d3b47c02: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 0 : Layout.statusbarHeight,
  },
});
