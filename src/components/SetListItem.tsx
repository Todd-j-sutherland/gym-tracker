import { View, Text } from "react-native";
import { FC } from "react";
import { formatDistanceToNow } from "date-fns";

type Set = {
  _id: string;
  reps: number;
  weight: number;
};

type SetListItemProps = {
  set: Set;
};

const SetListItem: FC<SetListItemProps> = ({ set }) => {
  const timestamp = parseInt(set._id.slice(0, 8), 16) * 1000;
  const createdAt = new Date(timestamp);

  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        gap: 5,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>
        {set.reps} x {set.weight}
      </Text>

      <Text style={{ color: "gray" }}>{formatDistanceToNow(createdAt)}</Text>
    </View>
  );
};

export default SetListItem;
