import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isWeb = Platform.OS === 'web';
  const statusBarHeight = Constants.statusBarHeight;
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#0A84FF' : '#007AFF',
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#999',
        tabBarStyle: {
          position: isWeb ? 'relative' : 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
          ...(isWeb && {
            width: '100%',
            maxWidth: 600,
            marginHorizontal: 'auto',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 'auto',
          }),
          ...(!isWeb && {
            bottom: Platform.OS === 'android' ? 16 : 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: Platform.OS === 'android' ? 16 : 30,
            marginHorizontal: 16,
            marginBottom: Platform.OS === 'android' ? 32 : 0,
          }),
        },
        tabBarBackground: () => (
          isWeb ? null : (
            <BlurView
              tint={isDark ? 'dark' : 'light'}
              intensity={80}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          )
        ),
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="credit-score"
        options={{
          title: 'Credit Score',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Ionicons name={focused ? "trending-up" : "trending-up-outline"} size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size, focused }) => (
              <Animated.View
                style={{
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              >
                <Ionicons name={focused ? "shield" : "shield-outline"} size={size} color={color} />
              </Animated.View>
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
} 