
const activeUserEmail = localStorage.getItem('activeSession'); // Who's logged in
const accountData = localStorage.getItem(activeUserEmail); // Retrieve their info

if (accountData) {
  const accountInfo = JSON.parse(accountData);

  // Example: show greeting
  document.getElementById('Welcome-msg').textContent = `Welcome back, ${accountInfo.firstName}!`;
} else {
  // Optional fallback
  console.log('No active session found. Redirecting to login...');
  window.location.href = '/html/login.html';
}



const logout = document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('activeSession')
 window.location.href = `/html/index.html`
})

document.getElementById('back-home').addEventListener('click', () => {
  localStorage.setItem('activeSession', accountData )
 window.location.href = '/html/index.html'
})


const bookingId = document.getElementById('booking-id')
bookingId.addEventListener('click', () => {
    showModal()
})

// show booking details
const showModal = () => {
  const bookingInfoString = localStorage.getItem('bookingInfo');
  const bookingInfo = JSON.parse(bookingInfoString);
  const dialogModal = document.getElementById('booking_modal');

  dialogModal.innerHTML = `
    <div class="modal-box bg-white shadow-lg border border-gray-200">
      <h3 class="flex text-xl font-semibold text-indigo-600 mb-2"><img class="w-6 h-6 mx-2 "
       src="/images/icons/travel-luggage.png" alt=""> Travel Summary</h3>
      <p class="text-gray-700 mb-4">
        You're all set for a trip from 
        <span class="font-medium text-blue-600">${bookingInfo.origin}</span> 
        to 
        <span class="font-medium text-blue-600">${bookingInfo.destination}</span>.
      </p>
      <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-semibold">Departure:</span><br>${bookingInfo.dataForm}</div>
        <div><span class="font-semibold">Return:</span><br>${bookingInfo.dateTo}</div>
      </div>

      <div class="modal-action mt-6">
        <form method="dialog">
          <button class="btn btn-primary w-full">Looks Good</button>
        </form>
      </div>
    </div>
  `;

  dialogModal.showModal();
}