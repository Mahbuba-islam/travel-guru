   const activeUserData = localStorage.getItem('activeSession')
console.log(activeUserData)
const user = JSON.parse(activeUserData)
 const userTravelDetails = localStorage.getItem('travelInfo')
const userTravelInfo = JSON.parse(userTravelDetails)
 const destinationContainer = document.getElementById('destination-container')
    const div = document.createElement('div')
    div.innerHTML = ` <h1  class="text-lg font-bold md:text-xl lg:font-extrabold text-warning">${userTravelInfo.destinationName}</h1>
    <p class="text-xs md:text-sm w-[455px] font-bold">${userTravelInfo.detailsDestination}</p>
    `
     destinationContainer.innerHTML = ''
  destinationContainer.appendChild(div);
  

const showModal = () => {
  const originInput = document.getElementById('origin-input').value;
  const destinationInput = document.getElementById('destination-input').value;
  const displayDateForm = document.getElementById('displayDate').value
 const displayDateTo = document.getElementById('dateDisplay').value
 const dialog = document.getElementById('start_booking');
  if(!originInput || !destinationInput){
    dialog.innerHTML = `
      <div class="modal-box">
        <h3 class="text-xl font-bold text-red-600">Heads up!</h3>
        <p class="py-4 font-bold text-sm">Please fill in both the origin and destination fields before continuing.</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn w-full btn-warning">Okay</button>
          </form>
        </div>
      </div>`;
    dialog.showModal();
  }
  
  else if (originInput && destinationInput && user){
    console.log(user)
    dialog.innerHTML = `
      <div class="modal-box mx-auto text-center">
        <h3 class="text-xl font-bold text-success">Booking Confirmed!</h3>
        <p></p>
       <p class="py-4 text-lg font-bold">You’re in! 
       <br/>
       Get ready to explore 
       
       <span class="text-warning font-extrabold text-xl">${destinationInput}</span> 
         from <span class="text-warning font-extrabold text-xl">${originInput}</span></p>
         
      <br/>
    <span class="text-md font-semibold text-gray-700">
      Your journey is scheduled from 
      <span class="text-warning font-extrabold text-lg">${displayDateForm}</span> 
      to 
      <span class="text-warning font-extrabold text-lg">${displayDateTo}</span>.
    </span>
  </p>



        <div class="modal-action  justify-center">
          <form method="dialog">
           <button  class="btn bg-yellow-600 text-white w-full text-center border-0 mx-auto px-15">
           close</button>
           <button  id="dashboard-btn" class="btn bg-yellow-600 text-white w-full text-center border-0 mx-auto px-15">
           go to dashboard</button>

          </form>
        </div>
      </div>`;
     
    dialog.showModal();
    document.getElementById('dashboard-btn').addEventListener('click', () => {
     window.location.href = '/html/dashboard.html'
    }) 
  

  } 

  
  else {
   // Fallback if you don’t use SweetAlert2
  if (confirm("To book, you need to log in first.\nClick OK to go to login.")) {
   goToLogin();
   }


}

function goToLogin() {
  window.location.href = '/html/login.html';
}


 
  const bookingData = {
 origin:originInput,
 destination:destinationInput,
 dataForm:displayDateForm,
 dateTo: displayDateTo,
 

}
localStorage.setItem('bookingInfo', JSON.stringify(bookingData))
console.log(bookingData)

  }

  
 
// set login button
const navbarEnd = document.getElementById('navbar-login')
const logInBtn = document.getElementById('login-btn')
if(user){
 navbarEnd.innerHTML = ` <div id="dropdown" class="dropdown">
  <div tabindex="0" role="button" class="btn m-1 rounded-full btn-warning font-bold text-white">${user.name.slice(0,1).toUpperCase()}</div>
  <ul tabindex="0" class="dropdown-content menu bg-warning rounded-box z-1 shadow-sm space-y-2">
    <li id="dashboard" class="font-bold text-xs"><a>Dashboard</a></li>
    <li id="logout" class="font-bold btn btn-xs"><a>Logout</a></li>
  </ul>
  </div>
 `
 setTimeout(() => {
    const dashboardBtn = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logout');

    if (dashboardBtn) {
      dashboardBtn.addEventListener('click', () => {
        window.location.href = '/html/dashboard.html';
      });
    }
    
 

 if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('activeSession')
  navbarEnd.childNodes.classList.remove('dropdown')
    // Reset login button styles & text
    // loginBtn.className = 'btn btn-warning font-bold text-black';
    // loginBtn.innerText = 'login';
    // // loginBtn.tabIndex = 0;
    // // loginBtn.role = 'button';

    // // Clear any dropdown content
    // loginBtn.innerHTML = 'login'; // if dropdown was inserted before

    // // Reattach login button click handler
    // loginBtn.onclick = () => {
    //   window.location.href = '/html/login.html';
    // };

    // // If you're replacing loginBtn in the navbar, use outerHTML cautiously
    // navbarEnd.innerHTML = '';
    // navbarEnd.appendChild(loginBtn); // preserve reference
  });
}  }, 0);
}

else{
 logInBtn.innerText = 'Login'
 logInBtn.classList.remove('rounded-full')
 logInBtn.addEventListener('click', () => {
  window.location.href = '/html/login.html'
 })
}

