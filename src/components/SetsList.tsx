import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { FC } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import SetListItem from "./SetListItem";
import ProgressGraph from "./ProgressGraph";

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

interface Set {
  _id: string;
  exercise: string;
  reps: number;
  weight: number;
}

interface SetsData {
  sets: {
    documents: Set[];
  };
}

interface SetsListProps {
  ListHeaderComponent: React.ComponentType;
  exerciseName: string;
}

const SetsList: FC<SetsListProps> = ({ ListHeaderComponent, exerciseName }) => {
  const { username } = useAuth();
  console.log("this is the :" + username);
  const { data, isLoading } = useQuery<SetsData>({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const renderListHeaderComponent = () => (
    <>
      <ListHeaderComponent />
      {data && data.sets.documents.length > 0 && (
        <ProgressGraph sets={data.sets.documents} />
      )}
    </>
  );

  return (
    <FlatList
      data={data?.sets.documents ?? []}
      ListHeaderComponent={renderListHeaderComponent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
    />
  );
};

export default SetsList;
