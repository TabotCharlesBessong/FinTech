import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

export default function ProfileLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isWeb = Platform.OS === 'web';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#000' : '#fff',
          ...(isWeb && {
            borderBottomWidth: 1,
            borderBottomColor: isDark ? '#1C1C1E' : '#E5E5EA',
          }),
        },
        headerTintColor: isDark ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
        presentation: 'card',
        animation: 'slide_from_right',
        ...(isWeb && {
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          title: 'Security Settings',
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: 'Privacy Settings',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: 'Help & Support',
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: 'Change Password',
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{
          title: 'Privacy Policy',
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: 'Terms of Service',
        }}
      />
    </Stack>
  );
}
