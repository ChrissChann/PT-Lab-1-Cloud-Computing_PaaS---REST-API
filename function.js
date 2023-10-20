var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

var employee = {
    employee6: {
      id: 6,
      companyName: "Abreeza Ayala Mall",
      employeeName: "Sakura Grid",
      position: "Sales",
      location: "Lanang, Davao City",
    },
  };
  
  // The addUser endpoint (POST)
  app.post("/addUser", function (req, res) {
  
    fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
      data = JSON.parse(data);
  
      data.employee6 = employee.employee6;
  
      console.log(data);
      res.end(JSON.stringify(data));
    });
  });

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "server.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

// The Endpoint to get a single user by id
app.get("/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    var employees = JSON.parse(data);
    var employeeId = "Employee" + req.params.id;
    var employee = employees[employeeId];
    if (employee) {
      console.log(employee);
      res.json(employee); // Use res.json() to send JSON data
    } else {
      res.status(404).send("User not found");
    }
  });
});

// The Endpoint of deleting specific users (DELETE)
app.delete("/deleteUsers/:id", function (req, res) {
  const id = req.params.id;
  fs.readFile(__dirname + "/" + "server.json", "utf8", function (err, data) {
    let users = JSON.parse(data);
    if (users["Employee" + id]) {
      delete users["Employee" + id];
      fs.writeFile(
        __dirname + "/" + "server.json",
        JSON.stringify(users),
        function (err) {
          if (err) throw err;
          res.end(JSON.stringify(users));
        }
      );
    } else {
      res.status(404).send();
    }
  });
});


// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})