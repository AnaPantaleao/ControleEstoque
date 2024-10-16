import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

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

  // Função para remover item do estoque
  const removerProduto = (id) => {
    const novoEstoque = estoque.filter(item => item.id !== id);
    setEstoque(novoEstoque);
  };

  // Função para renderizar cada item do estoque
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nome} - {item.quantidade} unidades</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removerProduto(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
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
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={adicionarProduto}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={estoque}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff69b4', // Rosa claro
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
