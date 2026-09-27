/* ============================
   SODIMAC - JAVASCRIPT PRINCIPAL
   ============================ */

// ============================
// BASE DE PRODUTOS
// ============================
const produtos = [
    { id: 1,  nome: "Furadeira de Impacto 500W", categoria: "Ferramentas", preco: 189.90, precoAntigo: 249.90, avaliacao: 4.8, vendidos: 1250, icone: "fa-bolt", badge: "promo" },
    { id: 2,  nome: "Tinta Acrílica Premium 18L Branco", categoria: "Pintura", preco: 349.90, precoAntigo: 419.90, avaliacao: 4.9, vendidos: 890, icone: "fa-paint-roller", badge: "promo" },
    { id: 3,  nome: "Kit Torneira + Cuba Inox", categoria: "Banheiro", preco: 459.90, precoAntigo: 599.90, avaliacao: 4.7, vendidos: 320, icone: "fa-bath", badge: null },
    { id: 4,  nome: "Sofá Retrátil 3 Lugares Cinza", categoria: "Decoração", preco: 1899.90, precoAntigo: 2399.90, avaliacao: 4.8, vendidos: 180, icone: "fa-couch", badge: "novo" },
    { id: 5,  nome: "Fio Elétrico 2,5mm - 100m", categoria: "Elétrica", preco: 289.90, precoAntigo: 349.90, avaliacao: 4.6, vendidos: 560, icone: "fa-bolt", badge: null },
    { id: 6,  nome: "Chuveiro Elétrico 7500W", categoria: "Hidráulica", preco: 219.90, precoAntigo: 279.90, avaliacao: 4.5, vendidos: 720, icone: "fa-faucet", badge: "promo" },
    { id: 7,  nome: "Cortador de Grama 1400W", categoria: "Jardim", preco: 699.90, precoAntigo: 899.90, avaliacao: 4.7, vendidos: 145, icone: "fa-tree", badge: null },
    { id: 8,  nome: "Cimento CP II 50kg", categoria: "Construção", preco: 42.90, precoAntigo: 49.90, avaliacao: 4.9, vendidos: 3200, icone: "fa-industry", badge: "promo" },
    { id: 9,  nome: "Jogo de Chaves de Fenda 12 Peças", categoria: "Ferramentas", preco: 79.90, precoAntigo: 119.90, avaliacao: 4.8, vendidos: 980, icone: "fa-screwdriver", badge: null },
    { id: 10, nome: "Rolo de Pintura Antigota", categoria: "Pintura", preco: 34.90, precoAntigo: 49.90, avaliacao: 4.6, vendidos: 1450, icone: "fa-paint-roller", badge: null },
    { id: 11, nome: "Espelho Banheiro c/ LED 80cm", categoria: "Banheiro", preco: 549.90, precoAntigo: 699.90, avaliacao: 4.9, vendidos: 95, icone: "fa-bath", badge: "novo" },
    { id: 12, nome: "Luminária Pendente Moderna", categoria: "Decoração", preco: 189.90, precoAntigo: 249.90, avaliacao: 4.7, vendidos: 210, icone: "fa-lightbulb", badge: null },
    { id: 13, nome: "Disjuntor Bipolar 40A", categoria: "Elétrica", preco: 59.90, precoAntigo: 79.90, avaliacao: 4.8, vendidos: 670, icone: "fa-bolt", badge: null },
    { id: 14, nome: "Tubo PVC 100mm - 3m", categoria: "Hidráulica", preco: 89.90, precoAntigo: 109.90, avaliacao: 4.5, vendidos: 430, icone: "fa-faucet", badge: null },
    { id: 15, nome: "Mangueira de Jardim 30m", categoria: "Jardim", preco: 129.90, precoAntigo: 169.90, avaliacao: 4.6, vendidos: 380, icone: "fa-tree", badge: "promo" },
    { id: 16, nome: "Areia Média - Saco 20kg", categoria: "Construção", preco: 18.90, precoAntigo: 24.90, avaliacao: 4.7, vendidos: 2800, icone: "fa-industry", badge: null },
    { id: 17, nome: "Serra Circular 1800W", categoria: "Ferramentas", preco: 549.90, precoAntigo: 699.90, avaliacao: 4.9, vendidos: 320, icone: "fa-bolt", badge: "promo" },
    { id: 18, nome: "Massa Corrida 25kg", categoria: "Construção", preco: 89.90, precoAntigo: 119.90, avaliacao: 4.8, vendidos: 1600, icone: "fa-industry", badge: null },
    { id: 19, nome: "Vaso Sanitário com Caixa Acoplada", categoria: "Banheiro", preco: 799.90, precoAntigo: 999.90, avaliacao: 4.7, vendidos: 140, icone: "fa-bath", badge: null },
    { id: 20, nome: "Piso Porcelanato 80x80 - m²", categoria: "Construção", preco: 129.90, precoAntigo: 169.90, avaliacao: 4.9, vendidos: 890, icone: "fa-industry", badge: "promo" },
];

let produtosFiltrados = [...produtos];
let produtosVisiveis = 12;
let carrinho = [];

// ============================
// RENDERIZAR PRODUTOS
// ============================
function renderizarProdutos() {
    const grid = document.getElementById('produtosGrid');
    const contador = document.getElementById('contadorProdutos');
    if (!grid) return;

    const visiveis = produtosFiltrados.slice(0, produtosVisiveis);
    contador.textContent = `Exibindo ${visiveis.length} de ${produtosFiltrados.length} produtos`;

    if (visiveis.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#6c757d;font-size:16px;">
            <i class="fas fa-search" style="font-size:40px;display:block;margin-bottom:12px;color:#e63946;"></i>
            Nenhum produto encontrado com esses filtros.
        </p>`;
        return;
    }

    grid.innerHTML = visiveis.map(p => {
        const parcelas = (p.preco / 12).toFixed(2);
        const badgeHtml = p.badge
            ? `<span class="produto-badge ${p.badge}">${p.badge === 'promo' ? 'OFERTA' : 'NOVO'}</span>`
            : '';
        const precoAntigo = p.precoAntigo > p.preco
            ? `<div class="produto-preco-antigo">R$ ${p.precoAntigo.toFixed(2).replace('.', ',')}</div>` : '';

        return `
        <div class="produto-card">
            ${badgeHtml}
            <div class="produto-img"><i class="fas ${p.icone}"></i></div>
            <div class="produto-info">
                <span class="produto-categoria">${p.categoria}</span>
                <h3 class="produto-nome">${p.nome}</h3>
                <div class="produto-avaliacao">
                    <i class="fas fa-star"></i>
                    <span>${p.avaliacao} (${p.vendidos} vendidos)</span>
                </div>
                ${precoAntigo}
                <div class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
                <div class="produto-parcelamento">ou 12x de R$ ${parcelas.replace('.', ',')} sem juros</div>
                <button class="btn-add-cart" onclick="adicionarCarrinho(${p.id})">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            </div>
        </div>`;
    }).join('');
}

// ============================
// FILTROS
// ============================
function aplicarFiltros() {
    const cat = document.getElementById('filtroCategoria').value;
    const preco = document.getElementById('filtroPreco').value;
    const ordem = document.getElementById('filtroOrdenacao').value;

    produtosFiltrados = produtos.filter(p => {
        if (cat && p.categoria !== cat) return false;
        if (preco) {
            const [min, max] = preco.split('-').map(Number);
            if (p.preco < min || p.preco > max) return false;
        }
        return true;
    });

    if (ordem === 'menor-preco') produtosFiltrados.sort((a,b) => a.preco - b.preco);
    else if (ordem === 'maior-preco') produtosFiltrados.sort((a,b) => b.preco - a.preco);
    else if (ordem === 'avaliacao') produtosFiltrados.sort((a,b) => b.avaliacao - a.avaliacao);

    produtosVisiveis = 12;
    renderizarProdutos();
    mostrarToast(`Filtro aplicado: ${produtosFiltrados.length} produtos encontrados`, 'info');
}

function limparFiltros() {
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('filtroPreco').value = '';
    document.getElementById('filtroOrdenacao').value = 'relevancia';
    produtosFiltrados = [...produtos];
    produtosVisiveis = 12;
    renderizarProdutos();
    mostrarToast('Filtros limpos!', 'info');
}

function filtrarCategoria(cat) {
    document.getElementById('filtroCategoria').value = cat;
    aplicarFiltros();
    scrollToProdutos();
}

function carregarMais() {
    produtosVisiveis += 8;
    renderizarProdutos();
}

// ============================
// CARRINHO
// ============================
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const item = carrinho.find(i => i.id === id);
    if (item) {
        item.qtd++;
    } else {
        carrinho.push({ ...produto, qtd: 1 });
    }

    atualizarCarrinho();
    mostrarToast(`<i class="fas fa-check-circle"></i> "${produto.nome}" adicionado!`, 'success');
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0);
    const totalValor = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0);

    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    if (cartCount) cartCount.textContent = totalItens;
    if (cartTotal) cartTotal.textContent = `R$ ${totalValor.toFixed(2).replace('.', ',')}`;

    // Renderizar modal
    const body = document.getElementById('carrinhoItens');
    const footer = document.getElementById('carrinhoFooter');
    const totalEl = document.getElementById('totalCarrinho');

    if (!body) return;

    if (carrinho.length === 0) {
        body.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio 😢</p>';
        footer.style.display = 'none';
        return;
    }

    body.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <div class="carrinho-item-img"><i class="fas ${item.icone}"></i></div>
            <div class="carrinho-item-info">
                <h4>${item.nome}</h4>
                <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="carrinho-item-qtd">
                <button onclick="alterarQtd(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                <span>${item.qtd}</span>
                <button onclick="alterarQtd(${item.id}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <button class="btn-remover" onclick="removerItem(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    totalEl.textContent = `R$ ${totalValor.toFixed(2).replace('.', ',')}`;
    footer.style.display = 'block';
}

function alterarQtd(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;
    item.qtd += delta;
    if (item.qtd <= 0) removerItem(id);
    else atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    atualizarCarrinho();
    mostrarToast('Item removido do carrinho', 'info');
}

function abrirCarrinho() {
    document.getElementById('modalCarrinho').classList.add('active');
    atualizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('modalCarrinho').classList.remove('active');
}

function finalizarCompra() {
    if (carrinho.length === 0) return;
    const total = carrinho.reduce((a,i) => a + i.preco * i.qtd, 0);
    mostrarToast(`<i class="fas fa-check"></i> Compra de R$ ${total.toFixed(2).replace('.', ',')} finalizada!`, 'success');
    carrinho = [];
    atualizarCarrinho();
    setTimeout(fecharCarrinho, 1500);
}

// ============================
// LOGIN
// ============================
function abrirLogin() { document.getElementById('modalLogin').classList.add('active'); }
function fecharLogin() { document.getElementById('modalLogin').classList.remove('active'); }
function fazerLogin(e) {
    e.preventDefault();
    mostrarToast('<i class="fas fa-user-check"></i> Login realizado com sucesso!', 'success');
    fecharLogin();
}

// ============================
// BUSCA
// ============================
function buscarProduto() {
    const termo = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!termo) { mostrarToast('Digite algo para buscar', 'info'); return; }
    produtosFiltrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    );
    produtosVisiveis = 12;
    renderizarProdutos();
    scrollToProdutos();
    mostrarToast(`<i class="fas fa-search"></i> ${produtosFiltrados.length} resultados para "${termo}"`, 'info');
}

// ============================
// SLIDER
// ============================
let slideAtual = 0;
let sliderInterval;

function iniciarSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    if (!slides.length) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => irParaSlide(i);
        dotsContainer.appendChild(dot);
    });

    sliderInterval = setInterval(() => irParaSlide(slideAtual + 1), 5000);
}

function irParaSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    slideAtual = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === slideAtual));
    dots.forEach((d, i) => d.classList.toggle('active', i === slideAtual));
}

// ============================
// COUNTDOWN
// ============================
function iniciarCountdown() {
    let h = 12, m = 45, s = 30;
    setInterval(() => {
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }

        const hs = document.getElementById('horas');
        const ms = document.getElementById('minutos');
        const ss = document.getElementById('segundos');
        if (hs) hs.textContent = String(h).padStart(2, '0');
        if (ms) ms.textContent = String(m).padStart(2, '0');
        if (ss) ss.textContent = String(s).padStart(2, '0');
    }, 1000);
}

// ============================
// NEWSLETTER
// ============================
function inscreverNewsletter(e) {
    e.preventDefault();
    mostrarToast('<i class="fas fa-envelope"></i> Inscrição realizada! Verifique seu e-mail.', 'success');
    e.target.reset();
}

// ============================
// TOAST
// ============================
let toastTimeout;
function mostrarToast(msg, tipo = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = msg;
    toast.className = `toast ${tipo} show`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================
// SCROLL
// ============================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProdutos() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    document.getElementById('mainMenu').classList.toggle('show');
}

// ============================
// INICIALIZAÇÃO
// ============================
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    iniciarSlider();
    iniciarCountdown();

    // Back to top
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('show', window.scrollY > 400);
    });

    // Enter na busca
    document.getElementById('searchInput')?.addEventListener('keypress', e => {
        if (e.key === 'Enter') buscarProduto();
    });

    // Fechar modais ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });
});
