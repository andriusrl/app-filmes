import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  };

  const searchMovies = async (query) => {
    setLoading(true);

    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });

    if (response.data.results.lenght === 0) {
      setLoading(false);
      return setNoResult(true);
    }
    setLoading(false);
    return setSearchResultMovies(response.data.results);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      return searchMovies(text);
    }
    return setSearchResultMovies([]);
  };

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Oque você quer assistir hoje</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={movieData}
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
        {loading && <ActivityIndicator size={50} color={"#0296e5"} />}
      </View>
    </View>
  );
}
