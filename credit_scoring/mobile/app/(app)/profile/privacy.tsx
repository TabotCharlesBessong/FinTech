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

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleDataCollectionToggle = (value: boolean) => {
    setDataCollectionEnabled(value);
    // TODO: Implement data collection settings
  };

  const handleAnalyticsToggle = (value: boolean) => {
    setAnalyticsEnabled(value);
    // TODO: Implement analytics settings
  };

  const handleMarketingToggle = (value: boolean) => {
    setMarketingEnabled(value);
    // TODO: Implement marketing settings
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion
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
          title: 'Privacy',
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView style={styles.scrollView}>
        {/* Data Collection Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Data Collection
          </Text>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="analytics-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Data Collection
              </Text>
            </View>
            <Switch
              value={dataCollectionEnabled}
              onValueChange={handleDataCollectionToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={dataCollectionEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="bar-chart-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Analytics
              </Text>
            </View>
            <Switch
              value={analyticsEnabled}
              onValueChange={handleAnalyticsToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={analyticsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Marketing Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Marketing
          </Text>
          <View style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <View style={styles.optionLeft}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Marketing Communications
              </Text>
            </View>
            <Switch
              value={marketingEnabled}
              onValueChange={handleMarketingToggle}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={marketingEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Legal
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={() => router.push('/profile/privacy-policy')}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Privacy Policy
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={() => router.push('/profile/terms')}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Terms of Service
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        {/* Delete Account Button */}
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.deleteText, { color: '#FF3B30' }]}>Delete Account</Text>
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
  deleteButton: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 