const carouselItems = document.querySelectorAll('.carousel-item')
   const heroContent = document.getElementById('hero-content')

carouselItems.forEach(i => {
  
    i.addEventListener('click', () => {
        heroContent.innerHTML = ''
        console.log(i)
       addAndRemoveActiveColor('.carousel-item')
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
console.log(heroContent)
    
})


const defaultItem = () => {
 const carouselItem = document.querySelector('.carousel-item')
const destinationDetails = carouselItem.childNodes[3].innerText
        const destination = carouselItem.childNodes[1].innerText
    const div = document.createElement('div')
       div.innerHTML = `<h1 class="text-lg font-bold md:text-xl lg:font-extrabold ">${destination}</h1>
    <p class="text-xs md:text-sm w-[455px] font-bold">${destinationDetails}</p>
    <button class="booking-btn btn btn-warning font-bold text-black mt-4">Booking ${destination}</button>`
    heroContent.appendChild(div)
    carouselItem .classList.add('border', 'border-warning', 'rounded-md', 'border-4')

}
defaultItem()
 


// removeActiveBorder
// const removeBorder = () => {
//     carouselItems.forEach(i => {
//         i.classList.remove('border', 'border-warning', 'rounded-md', 'border-4')
//     })
// }






// login
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
    
//  logout

 if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser')
    // Reset login button styles & text
    loginBtn.className = 'btn btn-warning font-bold text-black';
    loginBtn.innerText = 'login';
    

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


// search
document.getElementById('search-destination').addEventListener('keydown', (e) => {
  const searchValue = e.target.value.trim().toUpperCase();
  const cards = document.querySelectorAll('.card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title');
    const cardTitleText = cardTitle.innerText.trim().toUpperCase();

    if (cardTitleText.includes(searchValue)) {
      card.style.display = 'grid';
      matchCount++;
    } else {
      card.style.display = 'none';
      
    }
  });
  const message = `
        <div class="text-white font-bold p-4 bg-warning rounded-md">
          Sorry, no destinations matched your search. Try exploring other places!
        </div>
      `;
  handleFallBackMessage(matchCount,message)

  });

// sort one way
// const sortCards = (type, direction) => {                              
//  const cards = Array.from(document.querySelectorAll('.card'))
//  cards.sort((a,b) => {
//   const valueA = type === 'price' ? getPrice(a) : getName(a)
//   const valueb = type === 'price' ? getPrice(b) : getName(b)
//   if(type === 'name'){
//     return direction === 'asc'? valueA.localeCompare(valueb) : valueb.localeCompare(valueA)
//   }
//   else{
//     return direction === 'asc' ? valueA - valueb : valueb - valueA
//   }
//  })
//  cards.forEach(card => {
//   card.parentNode.appendChild(card)
//  })
// }

// const getName = (card) => {
//  const name = card.querySelector('.title').innerText.trim().toLowerCase()
//  return name
// }

// const getPrice = (card) => {
//   const priceInput = card.querySelector('.text-yellow-600').innerText
//   const price = priceInput.replace(/[^\d]/g, '')
//   return parseInt(price)
// }






// sort another way
const clickSortedBtn = () => {
  const ids = ['price-asending', 'price-decending', 'name-asending', 'name-decending']
  ids.forEach(id => {
    const btn = document.getElementById(id)
    btn.addEventListener('click', () => {
      const cards = Array.from(document.querySelectorAll('.card'))
      cards.sort((a,b) => {
        let priceValueA = getPrize(a)
        let priceValueB = getPrize(b)
        let nameValueA= getName(a)
        let nameValueB = getName(b)
        if(id === 'price-asending') {
        return priceValueA-priceValueB
        }
        if(id === 'price-decending'){
        return priceValueB-priceValueA
        } 
        if(id === 'name-asending') {
        return nameValueA.localeCompare(nameValueB)
        }
        if(id === 'name-decending'){
       return nameValueB.localeCompare(nameValueA)
        } 

       })
     
     cards.forEach(card => {
  card.parentNode.appendChild(card)
  })
    
    })
    
  })
 
 
}
 
const getPrize = (card) => {
 const priceInput = card.querySelector('.price')
 const price = priceInput.innerText.replace(/[^\d]/g, '')
 return parseInt(price)
}

const getName = (card) => {
 const name = card.querySelector('.title').innerText.trim().toLowerCase()
 return name
}

clickSortedBtn()

const addAndRemoveActiveColor = (classes) => {
   const allCategoryBtn = document.querySelectorAll(classes)
  
   allCategoryBtn.forEach(btn => {
   if(classes === '.carousel-item') {
    btn.classList.remove('border','border-warning', 'rounded-md', 'border-4')
    btn.addEventListener('click', () => {
      btn.classList.add('border','border-warning', 'rounded-md', 'border-4')
    })
    
  }
    else{
      btn.classList.remove('bg-yellow-600', 'rounded-md', 'text-white')
    btn.addEventListener('click', () => {
      btn.classList.add('bg-yellow-600', 'rounded-md', 'text-white' )
    })
    }
    
    })
}



const showCategoryData = (name) => {
  const cards = document.querySelectorAll('.card');
  let matchCount = 0;

   addAndRemoveActiveColor('.category-btn')
   
  
  cards.forEach(card => {
    const category = card.dataset.category.toLowerCase(); // e.g. "beach", "heritage museum"
 
    
    // Check if the selected name matches any part of the category string
    const matches = category.includes(name?.toLowerCase());

    if (matches) {
      card.style.display = 'grid';
      matchCount++;
    } else {
      card.style.display = 'none'; 
    }
  });
  const message = `
        <div class="text-white font-bold p-4 bg-warning rounded-md">
          No destinations found for "${name}". Try another category!
        </div>
      `;

  // Optional: fallback message if nothing matches
  handleFallBackMessage(matchCount, message)

};


// fallback message
const handleFallBackMessage = (matchCount,message) => {
  const destinationCards = document.getElementById('destination-cards')
  const existingfallbackMessage = document.getElementById('fall-back-message')

  if(matchCount === 0 && !existingfallbackMessage){
   const fallbackMessage = document.createElement('div')
   fallbackMessage.id = 'fall-back-message'
   fallbackMessage.innerHTML  = message
   destinationCards.appendChild(fallbackMessage)
   destinationCards.classList.remove('grid')
  }
  else{
    if(existingfallbackMessage){
  destinationCards.removeChild(existingfallbackMessage)
  
    }
     destinationCards.classList.add('grid')
    
  }
 
}

showCategoryData('allDestinations')


