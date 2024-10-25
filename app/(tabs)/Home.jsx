import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import logoSmall from "../../assets/images/logo-small.png";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPost, getLatestPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPost);
  const { data: latest } = useAppwrite(getLatestPost);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    //re call videos -> if any new videos appeard
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="w-full h-full bg-primary">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-pmedium text-white text-2xl">CodeIt</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  resizeMode="contain"
                  source={logoSmall}
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-5">
              <Text className="font-pregular text-gray-100 text-lg mb-3">
                Latest Videos
              </Text>
              <Trending posts={latest ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No vidoes found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
