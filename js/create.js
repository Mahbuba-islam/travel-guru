
document.getElementById('create-account').addEventListener('click', () => {
    console.log('click')
  const allInput = document.querySelectorAll('input');
  let allFilled = true
   const allInputValue = {}
   const email = allInput[2].value
   console.log(allInput[2].value)
   allInput.forEach(input => {
    const inputValue = input.value.trim()
    if (!inputValue) {
       input.classList.add('border', 'border-red-500');
      input.placeholder = 'This field is required';
      allFilled = false
      
    } else {
      input.classList.remove('border', 'border-red-500');
      allInputValue[input.name || input.id] = inputValue
      // - input.name || input.id হচ্ছে এক ধরনের dynamic key, মানে object-এর কোন property বানানো হবে তা runtime-এ ঠিক করা হচ্ছে।
     // এটাকে square bracket notation বলা হয়, যা JavaScript-এ object-এর property dynamically assign করতে ব্যবহার হয়।



    }
  
    // send data local storage
   
  });
 if(allFilled){
      localStorage.setItem(email, JSON.stringify(allInputValue))
      console.log(email)
      window.location.href = '/html/login.html';
    }
  
console.log(allInputValue);
console.log('All filled?', allFilled);

    // note
    // Placing if (allFilled) { ... } outside the forEach loop is crucial because you need to wait
    //  until all inputs are checked before deciding whether to redirect or save data.



 
});