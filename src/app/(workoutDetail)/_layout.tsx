import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="[name]"
          options={{
            headerTitle: "Exercise Item",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
