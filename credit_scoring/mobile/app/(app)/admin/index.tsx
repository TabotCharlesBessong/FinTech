import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../src/theme/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/store';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function AdminDashboard() {
  const { colors } = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock data - replace with actual data from your backend
  const stats = {
    totalUsers: 1250,
    activeUsers: 980,
    totalTransactions: 45678,
    averageScore: 720,
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [650, 680, 700, 720, 710, 730],
        color: (opacity = 1) => colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const menuItems = [
    {
      id: 'users',
      title: 'User Management',
      icon: 'people-outline',
      count: stats.totalUsers,
    },
    {
      id: 'transactions',
      title: 'Transactions',
      icon: 'swap-horizontal-outline',
      count: stats.totalTransactions,
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: 'bar-chart-outline',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Welcome back, {user?.name}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Admin Dashboard
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Ionicons name="people" size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.totalUsers}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Total Users
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Ionicons name="person" size={24} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.activeUsers}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Active Users
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Ionicons name="swap-horizontal" size={24} color={colors.warning} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.totalTransactions}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Transactions
          </Text>
        </View>
      </View>

      <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Average Credit Score
        </Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: colors.card,
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.primary,
            labelColor: (opacity = 1) => colors.text,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.primary,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: colors.card }]}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            {item.count && (
              <Text style={[styles.menuItemCount, { color: colors.text }]}>
                {item.count}
              </Text>
            )}
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  notificationButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  chartContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  menuItemCount: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 