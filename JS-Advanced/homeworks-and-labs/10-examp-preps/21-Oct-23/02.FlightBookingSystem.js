class FlightBookingSystem {
  constructor(name) {

    this.name = name;
    this.flights = [];
    this.bookings = [];
    this.bookingsCount = 0;
  }


  addFlight(flightNumber, destination, departureTime, price) {
    if (this.flights.find(x => x.flightNumber === flightNumber)) {
      return `Flight ${flightNumber} to ${destination} is already available.`;


    } else {

      let newFlight = {
        flightNumber,
        destination,
        departureTime,
        price
      };

      this.flights.push(newFlight);
      return `Flight ${flightNumber} to ${destination} has been added to the system.`;
    }
  }

  bookFlight(passengerName, flightNumber) {

    if (!this.flights.find(flight => flight.flightNumber == flightNumber)) {

      return `Flight ${flightNumber} is not available for booking.`;

    } else {

      let newBooking = {
        passengerName,
        flightNumber

      };

      this.bookings.push(newBooking);
      this.bookingsCount++;


      return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
    }

  }

  cancelBooking(passengerName, flightNumber) {

    let currentBooking = this.bookings.find(booking => booking.flightNumber === flightNumber && booking.passengerName === passengerName);

    if (!currentBooking) {
      throw new Error(`Booking for passenger ${passengerName} on flight ${flightNumber} not found.`);


    } else {


      this.bookingsCount--;

      return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
    }
  }

  showBookings(criteria) {
    if (this.bookings.length === 0) {
      throw new Error("No bookings have been made yet.");
    }

    if (criteria === "all") {
      const bookingList = this.bookings.map(booking => {
        return `${booking.passengerName} booked for flight ${booking.flightNumber}.`;
      });

      return [`All bookings(${this.bookingsCount}):`, ...bookingList].join('\n').trim();
    }

    const priceThreshold = criteria === "cheap" ? 100 : criteria === "expensive" ? 100 : null;

    if (priceThreshold === null) {
      throw new Error("Invalid criteria.");
    }

    const filteredBookings = this.bookings.filter(booking => {
      const flight = this.flights.find(f => f.flightNumber === booking.flightNumber);
      return criteria === "cheap" ? flight.price <= priceThreshold : flight.price > priceThreshold;
    });

    if (filteredBookings.length === 0) {
      return `No ${criteria} bookings found.`;
    }

    const bookingList = filteredBookings.map(booking => {
      return `${booking.passengerName} booked for flight ${booking.flightNumber}.`;
    });

    return [`${criteria.charAt(0).toUpperCase() + criteria.slice(1)} bookings:`, ...bookingList].join('\n').trim();
  }


}


const system = new FlightBookingSystem("TravelWorld");
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
console.log(system.addFlight("BB202", "New York", "10:30 AM", 80));
console.log(system.bookFlight("Alice", "AA101"));
console.log(system.bookFlight("Bob", "BB202"));
console.log(system.showBookings("cheap"));
