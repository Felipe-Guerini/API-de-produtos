const getProducts = async (req, res) => {
  try {
    const result = await req.app.locals.pool.query("SELECT * FROM produtos");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao listar produtos." });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await req.app.locals.pool.query(
      "SELECT * FROM produtos WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao buscar produto com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao buscar produto." });
  }
};

const createProduct = async (req, res) => {
  const { nome, descricao, preco, categoria_id } = req.body;
  try {
    if (!nome || preco === undefined || preco === null) {
      return res
        .status(400)
        .json({ message: 'Campos "nome" e "preco" são obrigatórios.' });
    }

    const result = await req.app.locals.pool.query(
      "INSERT INTO produtos (nome, descricao, preco, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, descricao, preco, categoria_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao criar produto." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria_id } = req.body;

  try {
    if (
      nome === undefined &&
      descricao === undefined &&
      preco === undefined &&
      categoria_id === undefined
    ) {
      return res.status(400).json({
        message: "Nenhum campo para atualização foi fornecido para o produto.",
      });
    }

    let query = "UPDATE produtos SET";
    const queryParams = [];
    let paramIndex = 1;

    if (nome !== undefined) {
      query += ` nome = $${paramIndex++},`;
      queryParams.push(nome);
    }
    if (descricao !== undefined) {
      query += ` descricao = $${paramIndex++},`;
      queryParams.push(descricao);
    }
    if (preco !== undefined) {
      query += ` preco = $${paramIndex++},`;
      queryParams.push(preco);
    }
    if (categoria_id !== undefined) {
      query += ` categoria_id = $${paramIndex++},`;
      queryParams.push(categoria_id);
    }

    query = query.slice(0, -1);
    query += ` WHERE id = $${paramIndex++} RETURNING *`;
    queryParams.push(id);

    const result = await req.app.locals.pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado para atualização." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao atualizar produto." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await req.app.locals.pool.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado para exclusão." });
    }
    res.status(204).send();
  } catch (err) {
    console.error(`Erro ao deletar produto com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao deletar produto." });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
