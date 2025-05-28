import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../src/store';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isWeb = Platform.OS === 'web';
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleSecurity = () => {
    router.push('/profile/security');
  };

  const handlePrivacy = () => {
    router.push('/profile/privacy');
  };

  const handleHelp = () => {
    router.push('/profile/help');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={isWeb ? styles.webScrollContent : undefined}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
              onPress={handleEditProfile}
            >
              <Ionicons name="camera" size={20} color={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={[styles.email, { color: isDark ? '#8E8E93' : '#666' }]}>
            {user?.email}
          </Text>
        </View>

        {/* Settings Sections */}
        <View style={[styles.section, isWeb && styles.webSection]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Account
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={handleEditProfile}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="person-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Edit Profile
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, isWeb && styles.webSection]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Security & Privacy
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={handleSecurity}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="shield-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Security
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
            onPress={handlePrivacy}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Privacy
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, isWeb && styles.webSection]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Support
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={handleHelp}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Help & Support
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>
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
  webScrollContent: {
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  webSection: {
    maxWidth: 600,
    width: '100%',
    marginHorizontal: 'auto',
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
}); 