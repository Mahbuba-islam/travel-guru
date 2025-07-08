
document.getElementById('create-account').addEventListener('click', () => {
  console.log('Create button clicked');

  const allInput = document.querySelectorAll('input');
  let allFilled = true;
  const allInputValue = {};

  const emailInput = document.querySelector('input[name="email"]') || document.getElementById('email');
  const email = emailInput?.value.trim();

  //  Email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailInput.classList.add('border', 'border-red-500');
    emailInput.value = '';
    emailInput.placeholder = 'Invalid email format';
    return;
  }

  // Account duplication check
  if (localStorage.getItem(email)) {
    alert("An account with this email already exists.");
    return;
  }

  // Loop through inputs to collect and validate
  allInput.forEach(input => {
    const inputValue = input.value.trim();

    if (!inputValue) {
      input.classList.add('border', 'border-red-500');
      input.placeholder = 'This field is required';
      allFilled = false;
    } else {
      input.classList.remove('border', 'border-red-500');
      allInputValue[input.name || input.id] = inputValue;
    }
  });

  // Final check and data save
  if (allFilled) {
    localStorage.setItem(email, JSON.stringify(allInputValue));
    console.log('Account saved for:', email);
    window.location.href = '/html/login.html';
  }

  console.log('Collected Input Values:', allInputValue);
  console.log('Are all fields filled?', allFilled);
});