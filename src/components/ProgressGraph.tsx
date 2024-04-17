import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { LineGraph } from "react-native-graph";

type Set = {
  _id: string;
  reps: number;
  weight: number;
};

type ProgressGraphProps = {
  sets: Set[];
};

const idToDate = (id: string) => {
  const timestamp = parseInt(id.slice(0, 8), 16) * 1000;
  return new Date(timestamp);
};

const ProgressGraph = ({ sets = [] }) => {
  const points = sets.map((set) => ({
    date: idToDate(set._id),
    value: set.reps * set.weight,
  }));

  return (
    <View style={styles.container}>
      <Text>Progress Graph</Text>

      <LineGraph
        points={points}
        animated={false}
        color="#4484B2"
        style={styles.graph}
      />
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
  graph: {
    width: "100%",
    height: 200,
  },
});

export default ProgressGraph;
