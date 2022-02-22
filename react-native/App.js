import React from 'react';
import {NativeBaseProvider, IconButton} from 'native-base';
import { Text, View } from "react-native";
import {NavigationContainer,getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BookRack from './pages/tabbar/bookrack';
import BookStore from './pages/tabbar/bookstore';
import Mine from './pages/tabbar/mine';
import Classify from './pages/tabbar/classify';

import BookInfo from './pages/books/bookinfo';
import Bookpage from './pages/books/bookpage';
import BookDetail from './pages/tabbar/bookdetail'

import ClassifyList from './pages/classify/classlist';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'BookRack') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'BookStore') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Classify') {
            iconName = focused ? 'flower' : 'flower-outline';
          } else {
            iconName = focused ? 'account' : 'account-outline';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={24} color={color} />
          );
        },
        tabBarActiveTintColor: '#d5a3c9',
        tabBarInactiveTintColor: 'gray',
        //隐藏TabNavigator自带的导航条
        headerShown: false,

      })}>
      <Stack.Screen
        name="BookRack"
        component={BookRack}
        options={{title: '书架'}}></Stack.Screen>
      <Stack.Screen
        name="BookStore"
        component={BookStore}
        options={{title: '书城'}}></Stack.Screen>
      <Stack.Screen
        name="Classify"
        component={Classify}
        options={{title: '分类'}}></Stack.Screen>
      <Stack.Screen
        name="Mine"
        component={Mine}
        options={{title: '我的'}}></Stack.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabBar"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#d5a3c9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            //指定右侧按钮
            headerRight: () => (
              <IconButton
                size="6"
                variant="ghost"
                _icon={{
                  as: MaterialIcons,
                  name: 'menu',
                  size: '6',
                }}
              />
            ),
          }}>
          <Stack.Screen
            name="TabBar"
            component={TabBar}
            options={({route}) => ({
              headerTitle: () => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? 'BookRack'
                switch (routeName) {
                  case 'BookStore':
                    return (
                      <Text color="#fff" fontWeight="bold" fontSize="24">
                        书城
                      </Text>
                    );
                  case 'BookRack':
                    return (
                      <Text color="#fff" fontWeight="bold" fontSize="24">
                        书架
                      </Text>
                    );
                  case 'Classify':
                    return (
                      <Text color="#fff" fontWeight="bold" fontSize="24">
                        分类
                      </Text>
                    );
                  case 'Mine':
                    return (
                      <Text color="#fff" fontWeight="bold" fontSize="24">
                        我的
                      </Text>
                    );
                }
              },
            })}></Stack.Screen>
            <Stack.Screen name='ClassifyList' component={ClassifyList} options={{title:"分类列表"}}></Stack.Screen>
            <Stack.Screen name='BookInfo' component={BookInfo} options={{title:"书本详情"}}></Stack.Screen>
            <Stack.Screen name='Bookpage' component={Bookpage} options={{title:"阅读"}}></Stack.Screen>
            <Stack.Screen name='Bookdetail' component={BookDetail} options={{title:"更多"}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
