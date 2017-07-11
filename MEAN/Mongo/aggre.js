


db.zipcodes.aggregate( [
{ $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
{ $match: { totalPop: { $gte: 10*1000*1000 } } }
] )


//Return Average City Population by State

db.zipcodes.aggregate( [
{ $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
{ $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
] )


Return Largest and Smallest Cities by State



db.zipcodes.aggregate([{
    $group: {
        _id: {
            state: "$state",
            city: "$city"
        },
        pop: {
            $sum: "$pop"
        }
    }
},
{
    $sort: {
        pop: 1
    }
},
{
    $group: {
        _id: "$_id.state",
        biggestCity: {
            $last: "$_id.city"
        },
        biggestPop: {
            $last: "$pop"
        },
        smallestCity: {
            $first: "$_id.city"
        },
        smallestPop: {
            $first: "$pop"
        }
    }
},
{
    $project: {
        _id: 0,
        state: "$_id",
        biggestCity: {
            name: "$biggestCity",
            pop: "$biggestPop"
        },
        smallestCity: {
            name: "$smallestCity",
            pop: "$smallestPop"
        }
    }
}])


 db.voyagestops.aggregate([
...   {$match:{$and:[{"facilityCode":{$in:["SZC01","JED01","SHA07","HKG01","HKG01","VGT04","NYC11","SAV03","ORF08","NYC11","HKG01","LAS03","LAS03",
...   "HKG01","KHH01","YAT01","SIN01","SZC01","VGT05","AKL03","VAN03"]}}, {"territory":{$ne:null}}]}},
...   {$group:{_id:{"facilityCode":"$facilityCode","country":"$country","territory":"$territory"}}}
... ]
... );
