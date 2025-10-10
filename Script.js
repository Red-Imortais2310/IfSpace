// --- Elementos do DOM ---
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupModal = document.getElementById('signupModal');
const btnCreateAccount = document.getElementById('btnCreateAccount');
const btnOpenSignup = document.querySelector('.btn-open-signup-link'); 
const closeModal = document.querySelector('.close');

// --- Inputs do Formulário de Login ---
let emailInput, passwordInput, rememberMeCheckbox;
if (loginForm) {
    ({ email: emailInput, password: passwordInput, rememberMe: rememberMeCheckbox } = loginForm.elements);
}

// --- Inputs do Formulário de Cadastro ---
const ageInput = document.getElementById('ageInput');
const recoveryEmailInput = document.getElementById('recoveryEmail');

// --- Constantes LocalStorage ---
const STORAGE_KEYS = {
    EMAIL: 'ifspace_saved_email',
    PASSWORD: 'ifspace_saved_password',
    REMEMBER: 'ifspace_remember_me'
};

// --- Funções Auxiliares ---
function closeModalAndRestoreScroll() {
    if (!signupModal || !signupForm) return;
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    signupForm.reset();
    signupForm.querySelectorAll('.form-input').forEach(clearError);
}

const openModal = () => {
    if (!signupModal) return;
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function isValidEmailOrPhone(input) {
    const value = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{2}?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\D/g, ''));
}

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

// --- LocalStorage ---
function loadSavedCredentials() {
    if (!emailInput || !passwordInput || !rememberMeCheckbox) return;
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER);
    if (rememberMe === 'true') {
        const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
        const savedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD);
        if (savedEmail) emailInput.value = savedEmail;
        if (savedPassword) passwordInput.value = savedPassword;
        rememberMeCheckbox.checked = true;
    }
}

function saveCredentials(email, password, remember) {
    if (remember) {
        localStorage.setItem(STORAGE_KEYS.EMAIL, email);
        localStorage.setItem(STORAGE_KEYS.PASSWORD, password);
        localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
    } else {
        localStorage.removeItem(STORAGE_KEYS.EMAIL);
        localStorage.removeItem(STORAGE_KEYS.PASSWORD);
        localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    }
}

// --- Eventos ---
window.addEventListener('DOMContentLoaded', loadSavedCredentials);

if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput));
if (passwordInput) passwordInput.addEventListener('input', () => clearError(passwordInput));
if (ageInput) ageInput.addEventListener('input', () => clearError(ageInput));
if (recoveryEmailInput) recoveryEmailInput.addEventListener('input', () => clearError(recoveryEmailInput));

// --- Login ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;

        if (!email) {
            showError(emailInput, 'Por favor, insira seu email ou telefone.');
            return;
        } else if (!isValidEmailOrPhone(email)) {
            showError(emailInput, 'Email ou telefone inválido.');
            return;
        }

        if (!password) {
            showError(passwordInput, 'Por favor, insira sua senha.');
            return;
        } else if (password.length < 6) {
            showError(passwordInput, 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        saveCredentials(email, password, rememberMe);

        const submitButton = loginForm.querySelector('.btn-login');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Entrando...';
        submitButton.style.background = '#03c64e';

        setTimeout(() => {
            window.location.href = 'feed.html';
        }, 1000);
    });
}

// --- Cadastro ---
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const age = parseInt(ageInput?.value, 10);
        const recoveryEmail = recoveryEmailInput?.value.trim();
        let hasSignupError = false;

        if (isNaN(age) || age < 18) {
            showError(ageInput, 'Você deve ter 18 anos ou mais para se cadastrar.');
            hasSignupError = true;
        } else clearError(ageInput);

        if (!isValidEmailOrPhone(recoveryEmail)) {
            showError(recoveryEmailInput, 'Email de recuperação inválido.');
            hasSignupError = true;
        } else clearError(recoveryEmailInput);

        if (hasSignupError) return;

        const submitButton = signupForm.querySelector('.btn-signup');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Cadastrando...';

        setTimeout(() => {
            alert('Cadastro realizado com sucesso!');
            closeModalAndRestoreScroll();
            submitButton.textContent = originalText;
        }, 1000);
    });
}

// --- Modal ---
if (btnCreateAccount) btnCreateAccount.addEventListener('click', openModal);
if (btnOpenSignup) btnOpenSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});
if (closeModal) closeModal.addEventListener('click', closeModalAndRestoreScroll);

window.addEventListener('click', ({ target }) => {
    if (target === signupModal) closeModalAndRestoreScroll();
});
document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape' && signupModal?.style.display === 'block') closeModalAndRestoreScroll();
});

console.log('IfSpace - Sistema de Login e Cadastro Carregado (v1.2)');

// --- Feed (somente se os elementos existirem) ---
const openStoryInput = document.getElementById("openStoryInput");
const storyInput = document.getElementById("storyInput");
const storyFeed = document.getElementById("storyFeed");
const videoPreview = document.getElementById("videoPreview");

if (openStoryInput && storyInput && storyFeed) {
    openStoryInput.addEventListener("click", () => {
        document.getElementById("storyInputArea").classList.toggle("hidden");
    });

    storyInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const input = e.target.value.trim();
            if (!input) return;

            const storyItem = document.createElement("div");
            storyItem.classList.add("story-item");
            const youtubeMatch = input.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
            if (youtubeMatch) {
                const videoId = youtubeMatch[1];
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                storyItem.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${thumbnailUrl}" alt="Miniatura do vídeo" style="max-width: 120px; border-radius: 4px;" />
                        <a href="${input}" target="_blank">${input}</a>
                    </div>
                `;
            } else {
                storyItem.textContent = input;
            }
            storyFeed.prepend(storyItem);
            e.target.value = "";
            if (videoPreview) videoPreview.innerHTML = "";
        }
    });

    storyInput.addEventListener("input", (e) => {
        const input = e.target.value;
        if (!videoPreview) return;
        const youtubeMatch = input.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
            videoPreview.innerHTML = `<img src="${thumbnailUrl}" alt="Miniatura do vídeo" style="max-width: 120px; border-radius: 4px;" />`;
        } else {
            videoPreview.innerHTML = "";
        }
    });
}

// --- Personalização do Feed ---
document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("ifspace_user_name");
    const profileName = document.querySelector(".profile-link span");
    if (userName && profileName) profileName.textContent = userName;

    const composerInput = document.querySelector(".composer-top input");
    if (userName && composerInput) {
        composerInput.placeholder = `O que você está pensando, ${userName}?`;
    }
});

if (document.body.classList.contains("feed-page")) {
    // Executa apenas se estiver na página do feed
}

