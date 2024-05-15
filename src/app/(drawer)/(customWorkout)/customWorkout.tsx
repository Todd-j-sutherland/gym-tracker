import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { Picker } from "@react-native-picker/picker";
import graphqlClient from "../../../graphqlClient";
import { useAuth } from "../../../providers/AuthContext";
import { Redirect } from "expo-router";

const GET_CUSTOM_WORKOUTS = gql`
  query GetCustomWorkouts {
    sets2 {
      documents {
        id
        name
        bodyPart
        equipment
        target
        gifUrl
      }
    }
  }
`;

const INSERT_CUSTOM_WORKOUT = gql`
  mutation InsertCustomWorkout($newWorkout: NewWorkoutInput!) {
    insertSet(
      document: $newWorkout
      dataSource: "Cluster0"
      database: "workouts"
      collection: "customWorkouts"
    ) {
      insertedId
    }
  }
`;

type WorkoutDocument = {
  id: string;
  gifUrl: string;
  bodyPart: string;
  equipment: string;
  name: string;
  target: string;
};

type WorkoutData = {
  documents: WorkoutDocument[];
};

type NewWorkoutInput = {
  name: string;
  equipment: string;
  weight: number;
  reps: number;
  isWeighted: boolean;
  sets: number;
};

const CustomExerciseForm = () => {
  const [category, setCategory] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [isWeighted, setIsWeighted] = useState(true);
  const [weight, setWeight] = useState("");
  const [repsGoal, setRepsGoal] = useState("");
  const [uniqueBodyParts, setUniqueBodyParts] = useState<string[]>([]);
  const [sets, setSets] = useState("");
  const { username } = useAuth();

  const { data, isLoading, error } = useQuery<WorkoutData, Error>({
    queryKey: ["sets2"],
    queryFn: () => graphqlClient.request<WorkoutData>(GET_CUSTOM_WORKOUTS),
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (newWorkout: NewWorkoutInput) =>
      graphqlClient.request(INSERT_CUSTOM_WORKOUT, { newWorkout }),
    onSuccess: () => {},
  });

  useEffect(() => {
    if (data) {
      const bodyParts: string[] = data.sets2.documents.map(
        (doc) => doc.bodyPart
      );
      const uniqueArray = [...new Set(bodyParts)];

      console.log("Body parts:", uniqueArray);

      setUniqueBodyParts(uniqueArray);
    }
  }, [data]);

  const handleCreateExercise = () => {
    console.log("Exercise created:", {
      category,
      workoutName,
      isWeighted,
      weight,
      repsGoal,
      sets,
    });

    const newWorkout = {
      name: workoutName,
      equipment: category,
      isWeighted,
      weight: Number(weight),
      reps: Number(repsGoal),
      sets: Number(sets),
    };

    mutate(newWorkout);
  };

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        mode="dropdown"
      >
        <Picker.Item
          label="Select exercise category"
          value=""
          enabled={false}
        />
        {uniqueBodyParts.map((bodyPart) => (
          <Picker.Item key={bodyPart} label={bodyPart} value={bodyPart} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Workout name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <View style={styles.switchContainer}>
        <Button
          title={isWeighted ? "Change to Unweighted" : "Change to Weighted"}
          onPress={() => setIsWeighted(!isWeighted)}
          color="#007AFF"
        />
        {isWeighted && (
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            placeholder="Weight (KG)"
            value={weight}
            keyboardType="numeric"
            onChangeText={setWeight}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={repsGoal}
        keyboardType="numeric"
        onChangeText={setRepsGoal}
      />

      <TextInput
        style={styles.input}
        placeholder="Sets"
        value={sets}
        keyboardType="numeric"
        onChangeText={setSets}
      />

      <Button
        title="Create Exercise"
        onPress={handleCreateExercise}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  picker: {
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 12,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
    paddingLeft: 15,
    marginBottom: 20,
  },
  switchContainer: {
    marginBottom: 20,
  },
});

export default CustomExerciseForm;
