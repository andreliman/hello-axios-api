const express = require(`express`);
const app = express();

app.use(express.json());

const produtos = [{
  id: 1,
  nome: `banana`,
  preco: 15
}];

app.get(`/`, (req, res) => {
  res.send('The server is running');
})


const die = (...args) => {
  console.error(...args);
  process.exit(1);
}

app.put(`/produtos/:id`, (req, res) => {
  const { nome, preco } = req.body;
  const { id } = req.params;

  produtos.push({ id: Number(id), nome, preco});

  res.json(produtos);
});

app.get(`/produtos/:id`, (req, res) => {
  const { id } = req.params;

  const produto = produtos.reverse().find(produto => produto.id === Number(id));

  if (!produto) {
    throw new Error(`Produto não encontrado`);
  }

  res.json(produto);
});

app.get(`/produtos`, (req, res) => {
  const { nome } = req.query;

  const filtro = produtos.filter(produto => produto.nome.includes(nome));

  res.json(filtro);
});

app.listen(3000, () => {
  console.log(`The server is up and running on port 3000`);
});
