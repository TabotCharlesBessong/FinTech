import { Entypo, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from "reanimated-color-picker";
import { CategoryRow, ListItem } from "../component";
import { theme } from "../them";
import { Category } from "../types/category";

const Categories = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colors, setColors] = useState(theme.colors.primary);
  const [Categories, setCategories] = useState<Category[]>([
    {
      color: theme.colors.primary,
      name: "Groceries",
      id:'1'
    },
    {
      color: theme.colors.error,
      name: "Expenditure",
      id:'2'
    },
    {
      color: theme.colors.card,
      name: "School fees and others",
      id:'3'
    },
  ]);
  const onSelectColor = ({ hex }) => {
    setColors(hex);
  };
  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={{ margin: 15, flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            margin: 16,
            borderTopRightRadius: 11,
            borderTopLeftRadius: 11,
            overflow: "hidden",
            marginLeft: -5,
            paddingHorizontal: 11,
          }}
        >
          {Categories.map((category) => (
            <CategoryRow key={category.id} name={category.name} color={category.color} />
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 12,
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={() => setShowColorPicker(true)}>
            <View
              style={{
                width: 36,
                backgroundColor: colors,
                height: 36,
                borderRadius: 18,
                marginRight: 6,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Hello men"
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "white",
              flex: 1,
              borderRadius: 11,
              marginLeft: 12,
              paddingLeft: 8,
              marginRight: 12,
            }}
          />
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="send" color={theme.colors.primary} size={30} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal visible={showColorPicker} animationType="slide">
        <ColorPicker>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title="Ok" onPress={() => setShowColorPicker(false)} />
      </Modal>
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({});
