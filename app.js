import { supabase } from './supabase.js'

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const usernameInput = document.getElementById('username')
const registerBtn = document.getElementById('register-btn')
const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')
const authContainer = document.getElementById('auth-container')
const chatContainer = document.getElementById('chat-container')
const userNameSpan = document.getElementById('user-name')

// 1. Проверяем, авторизован ли пользователь при загрузке страницы
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        showChat(session.user)
    }
}
checkUser()

// 2. Регистрация
registerBtn.addEventListener('click', async () => {
    const email = emailInput.value
    const password = passwordInput.value
    const username = usernameInput.value

    if (!email || !password || !username) {
        alert('Заполните все поля!')
        return
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username: username } // Передаем юзернейм в триггер БД
        }
    })

    if (error) {
        alert('Ошибка регистрации: ' + error.message)
    } else {
        alert('Регистрация успешна! Проверьте почту или войдите в аккаунт.')
    }
})

// 3. Вход
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value
    const password = passwordInput.value

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert('Ошибка входа: ' + error.message)
    } else {
        showChat(data.user)
    }
})

// 4. Выход
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    chatContainer.style.display = 'none'
    authContainer.style.display = 'block'
})

// Переключение интерфейса после входа
function showChat(user) {
    authContainer.style.display = 'none'
    chatContainer.style.display = 'block'
    userNameSpan.textContent = user.email // Здесь позже заменим на юзернейм из таблицы profiles
}