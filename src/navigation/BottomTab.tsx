import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import BookMark from '../screen/home/bookmark/BookMark';
import Categories from '../screen/home/categories/Categories';
import Search from '../screen/home/search/Search';
import HomeScreen from '../screen/home/HomeScreen';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (props: any) => (
            <Ionicons name="home-outline" {...props} />
          ),
          title: 'Trang chủ',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (props: any) => (
            <Ionicons name="book-outline" {...props} />
          ),
          title: 'Tủ truyện',
        }}
        name="bookmark"
        component={BookMark}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (props: any) => <Ionicons name="list" {...props} />,
          title: 'Thể Loại',
        }}
        name="categories"
        component={Categories}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (props: any) => <Ionicons name="search" {...props} />,
          title: 'Tìm kiếm',
        }}
        name="search"
        component={Search}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
