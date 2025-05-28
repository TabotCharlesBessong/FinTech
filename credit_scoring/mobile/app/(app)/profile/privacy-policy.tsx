import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

export default function PrivacyPolicyScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Privacy Policy
          </Text>
          <Text style={[styles.date, { color: isDark ? '#8E8E93' : '#666' }]}>
            Last updated: March 15, 2024
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            1. Information We Collect
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            We collect information that you provide directly to us, including:
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Personal information (name, email address, phone number)
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Financial information (transactions, credit score data)
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Account credentials
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            2. How We Use Your Information
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            We use the information we collect to:
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Provide and maintain our services
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Process your transactions
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Calculate and display your credit score
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Send you important updates and notifications
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            3. Data Security
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            4. Your Rights
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            You have the right to:
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Access your personal information
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Correct inaccurate data
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Request deletion of your data
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Opt-out of marketing communications
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            5. Contact Us
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            Email: privacy@creditscore.com
          </Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 20,
    marginBottom: 5,
  },
}); 