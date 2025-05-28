import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import { fetchCurrentScore, fetchScoreHistory } from '../../src/store/slices/creditScoreSlice';
import { AppDispatch } from '../../src/store';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreditScoreScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { currentScore, history, loading, error } = useSelector(
    (state: RootState) => state.creditScore
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCurrentScore()).unwrap(),
          dispatch(fetchScoreHistory({ limit: 10 })).unwrap()
        ]);
      } catch (err) {
        console.error('Error loading credit score data:', err);
      }
    };
    
    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <Text style={[styles.errorText, { color: isDark ? '#ff3b30' : '#ff3b30' }]}>
          {error}
        </Text>
      </View>
    );
  }

  const chartData = {
    labels: (history || []).slice(-6).map((score) => 
      new Date(score.calculationDate).toLocaleDateString('en-US', { month: 'short' })
    ),
    datasets: [
      {
        data: (history || []).slice(-6).map((score) => score.score),
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView style={styles.scrollView}>
        {/* Current Score Section */}
        <View style={styles.currentScoreSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
            Current Credit Score
          </Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{currentScore?.score || 'N/A'}</Text>
          </View>
          <Text style={[styles.scoreDate, { color: isDark ? '#8E8E93' : '#666' }]}>
            Last updated: {currentScore ? new Date(currentScore.calculationDate).toLocaleDateString() : 'N/A'}
          </Text>
        </View>

        {/* Score History Chart */}
        {history && history.length > 0 && (
          <View style={styles.chartSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
              Score History
            </Text>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: isDark ? '#000' : '#fff',
                backgroundGradientFrom: isDark ? '#000' : '#fff',
                backgroundGradientTo: isDark ? '#000' : '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        {/* Score Factors */}
        {currentScore && currentScore.factors && (
          <View style={styles.factorsSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
              Score Factors
            </Text>
            {Object.entries(currentScore.factors).map(([factor, value]) => (
              <View key={factor} style={styles.factorItem}>
                <Text style={[styles.factorName, { color: isDark ? '#fff' : '#000' }]}>
                  {factor.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                <View style={styles.factorBar}>
                  <View
                    style={[
                      styles.factorBarFill,
                      { width: `${value}%`, backgroundColor: getScoreColor(value) },
                    ]}
                  />
                </View>
                <Text style={[styles.factorValue, { color: isDark ? '#8E8E93' : '#666' }]}>
                  {value}%
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const getScoreColor = (value: number) => {
  if (value >= 80) return '#34C759';
  if (value >= 60) return '#FF9500';
  return '#FF3B30';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  currentScoreSection: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreDate: {
    fontSize: 14,
  },
  chartSection: {
    padding: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  factorsSection: {
    padding: 20,
  },
  factorItem: {
    marginBottom: 15,
  },
  factorName: {
    fontSize: 16,
    marginBottom: 5,
  },
  factorBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  factorBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  factorValue: {
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 