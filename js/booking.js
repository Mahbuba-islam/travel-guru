  



   const booking = () => {
    const params = new URLSearchParams(window.location.search)
    console.log(params)
   const destinationName = params.get('destination');
  const detailsDestination = params.get('details');


    const destinationContainer = document.getElementById('destination-container')
    const div = document.createElement('div')
    div.innerHTML = ` <h1  class="text-lg font-bold md:text-xl lg:font-extrabold text-warning">${destinationName}</h1>
    <p class="text-xs md:text-sm w-[455px] font-bold">${detailsDestination}</p>
    `
     destinationContainer.innerHTML = ''
  destinationContainer.appendChild(div);

}
 booking()  


const showModal = () => {
  const originInput = document.getElementById('origin-input').value;
  const destinationInput = document.getElementById('destination-input').value;
  const displayDateForm = document.getElementById('displayDate').value
 const displayDateTo = document.getElementById('dateDisplay').value
 const dialog = document.getElementById('start_booking');

  if (originInput && destinationInput) {
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
           <button onclick="goToLogin()" class="btn bg-yellow-600 text-white w-full text-center border-0 mx-auto px-15">
           Login to Manage Booking</button>

          </form>
        </div>
      </div>`;
    dialog.showModal();
  } else {
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
  const bookingData = {
 origin:originInput,
 destination:destinationInput,
 dataForm:displayDateForm,
 dateTo: displayDateTo,
 

}
localStorage.setItem('bookingInfo', JSON.stringify(bookingData))
console.log(bookingData)
};

const goToLogin = () => {
  window.location.href = '/html/login.html'
  
}

