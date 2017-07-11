
db.query_test.drop();
var bulk = db.query_test.initializeUnorderedBulkOp();



var doc1 = {
              name:"tom",
              age:20
           }
bulk.insert(doc1);



var doc2 = {
              name:"jim",
              age:31
           }
bulk.insert(doc2);

var doc3 = {
              name:"bill",
              age:21
           }
bulk.insert(doc3);

var doc4 = {
              name:"John",
              age:null
           }
bulk.insert(doc4);

var doc5 = {
              name:"aaa"
           }
bulk.insert(doc5);

bulk.execute()




/*
   db.collection.find( query , fields , limit , skip)
*/
var cursor = db.query_test.find(
                {},                //query
                { _id:0,age:1},    //fields
                2,                 //limit
                2).sort({age:1});  //skip
printjson(cursor.toArray())


var cursor = db.query_test.find(
                {},               
                { _id:0,age:1}    
                ).limit(2).skip(2).sort({age:1}) 
printjson(cursor.toArray())





print("========find － $eq =======")

var cursor = db.query_test.find(
                {
                   age: { $eq:20 }  
                   //age:20
                } 
            );
printjson(cursor.toArray())





print("========find － $in=======")

var cursor = db.query_test.find(
                {
                  age: { $in:[20,21] }  
                } 
            );
printjson(cursor.toArray())





print("========find － $nin =======")
/*
 { field: { $nin: [ <value1>, <value2> ... <valueN> ]} }
*/
var cursor = db.query_test.find(
                {
                  age: { $nin:[20,21] }   
                } 
            );
printjson(cursor.toArray())




print("========find － $and =======")
/*
 { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

*/
var cursor = db.query_test.find(
                {
                  //$and: [ { age:{$gt:21}}, { age:{ $lte:31} } ]   //age>21 && age<=31
                  //age:{$gte:20,$lte:31}
                  $and: [ 
                          { $or:[ { age:19 },{ age:21 } ] },        //age=19 or age=21
                          { $or:[ { name:"jim" },{ name:"bill" } ] }
                        ]  
                } 
            );
printjson(cursor.toArray())




print("========find － $nor =======")
/*
 { $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }
*/
var cursor = db.query_test.find(
                {
                   $nor:[ 
                          { name:"jim"  },
                          { name:"bill" }  
                        ]  
                });
printjson(cursor.toArray())


print("========find － $not/$gt/$lte =======")
/* 
   { field: { $not: { <operator-expression> } } }

   {field: {$gt: value} }
  
   { field: { $lte: value} }
*/
var cursor = db.query_test.find(
                 {  
                    age:{ $not: { $gt:20,$lte:30 } }   //age<=20 or  age>30
                 });                           
printjson(cursor.toArray())




print("========find － $exists =======")
/*
 { field: { $exists: <boolean> } }
*/
var cursor = db.query_test.find(
                {
                   age: { $exists:true }   
                } 
            );
printjson(cursor.toArray())



var cursor = db.query_test.find(
                 { $and:[
                    {age:{ $not: { $gt:20,$lte:30 } } },//age<=20 or  age>30
                    {age:{$exists:true}},
                    {age:{$ne:null}}]
                 });                           
printjson(cursor.toArray())
                