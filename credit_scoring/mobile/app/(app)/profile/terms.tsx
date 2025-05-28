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

export default function TermsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          title: 'Terms of Service',
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Terms of Service
          </Text>
          <Text style={[styles.date, { color: isDark ? '#8E8E93' : '#666' }]}>
            Last updated: March 15, 2024
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            1. Acceptance of Terms
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            2. Use License
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            Permission is granted to temporarily use this application for personal, non-commercial purposes only. This license shall automatically terminate if you violate any of these restrictions.
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            3. User Account
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            To use certain features of the application, you must register for an account. You agree to:
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Provide accurate and complete information
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Maintain the security of your account
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Promptly update any changes to your information
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            4. Financial Information
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            The application provides credit score monitoring and financial management tools. You acknowledge that:
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • Credit scores are estimates and may vary from actual scores
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • We are not responsible for financial decisions made based on the information provided
          </Text>
          <Text style={[styles.bullet, { color: isDark ? '#fff' : '#000' }]}>
            • You should verify all financial information independently
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            5. Limitation of Liability
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            In no event shall we be liable for any damages arising out of the use or inability to use the application.
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            6. Changes to Terms
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            We reserve the right to modify these terms at any time. We will notify users of any material changes.
          </Text>

          <Text style={[styles.section, { color: isDark ? '#fff' : '#000' }]}>
            7. Contact Information
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            Questions about the Terms of Service should be sent to us at:
          </Text>
          <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
            Email: legal@creditscore.com
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