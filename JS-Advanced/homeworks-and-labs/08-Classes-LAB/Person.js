class Person {
  firstName;
  lastName;
  age;
  email;

  constructor(firstName, lastName, age, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
  }

  toString() {
    return `${this.firstName}, ${this.lastName}, ${this.age}, ${this.email} `;
  }
}

const myPerson = new Person("John", "Smith", 32, "john@abv.bg");
console.log(myPerson);
console.log(myPerson.toString());