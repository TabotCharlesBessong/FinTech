import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem } from "../component";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../them";
// import { useNavigation } from "@react-navigation/native";

const Settings = ({navigation}) => {
  // const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        margin: 16,
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
        overflow: "hidden",
        marginLeft:11,
        paddingHorizontal:11
      }}
    >
      <ListItem
        label="Category"
        detail={
          <Entypo
            name="chevron-thin-right"
            color={theme.colors.text}
            size={20}
          />
        }
        onClick={() => {navigation.navigate('Categories')}}
      />
      <ListItem
        label="Erese all data"
        onClick={() => {}}
        isDestructive
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
