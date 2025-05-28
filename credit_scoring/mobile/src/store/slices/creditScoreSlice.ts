import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

interface CreditScore {
  id: string;
  userId: string;
  score: number;
  factors: {
    paymentHistory: number;
    creditUtilization: number;
    creditHistory: number;
    creditTypes: number;
    recentInquiries: number;
  };
  calculationDate: string;
  validUntil: string;
}

interface CreditScoreState {
  currentScore: CreditScore | null;
  history: CreditScore[];
  loading: boolean;
  error: string | null;
}

const initialState: CreditScoreState = {
  currentScore: null,
  history: [],
  loading: false,
  error: null,
};

export const fetchCurrentScore = createAsyncThunk(
  'creditScore/fetchCurrent',
  async () => {
    const response = await api.get('/credit-scores/latest');
    return response.data;
  }
);

export const fetchScoreHistory = createAsyncThunk(
  'creditScore/fetchHistory',
  async (params: { page?: number; limit?: number }) => {
    const response = await api.get('/credit-scores/history', { params });
    return response.data;
  }
);

export const calculateNewScore = createAsyncThunk(
  'creditScore/calculate',
  async () => {
    const response = await api.post('/credit-scores/calculate');
    return response.data;
  }
);

const creditScoreSlice = createSlice({
  name: 'creditScore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Current Score
      .addCase(fetchCurrentScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentScore.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(fetchCurrentScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch current score';
      })
      // Fetch Score History
      .addCase(fetchScoreHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScoreHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.scores;
      })
      .addCase(fetchScoreHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch score history';
      })
      // Calculate New Score
      .addCase(calculateNewScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateNewScore.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScore = action.payload;
      })
      .addCase(calculateNewScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to calculate new score';
      });
  },
});

export default creditScoreSlice.reducer; 