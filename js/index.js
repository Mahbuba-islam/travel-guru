

const carouselItems = document.querySelectorAll('.carousel-item')

const heroContent = document.getElementById('hero-content')
carouselItems.forEach(i => {
    i.addEventListener('click', () => {
        heroContent.innerHTML = ''
        console.log(i)
        removeBorder()
        i.classList.add('border', 'border-warning', 'rounded-md', 'border-4')
       const destinationDetails = i.childNodes[3].innerText
        const destination = i.childNodes[1].innerText
        const div = document.createElement('div')
       div.innerHTML = `<h1 class="text-lg font-bold md:text-xl lg:font-extrabold ">${destination}</h1>
    <p class="text-xs md:text-sm w-[455px] font-bold">${destinationDetails}</p>
    <button class="booking-btn btn btn-warning font-bold text-black mt-4">Booking ${destination}</button>`
    heroContent.appendChild(div)

     const bookingBtn = document.querySelectorAll('.booking-btn')
     bookingBtn.forEach(b => {
        b.addEventListener('click' , () => {
          const travelDetails = {
           destinationName:destination,
           detailsDestination:destinationDetails,
           
          }
          console.log(userInfo)
          localStorage.setItem('travelInfo', JSON.stringify(travelDetails) )
          window.location.href = '/html/booking.html'
        // navigateBooking(destination,destinationDetails)
     })
     })


    })
   
})
 


// removeActiveBorder
const removeBorder = () => {
    carouselItems.forEach(i => {
        i.classList.remove('border', 'border-warning', 'rounded-md', 'border-4')
    })
}



// const navigateBooking = () => {
//   const userTravelDetails = {
//     origin:destination,
//     originDetails:destinationDetails,
//     user:userInfo
//   }
//   console.log(userTravelDetails)
//   localStorage.setItem('userTravelInfo', JSON.stringify(userTravelDetails))
//     // window.location.href = '/html/booking.html'
   

// }






const loginBtn = document.getElementById('login-btn')
const loginFunction = () => {
  loginBtn.innerText = 'login'
    loginBtn.classList.remove('rounded-full')
    loginBtn.addEventListener('click', () => {
 window.location.href = '/html/login.html'
})
}

const activeUserData = localStorage.getItem('loggedInUser')
console.log(activeUserData)

const userInfo = JSON.parse(activeUserData)

if(userInfo){

    const navbarEnd = document.getElementById('navbarEnd')
    // const dropdown = document.getElementById('dropdown')
   navbarEnd.innerHTML = `
    <div id="dropdown" class="dropdown">
  <div tabindex="0" role="button" class="btn m-1 rounded-full btn-warning font-bold text-white">${userInfo.name.slice(0,1).toUpperCase()}</div>
  <ul tabindex="0" class="dropdown-content menu bg-warning rounded-box z-1 shadow-sm space-y-2">
    <li id="dashboard" class="font-bold text-xs"><a>Dashboard</a></li>
    <li id="logout" class="font-bold btn btn-xs"><a>Logout</a></li>
  </ul>
  </div>
`
 // Attach event listeners after DOM updates
  setTimeout(() => {
    const dashboardBtn = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logout');

    if (dashboardBtn) {
      dashboardBtn.addEventListener('click', () => {
        window.location.href = `/html/dashboard.html?user=${userInfo}`;
      });
    }
    
 

 if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser')
    // Reset login button styles & text
    loginBtn.className = 'btn btn-warning font-bold text-black';
    loginBtn.innerText = 'login';
    // loginBtn.tabIndex = 0;
    // loginBtn.role = 'button';

    // Clear any dropdown content
    loginBtn.innerHTML = 'login'; // if dropdown was inserted before

    // Reattach login button click handler
    loginBtn.onclick = () => {
      window.location.href = '/html/login.html';
    };

    // If you're replacing loginBtn in the navbar, use outerHTML cautiously
    navbarEnd.innerHTML = '';
    navbarEnd.appendChild(loginBtn); // preserve reference
  });
}  }, 0);
}



else{
   loginFunction()
   console.log(loginFunction())
}

