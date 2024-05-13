import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthContextProvider from "../providers/AuthContext";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <Stack>
            <Stack.Screen
              name="(drawer)"
              options={{ headerTitle: "", title: "", headerShown: false }}
            />
            <Stack.Screen
              name="(workoutDetail)"
              options={{ headerTitle: "", title: "", headerShown: false }}
            />
            <Stack.Screen
              name="auth"
              options={{ title: "login", headerShown: false }}
            />
          </Stack>
        </QueryClientProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
