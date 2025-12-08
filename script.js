// script.js

/**
 * Funções de Utilidade para a Achado.COM
 * Gerencia o salvamento e carregamento de posts via localStorage
 */

// ==========================================================
// 1. FUNÇÃO DE SALVAMENTO (Para adicionar um novo post)
// ==========================================================
function adicionarNovoPost(titulo, descricao, imagemUrl, linkUrl) {
    let posts = JSON.parse(localStorage.getItem('listaDePosts')) || [];

    const novoPost = {
        id: Date.now(), 
        titulo: titulo,
        descricao: descricao,
        imagem: imagemUrl,
        link: linkUrl,
        data: new Date().toLocaleDateString('pt-BR')
    };

    // Adiciona o novo post ao *início* do array (índice [0])
    posts.unshift(novoPost);

    try {
        localStorage.setItem('listaDePosts', JSON.stringify(posts));
        alert(`Novo Post "${titulo}" publicado com sucesso! Redirecionando para ver o resultado.`);
        window.location.href = 'index.html'; 
    } catch (e) {
        console.error("Erro ao salvar no localStorage:", e);
        alert("Erro ao salvar o post.");
    }
}

// ==========================================================
// 2. FUNÇÃO PARA CARREGAR O ÚLTIMO POST (Usada em index.html)
// ==========================================================
function carregarOfertaDoDia() {
    const postsSalvos = JSON.parse(localStorage.getItem('listaDePosts')) || [];
    const container = document.getElementById('ofertaDoDiaContainer');
    
    if (!container) return; // Se não for a página correta, para a execução

    if (postsSalvos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhuma Oferta do Dia encontrada. Adicione um post primeiro!</p>';
        return;
    }

    // Pega o primeiro post (o mais recente)
    const post = postsSalvos[0]; 
    
    container.innerHTML = `
        <div class="product-preview-box">
            <a href="${post.link}" target="_blank" class="product-link">
                <div class="product-image-container">
                    <img src="${post.imagem}" alt="${post.titulo}">
                </div>
                <div class="product-info">
                    <h4 class="product-title">${post.titulo}</h4>
                    <p class="product-description">${post.descricao}</p>
                    <span class="product-url">Acesse agora: Achado.COM - Publicado em: ${post.data}</span>
                </div>
            </a>
        </div>
    `;
}

// ==========================================================
// 3. FUNÇÃO PARA CARREGAR TODOS OS POSTS (Usada em arquivos.html)
// ==========================================================
function carregarEExibirTodosOsPosts() {
    const postsSalvos = JSON.parse(localStorage.getItem('listaDePosts')) || [];
    const postsContainer = document.getElementById('postsContainer');
    
    if (!postsContainer) return; // Se não for a página correta, para a execução
    
    postsContainer.innerHTML = ''; // Limpa o carregador inicial

    if (postsSalvos.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhum achado anterior encontrado ainda.</p>';
        return;
    }
    
    // Itera sobre a lista, criando o HTML para cada post
    postsSalvos.forEach(post => {
        const postHTML = `
            <div class="product-preview-box">
                <a href="${post.link}" target="_blank" class="product-link">
                    <div class="product-image-container">
                        <img src="${post.imagem}" alt="${post.titulo}">
                    </div>
                    <div class="product-info">
                        <h4 class="product-title">${post.titulo}</h4>
                        <p class="product-description">${post.descricao}</p>
                        <span class="product-url">Publicado em: ${post.data}</span>
                    </div>
                </a>
            </div>
        `;
        
        postsContainer.innerHTML += postHTML; 
    });
}