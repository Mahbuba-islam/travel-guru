//  global spiner function
const loadingSpiner = (duration=1000, callback= ()=> {}) => {
 const spinerr = document.getElementById('loading-spinner')
 if(!spinerr){
  return
 }
 spinerr.classList.remove('hidden')

 setTimeout(()=> {
  spinerr.classList.add('hidden') //hide the spiner after time
  callback() //run your custom function after loading
 }, duration)
}




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
        const destinationPrice = i.childNodes[5].innerText
        console.log(destinationPrice)
        const div = document.createElement('div')
        div.classList.add('card')
       div.innerHTML = `<div class="destination-details mr-4">
       <h1 class=" text-lg  font-bold  lg:font-extrabold text-warning">${destination}</h1>
    <p class="text-xs md:text-sm font-bold w-[400px]">${destinationDetails}</p>
     <p class="price text-white font-bold text-sm">${destinationPrice}</p>
       </div>
    <button class="booking-btn btn btn-warning font-bold text-black mt-4 w-1/2 ">Booking ${destination}</button>`
    heroContent.appendChild(div)
 booking()
    
    })
console.log(heroContent)
    
})


// default carosoul
// const defaultItem = () => {
//  const carouselItem = document.querySelector('.carousel-item')
// const destinationDetails = carouselItem.childNodes[3].innerText
//         const destination = carouselItem.childNodes[1].innerText
//     const div = document.createElement('div')
//     div.classList.add('card','w-1/2', 'md:w-full')
//        div.innerHTML = `<div class="destination-details">
//        <h1 class="text-lg font-bold md:text-xl lg:font-extrabold ">${destination}</h1>
//     <p class="text-xs md:text-sm font-bold ">${destinationDetails}</p>
//        </div>
//     <button class="booking-btn btn btn-warning font-bold text-black mt-4">Booking ${destination}</button>`
//     heroContent.appendChild(div)
//     carouselItem .classList.add('border', 'border-warning', 'rounded-md', 'border-4')
//   booking()
// }


// go to book
const booking = () => {
  const bookingBtns = document.querySelectorAll('.booking-btn');
bookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the closest card container
       const card = btn.closest('.card');
       const destinationDEtails = card.querySelector('.destination-details');
       const travelDetails = {
          destinationName:destinationDEtails.innerHTML
         
        };

        console.log(travelDetails);
        localStorage.setItem('travelInfo', JSON.stringify(travelDetails));

        // Redirect to booking page
        window.location.href = '/html/booking.html';
      
    });
  });
};

booking();


 
// login
const loginBtn = document.getElementById('login-btn')
const loginFunction = () => {
  loadingSpiner(400, () => {
  loginBtn.innerText = 'login'
    loginBtn.classList.remove('rounded-full')
    loginBtn.addEventListener('click', () => {
 window.location.href = '/html/login.html'
})
})
  
}

const activeUserData = localStorage.getItem('loggedInUser')
console.log(activeUserData)

const userInfo = JSON.parse(activeUserData)

if(userInfo){
 const navbarEnd = document.getElementById('navbarEnd')
     navbarEnd.innerHTML = `
    <div id="dropdown" class="dropdown">
  <div tabindex="0" role="button" class="btn mr-16 md:mr-0 md:m-1 rounded-full btn-warning font-bold text-white">${userInfo.name.slice(0,1).toUpperCase()}
  </div>
  <ul tabindex="0" class="dropdown-content menu bg-warning rounded-box z-1 shadow-sm space-y-2 mt-4">
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


document.getElementById('search-destination').addEventListener('keydown', (e) => {
  const input = e.target;

  // Only run search when Enter is pressed
  if (e.key === 'Enter') {
    const searchValue = input.value.trim().toUpperCase();
    const cards = document.querySelectorAll('.card');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let matchCount = 0;
   
    loadingSpiner(900, () => {
      cards.forEach(card => {
        const cardTitle = card.querySelector('.card-title');
        const cardTitleText = cardTitle?.innerText.trim().toUpperCase();

        if (cardTitleText && cardTitleText.includes(searchValue)) {
          card.style.display = 'grid';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // carouselItems.forEach(carousel => {
      //   const carouselTitle = carousel.querySelector('.title');
      //   const carouselTitleText = carouselTitle?.innerText.trim().toUpperCase();

      //   if (carouselTitleText && carouselTitleText.includes(searchValue)) {
      //     carousel.style.display = 'block';
      //     matchCount++;
      //   } else {
      //     carousel.style.display = 'none';
      //   }
      // });

      const message = `
        <div class="text-white font-bold p-4 bg-warning rounded-md">
          Sorry, no destinations matched your search. Try exploring other places!
        </div>
      `;
      handleFallBackMessage(matchCount, message);

      // ✅ Clear input only after full-word search (Enter key)
      input.value = '';
    });
  }
});
// sort one way
const sortsData = (type, direction) => { 
const cards = Array.from(document.querySelectorAll('.card'))
// sort cards
 cards.sort((a,b) => {
  const valueA = type === 'price' ? getPrice(a) : getName(a)
  const valueb = type === 'price' ? getPrice(b) : getName(b)
  if(type === 'name'){
    return direction === 'asc'? valueA.localeCompare(valueb) : valueb.localeCompare(valueA)
  }
  else{
    return direction === 'asc' ? valueA - valueb : valueb - valueA
  }
 })
 cards.forEach(card => {
  card.parentNode.appendChild(card)
 })
}

const getName = (card) => {
 const name = card.querySelector('.card-title').innerText.trim().toLowerCase()
 return name
}

const getPrice = (card) => {
  const priceInput = card.querySelector('.text-yellow-600').innerText
  const price = priceInput.replace(/[^\d]/g, '')
  return parseInt(price)
}






// sort another way
// const clickSortedBtn = () => {
//   const ids = ['price-asending', 'price-decending', 'name-asending', 'name-decending']
//   ids.forEach(id => {
//     const btn = document.getElementById(id)
//     btn.addEventListener('click', () => {
//       const cards = Array.from(document.querySelectorAll('.card'))
//       cards.sort((a,b) => {
//         let priceValueA = getPrize(a)
//         let priceValueB = getPrize(b)
//         let nameValueA= getName(a)
//         let nameValueB = getName(b)
//         if(id === 'price-asending') {
//         return priceValueA-priceValueB
//         }
//         if(id === 'price-decending'){
//         return priceValueB-priceValueA
//         } 
//         if(id === 'name-asending') {
//         return nameValueA.localeCompare(nameValueB)
//         }
//         if(id === 'name-decending'){
//        return nameValueB.localeCompare(nameValueA)
//         } 

//        })
     
//      cards.forEach(card => {
//   card.parentNode.appendChild(card)
//   })
    
//     })
    
//   })
 
 
// }
 
// const getPrize = (card) => {
//  const priceInput = card.querySelector('.price')
//  const price = priceInput.innerText.replace(/[^\d]/g, '')
//  return parseInt(price)
// }

// const getName = (card) => {
//  const name = card.querySelector('.title').innerText.trim().toLowerCase()
//  return name
// }

// clickSortedBtn()

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
  loadingSpiner(1000, ()=> {
     const cards = document.querySelectorAll('.card');
  const carouselItems = document.querySelectorAll('.carousel-item')
  let matchCount = 0;

   
   
  
  cards.forEach(card => {
    const category = card.dataset.category?.toLowerCase(); // e.g. "beach", "heritage museum"
 
    
    // Check if the selected name matches any part of the category string
    const matches = category?.includes(name?.toLowerCase());

    if (matches) {
      card.style.display = 'grid';
      matchCount++;
    } else {
      card.style.display = 'none'; 
    }
  });

  carouselItems.forEach(i => {
    const carasoulCategory = i.dataset.category?.toLowerCase();
    const matches = carasoulCategory ?.includes(name?.toLowerCase());
     if (matches) {
      i.classList.remove('hidden');
      matchCount++;
    } else {
      i.classList.add('hidden');
    }

  })
  const message = `
        <div class="font-bold p-4 text-red-600 text-lg">
          No destinations found for <span class="text-warning font-extrabold text-xl">"${name}".</span>  
          <p class="font-bold text-black">Try another category!</p>
        </div>
      `;

  // Optional: fallback message if nothing matches
  handleFallBackMessage(matchCount, message)

  })
  addAndRemoveActiveColor('.category-btn')
 
};




// ✅ Updated handleFallBackMessage with Dual Placement & Animation
const handleFallBackMessage = (matchCount, message) => {
  const destinationCards = document.getElementById('destination-cards');
  const carosoulitems = document.getElementById('carosoul-items');

  // Remove old fallback messages
  document.querySelectorAll('#fall-back-message').forEach(el => el.remove());

  if (matchCount === 0) {
    const createFallbackMessage = () => {
      const fallbackMessage = document.createElement('div');
      fallbackMessage.id = 'fall-back-message';
      fallbackMessage.classList.add(
         'bg-base-100', 'shadow-lg', 'text-center', 'w-1/3', 'mx-auto',
        'opacity-0', 'animate-fadeIn', 'rounded-md' , 'transition-opacity', 'p-6','duration-700'
      );
      fallbackMessage.innerHTML = `
        <p class="text-lg font-semibold mt-4">${message}</p>
        <figure>
         <img class="w-1/2 mx-auto" src="/images/no results found.jpg" alt="No results found" />
        </figure>
        <div class="">
          <div class=" mt-4 justify-center items-center">
            <button class="btn btn-outline btn-lg font-semibold animate-bounce-slow" onclick="showCategoryData('allDestinations')">
              See All Destinations
            </button>
          </div>
        </div>
      `;
      return fallbackMessage;
    };

    if (destinationCards) {
      const fallbackForCards = createFallbackMessage();
      destinationCards.appendChild(fallbackForCards);
      destinationCards.classList.remove('grid');
      requestAnimationFrame(() => fallbackForCards.classList.remove('opacity-0'));
    }

    // if (carosoulitems) {
    //   const fallbackForCarousel = createFallbackMessage();
    //   carosoulitems.appendChild(fallbackForCarousel);
    //   carosoulitems.classList.remove('carousel');
    //   requestAnimationFrame(() => fallbackForCarousel.classList.remove('opacity-0'));
    // }
  } else {
    destinationCards?.classList.add('grid');
    // carosoulitems?.classList.add('carousel');
  }
};


showCategoryData('allDestinations')

 showCategoryData('allDestinations')

// const showModal = (name) => {
//   console.log('click')
//   const card = document.querySelectorAll('.card')
//   card.forEach(c => {
//     console.log(c)
//     const exploreModal = document.getElementById('explore_modal')
//   console.log(name)
//   exploreModal.innerHTML = `<div class="modal-box">
//     <h3 class="text-lg font-bold">Hello!</h3>
//     <p class="py-4">${c}</p>
//   </div> 
//   <form method="dialog" class="modal-backdrop">
//     <button>close</button>
//   </form>`
//   })
  
//    exploreModal.showModal()
// }