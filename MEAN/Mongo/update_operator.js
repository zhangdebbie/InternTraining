

db.update_test.drop();
var bulk = db.update_test.initializeUnorderedBulkOp();

var doc1= 
        {
           _id:1,
           name:"aaa",
           age:20,
           address:
           {
              province:"GuangDong",
              city:"zhuhai"      
           }
        }
bulk.insert(doc1);

var doc2= 
        {
           _id:2,
           name:"aaa",
           age:20,
           address:
           {
              province:"GuangDong",
              city:"zhuhai"      
           }
        }
bulk.insert(doc2);


bulk.execute()




/*
 { $set:{field1:value1,....} }
*/
var result = db.update_test.update(
                { name:"aaa" },   
                {                    
                  $set:  
                  {
                     "name":"aaa_update",
                     "age":28
                  }
               } 
               ,{multi:true}
            );
printjson( result );

var cursor = db.update_test.find({});
printjson(cursor.toArray())



var result = db.update_test.update(
                                   {_id:1},    
                                   {age: 26 }  
                                  );
printjson( result );
var cursor = db.update_test.find({});
printjson(cursor.toArray())




var result = db.update_test.update(
                {_id:1},  
                {         
                  $inc:  
                  {
                    "age":2
                  }
               } 
            );
printjson( result );
var cursor = db.update_test.find({});
printjson(cursor.toArray())



var result = db.update_test.update(
                {_id:1},  
                {         
                  $min:  
                  {
                    "age":16
                  }
               } 
            );
printjson( result );
var cursor = db.update_test.find({});
printjson(cursor.toArray())















/*
 { $currentDate:{<field1>:<typeSpecification1,...}  }
*/

var result = db.update_test.update(
                {_id:1},  
                {         
                  $currentDate:  
                  {
                    "optime_1":true,
                    "optime_2":{$type:"timestamp"}
                  }
               } 
            );
printjson( result );
var cursor = db.update_test.find({});
printjson(cursor.toArray())



/* write concern*/

var result = db.writeconcern_test.insert(doc1,{ writeConcern:{w:0} }) 
printjson(result)


var result = db.writeconcern_test.insert(doc1,{ writeConcern:{w:1} }) 
printjson(result)


var result = db.writeconcern_test.insert(doc1,{ writeConcern:{w:1,j:true,wtimeout:5} }) 
printjson(result)
	
