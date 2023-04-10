import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Categories from '../screens/categories/Categories';
import Search from '../screens/search/Search';
import BookMark from '../screens/bookmark/BookMark';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
        allowFontScaling: false,
        style: {
          borderTopWidth: 1,
          borderTopColor: '#eeeeee',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: props => <Ionicons name="ios-home-outline" {...props} />,
          title: 'Trang chủ',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <Ionicons name="md-book-outline" {...props} />,
          title: 'Tủ truyện',
        }}
        name="bookmark"
        component={BookMark}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <Ionicons name="md-list" {...props} />,
          title: 'Thể Loại',
        }}
        name="categories"
        component={Categories}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <Ionicons name="search" {...props} />,
          title: 'Tìm kiếm',
        }}
        name="search"
        component={Search}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
