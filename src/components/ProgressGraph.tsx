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
  console.log("this is the points:" + JSON.stringify(points));

  const staticDummyData = [
    { date: new Date("2024-01-01"), value: 500 },
    { date: new Date("2024-02-01"), value: 700 },
    // { date: new Date("2024-03-01"), value: 900 },
    // { date: new Date("2024-04-01"), value: 650 },
    // { date: new Date("2024-05-01"), value: 800 },
    // { date: new Date("2024-06-01"), value: 750 },
    // { date: new Date("2024-07-01"), value: 950 },
    // { date: new Date("2024-08-01"), value: 850 },
    // { date: new Date("2024-09-01"), value: 1000 },
    // { date: new Date("2024-10-01"), value: 1100 },
  ];

  return (
    <View style={styles.container}>
      <Text>Progress Graph</Text>

      <LineGraph
        points={staticDummyData}
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
