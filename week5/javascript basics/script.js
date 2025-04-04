console.log("Hello");
console.log("mamma mia man woooooooo");

let my_name = "rohit";
console.log("hello", my_name);
let id = "s" + 2311;
console.log("i am", id);

// let my_city = prompt("Where do you live?");
// console.log("I live in", my_city);

{
  let a = 10;
  console.log("value of a is", a);
}

// console.log("value of a is", a); ---- doesnt work because not in curly brackets

const my_record = {
  name: "Jamie",
  id: 1234,
  home_town: "Melbourne",
  is_local: false,
};
console.log("I live in", my_record.home_town);

let msg = `I love ${my_record.name}!!!`;
console.log(msg);

let a = 10;
let b = parseInt("20");
console.log(a + b);

let students = ["Jamie", "Liz", "Tony", "Jake"];
console.log(students);
console.log(students[1]);

let grade = 75;
if (grade > 70) {
  console.log("Hey you passed!");
} else {
  console.log("YOU SUCK!");
}

x = 5;
console.log(x === 5);

// && = and, || = or, ! = not

// for (initialisation, condition, afterthought)

for (let i = 0; i < students.length; i++) {
  console.log("Hi!", students[i]);
}
