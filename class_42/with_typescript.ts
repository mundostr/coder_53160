const K: number = 23.3;
const message: string = 'Este es el contenido del mensaje';

const calculate = (val: number): number => {
    return val * K;
}

interface PersonData {
    firstName: string,
    lastName: string,
    age?: number
}

const person1: PersonData = { firstName: 'Carlos', lastName: 'Perren' };

console.log(K);
console.log(message);
console.log(calculate(16));
console.log(person1);