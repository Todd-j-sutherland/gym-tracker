import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, FC } from "react";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster0"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

type NewSetInputProps = {
  exerciseName: string;
};

type NewSet = {
  username: string;
  exercise: string;
  reps: number;
  weight?: number;
};

const NewSetInput: FC<NewSetInputProps> = ({ exerciseName }) => {
  const [reps, setReps] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (newSet: NewSet) =>
      graphqlClient.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] });
    },
  });

  const addSet = () => {
    const newSet: NewSet = {
      username,
      exercise: exerciseName,
      reps: Number.parseInt(reps),
    };
    if (Number.parseFloat(weight)) {
      newSet.weight = Number.parseFloat(weight);
    }
    mutate(newSet);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title={isPending ? "Adding..." : "Add"} onPress={addSet} />
      </View>
      {isError && <Text style={{ color: "red" }}>Failed to add the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});

export default NewSetInput;
