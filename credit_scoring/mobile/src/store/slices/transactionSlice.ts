import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  transactionDate: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  category?: {
    id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
  };
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  stats: {
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    byCategory: Record<string, { income: number; expense: number }>;
  };
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  stats: {
    totalIncome: 0,
    totalExpense: 0,
    netAmount: 0,
    byCategory: {},
  },
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (params: { page?: number; limit?: number; type?: string; categoryId?: string; startDate?: string; endDate?: string }) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  }
);

export const fetchTransactionStats = createAsyncThunk(
  'transactions/fetchStats',
  async (params: { startDate?: string; endDate?: string }) => {
    const response = await api.get('/transactions/stats', { params });
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(fetchTransactionStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default transactionSlice.reducer; 