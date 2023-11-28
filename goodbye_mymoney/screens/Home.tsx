
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../them';
import {Add, Expenses, Reports, Settings} from './index'
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Home = () => {
const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          // textAlign:'center'
        },
      }}
    >
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="money-bill"
              size={30}
              color={theme.colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="analytics"
              size={30}
              color={theme.colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={30} color={theme.colors.text} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              size={30}
              color={theme.colors.text}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Home

const styles = StyleSheet.create({})