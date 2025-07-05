
document.getElementById('create-account').addEventListener('click', () => {
    console.log('click')
  const allInput = document.querySelectorAll('input');
  console.log(allInput.length)
  allInput.forEach(input => {
    const inputValue = input.value
    if (!inputValue .trim()) {
        console.log(input)
      input.classList.add('border', 'border-red-500');
      input.placeholder = 'This field is required';
      
    } else {
      input.classList.remove('border', 'border-red-500');
       window.location.href = '/html/login.html';
    }
  });

});