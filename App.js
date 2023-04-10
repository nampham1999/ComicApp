/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import Appcontainer from './src/AppContainer';
import configStore from './src/redux/store'
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import { AppState, Modal, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from './src/constant/Colors';
import Layout from './src/constant/Layout';
import TText from './src/components/Text';

const store = configStore.store;
const persistor = configStore.persistor;
const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};
const App: () => Node = () => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [progress, setProgress] = useState(0)

  const syncCode = (version, size) => {
    CodePush.sync(
      {
        updateDialog: false,
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      status => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:

            appsFlyer.logEvent(
              'hotfix_downloaded_update',
              {
                version,
                size
              },
              (res) => {
                // console.log(res);
              },
              (err) => {
                // console.error(err);
              }
            );
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:

            appsFlyer.logEvent(
              'hotfix_installed_update',
              {
                version,
                size
              },
              (res) => {
                // console.log(res);
              },
              (err) => {
                // console.error(err);
              }
            );
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        let persen = Math.ceil((receivedBytes * 100) / totalBytes) / 100;
        setProgress(persen)
      },
    );
  };



  const checkForUpdate = async () => {
    CodePush.checkForUpdate().then(update => {
      if (!update) {
        return console.log('The app is up to date!');
      }
      if (update && update.description == 'now') {
        setShowUpdate(true)
        syncCode(update.version);
        return;
      }
      if (update && update.description == 'background') {
        return CodePush.sync({
          updateDialog: false,
          installMode: CodePush.InstallMode.ON_NEXT_RESUME,
        });
      }
      syncCode(update?.label, update?.packageSize)
    });
  };


  const _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      checkForUpdate();
    }
  };


  useEffect(() => {

    checkForUpdate();
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return <Provider store={store}>
    <PersistGate persistor={persistor}  >

      <Modal
        backdropOpacity={0.9}
        backdropColor={Colors.white}
        useNativeDriver
        visible={showUpdate}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Progress.Circle
            color={Colors.Primary}
            allowFontScaling={false}
            thickness={5}
            progress={progress}
            showsText
            size={Layout.window.width / 3}
            indeterminate={false} />

          <TText style={{ marginTop: 20, color: Colors.Primary, fontSize: 17, textAlign: 'center', width: '80%' }}>Đang áp dụng bản cập nhật mới nhất. Ứng dụng sẽ tự khởi động lại khi hoàn tất!</TText>
        </View>
      </Modal>

      <Appcontainer />
    </PersistGate>
  </Provider>

};
export default CodePush(CodePushOptions)(App);
