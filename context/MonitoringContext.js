import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const MonitoringContext = createContext(null);

const STORAGE_KEY = '@odyssey_monitorings';

export function MonitoringProvider({ children }) {
  const [savedMonitorings, setSavedMonitorings] = useState([]);

  useEffect(() => {
    loadMonitorings();
  }, []);

  async function loadMonitorings() {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    setSavedMonitorings(data ? JSON.parse(data) : []);
  }

  async function saveMonitoring(monitoring) {
    const newMonitoring = {
      id: Date.now().toString(),
      ...monitoring,
    };

    const updated = [newMonitoring, ...savedMonitorings];

    setSavedMonitorings(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  async function removeMonitoring(id) {
    const updated = savedMonitorings.filter((item) => item.id !== id);

    setSavedMonitorings(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function isMonitoringSaved(id) {
    return savedMonitorings.some((item) => item.id === id);
  }

  return (
    <MonitoringContext.Provider
      value={{
        savedMonitorings,
        saveMonitoring,
        removeMonitoring,
        isMonitoringSaved,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);

  if (!context) {
    throw new Error('useMonitoring precisa estar dentro de MonitoringProvider');
  }

  return context;
}