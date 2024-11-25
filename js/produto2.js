function addToCart() {
    // Dados do produto
    const produto = {
        id: "006",  // ID único para o produto (pode ajustar conforme necessário)
        nome: "Anel de prata 925",
        descricao: "Anel de prata forjado com parte da armadura do Rei Arthur. Preservando parte de seus poderes e mantendo vivo a lenda.",
        preco: 3000000,  // Preço em centavos (para evitar problemas com casas decimais)
        imagem: "../Imagens/anelPrata925.webp",
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