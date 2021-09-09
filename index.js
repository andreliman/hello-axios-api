const express = require(`express`);
const app = express();

const produtos = [{
  id: 1,
  produto: `banana`,
  preco: 15
}];

app.get(`/`, (req, res) => {
  res.send('The server is running');
})

app.put(`/produto/:id`, (req, res) => {
  const { nome, preco } = req.body;
  const { id } = req.params;

  produtos.push({ id, nome, preco});

  res.status(201).end();
});

app.get(`/produto/:id`, (req, res) => {
  const { id } = req.params;

  const produto = produtos.find(produto => produto.id === Number(id));

  if (!produto) {
    throw new Error(`Produto não encontrado`);
  }

  res.json(produto);
});

app.get(`/produto`, (req, res) => {
  const { nome } = req.query;

  const filtro = produtos.filter(produto => produto.nome.includes(nome));

  res.json(filtro);
});

app.listen(3000, () => {
  console.log(`The server is up and running on port 3000`);
});
