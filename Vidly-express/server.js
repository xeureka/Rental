

const myHonda = {
    color: "red",
    wheels: 4,
    engine: {
        cylinders: 4,
        size: 2.2
    }
}


myHonda.printCar = function() {
    console.log(`My car has color ${this.color} and it is a ${this.wheels} drive`)
}


myHonda.printCar()
