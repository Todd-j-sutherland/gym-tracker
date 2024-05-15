import { Stack } from "expo-router";

const DrawerLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="customWorkout"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DrawerLayout;
