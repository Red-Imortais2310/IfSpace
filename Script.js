// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupModal = document.getElementById('signupModal');
const btnCreateAccount = document.getElementById('btnCreateAccount');

// NOVO SELETOR: Link 'Cadastrar' com melhor espaçamento
const btnOpenSignup = document.querySelector('.btn-open-signup-link'); 
const closeModal = document.querySelector('.close');

// Inputs do Formulário de Login (Otimização com form.elements)
const { email: emailInput, password: passwordInput, rememberMe: rememberMeCheckbox } = loginForm.elements;

// Inputs do Formulário de Cadastro (Novos inputs)
const ageInput = document.getElementById('ageInput');
const recoveryEmailInput = document.getElementById('recoveryEmail');

// Constantes para localStorage
const STORAGE_KEYS = {
    EMAIL: 'ifspace_saved_email',
    PASSWORD: 'ifspace_saved_password',
    REMEMBER: 'ifspace_remember_me'
};

// --- Funções Auxiliares ---

// Função para fechar o modal
function closeModalAndRestoreScroll() {
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    signupForm.reset(); // Limpa o formulário ao fechar
    
    // Limpar erros de todos os inputs no modal
    signupForm.querySelectorAll('.form-input').forEach(clearError);
}

// Função para abrir o modal
const openModal = () => {
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
};

// Função para validar email OU telefone
function isValidEmailOrPhone(input) {
    const value = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex para telefone/celular brasileiro (10-11 dígitos)
    const phoneRegex = /^(\+?\d{2}?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\D/g, ''));
}

// Função para mostrar mensagem de erro (usando classes CSS)
function showError(input, message) {
    // 1. Aplica a classe de erro para a estilização da borda (definida no CSS)
    input.classList.add('error');
    
    // 2. Remove mensagem de erro anterior se existir
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 3. Cria e adiciona mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f02849'; // Usando cor de erro do CSS
    errorDiv.style.fontSize = '13px';
    errorDiv.style.marginTop = '4px';
    input.parentElement.appendChild(errorDiv);
}

// Função para limpar erro (usando classes CSS)
function clearError(input) {
    input.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// --- Funções de Credenciais (LocalStorage) ---

// Função para carregar credenciais salvas
function loadSavedCredentials() {
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER);
    
    if (rememberMe === 'true') {
        const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
        const savedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD);
        
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
        if (savedPassword) {
            passwordInput.value = savedPassword;
        }
        rememberMeCheckbox.checked = true;
    }
}

// Função para salvar credenciais
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

// --- Event Listeners ---

// 1. Inicialização
window.addEventListener('DOMContentLoaded', loadSavedCredentials);

// 2. Limpar erros ao digitar
emailInput.addEventListener('input', () => clearError(emailInput));
passwordInput.addEventListener('input', () => clearError(passwordInput));
if (ageInput) ageInput.addEventListener('input', () => clearError(ageInput));
if (recoveryEmailInput) recoveryEmailInput.addEventListener('input', () => clearError(recoveryEmailInput));

// 3. Manipulador de submit do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Validações (Retorno imediato)
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
    
    // Salvar credenciais
    saveCredentials(email, password, rememberMe);
    
    // Simular login
    console.log('Login realizado com sucesso!');
    
    const submitButton = loginForm.querySelector('.btn-login');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Entrando...';
    submitButton.style.background = '#03c64e'; 
    
    // Simular redirecionamento após 1 segundo
    setTimeout(() => {
        // Redireciona para o novo feed
        window.location.href = 'feed.html'; 
    }, 1000);
});

// 4. Manipulador de submit do formulário de cadastro
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const age = parseInt(ageInput.value, 10);
    const recoveryEmail = recoveryEmailInput.value.trim();
    let hasSignupError = false;

    // NOVO: Validação de Idade (>= 18)
    if (isNaN(age) || age < 18) {
        showError(ageInput, 'Você deve ter 18 anos ou mais para se cadastrar.');
        hasSignupError = true;
    } else {
        clearError(ageInput);
    }

    // Validação do Email de Recuperação
    if (!isValidEmailOrPhone(recoveryEmail)) {
        showError(recoveryEmailInput, 'Email de recuperação inválido.');
        hasSignupError = true;
    } else {
        clearError(recoveryEmailInput);
    }
    
    if (hasSignupError) {
        return;
    }
    
    // Simular cadastro
    console.log('Cadastro realizado com sucesso!');
    
    const submitButton = signupForm.querySelector('.btn-signup');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Cadastrando...';
    
    setTimeout(() => {
        alert('Cadastro realizado com sucesso!\n\nEm um ambiente de produção, você seria redirecionado para completar seu perfil.');
        closeModalAndRestoreScroll();
        submitButton.textContent = originalText;
    }, 1000);
});

// 5. Abrir Modal
btnCreateAccount.addEventListener('click', openModal);
if (btnOpenSignup) {
    btnOpenSignup.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal();
    });
}

// 6. Fechar Modal (X, Clique Fora, ESC)
closeModal.addEventListener('click', closeModalAndRestoreScroll);

window.addEventListener('click', ({ target }) => {
    if (target === signupModal) {
        closeModalAndRestoreScroll();
    }
});

document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape' && signupModal.style.display === 'block') {
        closeModalAndRestoreScroll();
    }
});

// Log para debug
console.log('IfSpace - Sistema de Login e Cadastro Carregado (v1.2)');

// Abrir área de criação de story
document.getElementById("openStoryInput").addEventListener("click", () => {
  document.getElementById("storyInputArea").classList.toggle("hidden");
});

// Detectar Enter e adicionar ao feed
document.getElementById("storyInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const input = e.target.value.trim();
    if (!input) return;

    const feed = document.getElementById("storyFeed");
    const storyItem = document.createElement("div");
    storyItem.classList.add("story-item");

    // Verifica se é link do YouTube
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

    feed.prepend(storyItem);
    e.target.value = "";
    document.getElementById("videoPreview").innerHTML = "";
  }
});

// Mostrar miniatura ao colar link
document.getElementById("storyInput").addEventListener("input", (e) => {
  const input = e.target.value;
  const preview = document.getElementById("videoPreview");
  const youtubeMatch = input.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    preview.innerHTML = `<img src="${thumbnailUrl}" alt="Miniatura do vídeo" style="max-width: 120px; border-radius: 4px;" />`;
  } else {
    preview.innerHTML = "";
  }
});
