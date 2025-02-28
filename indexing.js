db.data1.insertMany([
    { _id: 1, name: "Aarav Patel", age: 25, gender: "Male" },
    { _id: 2, name: "Neha Sharma", age: 30, gender: "Female" },
    { _id: 3, name: "Rohan Mehta", age: 22, gender: "Male" },
    { _id: 4, name: "Priya Verma", age: 28, gender: "Female" },
    { _id: 5, name: "Amit Joshi", age: 27, gender: "Male" },
    { _id: 6, name: "Sneha Gupta", age: 24, gender: "Female" },
    { _id: 7, name: "Vikram Singh", age: 29, gender: "Male" },
    { _id: 8, name: "Kavita Rao", age: 26, gender: "Female" },
    { _id: 9, name: "Sandeep Kumar", age: 31, gender: "Male" },
    { _id: 10, name: "Pooja Yadav", age: 23, gender: "Female" },
    { _id: 11, name: "Rajesh Tiwari", age: 32, gender: "Male" },
    { _id: 12, name: "Anjali Desai", age: 27, gender: "Female" },
    { _id: 13, name: "Manish Chawla", age: 25, gender: "Male" },
    { _id: 14, name: "Divya Nair", age: 30, gender: "Female" },
    { _id: 15, name: "Nitin Kapoor", age: 28, gender: "Male" },
    { _id: 16, name: "Sunita Malhotra", age: 24, gender: "Female" },
    { _id: 17, name: "Aditya Bansal", age: 26, gender: "Male" },
    { _id: 18, name: "Ritu Sharma", age: 29, gender: "Female" },
    { _id: 19, name: "Harsh Vardhan", age: 27, gender: "Male" },
    { _id: 20, name: "Meera Iyer", age: 31, gender: "Female" }
  ])

  
  db.data1.find({age:{$lte:30}}).explain("executionStats")//without indexing more time fetch and giveing the indexing less time to cover seraching.


  //create index on age field
  db.data1.createIndex({"age":1}) //acending order -1 is decending order

  //One field remove at a time
  db.data1.dropIndex("age_1")

  //Fetch all the indexing returns
  db.data1.getIndexes()

  db.data1.createIndex({"age":1,"gender":1})

  db.data1.createIndex({age:1,gender:1})

  db.data1.find({age:{$gte:27},gender:"male"}).explain("executionStats") //this give indexing

  db.data1.find({gender:"male"}).explain("executionStats")//this give collspan

  


  
  
    

  
  