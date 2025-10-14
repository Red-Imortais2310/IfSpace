// ==========================================================================
// INÍCIO DO SCRIPT GERAL DO IFSPACE (VERSÃO ESTÁVEL COMPLETA E COM POSTAGEM)
// ==========================================================================
console.log("Script carregado!");
const loginForm = document.getElementById('loginForm');



document.addEventListener('DOMContentLoaded', function () {

    console.log('IfSpace - Sistema Carregado (v.Estável-Completa)');

    // ==========================================================================
    // PARTE 1: CÓDIGO GERAL E DAS PÁGINAS DE LOGIN/CADASTRO
    // (Mantido como no modelo inicial)
    // ==========================================================================

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupModal = document.getElementById('signupModal');
    const btnCreateAccount = document.getElementById('btnCreateAccount');
    const btnOpenSignup = document.querySelector('.btn-open-signup-link');
    const closeModalBtn = document.querySelector('.modal .close');

    function showError(input, message) {
        if (!input) return;
        input.classList.add('error');
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#f02849';
        errorDiv.style.fontSize = '13px';
        errorDiv.style.marginTop = '4px';
        input.parentElement.appendChild(errorDiv);
    }

    function clearError(input) {
        if (!input) return;
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    }

    function isValidEmailOrPhone(input) {
        const value = input.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?\d{2}?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}$/;
        return emailRegex.test(value) || phoneRegex.test(value.replace(/\D/g, ''));
    }

    // --- Lógica de Login ---
    if (loginForm) {
        const { email: emailInput, password: passwordInput } = loginForm.elements;
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            let hasError = false;
            if (!email) {
                showError(emailInput, 'Por favor, insira seu email ou telefone.');
                hasError = true;
            } else if (!isValidEmailOrPhone(email)) {
                showError(emailInput, 'Email ou telefone inválido.');
                hasError = true;
            } else {
                clearError(emailInput);
            }

            if (!password) {
                showError(passwordInput, 'Por favor, insira sua senha.');
                hasError = true;
            } else {
                clearError(passwordInput);
            }

            if (!hasError) {
                window.location.href = 'https://red-imortais2310.github.io/IfSpace/feed.html';

            }
        });
    }

    // --- Lógica de Cadastro e Modal ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cadastro realizado com sucesso!');
            if (signupModal) signupModal.style.display = 'none';
        });
    }

    const openSignupModal = () => { if (signupModal) signupModal.style.display = 'block'; };
    const closeSignupModal = () => { if (signupModal) signupModal.style.display = 'none'; };

    if (btnCreateAccount) btnCreateAccount.addEventListener('click', openSignupModal);
    if (btnOpenSignup) {
        btnOpenSignup.addEventListener('click', (e) => {
            e.preventDefault();
            openSignupModal();
        });
    }
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeSignupModal);
    window.addEventListener('click', ({ target }) => { if (target === signupModal) closeSignupModal(); });
    document.addEventListener('keydown', ({ key }) => { if (key === 'Escape' && signupModal?.style.display === 'block') closeSignupModal(); });

      // ==========================================================================
    // PARTE 2: CÓDIGO ESPECÍFICO DA PÁGINA DE FEED (CORRIGIDO E COMPLETO)
    // ==========================================================================

    if (document.querySelector('.feed-container')) {

        // --- LÓGICA SIMPLES E FUNCIONAL PARA TROCAR A FOTO DO STORY (Modelo Inicial) ---
        const meuStoryCard = document.getElementById('meu-story');
        const meuStoryImage = document.getElementById('meu-story-img');
        const trocarStoryInput = document.getElementById('trocarStoryInput');

        if (meuStoryCard && meuStoryImage && trocarStoryInput) {
            meuStoryCard.addEventListener('click', () => {
                trocarStoryInput.click();
            });

            trocarStoryInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        meuStoryImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        } else {
            console.error("AVISO: Não foi possível iniciar a função de trocar story. Verifique se os IDs 'meu-story', 'meu-story-img' e 'trocarStoryInput' existem no seu feed.html.");
        }
        window.location.href = 'https://red-imortais2310.github.io/IfSpace/feed.html';


        // ==========================================================================
        // LÓGICA DO MODAL DE POSTAGEM E CRIAÇÃO DE POSTS (FUNCIONAL)
        // ==========================================================================

        const openPostPopup = document.getElementById('openPostPopup');
        const addPhotoVideoComposer = document.getElementById('addPhotoVideoComposer');
        const postModal = document.getElementById('postModal');
        const closePostModal = document.getElementById('closePostModal');
        const postTextInput = document.getElementById('postTextInput');
        const postFileInput = document.getElementById('postFileInput');
        const publishPostButton = document.getElementById('publishPostButton');
        const addPhotoButton = document.getElementById('addPhotoButton'); 
        const postMediaPreview = document.getElementById('postMediaPreview'); 
        const postComposer = document.querySelector('.post-composer');
        const liveVideoButton = document.querySelector('.composer-btn .fa-video').closest('button'); // Botão Live/Vídeo ao Vivo

        // --- Funções Auxiliares de Link/YouTube ---
        function getYoutubeId(url) {
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            const match = url.match(regex);
            return match ? match[1] : null;
        }

        function previewLink(url) {
            if (!postMediaPreview) return;
            postMediaPreview.innerHTML = '';
            postMediaPreview.classList.remove('hidden');

            const youtubeId = getYoutubeId(url);

            if (youtubeId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
                postMediaPreview.innerHTML = `
                    <div class="youtube-preview" style="position: relative; cursor: pointer; border-radius: 8px; overflow: hidden;">
                        <img src="${thumbnailUrl}" alt="Thumbnail do YouTube" style="width: 100%; height: auto; display: block;">
                        <i class="fab fa-youtube" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; color: red;"></i>
                    </div>
                `;
            } else {
                // Simulação para outros links
                postMediaPreview.innerHTML = `<a href="${url}" target="_blank" style="color: var(--primary-color); font-weight: 600;">Link anexado: ${url.substring(0, 50)}...</a>`;
            }
        }


        // --- Funções do Modal de Postagem (Corrigidas para Foco) ---
        function openPostModal() { // SEM FOCO
            if (postModal) postModal.classList.remove('hidden');
        }

        function openPostModalAndFocus() { // COM FOCO
            if (postModal) postModal.classList.remove('hidden');
            setTimeout(() => {
                if (postTextInput) postTextInput.focus();
            }, 50);
        }

        function closeAndResetPostModal() {
            if (postModal) postModal.classList.add('hidden');
            if (postTextInput) postTextInput.value = ''; 
            if (postFileInput) postFileInput.value = ''; 
            if (postMediaPreview) {
                postMediaPreview.innerHTML = '';
                postMediaPreview.classList.add('hidden');
            }
            if (publishPostButton) publishPostButton.disabled = true;
        }

               // 1. Abrir Modal pelos botões do Composer (Lógica de Associação)
        
        // Input Principal (com Foco) - Se clicar na caixa de texto, foca.
        if (openPostPopup) {
            openPostPopup.addEventListener('click', openPostModalAndFocus);
        }
        
        // Botão Foto/Vídeo (CORRIGIDO) - Abre o modal e clica no input de arquivo
        if (addPhotoVideoComposer) {
            addPhotoVideoComposer.addEventListener('click', () => {
                openPostModal(); // Abre o modal primeiro
                // Pequeno atraso para garantir que o modal esteja visível antes de clicar no input
                setTimeout(() => { 
                    if (postFileInput) {
                        postFileInput.click(); // Abre a janela de seleção de arquivo
                    }
                }, 100); 
            });
        }
        
        // Botão Vídeo ao Vivo (SEM Foco) - Apenas abre o modal.
        if (liveVideoButton) {
            liveVideoButton.addEventListener('click', openPostModal);
        }

        // 2. Fechar Modal
        if (closePostModal) {
            closePostModal.addEventListener('click', closeAndResetPostModal);
        }

        // 3. Ativar/Desativar botão Publicar E processar Link (CORRIGIDO)
        function updatePublishButton() {
            if (!publishPostButton || !postTextInput || !postFileInput) return;
            const textContent = postTextInput.value.trim();
            const hasText = textContent.length > 0;
            const hasFile = postFileInput.files.length > 0;
            
            // Regex simples para detectar qualquer URL
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = textContent.match(urlRegex);
            const hasLink = match && match.length > 0;

            // Lógica de Pré-visualização de Link
            if (hasLink && !hasFile) {
                previewLink(match[0]);
            } else if (!hasFile) {
                // Se não houver link nem arquivo, limpa a prévia
                postMediaPreview.innerHTML = '';
                postMediaPreview.classList.add('hidden');
            } else if (hasFile && postMediaPreview) {
                // Se o usuário selecionou um arquivo, esconde a prévia de link/texto
                // (a prévia de arquivo é injetada no evento 'change' do postFileInput)
            }
            
            // Habilita se houver texto, arquivo ou link
            publishPostButton.disabled = !(hasText || hasFile || hasLink);
        }

        if (postTextInput) {
            postTextInput.addEventListener('input', updatePublishButton);
        }
        
        // 4. Pré-visualização de Mídia (Upload Local)
        if (postFileInput) {
            postFileInput.addEventListener('change', (e) => {
                if (!postMediaPreview) return;
                postMediaPreview.innerHTML = '';
                const file = e.target.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        postMediaPreview.classList.remove('hidden');
                        let mediaElement;
                        
                        if (file.type.startsWith('image/')) {
                            mediaElement = document.createElement('img');
                            mediaElement.src = e.target.result;
                            mediaElement.alt = "Prévia da Imagem";
                        } else if (file.type.startsWith('video/')) {
                            mediaElement = document.createElement('video');
                            mediaElement.src = e.target.result;
                            mediaElement.controls = true;
                            mediaElement.style.maxWidth = '100%';
                            mediaElement.style.maxHeight = '300px';
                            mediaElement.style.borderRadius = '8px';
                        }
                        if (mediaElement) {
                            postMediaPreview.appendChild(mediaElement);
                        }
                    };
                    reader.readAsDataURL(file);
                } else {
                    postMediaPreview.classList.add('hidden');
                }
                updatePublishButton();
            });
        }

        // 5. Acionar input de arquivo pelo ícone no modal
        if (addPhotoButton) {
            addPhotoButton.addEventListener('click', () => {
                if (postFileInput) postFileInput.click();
            });
        }

        // 6. Criar e Publicar Post
        if (publishPostButton) {
            publishPostButton.addEventListener('click', () => {
                createPost();
                closeAndResetPostModal();
            });
        }

        // Função para criar o HTML de um novo post (CORRIGIDO PARA LINKS DO YOUTUBE)
        function createPost() {
            const textContent = postTextInput.value.trim();
            const file = postFileInput.files[0];
            
            if (!textContent && !file) return; 

            const newPost = document.createElement('div');
            newPost.className = 'post-card';
            newPost.style.order = -1; // Garante que o novo post apareça no topo

            let mediaHtml = '';
            
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const linkMatch = textContent.match(urlRegex);
            const isYoutubePost = linkMatch && getYoutubeId(linkMatch[0]);

            if (file) {
                // Lógica de Postagem de Arquivo (imagem/vídeo local)
                const mediaUrl = URL.createObjectURL(file);
                if (file.type.startsWith('image/')) {
                    mediaHtml = `<div class="post-body-media" style="margin-top: 10px;"><img src="${mediaUrl}" alt="Mídia do Post" style="width: 100%; height: auto;"></div>`;
                } else if (file.type.startsWith('video/')) {
                    mediaHtml = `<div class="post-body-media" style="margin-top: 10px;"><video controls src="${mediaUrl}" style="width: 100%; height: auto;"></video></div>`;
                }
            } else if (isYoutubePost) {
                // LÓGICA DE POSTAGEM DE LINK DO YOUTUBE
                const youtubeId = getYoutubeId(linkMatch[0]);
                const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`; 
                
                // Cria um link que, ao ser clicado, abre o vídeo
                mediaHtml = `
                    <div class="post-body-media" style="position: relative; cursor: pointer; margin-top: 10px; border-radius: 8px; overflow: hidden;">
                        <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank">
                            <img src="${thumbnailUrl}" alt="Vídeo do YouTube" style="width: 100%; height: auto; display: block;">
                            <i class="fab fa-youtube" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; color: rgba(255, 0, 0, 0.8);"></i>
                        </a>
                    </div>
                `;
            }
            
            const formattedText = textContent.replace(/\n/g, '<br>');

            newPost.innerHTML = `
                <div class="post-header">
                    <img src="imagens/euPerfil.jpeg" alt="Autor">
                    <div>
                        <span class="post-author">Agenor Filho</span>
                        <span class="post-time">agora mesmo · <i class="fas fa-globe-americas"></i></span>
                    </div>
                    <i class="fas fa-ellipsis-h post-options"></i>
                </div>
                <div class="post-body">
                    ${formattedText ? `<p>${formattedText}</p>` : ''}
                </div>
                ${mediaHtml}
                <div class="post-footer">
                    <div class="post-stats">
                        <span class="likes-count"><i class="fas fa-thumbs-up"></i> 0</span>
                        <span class="comments-count">0 Comentários</span>
                    </div>
                    <div class="post-actions">
                        <button><i class="far fa-thumbs-up"></i> Curtir</button>
                        <button><i class="far fa-comment-alt"></i> Comentar</button>
                        <button><i class="fas fa-share"></i> Compartilhar</button>
                    </div>
                </div>
            `;
            
            if (postComposer) {
                postComposer.after(newPost);
                }
            }
        }
    });

