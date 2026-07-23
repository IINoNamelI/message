import { supabase } from './supabase.js'

const loginInput = document.getElementById('login-input')
const passwordInput = document.getElementById('password-input')
const registerBtn = document.getElementById('register-btn')
const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')
const authContainer = document.getElementById('auth-container')
const chatContainer = document.getElementById('chat-container')
const userNameSpan = document.getElementById('user-name')

// Функция генерации технического email из логина
const getInternalEmail = (login) => `${login.trim().toLowerCase()}@messenger.local`

// 1. Проверка сессии при перезагрузке страницы
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        showChat(session.user)
    }
}
checkUser()

// 2. Регистрация по логину и паролю
registerBtn.addEventListener('click', async () => {
    const login = loginInput.value.trim()
    const password = passwordInput.value

    if (!login || !password) {
        alert('Заполните логин и пароль!')
        return
    }

    const email = getInternalEmail(login)

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { username: login } // Передаем логин для триггера БД (создания профиля)
        }
    })

    if (error) {
        alert('Ошибка регистрации: ' + error.message)
    } else {
        alert('Регистрация успешна! Теперь вы можете войти.')
    }
})

// 3. Вход по логину и паролю
loginBtn.addEventListener('click', async () => {
    const login = loginInput.value.trim()
    const password = passwordInput.value

    if (!login || !password) {
        alert('Заполните логин и пароль!')
        return
    }

    const email = getInternalEmail(login)

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        alert('Ошибка входа: Неверный логин или пароль')
    } else {
        showChat(data.user, login)
    }
})

// 4. Выход
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    chatContainer.style.display = 'none'
    authContainer.style.display = 'block'
    loginInput.value = ''
    passwordInput.value = ''
})

// Интерфейс после входа
function showChat(user, currentLogin = 'Пользователь') {
    authContainer.style.display = 'none'
    chatContainer.style.display = 'block'
    userNameSpan.textContent = currentLogin
}
