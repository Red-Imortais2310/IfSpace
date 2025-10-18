// Script principal do IfSpace
console.log("Script carregado!");

document.addEventListener('DOMContentLoaded', function () { 
    console.log('IfSpace - Sistema Carregado (v.Estável-Completa)');

    const signupForm = document.getElementById('signupForm');
    const signupModal = document.getElementById('signupModal');
    const btnCreateAccount = document.getElementById('btnCreateAccount');
    const btnOpenSignup = document.querySelector('.btn-open-signup-link');
    const closeModalBtn = document.querySelector('#signupModal .close');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const btnForgotPassword = document.getElementById('btnForgotPassword');
    const closeForgotModalBtn = document.getElementById('closeForgotModal');
    const btnCancelForgot = document.getElementById('btnCancelForgot');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotEmailInput = document.getElementById('forgotEmailInput');
    const forgotStatusMessage = document.getElementById('forgotStatusMessage');

    // Funções de validação
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

    // Recuperação de senha
    if (btnForgotPassword) {
        btnForgotPassword.addEventListener('click', () => {
            if (forgotPasswordModal) forgotPasswordModal.style.display = 'block';
        });
    }

    if (closeForgotModalBtn) {
        closeForgotModalBtn.addEventListener('click', () => {
            if (forgotPasswordModal) forgotPasswordModal.style.display = 'none';
        });
    }

    if (btnCancelForgot) {
        btnCancelForgot.addEventListener('click', () => {
            if (forgotPasswordModal) forgotPasswordModal.style.display = 'none';
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailOrPhone = forgotEmailInput.value.trim();

            if (!isValidEmailOrPhone(emailOrPhone)) {
                showError(forgotEmailInput, 'Insira um email ou telefone válido.');
                return;
            }

            clearError(forgotEmailInput);
            forgotStatusMessage.textContent = 'Código de recuperação enviado! Verifique seu email ou SMS.';
            forgotStatusMessage.style.color = 'green';
        });
    }

    // Lógica de Cadastro
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

    // Lógica de Login
    const loginForm = document.getElementById('loginForm');
    console.log('Procurando loginForm:', loginForm);

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Login submit disparado');

            const emailElem = document.getElementById('email'); // Captura apenas o id="email"
            const username = emailElem ? emailElem.value.trim() : '';
            const passwordElem = document.getElementById('password');
            const password = passwordElem ? passwordElem.value.trim() : '';

            console.log('username/email:', username);
            console.log('password:', password);

            if (username === '' || password === '') {
                alert('Preencha todos os campos!');
                console.log('Campos vazios detectados');
                return;
            }

            // Detecta se é ambiente local ou GitHub Pages
            const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
            const redirectPath = isLocal ? 'feed.html' : '/IfSpace/feed.html';
            console.log('Redirecionando para:', redirectPath);
            window.location.href = redirectPath;
        });
    } else {
        console.error('Formulário de login não encontrado no DOM.');
    }

    // Lógica específica da página de feed
    if (document.querySelector('.feed-container')) {
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
        }

        // Lógica do modal de postagem (mantida como no original)
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
        const liveVideoButton = document.querySelector('.composer-btn .fa-video')?.closest('button');

        function getYoutubeId(url) {
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            return url.match(regex) ? url.match(regex)[1] : null;
        }

        function previewLink(url) {
            if (!postMediaPreview) return;
            postMediaPreview.innerHTML = '';
            postMediaPreview.classList.remove('hidden');
            const youtubeId = getYoutubeId(url);
            if (youtubeId) {
                postMediaPreview.innerHTML = `
                    <div class="youtube-preview" style="position: relative; cursor: pointer; border-radius: 8px; overflow: hidden;">
                        <img src="https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg" alt="Thumbnail do YouTube" style="width: 100%; height: auto; display: block;">
                        <i class="fab fa-youtube" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; color: red;"></i>
                    </div>
                `;
            } else {
                postMediaPreview.innerHTML = `<a href="${url}" target="_blank" style="color: var(--primary-color); font-weight: 600;">Link anexado: ${url.substring(0, 50)}...</a>`;
            }
        }

        function openPostModal() {
            if (postModal) postModal.classList.remove('hidden');
        }

        function openPostModalAndFocus() {
            if (postModal) postModal.classList.remove('hidden');
            setTimeout(() => { if (postTextInput) postTextInput.focus(); }, 50);
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

        if (openPostPopup) openPostPopup.addEventListener('click', openPostModalAndFocus);
        if (addPhotoVideoComposer) {
            addPhotoVideoComposer.addEventListener('click', () => {
                openPostModal();
                setTimeout(() => { if (postFileInput) postFileInput.click(); }, 100);
            });
        }
        if (liveVideoButton) liveVideoButton.addEventListener('click', openPostModal);
        if (closePostModal) closePostModal.addEventListener('click', closeAndResetPostModal);

        function updatePublishButton() {
            if (!publishPostButton || !postTextInput || !postFileInput) return;
            const textContent = postTextInput.value.trim();
            const hasText = textContent.length > 0;
            const hasFile = postFileInput.files.length > 0;
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = textContent.match(urlRegex);
            const hasLink = match && match.length > 0;

            if (hasLink && !hasFile) previewLink(match[0]);
            else if (!hasFile) {
                postMediaPreview.innerHTML = '';
                postMediaPreview.classList.add('hidden');
            }
            publishPostButton.disabled = !(hasText || hasFile || hasLink);
        }

        if (postTextInput) postTextInput.addEventListener('input', updatePublishButton);
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
                        if (mediaElement) postMediaPreview.appendChild(mediaElement);
                    };
                    reader.readAsDataURL(file);
                } else {
                    postMediaPreview.classList.add('hidden');
                }
                updatePublishButton();
            });
        }

        if (addPhotoButton) addPhotoButton.addEventListener('click', () => { if (postFileInput) postFileInput.click(); });
        if (publishPostButton) publishPostButton.addEventListener('click', () => { createPost(); closeAndResetPostModal(); });

        function createPost() {
            const textContent = postTextInput.value.trim();
            const file = postFileInput.files[0];
            if (!textContent && !file) return;

            const newPost = document.createElement('div');
            newPost.className = 'post-card';
            newPost.style.order = -1;

            let mediaHtml = '';
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const linkMatch = textContent.match(urlRegex);
            const isYoutubePost = linkMatch && getYoutubeId(linkMatch[0]);

            if (file) {
                const mediaUrl = URL.createObjectURL(file);
                if (file.type.startsWith('image/')) {
                    mediaHtml = `<div class="post-body-media" style="margin-top: 10px;"><img src="${mediaUrl}" alt="Mídia do Post" style="width: 100%; height: auto;"></div>`;
                } else if (file.type.startsWith('video/')) {
                    mediaHtml = `<div class="post-body-media" style="margin-top: 10px;"><video controls src="${mediaUrl}" style="width: 100%; height: auto;"></video></div>`;
                }
            } else if (isYoutubePost) {
                const youtubeId = getYoutubeId(linkMatch[0]);
                mediaHtml = `
                    <div class="post-body-media" style="position: relative; cursor: pointer; margin-top: 10px; border-radius: 8px; overflow: hidden;">
                        <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank">
                            <img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="Vídeo do YouTube" style="width: 100%; height: auto; display: block;">
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
            if (postComposer) postComposer.after(newPost);
        }
    }
});