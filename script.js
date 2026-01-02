document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("latest-post");
    if (!container) return;

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            // Renderiza as prévias das matérias
            container.innerHTML = data.map(post => `
                <a href="${post.link}" class="post-preview-card">
                    <div class="post-image-wrapper">
                        <img src="${post.imagem}" alt="${post.titulo}" loading="lazy">
                    </div>
                    <div class="post-content-wrapper">
                        <h3>${post.titulo}</h3>
                        <p>${post.resumo}</p>
                        <span class="post-btn">${post.chamada}</span>
                    </div>
                </a>
            `).join('');
        })
        .catch(error => console.error('Erro:', error));
});