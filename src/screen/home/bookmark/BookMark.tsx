import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import TText from '../../../components/Text';
import Colors from '../../../constant/Colors';
import Layout from '../../../constant/Layout';
import DownloadList from './DownloadList';
import HistoryList from './HistoryList';
import SavedList from './SavedList';

const BookMark = (props: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'dowload', title: 'Đã tải'},
    {key: 'save', title: 'Đã lưu'},
    {key: 'history', title: 'Lịch sử'},
  ]);

  const renderScene = React.useMemo(
    () =>
      SceneMap({
        save: SavedList,
        dowload: DownloadList,
        history: HistoryList,
      }),
    [],
  );

  const rederTabar = (props: any) => (
    <TabBar
      pressOpacity={0.1}
      pressColor={Colors.Primary}
      {...props}
      style={{backgroundColor: '#fff'}}
      indicatorStyle={{backgroundColor: Colors.Primary}}
      scrollEnabled
      renderLabel={payload => {
        return (
          <TText
            style={{
              color: payload.focused ? Colors.Primary : '#000',
            }}>
            {payload.route.title}
          </TText>
        );
      }}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS == 'ios' ? 0 : Layout.statusbarHeight + 10,
      }}>
      <TabView
        renderTabBar={rederTabar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Layout.window.width}}
      />
    </SafeAreaView>
  );
};

export default BookMark;

const styles = StyleSheet.create({});
