import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../src/store';
import { Stack, useRouter } from 'expo-router';

export default function SecurityScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    router.push('/profile/change-password');
  };

  const handleBiometricToggle = (value: boolean) => {
    setBiometricEnabled(value);
    // TODO: Implement biometric authentication
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    // TODO: Implement notifications settings
  };

  const handleTwoFactorToggle = (value: boolean) => {
    setTwoFactorEnabled(value);
    // TODO: Implement two-factor authentication
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          title: 'Security',
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView style={styles.scrollView}>
        {/* Password Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Password
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={handleChangePassword}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="key-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Change Password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        {/* Authentication Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Authentication
          </Text>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="finger-print-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Biometric Authentication
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={biometricEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Two-Factor Authentication
              </Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleTwoFactorToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={twoFactorEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Notifications
          </Text>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Security Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: '#FF3B30' }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 