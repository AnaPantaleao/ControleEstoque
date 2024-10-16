import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('estoque.db');

// Criação de tabela
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, quantidade INT);'
  );
});

// Inserir produto
const inserirProduto = (nome, quantidade) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO produtos (nome, quantidade) values (?, ?);',
      [nome, quantidade]
    );
  });
};

// Listar produtos
const listarProdutos = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM produtos;',
      [],
      (_, { rows }) => {
        console.log(rows._array);
      }
    );
  });
};
