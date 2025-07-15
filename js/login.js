document.getElementById('login-id').addEventListener('click', () => {
  const userNameInput = document.getElementById('user-name');
  const passwordInput = document.getElementById('password');
  const userNameValue = userNameInput.value.trim();
  const loginPassword = passwordInput.value.trim();
  const redirectUrl = localStorage.getItem('redirectAfterLogin')
  const accountData = localStorage.getItem(userNameValue);
  console.log(accountData)
  const accountInfo = accountData ? JSON.parse(accountData) : null;
  const accountPassword = accountInfo && accountInfo.password ? accountInfo.password.trim() : null;
  const userName = accountInfo.firstName
  if (!userNameValue || !loginPassword) {
    userNameInput.placeholder = 'required';
    userNameInput.classList.add('border', 'border-red-600');
    passwordInput.placeholder = 'required';
    passwordInput.classList.add('border', 'border-red-600');
  } else if (!accountInfo) {
    const errorBox = document.getElementById('login-error');
    errorBox.textContent = 'User not found';
    errorBox.classList.remove('hidden');
  } else if (accountPassword !== loginPassword) {
    const errorBox = document.getElementById('login-error');
    errorBox.textContent = 'Incorrect username or password.';
    errorBox.classList.remove('hidden');
  } else {
    const userData = {
      name : userName,
      email: userNameValue,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    
  }
if(redirectUrl){
localStorage.removeItem('redirectAfterLogin')
window.location.href = redirectUrl
}
else{
window.location.href = '/html/dashboard.html';
}

});


