import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider } from './src/theme/ThemeContext';
import RootLayout from './app/_layout';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootLayout />
      </ThemeProvider>
    </Provider>
  );
}
