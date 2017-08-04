1.Starting.
> mongod.exe --dbpath C:\MongoDB\Server\3.2\data\db\ --directoryperdb


2. Listing databases
> show databases /show dbs

3. Using database
> use movies

3.5 Showing current database
> db

4. Listing colections
> show collections

5.Select * from movies
> db.movies.find()

5.5 Selecting fields
db.movies.find({"year":{$gt:2000,$lt:2010}}).select("title year type")

6. Formating result.
> db.movies.find().pretty()

7. We don't need to create using create dabase command. Instead we can switch to new database (use). After creating first collection database gonna be create.

> use techdays
switched to db techdays

8. Creating new collection 
> db.createCollection("techtest")

9.Creating new collection by inserting

> db.techtest.insert({"tech":"days"})

10. Dropping collection
> db.testtech.drop()
true

10.Dropping database
> db.dropdatabase()
