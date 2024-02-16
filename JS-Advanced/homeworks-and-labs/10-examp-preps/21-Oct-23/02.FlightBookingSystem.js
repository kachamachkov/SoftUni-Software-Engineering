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
}


const system = new FlightBookingSystem("TravelWorld");
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
console.log(system.addFlight("BB202", "New York", "10:30 AM", 180));
console.log(system.addFlight("CC303", "Chicago", "11:45 AM", 120));
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));