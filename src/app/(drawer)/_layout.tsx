import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const DrawerLayout = () => {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer>
      <Drawer.Screen
        name="(customWorkout)"
        options={{
          headerTitle: "Create Custom Exercise",
          drawerLabel: "Create Custom Exercise",
        }}
        // redirect={authState?.authenticated === null}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Exercise List",
          drawerLabel: "Exercise List",
        }}
        // redirect={authState?.authenticated === null}
      />
    </Drawer>
    // </GestureHandlerRootView>
  );
};

export default DrawerLayout;
