
---------------------Every day useful queries--------------------------------------------
1. Simple where 

db.users.find({"work.department":"Games"})

2. More examples of finding records.

db.users.find({ $and: [{"work.position":"Specialist"},{"work.department":"Electronics"},{"system_id":{$gte:71170}}]   })

db.users.find({$or: [ {"work.department":"Games"},{"work.department":"Movies"}  ]})

db.users.find({"dob":{$gt:ISODate("2016-11-21 08:09:00")}})

db.users.find({"system_id":{$gt:50900,$lt:60900}})


3. Sorting results

db.users.find({"system_id":{$gt:50900,$lt:60900}}).sort({ "work.department":1,"username":-1})

3.5 And another way of where using AND operator
db.users.find({},{"_id":1,"name":1,"address":1,"email":1})

4. Sorting using nested fields

db.students
.find({"scores.type":"exam"})
.sort({"scores.0.score":-1})


5. Cursor example
var cur = db.users.find({"work.department":"Games"})

while(cur.hasNext()){
    
    var current = cur.next();
    var id = current._i
    
    if(current.system_id<1000){
        print(current)
    }
    
}

------------------Crud operations----------------------------------------------

6. Inserting new row
db.techdays.insert({"company":"PVX","established":2008})

7. Update using primary key aka _id
db.techdays.update({_id:ObjectId("58741542f3619c3cb04056d8")},{$set:{"established":2015}})

8. Delete using _id
db.techdays.deleteOne({_id:ObjectId("58741542f3619c3cb04056d8")})

9. Inserting with custom primary key (_id)
db.techdays.insert({_id:11,"company":"PVX","established":2014})

	
10. Deleting field
db.techdays.update({_id:11},{$unset: {company: "" }})


----------------Index performance-----------------------------------------------


1.Index performance example
db.usersBig.find({"system_id":129})

-- slow "stage" : "COLLSCAN" 


db.usersBig.createIndex({system_id: 1})

Much Faster

db.usersBig.explain().find({"system_id":8})


----------------Aggregation framework-------------------------------------------


1. Simple grouping with count
db.users.aggregate([
    {
        $group: {
            _id:"$work.position", 
            cnt:{$sum:1}
        }
    }])
	
	
2. Grouping using few columns

	db.users.aggregate([
    {
        $group: {
            _id:{
                "positn":"$work.position", 
                "despt":"$work.department"   
            },
            cnt:{$sum:1}
        }
    }])

3.Aggregation pipeline	
	
db.users.aggregate([
        
        {
        $project: {_id:0,"pos":"$work.position","dep":"$work.department","addr":"$address.city"}
        },
    
        {
        $match: {$or: [{"pos":"Agent"},{"dep":"Specialist"}]}   
            
        },
        
        {
        $group: {
            _id:{
                positn:"$pos", 
                despt:"$dep"   
            },
                cnt:{$sum:1}
            } 
        }, 
        {
        $sort: {"_id.despt":1}    
            
        }
        
])