// Produtos da loja
const produtos = [
    { id: 1, nome: 'Furadeira de Impacto', preco: 299.90, icone: 'fa-bolt' },
    { id: 2, nome: 'Cimento CP II 50kg', preco: 39.90, icone: 'fa-cube' },
    { id: 3, nome: 'Tinta Acrílica 18L', preco: 189.90, icone: 'fa-paint-roller' },
    { id: 4, nome: 'Kit Torneira Cozinha', preco: 159.90, icone: 'fa-faucet' },
    { id: 5, nome: 'Lâmpada LED 9W', preco: 19.90, icone: 'fa-lightbulb' },
    { id: 6, nome: 'Serra Circular 7"', preco: 349.90, icone: 'fa-tools' },
    { id: 7, nome: 'Piso Porcelanato', preco: 89.90, icone: 'fa-th-large' },
    { id: 8, nome: 'Vaso Sanitário', preco: 499.90, icone: 'fa-toilet' }
];

// Carrinho
let carrinho = [];

// Elementos do DOM
const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const bannerBtn = document.getElementById('banner-btn');

// Renderizar produtos
function renderizarProdutos() {
    productGrid.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <i class="fas ${produto.icone}"></i>
            <h3>${produto.nome}</h3>
            <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">
                <i class="fas fa-cart-plus"></i> Adicionar
            </button>
        `;
        productGrid.appendChild(card);
    });
}

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    animarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
    // Atualizar contador
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.textContent = totalItens;

    // Atualizar lista do modal
    cartItems.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<li style="justify-content:center; color:#999;">Seu carrinho está vazio</li>';
    } else {
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            `;
            cartItems.appendChild(li);
            total += item.preco * item.quantidade;
        });
    }

    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Animação do ícone do carrinho
function animarCarrinho() {
    cartIcon.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

// Abrir modal do carrinho
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    atualizarCarrinho();
});

// Fechar modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada com sucesso! Obrigado por comprar na Sodimac!');
    carrinho = [];
    atualizarCarrinho();
    cartModal.style.display = 'none';
});

// Banner button
bannerBtn.addEventListener('click', () => {
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
});

// Interatividade das categorias
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoria = card.dataset.category;
        alert(`Você selecionou a categoria: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);
    });
});

// Inicializar
renderizarProdutos();
atualizarCarrinho();
