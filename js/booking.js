  

const booking = () => {
   const params = new URLSearchParams(window.location.search)
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

  