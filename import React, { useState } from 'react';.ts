import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoque, setEstoque] = useState([]);

  // Função para adicionar item no estoque
  const adicionarProduto = () => {
    if (produto && quantidade) {
      setEstoque([...estoque, { id: Date.now(), nome: produto, quantidade: parseInt(quantidade) }]);
      setProduto('');
      setQuantidade('');
    }
  };

  // Função para renderizar cada item do estoque
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome} - {item.quantidade} unidades</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Controle de Estoque</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={produto}
        onChangeText={setProduto}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Button title="Adicionar Produto" onPress={adicionarProduto} />

      <FlatList
        data={estoque}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
