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
  listProducts();
});

//function to display list of available products for purchase
function listProducts() {
  console.log("Welcome to Bamazon!  Items available for purchase:\n");
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
     if (err) throw err;
     //Trying to get results to display out of raw data project packet
     // var results = JSON.stringify(res); 
    console.log(res);
  //call function to begin user selection
    selectItem();
  });
}

//function for user to select item and quantity
 function selectItem() {  
      inquirer
      .prompt([
      {
        name: "selection",
        type: "input",
        message: "Please enter the item number you would like to purchase"   
      },
      {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
      
      }
      ])
      .then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {item_id: answer.selection }, function(err, res) {
            var productData = res[0];
            // console.log(productData);  
             //determine if the quantity selected is available and update database inventory   
          if (productData.stock_quantity >= answer.quantity) {
            //Show customer price of transaction
            var totalCost = (answer.quantity * productData.price);
            console.log("The total cost of your order is $" + totalCost);
            console.log("Thank you for shopping at Bamazon.  Have a nice day!")
            //Logic to update the stock inventory
            var queryUpdate = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - answer.quantity) + ' WHERE item_id = ' + answer.selection;
            // console.log('queryUpdate = ' + queryUpdate);
            connection.query(queryUpdate, function(err, data) {
              if (err) throw err;
              
            })

            //code to run if selected quantity is greater than item inventory
          }
          else {console.log("Insufficient quantity to fulfill order");
            inquirer
            .prompt([
              {
              type: "confirm",
              message: "Would you like to continue shopping?",
              name: "confirm",
              default: true
               }
            ])
              .then(function() {
                if (true) {
                  listProducts();
                }
                else{
                  console.log("Thank you for shopping at Bamazon.")
                  connection.end();
                }
              })
        } //closing brackets for insufficient quantity else statement
    })//closing brackets for connection.query
  }) //closing brackets for selection .then
}  //closing bracket for selectItem function

