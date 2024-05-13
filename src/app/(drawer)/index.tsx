import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ExerciseListItem from "../../components/ExerciseListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../../graphqlClient";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthContext";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
// import { Exercise } from "../../modals";

// type Page = {
//   exercises: Exercise[];
// };

// type QueryData = {
//   pageParams: number[];
//   pages: Page[];
//   exercises: Exercise[];
// };

// type DocumentsEntrySets2 = {
//   id: String;
//   _id: String;
//   equipment: String;
//   isWeighted: String;
//   name: String;
//   repsGoal: String;
//   weight: String;
// };

// type DocumentsSets2 = {
//   documents: DocumentsEntrySets2[];
// };

type Exercise = {
  _id: string;
  name: string;
  equipment: string;
};

type CustomWorkoutsResponse = {
  customWorkouts: {
    documents: Exercise[];
  };
};

const exercisesQuery = gql`
  query customWorkouts($limit: Int, $skip: Int, $name: String) {
    customWorkouts(limit: $limit, skip: $skip, name: $name) {
      documents {
        _id
        name
        equipment
      }
    }
  }
`;

export default function ExercisesScreen() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search.trim(), 1000);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<CustomWorkoutsResponse, Error>({
      queryKey: ["customWorkouts", debouncedSearchTerm],
      queryFn: ({ pageParam = 0 }) =>
        client.request(exercisesQuery, {
          limit: 10,
          skip: pageParam,
          name: debouncedSearchTerm,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.customWorkouts.documents.length === 10) {
          return allPages.length * 10;
        }
        return undefined;
      },
    });

  const { username } = useAuth();

  const loadMore = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }

  const exercises =
    data?.pages.flatMap((page) => page.customWorkouts.documents) ?? [];
  console.log(exercises);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            hideWhenScrolling: false,
          },
        }}
      />

      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        style={{ padding: 10 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        contentInsetAdjustmentBehavior="automatic"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
