
const params = new URLSearchParams(window.location.search)
const user = params.get('user')
const userId = document.getElementById('user-id')
userId.innerText = user.toUpperCase()

const logout = document.getElementById('logout').addEventListener('click', () => {
 window.location.href = `/html/index.html`
})

document.getElementById('back-home').addEventListener('click', () => {
 window.location.href = `/html/index.html?user=${user}`
})
