import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Add, Expenses, Reports, Settings } from "./screens";
import { theme } from "./them";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTitleStyle:{
            // textAlign:'center'
          }
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
              <Ionicons
                name="add"
                size={30}
                color={theme.colors.text}
              />
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
