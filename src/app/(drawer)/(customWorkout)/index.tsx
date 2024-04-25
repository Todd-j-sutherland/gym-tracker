import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

const CustomExerciseForm = () => {
  const [category, setCategory] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [isWeighted, setIsWeighted] = useState(false);
  const [weight, setWeight] = useState("");
  const [repsGoal, setRepsGoal] = useState("");

  const handleCreateExercise = () => {
    // Handle the creation of the exercise using the form data
    console.log("Exercise created:", {
      category,
      workoutName,
      isWeighted,
      weight,
      repsGoal,
    });
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
      >
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Workout name"
        value={workoutName}
        onChangeText={(text) => setWorkoutName(text)}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={isWeighted ? "Weighted" : "No weights"}
          onPress={() => setIsWeighted(!isWeighted)}
        />
        {isWeighted && (
          <TextInput
            style={styles.input}
            placeholder="Weight (KG)"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Reps goal"
        value={repsGoal}
        onChangeText={(text) => setRepsGoal(text)}
      />

      <Button title="Create Exercise" onPress={handleCreateExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CustomExerciseForm;
