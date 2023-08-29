import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    const response = await api.get("/movie/popular");
    setDiscoveryMovies(response.data.results);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Oque você quer assistir hoje</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={discoveryMovies}
          numColumns={3}
          renderItem={(item) => <CardMovies data={item.item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 35,
            paddingBottom: 100,
            alignItems: "center"
          }}
        />
      </View>
    </View>
  );
}
