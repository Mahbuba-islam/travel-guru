document.getElementById('login-id').addEventListener('click', () => {
  const userNameInput = document.getElementById('user-name');
  const passwordInput = document.getElementById('password');
 const loginEmail = userNameInput.value.trim()
 const loginPassword = passwordInput.value.trim()
 const accountData = localStorage.getItem(loginEmail)
 const accountInfo = JSON.parse(accountData)
 console.log(accountData)
//  const accountEmail = accountInfo.email.trim()
 const accountPassword = accountInfo?.password.trim()
 console.log(accountPassword, password)
  if (!loginEmail || !loginPassword) {
 userNameInput.placeholder = 'required';
    userNameInput.classList.add('border', 'border-red-600');
   passwordInput.placeholder = 'required';
    passwordInput.classList.add('border', 'border-red-600');
   
  } 
  else if(accountData == null){
     const errorBox = document.getElementById('login-error');
  errorBox.textContent = 'user not found';
  errorBox.classList.remove('hidden');
  }
 else if (accountPassword !== loginPassword) {
  const errorBox = document.getElementById('login-error');
  errorBox.textContent = 'Incorrect username or password.';
  errorBox.classList.remove('hidden');
}
  else {
    localStorage.setItem('activeSession', loginEmail);
    console.log(loginEmail)

    // window.location.href = `/html/index.html?user=${userNameValue}`;
    // window.location.href = `/html/dashboard.html?user=${userNameValue}`;
    window.location.href = '/html/dashboard.html'
  }
});
