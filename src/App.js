import React, { useState, useEffect } from 'react';
import '../src/assets/css/pages/index/index.css';

// Componente para adicionar novos produtos ao estoque
function ProdutoForm({ adicionarProduto }) {
  const [nome, setNome] = useState(''); // Nome do produto
  const [descricao, setDescricao] = useState(''); // Descrição do produto
  const [preco, setPreco] = useState(''); // Preço do produto
  const [quantidade, setQuantidade] = useState(''); // Quantidade do produto

  // Função para lidar com o envio do formulário de adição de produto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !descricao || !preco || !quantidade) {
      alert('Por favor, preencha todos os campos!'); // Alerta se algum campo estiver vazio
      return;
    }
    adicionarProduto({ nome, descricao, preco: parseFloat(preco), quantidade: parseInt(quantidade) });
    setNome(''); // Limpa o campo nome após o envio do formulário
    setDescricao(''); // Limpa o campo descrição após o envio do formulário
    setPreco(''); // Limpa o campo preço após o envio do formulário
    setQuantidade(''); // Limpa o campo quantidade após o envio do formulário
  };

  return (
    <form className="produto-form" onSubmit={handleSubmit}>
      <h2>adicionar produto</h2>
      <div className="form-control">
        <label>nome do produto:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="form-control">
        <label>descrição do produto:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div className="form-control">
        <label>preço do produto:</label>
        <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
      </div>
      <div className="form-control">
        <label>quantidade do produto:</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </div>
      <button type="submit">adicionar Produto</button>
    </form>
  );
}

// Componente para exibir a lista de produtos em estoque e permitir operações como remover, vender e atualizar
function EstoqueList({ produtos, removerProduto, realizarVenda, atualizarProduto }) {
  const [filtro, setFiltro] = useState(''); // Filtro para pesquisar produtos por nome ou descrição
  const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Lista de produtos filtrados

  // Atualiza a lista de produtos filtrados com base no filtro aplicado
  useEffect(() => {
    setProdutosFiltrados(
      produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  }, [produtos, filtro]);

  // Função para lidar com a remoção de um produto do estoque
  const handleRemoverProduto = (nome) => {
    if (window.confirm(`Tem certeza que deseja remover o produto "${nome}" do estoque?`)) {
      removerProduto(nome);
    }
  };

  // Função para lidar com a realização de uma venda de um produto
  const handleRealizarVenda = (produto) => {
    const quantidade = prompt(`Digite a quantidade de "${produto.nome}" que deseja vender:`);
    if (quantidade && !isNaN(quantidade) && parseInt(quantidade) > 0) {
      realizarVenda(produto.nome, parseInt(quantidade));
    } else {
      alert('Por favor, insira uma quantidade válida!');
    }
  };

  // Função para lidar com a atualização de detalhes de um produto
  const handleAtualizarProduto = (produto) => {
    const novosDetalhes = prompt(
      `Digite os novos detalhes para o produto "${produto.nome}" (Nome, Descrição, Preço, Quantidade), separados por vírgula:`
    );
    if (novosDetalhes) {
      const [nome, descricao, preco, quantidade] = novosDetalhes.split(',');
      if (nome && descricao && preco && quantidade) {
        atualizarProduto(produto.nome, { nome, descricao, preco: parseFloat(preco), quantidade: parseInt(quantidade) });
      } else {
        alert('Por favor, insira todos os campos corretamente!');
      }
    }
  };

  return (
    <div className="estoque-list">
      <h2>produtos em estoque</h2>
      <input
        type="text"
        placeholder="Filtrar por Nome ou Descrição"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <ul>
        {produtosFiltrados.map((produto, index) => (
          <li key={index}>
            <div>
              <strong>{produto.nome}</strong>
              <p>{produto.descricao}</p>
              <p>preço: R$ {produto.preco.toFixed(2)}</p>
              <p>quantidade: {produto.quantidade}</p>
              <div className='buttons'>
                <button onClick={() => handleRealizarVenda(produto)}>vender</button>
                <button onClick={() => handleRemoverProduto(produto.nome)}>remover</button>
                <button onClick={() => handleAtualizarProduto(produto)}>atualizar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para o formulário de login
function LoginForm({ onLogin, onRegister, usuarios }) {
  const [username, setUsername] = useState(''); // Nome de usuário
  const [password, setPassword] = useState(''); // Senha do usuário

  // Função para lidar com o envio do formulário de login
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usuarios.find(user => user.username === username && user.password === password);
    if (user) {
      onLogin(true); // Define o estado de login como verdadeiro
    } else {
      alert('Credenciais inválidas! Por favor, tente novamente.'); // Alerta se as credenciais forem inválidas
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>faça login para acessar o sistema</h2>
        <div className="form-control">
          <input placeholder='Usuário:'
            type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-control">
          <input placeholder='Senha:' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">login</button>
        <button className='' onClick={onRegister}>cadastre-se</button>
      </form>
    </div>
  );
}

// Componente para o formulário de registro de usuário
function RegistrationForm({ onRegister }) {
  const [username, setUsername] = useState(''); // Nome de usuário
  const [password, setPassword] = useState(''); // Senha do usuário
  const [email, setEmail] = useState(''); // Email do usuário
  const [phone, setPhone] = useState(''); // Número de telefone do usuário
  const [birthdate, setBirthdate] = useState(''); // Data de nascimento do usuário

  // Função para lidar com o envio do formulário de registro
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password, email, phone, birthdate }; // Novo usuário a ser registrado
    alert('Usuário registrado com sucesso!'); // Alerta de registro bem-sucedido
    onRegister(newUser); // Chama a função de registro com os dados do novo usuário
    console.log('Novo usuário:', newUser); // Exibe os detalhes do novo usuário no console
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>cadastre-se</h2>
      <div className="form-control">
        <input placeholder='seu nome de usuário:'
          type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-control">
        <input placeholder='crie uma senha:' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-control">
        <input placeholder='seu e-mail:' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-control">
        <input placeholder='seu telefone:' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-control data">
        <input placeholder='data de nascimento:' type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>
      <button type="submit">registrar</button>
    </form>
  );
}

// Componente principal da aplicação
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login do usuário
  const [isRegistering, setIsRegistering] = useState(false); // Estado de registro do usuário
  const [produtos, setProdutos] = useState([]); // Lista de produtos em estoque
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários registrados

  // Carrega os produtos salvos do armazenamento local ao iniciar a aplicação
  useEffect(() => {
    const estoqueSalvo = JSON.parse(localStorage.getItem('estoque'));
    if (estoqueSalvo) {
      setProdutos(estoqueSalvo);
    }
  }, []);

  // Salva a lista de produtos no armazenamento local sempre que ela é alterada
  useEffect(() => {
    localStorage.setItem('estoque', JSON.stringify(produtos));
  }, [produtos]);

  // Adiciona um novo produto ao estoque
  const adicionarProduto = (produto) => {
    setProdutos([...produtos, produto]);
  };

  // Remove um produto do estoque
  const removerProduto = (nome) => {
    const novoEstoque = produtos.filter((produto) => produto.nome !== nome);
    setProdutos(novoEstoque);
  };

  // Realiza uma venda de um produto
  const realizarVenda = (nome, quantidade) => {
    const novoEstoque = produtos.map((produto) => {
      if (produto.nome === nome) {
        return { ...produto, quantidade: produto.quantidade - quantidade };
      }
      return produto;
    });
    setProdutos(novoEstoque);
  };

  // Atualiza os detalhes de um produto
  const atualizarProduto = (nome, novosDetalhes) => {
    const novoEstoque = produtos.map((produto) => {
      if (produto.nome === nome) {
        return { ...produto, ...novosDetalhes };
      }
      return produto;
    });
    setProdutos(novoEstoque);
  };

  // Registra um novo usuário
  const registrarUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario]); // Adiciona o novo usuário à lista de usuários
    setIsRegistering(false); // Volta para a tela de login após o registro
  };

  // Função para realizar logout
  const logout = () => {
    setIsLoggedIn(false); // Define o estado de login como falso
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <div className='logout'>
            <h1>sistema de gerenciamento de estoque</h1>
            <button className='btn_sair' onClick={logout}>logout</button> {/* Botão de logout */}
          </div>
          <div className="container">
            <ProdutoForm adicionarProduto={adicionarProduto} />
            <EstoqueList
              produtos={produtos}
              removerProduto={removerProduto}
              realizarVenda={realizarVenda}
              atualizarProduto={atualizarProduto}
            />
          </div>
        </>
      ) : isRegistering ? (
        <RegistrationForm onRegister={registrarUsuario} />
      ) : (
        <LoginForm onLogin={setIsLoggedIn} onRegister={() => setIsRegistering(true)} usuarios={usuarios} />
      )}
    </div>
  );
}

export default App;
