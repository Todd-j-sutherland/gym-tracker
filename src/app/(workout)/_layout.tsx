import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const DrawerLayout = () => {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer>
      {/* <Drawer.Screen
          name="(workoutDetail)/[name]"
          options={{
            headerTitle: "Home",
            drawerLabel: "Home",
          }}
          // redirect={authState?.authenticated === null}
        /> */}
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
