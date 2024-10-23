import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; // To detect network status

interface ApiResponse {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApiRequest = (url: string, options = {}): ApiResponse => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = `@cache_${url}`; // Unique key for storing API data

  // Helper to load data from AsyncStorage
  const loadFromAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setData(JSON.parse(storedData));
        console.log('Loaded data from AsyncStorage');
      }
    } catch (err) {
      console.error('Error loading from AsyncStorage:', err);
      setError('Failed to load cached data.');
    }
  };

  // Helper to save data to AsyncStorage
  const saveToAsyncStorage = async (value: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      console.log('Saved data to AsyncStorage');
    } catch (err) {
      console.error('Error saving to AsyncStorage:', err);
    }
  };

  // Fetch data with useCallback to avoid unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);           // Store in state
      await saveToAsyncStorage(result); // Save to AsyncStorage
    } catch (err: any) {
      console.error('Error fetching data:', err.message);
      setError(err.message);

      // Load cached data if fetch fails
      await loadFromAsyncStorage();
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Check network status and fetch or load from AsyncStorage
  const initializeData = useCallback(async () => {
    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      console.log('Internet available. Fetching data from API...');
      await fetchData();
    } else {
      console.log('No internet. Loading data from AsyncStorage...');
      await loadFromAsyncStorage();
      setLoading(false);
    }
  }, [fetchData]);

  // Run initialization on mount
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return { data, loading, error, refetch: fetchData };
};

export default useApiRequest;
