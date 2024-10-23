import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import useApiRequest from '../useApiRequest';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SectionData {
  title: string;
  data: Ayah[];
}

const formatDataForSectionList = (data: { surahs: any[] }): SectionData[] =>
  data.surahs.map((surah) => ({
    title: `${surah.englishName} (${surah.englishNameTranslation})`,
    data: surah.ayahs,
  }));

const TabOneScreen: React.FC = () => {
  const { data, loading, error, refetch } = useApiRequest(
    'https://api.alquran.cloud/v1/quran/en.asad'
  );

  const [formattedData, setFormattedData] = useState<SectionData[]>([]);

  useEffect(() => {
    if (data) {
      const sections = formatDataForSectionList(data.data);
      setFormattedData(sections);
    }
  }, [data]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={formattedData}
        keyExtractor={(item, index) => `${item.numberInSurah}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.numberInSurah}. {item.text}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TabOneScreen;
