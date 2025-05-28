import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
