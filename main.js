const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const standSelect = document.getElementById('stand');

populateUI();

// Convert string to integer
let ticketPrice = +standSelect.value;

// Save selected stand index & price
function setMovieData(standIndex, standPrice) {
    localStorage.setItem('selectedStandIndex', standIndex);
    localStorage.setItem('selectedStandPrice', standPrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    // Print on screen the number of selected seats
    count.innerText = selectedSeatsCount;
    // Get the price of all seats selected
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage to populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedStandIndex = localStorage.getItem('selectedStandIndex');

    if(selectedStandIndex != null) {
        standSelect.selectedIndex = selectedStandIndex;
    }
}

// Stand select event
standSelect-addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setStandData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Event Listener

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    } {
    e.target.classList.toggle('selected');

    updateSelectedCount();
    }
});

// Initial count & total set
updateSelectedCount();