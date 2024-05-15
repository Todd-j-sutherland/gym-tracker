import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="(customWorkout)"
        options={{
          headerTitle: "Create Custom Exercise",
          drawerLabel: "Create Custom Exercise",
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Exercise List",
          drawerLabel: "Exercise List",
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
