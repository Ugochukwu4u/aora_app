import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from './CustomButton'
import { router } from "expo-router";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        className="w-[270px] h-[215px]"
        resizeMode="contain"
        source={images.empty}
      />
      <Text className="font-pmedium text-white text-2xl text-center">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton title="Create video" handlePress={()=> router.push('/Create')} containerStyles="w-full my-5"/>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
