import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@creditscore.com');
  };

  const handleOpenFAQ = (faqId: string) => {
    // TODO: Implement FAQ navigation
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          title: 'Help & Support',
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView style={styles.scrollView}>
        {/* Contact Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Contact Support
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={handleContactSupport}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                Email Support
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Frequently Asked Questions
          </Text>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}
            onPress={() => handleOpenFAQ('credit-score')}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                How is my credit score calculated?
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
            onPress={() => handleOpenFAQ('transactions')}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                How do I add a transaction?
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
            onPress={() => handleOpenFAQ('security')}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={isDark ? '#fff' : '#000'}
              />
              <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>
                How do I secure my account?
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isDark ? '#8E8E93' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            App Information
          </Text>
          <View style={[styles.infoItem, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <Text style={[styles.infoLabel, { color: isDark ? '#8E8E93' : '#666' }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>
              1.0.0
            </Text>
          </View>
          <View style={[styles.infoItem, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
            <Text style={[styles.infoLabel, { color: isDark ? '#8E8E93' : '#666' }]}>
              Build Number
            </Text>
            <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>
              100
            </Text>
          </View>
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 