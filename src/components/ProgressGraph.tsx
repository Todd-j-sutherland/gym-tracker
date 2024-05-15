import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

type Set = {
  _id: string;
  reps: number;
  weight: number;
};

type ProgressGraphProps = {
  sets?: Set[];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const idToDate = (id: string) => {
  const timestamp = parseInt(id.slice(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return monthNames[date.getMonth()];
};

const ProgressGraph: React.FC<ProgressGraphProps> = ({ sets = [] }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const newDataPoints = sets.map((set) => {
      const month = idToDate(set._id);
      const value = set.reps * set.weight;
      return { x: month, y: value, label: `${value}` };
    });

    setDataPoints(newDataPoints);
  }, [sets]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Graph</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={Dimensions.get("window").width}
      >
        <VictoryAxis
          tickValues={monthNames}
          style={{ tickLabels: { angle: -45, fontSize: 8, padding: 15 } }}
        />
        <VictoryScatter
          data={dataPoints}
          size={5}
          style={{
            data: {
              fill: ({ datum }) => (datum.y > 500 ? "#c43a31" : "#00a3de"),
            },
          }}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
        />
      </VictoryChart>
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ProgressGraph;
