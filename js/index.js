
// const bookingId = document.getElementById('bookingId')
// bookingId.addEventListener('click', () => {
//     window.location.href = '/html/booking.html'
// })

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
        navigateBooking(destination,destinationDetails)
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

const navigateBooking = (destination,destinationDetails) => {
    window.location.href = `/html/booking.html?destination=${destination}&&details=${destinationDetails}`
   
//      const destinationContainer = document.getElementById('destination-container')
//     const div = document.createElement('div')
//     div.innerHTML = ` <h1  class="text-lg font-bold md:text-xl lg:font-extrabold ">ppppp</h1>
//     <p class="text-xs md:text-sm w-[455px] font-bold">lllll</p>
//     `
//      destinationContainer.innerHTML = ''; // Optional: clear previous content
//   destinationContainer.appendChild(div);

    

}

const loginBtn = document.getElementById('login-btn')
loginBtn.addEventListener('click', () => {
 window.location.href = '/html/login.html'
})
const params = new URLSearchParams(window.location.search);
const userNameFromURL = params.get('user');
console.log(userNameFromURL);
loginBtn.innerText = userNameFromURL.slice(0,1).toUpperCase()
loginBtn.classList.add('rounded-full')




