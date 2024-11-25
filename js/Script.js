function updateCart() {
  let subtotal = 0;
  let delivery = 100.00; // Valor fixo de entrega

  // Recuperar os itens do carrinho do localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Obter o corpo da tabela onde os produtos serão exibidos
  const cartTableBody = document.querySelector(".cart-table tbody");
  cartTableBody.innerHTML = ""; // Limpar a tabela antes de adicionar os itens

  // Se o carrinho estiver vazio
  if (cart.length === 0) {
    cartTableBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align: center; padding: 20px;">
                Seu carrinho está vazio. Adicione itens para visualizar aqui.
            </td>
        </tr>
    `;
    // Atualizar os totais para zero
    document.getElementById('subtotal').innerText = "R$ 0,00";
    document.getElementById('delivery').innerText = "R$ 0,00";
    document.getElementById('total').innerText = "R$ 0,00";
    return;
  }

  // Iterar sobre os itens do carrinho e preencher a tabela
  cart.forEach(function(item) {
    // Verificar se o item tem as informações necessárias
    if (!item.nome || !item.preco || !item.imagem) {
      return; // Pular itens sem as informações
    }

    const row = document.createElement("tr");
    const price = item.preco / 100; // Convertendo de centavos para reais
    const quantity = item.quantidade || 1; // Garantir que a quantidade não seja undefined
    const total = price * quantity;

    row.innerHTML = `
        <td class="product-info">
            <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: auto;">
            <span>${item.nome}</span>
        </td>
        <td class="product-price">R$ ${price.toFixed(2)}</td>
        <td>
            <input type="number" value="${quantity}" min="1" class="quantity">
        </td>
        <td class="product-total">R$ ${total.toFixed(2)}</td>
        <td>
            <button class="btn remove">Remover</button>
        </td>
    `;
    cartTableBody.appendChild(row);

    // Adicionar o preço total ao subtotal
    subtotal += total;
  });

  // Atualizar o subtotal na página
  document.getElementById('subtotal').innerText = `R$ ${subtotal.toFixed(2)}`;

  // Atualizar o valor da entrega
  document.getElementById('delivery').innerText = `R$ ${delivery.toFixed(2)}`;

  // Calcular o total final (Subtotal + Entrega)
  let total = subtotal + delivery;
  document.getElementById('total').innerText = `R$ ${total.toFixed(2)}`;

  // Adicionar eventos para os botões de remover e campos de quantidade
  document.querySelectorAll('.quantity').forEach(function(input) {
    input.addEventListener('input', updateCartQuantity);
  });

  document.querySelectorAll('.remove').forEach(function(button) {
    button.addEventListener('click', removeFromCart);
  });
}

// Função para atualizar o carrinho após alterar a quantidade
function updateCartQuantity(event) {
  const input = event.target;
  const row = input.closest('tr');
  const price = parseFloat(row.querySelector('.product-price').innerText.replace('R$', '').replace(',', ''));
  let quantity = parseInt(input.value);

  // Garantir que a quantidade seja um número válido
  if (isNaN(quantity) || quantity <= 0) {
    input.value = 1;  // Definir a quantidade para 1 caso o valor não seja válido
    quantity = 1; // Para evitar "NaN" no cálculo
  }

  // Atualizar o total do produto
  const total = price * quantity;
  row.querySelector('.product-total').innerText = `R$ ${total.toFixed(2)}`;

  // Atualizar os dados no localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productId = row.querySelector('.product-info span').innerText; // Usando o nome do produto como ID

  const product = cart.find(item => item.nome === productId);
  if (product) {
    product.quantidade = quantity; // Atualizar a quantidade
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Atualizar o subtotal
  updateCart();
}

// Função para remover o produto do carrinho
function removeFromCart(event) {
  const button = event.target;
  const row = button.closest('tr');
  const productName = row.querySelector('.product-info span').innerText; // Usando o nome do produto como ID

  // Remover o produto do carrinho no localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.nome !== productName);

  // Atualizar o carrinho no localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Atualizar a tabela do carrinho e os totais
  updateCart();
}

// Atualizar o carrinho na inicialização da página
window.onload = updateCart;