import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
// import PostItem from '../../../components/Item/PostItem';
import PostItemVertical from '../../../components/Item/PostItemVertical';
import TText from '../../../components/Text';
import Layout from '../../../constant/Layout';


const DownloadList = () => {
  const downloadState = useSelector((state: any) => state.history.dowload);
  const data = Object.values(downloadState);
  data.sort((a: any, b: any) => b.time - a.time);
  const renderItem = ({item, index}: any) => <PostItemVertical item={item} />;

  return (
    <View style={styles.a3a737040349811ec92980fa8d3b47c02}>
      <FlatList
        numColumns={Layout.isPad ? 2 : 1}
        renderItem={renderItem}
        data={data}
        keyExtractor={(item, index) => index + ''}
        ListEmptyComponent={
          <TText style={styles.a3a739750349811ec92980fa8d3b47c02}>
            Bạn chưa tải truyện nào{' '}
          </TText>
        }
      />
    </View>
  );
};

export default DownloadList;
const styles = StyleSheet.create({
  a3a737040349811ec92980fa8d3b47c02: {
    flex: 1,
  },
  a3a739750349811ec92980fa8d3b47c02: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'gray',
  },
});
