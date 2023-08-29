import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Oque você quer assistir hoje</Text>
      <View style={styles.containerInput}>
        <TextInput placeholder="Buscar" style={styles.input} />
        <MagnifyingGlass color="#FFF" size={25} weight="light" />
      </View>
    </View>
  );
}
