document.getElementById('login-id').addEventListener('click', () => {
  const userNameInput = document.getElementById('user-name');
  const passwordInput = document.getElementById('password');

  if (!userNameInput.value && !passwordInput.value) {
    userNameInput.placeholder = 'required';
    userNameInput.classList.add('border', 'border-red-600');

    passwordInput.placeholder = 'required';
    passwordInput.classList.add('border', 'border-red-600');
  } else {
    const userNameValue = userNameInput.value;
    console.log(userNameValue)
    // window.location.href = `/html/index.html?user=${userNameValue}`;
    window.location.href = `/html/dashboard.html?user=${userNameValue}`;
  }
});
