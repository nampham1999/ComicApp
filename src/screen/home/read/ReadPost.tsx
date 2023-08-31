import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import Chaps from '../../../components/Chaps/Chaps';
import TText from '../../../components/Text';
import Colors from '../../../constant/Colors';
import Layout from '../../../constant/Layout';
import dataService from '../../../network/dataService';
const ReadPost = (props: any) => {
  let {item, dataBook, index, length} = props.route.params;
  const chaps = useSelector(
    (state: any) => state.chapReducer.chaps[dataBook.id],
  );
  const chapDowload = useSelector(
    (state: any) => state.history.dowload[dataBook.id],
  )?.chaps;
  let chapJson: any = {};
  if (chapDowload) {
    chapJson = JSON.parse(chapDowload);
  }

  const ref = useRef(index);
  const [images, setImages] = useState<any>([]);
  const [showActionBar, setShowActionBar] = useState(true);
  const [showChaps, setShowChaps] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [chapSelect, setChapselect] = useState(item);
  const dispatch = useDispatch();
  const toogleShowChaps = () => {
    setShowChaps(!showChaps);
  };

  useEffect(() => {
    if (chapJson[chapSelect.id]) {
      loadDataLocal();
    } else {
      getRead();
    }
    dispatch({
      type: 'ADD_HISTORY',
      data: dataBook,
      chap: chapSelect,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapSelect]);

  const loadDataLocal = async () => {
    try {
      setShowLoading(true);
      let rs: any = await AsyncStorage.getItem(chapSelect.id + '');
      if (!rs) return getRead();
      let rsJS = JSON.parse(rs);
      setImages(rsJS);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRead = async () => {
    setShowLoading(true);
    let rs: any = await dataService.readPost({
      id: Number(chapSelect.book_id),
      order: Number(chapSelect.order),
    });
    if (!rs) return;
    setShowLoading(false);

    setImages(rs.listPhoto);

    console.log(rs.listPhoto);
  };

  let sourceImage = '';
  for (let i: any = 0; i < images.length; i++) {
    sourceImage =
      sourceImage +
      `<img src="${
        chapJson[chapSelect.id]
          ? 'data:image/jpeg;base64,' + images[i]
          : images[i] + (images[i]?.includes('mobile=2') ? '' : '&mobile=2')
      }" style="width:100%"/>`;
  }
  let dataHtml = `<html>
		<body>
		<div onClick="myFunction()">
		${sourceImage}
        </div>
		<script>
function myFunction() {
  window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
}
</script>
		</body>
		<html>`;

  const onMessage = () => {
    setShowActionBar(true);
  };
  const renderActionBar = () => (
    <>
      <View style={styles.a0536abe033bc11ec92980fa8d3b47c02}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon size={30} color="#fff" name="arrowleft" />
        </TouchableOpacity>
        <TText style={styles.a0536abe133bc11ec92980fa8d3b47c02}>
          {chapSelect.name}
        </TText>
        <View style={styles.a0536d2f033bc11ec92980fa8d3b47c02} />
      </View>

      <View style={styles.a0536d2f133bc11ec92980fa8d3b47c02}>
        <TouchableOpacity
          style={{
            width: 60,
            alignItems: 'flex-start',
          }}
          onPress={() => {
            if (ref.current == length - 1)
              return SimpleToast.show(
                'Không còn chương nào trước đó',
                SimpleToast.SHORT,
              );
            ref.current = ref.current + 1;
            setChapselect(chaps[ref.current]);
          }}>
          <Octicons size={30} color="#fff" name="arrow-left" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toogleShowChaps}>
          <Icon size={30} color="#fff" name="bars" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            alignItems: 'flex-end',
          }}
          onPress={() => {
            if (ref.current == 0)
              return SimpleToast.show(
                'Bạn đang ở chương cuối',
                SimpleToast.SHORT,
              );
            ref.current = ref.current - 1;
            setChapselect(chaps[ref.current]);
          }}>
          <Octicons size={30} color="#fff" name="arrow-right" />
        </TouchableOpacity>
      </View>
    </>
  );

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onScroll = ({nativeEvent}: any) => {
    if (isCloseToBottom(nativeEvent)) {
      setShowActionBar(true);
    } else {
      setShowActionBar(false);
    }
  };

  return (
    <View style={styles.container}>
      {showLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.Primary} />
          <TText
            style={{
              fontWeight: '500',
              fontStyle: 'italic',
              color: Colors.Primary,
            }}>
            Chờ xíu nha! chúng mình đang tải thông tin truyện...
          </TText>
        </View>
      ) : null}
      <WebView
        decelerationRate={24000}
        onScroll={onScroll}
        javaScriptEnabled={true}
        onMessage={onMessage}
        style={styles.a0536fa0033bc11ec92980fa8d3b47c02}
        source={{
          html: dataHtml,
        }}
      />
      {showActionBar ? renderActionBar() : null}

      <Modal transparent visible={showChaps} animationType="slide">
        <View style={styles.a0536fa0133bc11ec92980fa8d3b47c02}>
          <View style={styles.a0537211033bc11ec92980fa8d3b47c02}>
            <TText style={styles.a0537211133bc11ec92980fa8d3b47c02}>
              Danh sách chương
            </TText>
            <TouchableOpacity onPress={toogleShowChaps}>
              <Icon size={30} color="#222222" name="close" />
            </TouchableOpacity>
          </View>
          <Chaps
            data={dataBook}
            onScroll={() => {}}
            headerHeight={-50}
            onRead
          />
        </View>
      </Modal>
    </View>
  );
};

export default ReadPost;
const styles = StyleSheet.create({
  a0536abe033bc11ec92980fa8d3b47c02: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Layout.statusbarHeight + 40,
    paddingTop: Layout.statusbarHeight,
    top: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  a0536abe133bc11ec92980fa8d3b47c02: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  a0536d2f033bc11ec92980fa8d3b47c02: {
    width: 40,
  },
  a0536d2f133bc11ec92980fa8d3b47c02: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Layout.statusbarHeight + 40,
    bottom: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  a0536fa0033bc11ec92980fa8d3b47c02: {
    flex: 1,
  },
  a0536fa0133bc11ec92980fa8d3b47c02: {
    flex: 1,
    backgroundColor: '#fff',
  },
  a0537211033bc11ec92980fa8d3b47c02: {
    width: '100%',
    height: Layout.statusbarHeight + 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Layout.statusbarHeight,
    paddingHorizontal: 10,
  },
  a0537211133bc11ec92980fa8d3b47c02: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
});
