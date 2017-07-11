


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


bulk.execute()




/*
 {$set:{field1:value1,....}}
*/
var result = db.update_test.update(
                {_id:1}, 
                {         
                  $set:  
                  {
                     "address": { province:"GuangXi",city:"Nanning" }
                  }
               } 
            );
printjson( result );
var cursor = db.update_test.find({_id:1});
printjson(cursor.toArray())



/*
 {$set:{field1.field11:value1,....}}
*/
var result = db.update_test.update(
                        {_id:1},
                        {
                          $set:
                          {
                              "address.city":"GuangZhou"
                          } 
                        }
              );
printjson( result );
var cursor = db.update_test.find({_id:1});
printjson(cursor.toArray())



















