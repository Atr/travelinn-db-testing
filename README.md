Make sure to run your create data files from the root directory!
-
-
POSTGRES:

In order:
Spin up PostgreSQL
Go to your root directory
Run node createdatatxt.js
Open up your psql terminal for your desired database ie: psql DBNAME
In your psql terminal: run \i postgres/tableschema.sql
In your psql terminal: run \i postgres/loadalldata.sql
In your psql terminal: run \i postgres/foreignkeysandindex.sql
-
-
COUCHDB:
(Not fully implemented.  Doesn't make sense for our use case)
..
For CouchImport, because it's installed locally, you'll need to use 'npx' in front of any command line usage
--> ie "couchimport ..." becomes "npx couchimport ..."
FOr CouchImport, optimized settings I found were: "--buffer 50 --parallelism 100"