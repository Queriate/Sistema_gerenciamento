import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Produto {
    private String nome;
    private String descricao;
    private double preco;
    private int quantidade;

    public Produto(String nome, String descricao, double preco, int quantidade) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getPreco() {
        return preco;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", quantidade=" + quantidade +
                '}';
    }
}

interface EstoqueService {
    void adicionarProduto(Produto produto);

    void atualizarProduto(String nome, int novaQuantidade);

    void removerProduto(String nome);

    void realizarVenda(String nome, int quantidade);

    void gerarRelatorioEstoque();
}

class Estoque implements EstoqueService {
    private List<Produto> produtos;

    public Estoque() {
        produtos = new ArrayList<>();
    }

    @Override
    public void adicionarProduto(Produto produto) {
        produtos.add(produto);
        System.out.println("Produto adicionado ao estoque.");
    }

    @Override
    public void atualizarProduto(String nome, int novaQuantidade) {
        for (Produto produto : produtos) {
            if (produto.getNome().equalsIgnoreCase(nome)) {
                produto.setQuantidade(novaQuantidade);
                System.out.println("Produto atualizado no estoque.");
                return;
            }
        }
        System.out.println("Produto não encontrado.");
    }

    @Override
    public void removerProduto(String nome) {
        boolean removed = produtos.removeIf(produto -> produto.getNome().equalsIgnoreCase(nome));
        if (removed) {
            System.out.println("Produto removido do estoque.");
        } else {
            System.out.println("Produto não encontrado.");
        }
    }

    @Override
    public void realizarVenda(String nome, int quantidade) {
        for (Produto produto : produtos) {
            if (produto.getNome().equalsIgnoreCase(nome)) {
                if (produto.getQuantidade() >= quantidade) {
                    produto.setQuantidade(produto.getQuantidade() - quantidade);
                    System.out.println("Venda realizada.");
                } else {
                    System.out.println("Quantidade insuficiente em estoque.");
                }
                return;
            }
        }
        System.out.println("Produto não encontrado.");
    }

    @Override
    public void gerarRelatorioEstoque() {
        System.out.println("Relatório de Estoque:");
        if (produtos.isEmpty()) {
            System.out.println("O estoque está vazio.");
        } else {
            produtos.forEach(System.out::println);
        }
    }
}

public class SistemaGerenciamentoEstoque {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        EstoqueService estoque = new Estoque();

        while (true) {
            System.out.println("====== Sistema de Gerenciamento de Estoque ======");
            System.out.println("1. Adicionar Produto");
            System.out.println("2. Atualizar Produto");
            System.out.println("3. Remover Produto");
            System.out.println("4. Realizar Venda");
            System.out.println("5. Gerar Relatório de Estoque");
            System.out.println("6. Sair");
            System.out.print("Escolha uma opção: ");
            int opcao;
            try {
                opcao = scanner.nextInt();
                scanner.nextLine(); // Consumir a quebra de linha após o próximoInt()
            } catch (Exception e) {
                System.out.println("Opção Inválida. Tente Novamente.");
                scanner.nextLine(); // Limpar o buffer do scanner
                continue;
            }

            switch (opcao) {
                case 1:
                    adicionarProduto(estoque, scanner);
                    break;
                case 2:
                    atualizarProduto(estoque, scanner);
                    break;
                case 3:
                    removerProduto(estoque, scanner);
                    break;
                case 4:
                    realizarVenda(estoque, scanner);
                    break;
                case 5:
                    estoque.gerarRelatorioEstoque();
                    break;
                case 6:
                    System.out.println("Saindo do Sistema...");
                    System.exit(0);
                default:
                    System.out.println("Opção Inválida. Tente Novamente.");
            }
        }
    }

    private static void adicionarProduto(EstoqueService estoque, Scanner scanner) {
        System.out.print("Nome do Produto: ");
        String nome = scanner.nextLine();
        System.out.print("Descrição do Produto: ");
        String descricao = scanner.nextLine();
        System.out.print("Preço do Produto: ");
        double preco = scanner.nextDouble();
        System.out.print("Quantidade do Produto: ");
        int quantidade = scanner.nextInt();
        scanner.nextLine(); // Consumir a quebra de linha após o próximoInt()
        estoque.adicionarProduto(new Produto(nome, descricao, preco, quantidade));
    }

    private static void atualizarProduto(EstoqueService estoque, Scanner scanner) {
        System.out.print("Nome do Produto: ");
        String nome = scanner.nextLine();
        System.out.print("Nova Quantidade: ");
        int novaQuantidade = scanner.nextInt();
        scanner.nextLine(); // Consumir a quebra de linha após o próximoInt()
        estoque.atualizarProduto(nome, novaQuantidade);
    }

    private static void removerProduto(EstoqueService estoque, Scanner scanner) {
        System.out.print("Nome do Produto: ");
        String nome = scanner.nextLine();
        estoque.removerProduto(nome);
    }

    private static void realizarVenda(EstoqueService estoque, Scanner scanner) {
        System.out.print("Nome do Produto: ");
        String nome = scanner.nextLine();
        System.out.print("Quantidade: ");
        int quantidade = scanner.nextInt();
        scanner.nextLine(); // Consumir a quebra de linha após o próximoInt()
        estoque.realizarVenda(nome, quantidade);
    }
}
