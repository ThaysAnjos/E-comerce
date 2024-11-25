// Função para adicionar um produto ao carrinho
function addToCart() {
    // Dados do produto
    const produto = {
        id: "007",  // ID único para o produto (ajuste conforme necessário)
        nome: "Colar de ouro",
        descricao: "Colar de ouro usado pela rainha Rayssa de Rafaela do Brasil, responsável pela criação de toda a vida no Brasil. É forjado do ouro mais puro e mantém viva a história da grande rainha.",
        preco: 18000000000000,  // Preço em centavos (para evitar problemas com casas decimais)
        imagem: "../Imagens/colarOuro.webp", // Ajuste o caminho da imagem conforme necessário
        quantidade: 1
    };

    // Recuperar o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar se o produto já está no carrinho
    let productIndex = cart.findIndex(item => item.id === produto.id);
    if (productIndex > -1) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        cart[productIndex].quantidade += produto.quantidade;
    } else {
        // Se o produto não estiver no carrinho, adicione-o
        cart.push(produto);
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Alerta ou mensagem de sucesso
    alert("Produto adicionado ao carrinho!");
}

// Adiciona o evento de clique no botão "Adicionar ao Carrinho"
document.getElementById("add-to-cart").addEventListener("click", addToCart);