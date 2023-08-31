import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import {ActivityIndicator, View} from 'react-native';
import TText from '../components/Text';
import Colors from '../constant/Colors';
import DetailPost from '../screen/home/detail/DetailPost';
import ReadPost from '../screen/home/read/ReadPost';
import ListPost from '../screen/home/listpost/ListPost';

const DemoScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator color={Colors.Primary} />
    <TText
      style={{
        color: Colors.Primary,
        marginTop: 10,
      }}>
      Đang tải dữ liệu...
    </TText>
  </View>
);

const StackNavigation = createNativeStackNavigator();
const defaultOptioonScreen = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2587c2',
  },
};

function Stack() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator>
        {/* <StackNavigation.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="DemoScreen" component={DemoScreen} /> */}
        <StackNavigation.Screen
          options={{
            headerShown: false,
          }}
          name="BottomTab"
          component={BottomTab}
        />
        <StackNavigation.Screen
          options={{
            headerShown: false,
          }}
          name="DetailPost"
          component={DetailPost}
        />
        <StackNavigation.Screen
          options={{
            headerShown: false,
          }}
          name="ReadPost"
          component={ReadPost}
        />

        <StackNavigation.Screen
          options={{
            ...defaultOptioonScreen,
            title: 'Danh sách truyện',
          }}
          name="ListPost"
          component={ListPost}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}

export default Stack;
