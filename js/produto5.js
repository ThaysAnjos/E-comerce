// Função para adicionar um produto ao carrinho
function addToCart() {
    // Dados do produto
    const produto = {
        id: "009",  // ID único para o produto (ajuste conforme necessário)
        nome: "Pulseira de Ouro",
        descricao: "Pulseira de ouro puro, símbolo de poder e riqueza, forjada pelas mãos dos melhores artesãos de Vundring.",
        preco: 50000000,  // Preço em centavos (50 milhões)
        imagem: "../Imagens/pulseiraOuro.webp", // Ajuste o caminho da imagem conforme necessário
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