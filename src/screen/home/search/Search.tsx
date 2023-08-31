import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import PostItemVertical from '../../../components/Item/PostItemVertical';
import Nointernet from '../../../components/network/Nointernet';
import TText from '../../../components/Text';
import Colors from '../../../constant/Colors';
import Layout from '../../../constant/Layout';
import dataService from '../../../network/dataService';
const LIMIT = 10;
let canload = true;
let inProcess = false;

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const refSearch = useRef();
  const isConnect = useSelector((state: any) => state.network?.isConnect);

  const onSearch = async () => {
    if (!keyword) return;
    setData([]);
    inProcess = true;
    setLoading(true);
    let rs: any = await dataService.searchBook({
      search: keyword,
      offset: 0,
      limit: LIMIT,
    });
    setLoading(false);
    inProcess = false;
    if (!rs) return;

    if (rs?.list?.length < LIMIT) {
      canload = false;
    }

    setData(rs.list);
  };

  const loadMore = async () => {
    if (inProcess || !canload) return;
    inProcess = true;
    setLoading(true);
    let rs: any = await dataService.searchBook({
      search: keyword,
      offset: data.length,
      limit: LIMIT,
    });
    setLoading(false);
    inProcess = false;
    if (!rs) return;

    if (rs?.list?.length < LIMIT) {
      canload = false;
    }

    setData(data.concat(rs.list));
  };

  const renderItem = ({item, index}: any) => <PostItemVertical item={item} />;

//   if (!isConnect) return <Nointernet />;

  return (
    <SafeAreaView style={styles.a5d77271034a911ec92980fa8d3b47c02}>
      <View style={styles.a5d77271134a911ec92980fa8d3b47c02}>
        <View style={styles.a5d774e2034a911ec92980fa8d3b47c02}>
          <Ionicons size={20} name="search" color="gray" />
          <TextInput
            ref={refSearch}
            returnKeyType="search"
            returnKeyLabel="Tìm kiếm"
            onSubmitEditing={onSearch}
            value={keyword}
            onChangeText={setKeyword}
            autoFocus
            placeholder="Nhập từ khóa tìm kiếm"
            clearTextOnFocus
            placeholderTextColor="gray"
            style={styles.a5d774e2134a911ec92980fa8d3b47c02}
          />
          {keyword.length ? (
            <TouchableOpacity
              onPress={() => {
                setKeyword('');
                setData([]);
              }}>
              <Ionicons size={20} name="md-close-circle" color="gray" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <FlatList
        numColumns={Layout.isPad ? 2 : 1}
        renderItem={renderItem}
        data={data}
        keyExtractor={(item, index) => index + ''}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={styles.a5d77753034a911ec92980fa8d3b47c02}
              color={Colors.Primary}
            />
          ) : keyword ? (
            <TText style={styles.a620110a034d811ec820a610690ddbe1e}>
              Không có kết quả nào phù hợp
            </TText>
          ) : null
        }
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
      />
    </SafeAreaView>
  );
};

export default Search;
const styles = StyleSheet.create({
  a620110a034d811ec820a610690ddbe1e: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'gray',
  },
  a5d77271034a911ec92980fa8d3b47c02: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == 'ios' ? 0 : Layout.statusbarHeight + 10,
  },
  a5d77271134a911ec92980fa8d3b47c02: {
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    alignItems: 'center',
  },
  a5d774e2034a911ec92980fa8d3b47c02: {
    width: '95%',
    backgroundColor: '#eeeeee',
    height: 35,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  a5d774e2134a911ec92980fa8d3b47c02: {
    flex: 1,
    paddingHorizontal: 10,
    height: 35,
    paddingVertical: 0,
    color: '#333333',
  },
  a5d77753034a911ec92980fa8d3b47c02: {
    marginTop: 10,
  },
});
