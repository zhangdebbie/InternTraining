


//Calculate Order and Total Quantity with Average Quantity Per Item

var mapFunction2 = function() {
    for (var idx = 0; idx < this.items.length; idx++) {
        var key = this.items[idx].sku;
        var value = {
            count: 1,
            qty: this.items[idx].qty
        };
        emit(key, value);
    }
};

var reduceFunction2 = function(keySKU, countObjVals) {
    reducedVal = {
        count: 0,
        qty: 0
    };
    for (var idx = 0; idx < countObjVals.length; idx++) {
        reducedVal.count += countObjVals[idx].count;
        reducedVal.qty += countObjVals[idx].qty;
    }
    return reducedVal;
};

var finalizeFunction2 = function(key, reducedVal) {
    reducedVal.avg = reducedVal.qty / reducedVal.count;
    return reducedVal;
};

db.orders.mapReduce(mapFunction2,
    reduceFunction2, {
        out: {
            merge: "map_reduce_example"
        },
        query: {
            ord_date: {
                $gt: new Date('01/01/2012')
            }
        },
        finalize: finalizeFunction2
    }
)
    
    
-------------verify map function

var mapFunction2 = function() {
    for (var idx = 0; idx < this.items.length; idx++) {
        var key = this.items[idx].sku;
        var value = {
            count: 1,
            qty: this.items[idx].qty
        };
        emit(key, value);
    }
};
var emit = function(key, value) {
        print("emit");
        print("key: " + key + " value: " + tojson(value));
    }
    /*
    var myDoc = db.orders.findOne( { _id: ObjectId("50a8240b927d5d8b5891743c") } );
    mapFunction2.apply(myDoc);
    */
var myCursor = db.orders.find();

while (myCursor.hasNext()) {
    var doc = myCursor.next();
    print("document _id= " + tojson(doc._id));
    mapFunction2.apply(doc);
    print();
}

	
	document _id= ObjectId("50a8240b927d5d8b5891743c")
emit
key: mmm value: { "count" : 1, "qty" : 5 }
emit
key: nnn value: { "count" : 1, "qty" : 5 }

document _id= ObjectId("50a8240b927d5d8b5891743d")
emit
key: mmm value: { "count" : 1, "qty" : 10 }
emit
key: nnn value: { "count" : 1, "qty" : 20 }

document _id= ObjectId("50a8240b927d5d8b5891743e")
emit
key: aaa value: { "count" : 1, "qty" : 10 }
emit
key: nnn value: { "count" : 1, "qty" : 10 }

document _id= ObjectId("50a8240b927d5d8b5891743f")
emit
key: bbb value: { "count" : 1, "qty" : 1 }
emit
key: mmm value: { "count" : 1, "qty" : 20 }


---------verify reduce function 


var reduceFunction2 = function(keySKU, valuesCountObjects) {
    reducedValue = {
        count: 0,
        qty: 0
    };
    for (var idx = 0; idx < valuesCountObjects.length; idx++) {
        reducedValue.count += valuesCountObjects[idx].count;
        reducedValue.qty += valuesCountObjects[idx].qty;
    }
    return reducedValue;
};

var myTestObjects = [{
    count: 1,
    qty: 5
}, {
    count: 2,
    qty: 10
}, {
    count: 3,
    qty: 15
}];

reduceFunction2('myKey', myTestObjects);
    
    
    
    
    
    
    
    
    
----------

db.query_test.mapReduce(
  function(){
      for(var key in this){
          emit(key,1);
      }
  },
  function(key,values){
      return Array.sum(values);
  },{
      out:"temp_result"
  }
  ).find().sort({value:-1})


  var mapFunction1 = function(){
    for (var key in this){
        emit(key,{count:1});
    }
}

var reduceFunction1 = function(key,emits){
    total = 0;
    for (var i in emits){
        total += emits[i].count;
    }
    return {count:total};
}

db.query_test.mapReduce(mapFunction1,
    reduceFunction1, {
        out: {
            merge: "map_reduce_example"
        }
    }
)
