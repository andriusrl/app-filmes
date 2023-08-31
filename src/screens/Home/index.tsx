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
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    const response = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
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
            // height: "auto",
            paddingBottom: 300,
            // backgroundColor: "blue",
            alignItems: "center",
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5} // no momento que chegar no meio da lista já começa a carregar outra página e mantem filmes que já tinham
        />
      </View>
    </View>
  );
}
