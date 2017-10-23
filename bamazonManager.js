//Required Dependencies//
var mysql = require("mysql");
var inquirer = require("inquirer");
//Connection to mysql database//
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rainbow100",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log to confirm connection//
  console.log("connected as id " + connection.threadId);
  menuOptions();
});

function menuOptions() {
	 inquirer
      .prompt([ 
      {
      	type: "list",
      message: "Hello Bamazon manager.  Please select what you would like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      name: "userChoice"
      }
      	])
      .then(function(inquirerResponse) {
      	// The switch-case will direct which function gets run for each case for the choice variable.
          switch (inquirerResponse.userChoice) {
          	case "View Products for Sale":
          	// console.log("let's view some products");
               listProducts();
          	break;

          	case "View Low Inventory":
          	   lowInventory();
          	break;

          	case "Add to Inventory":
          	   addInventory();
          	break;

          	case "Add New Product":
          	   newProduct();
          	break;
          		}
      }) //closing bracket for .then after inquirer prompt
	} //closing bracket for menuOptions function

  //function to display list of available products for purchase
function listProducts() {
  console.log("Welcome to Bamazon!  Items available for purchase:\n");
  connection.query("SELECT * FROM products", function(err, res){
     if (err) throw err;
    console.log(res);
    optionsPrompt();
  });
} //closing brackets for listProducts function

//function to show all products with an inventory of 5 units or less
function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    else if (true) {
    console.log(res);
    optionsPrompt();
    }
    else {
    console.log("There are no inventories meeting this requirement")
    optionsPrompt();
    }
  });
} //closing bracket for lowInventory function

//function to update the product inventory
function addInventory() {
    inquirer
    .prompt([
      {
        name: "updatedProduct",
        type: "input",
        message: "Please enter the item_id of the product you wish to update."
      },
      {
        name: "updatedQuantity",
        type: "input",
        message: "How many units are available for purchase?"
      }
    ])
     .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          { 
            stock_quantity: answer.updatedQuantity             
          },
          {
            item_id: answer.updatedProduct    
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("Your product was updated successfully!");
          optionsPrompt();
        }
      ); //closing parenthesis for connection.query
    }); //closing brackets for .then 
} //closing bracket for addInventory function

//function to add a new product to store listing
function newProduct() {
    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product you would like to add to the inventory?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place your product in?"
      },
      {
        name: "price",
        type: "input",
        message: "What price would you like your product to be?"     
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units are available for purchase?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was created successfully!");
          // re-prompt the user for if they want to bid or post
          optionsPrompt();
        }
      );
    });
}

//function to be performed after initial to ask manager if they wish to perform another task
function optionsPrompt() {
   inquirer
            .prompt([
              {
              type: "confirm",
              message: "Is there something else you would like to do?",
              name: "confirm",
              default: true
              }
            ])
              .then(function(answer) {
                if (!answer.confirm) {
                  console.log("Have a nice day!")
                  connection.end();                
                }
                else {
                 menuOptions();
                }
            }) //.then closing brackets
 
          } //function optionsPrompt closing brakcets