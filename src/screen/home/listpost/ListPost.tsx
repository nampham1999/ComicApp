import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PostItemVertical from '../../../components/Item/PostItemVertical';
import Colors from '../../../constant/Colors';
import Layout from '../../../constant/Layout';
import dataService from '../../../network/dataService';
const LIMIT = 10;
let canload = true;
let inProcess = false;
const ListPost = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {query, inList, title} = props.route.params;

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: title || 'Danh Sách Truyện',
    });
  }, [props.navigation]);

  useEffect(() => {
    getListBook();
  }, []);

  const getListBook = async () => {
    inProcess = true;
    setLoading(true);
    let rs: any = await dataService.getListBook({
      offset: 0,
      limit: LIMIT,
      ...query,
    });
    inProcess = false;
    setLoading(false);
    if (!rs) return;
    if (rs?.length < LIMIT) {
      canload = false;
    }
    if (inList) {
      if (rs?.list?.length < LIMIT) {
        canload = false;
      }

      setData(rs.list);
      return;
    }
    setData(rs);
  };

  const loadMore = async () => {
    if (inProcess || !canload) return;
    setLoading(true);
    inProcess = true;
    let rs: any = await dataService.getListBook({
      offset: data.length,
      limit: LIMIT,
      ...query,
    });
    inProcess = false;
    setLoading(false);
    if (!rs) return;
    if (rs?.length < LIMIT) {
      canload = false;
    }
    if (inList) {
      if (rs?.list?.length < LIMIT) {
        canload = false;
      }
      setData(data.concat(rs.list));
      return;
    }
    setData(data.concat(rs));
  };

  const renderItem = ({item, index}: any) => <PostItemVertical item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={Layout.isPad ? 2 : 1}
        renderItem={renderItem}
        data={data}
        keyExtractor={(item, index) => index + ''}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={{
                marginTop: 10,
              }}
              color={Colors.Primary}
            />
          ) : null
        }
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
      />
    </View>
  );
};

export default ListPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
