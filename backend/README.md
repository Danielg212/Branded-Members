# MongoDB (MacOS)

MongoDB is a noSQL database.<br />
source: [https://www.mongodb.com](https://www.mongodb.com)

## Installations:

### STEP 1: Install CLT

1. open terminal
2. `sudo rm -rf /Library/Developer/CommandLineTools`
3. `sudo xcode-select —install`

<img src='./../img/install_clt.png' alt='install clt' width='500' />

### STEP 2: Install Homebrew

1. [https://brew.sh](https://brew.sh)

### STEP 3: Install MongoDB (community)

1. open terminal
2. `brew tap mongodb/brew`
3. `brew install mongodb-community`

### STEP 4: Check if installation was a success

1. open terminal
2. `mongo —version`

<img src='./../img/install_success.png' alt='install success' width='500' />

## How to use MongoDB:

### START:

1. open terminal
2. `brew services start mongodb-community` starts service
3. `mongo` opens shell
4. type `help` for more

<img src='./../img/service_start.png' alt='service started' width='500' />

### STOP:

1. open mongo shell (terminal)
2. `CTRL + C` terminates shell
3. `brew services stop mongodb-community` stops service

## If the above method doesn’t work, follow these steps:

### START:

(where [username] is your computer user, `whoami` will show you that name)

1. open terminal
2. `sudo chown [username] /usr/local/var/mongodb` allows read & write access
3. `sudo chown <username> /usr/local/var/log/mongodb` allows read & write access
4. `mongod —config /usr/local/etc/mongod.conf` starts the service manually

<img src='./../img/service_start_manually.png' alt='service started manually' width='500' />

5. open new terminal
6. `mongo` opens shell
7. type `help` for more

<img src='./../img/shell_started.png' alt='shell started' width='500' />

### STOP:

1. open mongo shell (terminal)
2. `CTRL + C` terminates shell
3. at the mongod service terminal do `CTRL + C`

### Forgot to do step 3, and terminal is closed?

1. open terminal
2. `sudo pkill -f mongod` will ask for password

## MongoDB CRUD operations in the shell:

Beginners guide to —> mongo (shell)

1. while in mongo shell, type `show dbs` to show all databases
2. `use [database name]` will select that database
3. `show collections` will show all arrays of documents (document is object)

### Create:

- `db.[collection name].insertOne({_id: 1, name: 'Ben'})` adds single object to db.collection

### Read:

- `db.[collection name].find()` returns all documents (objects)
- `db.[collection name].find({age: {$gt: 18}})` returns all with age greater than 18 (using jQuery)
- `db.[collection name].find({_id: 69}, {name: 1})` returns only object which id is 69. that object will contain only the name property (and id as a default)

### Update:

- `db.[collection name].updateOne({_id: 1}, {$set: {name: 'Not Ben Anymore'}})` updates the object with new property and/or value

### Delete:

- `db.[collection name].deleteOne({name: 'Sarah'})` deletes the document that contains 'Sarah' as the 'name' value

### To delete a database (why?):

1. open mongo shell (terminal)
2. `show dbs`
3. `use [database name]`
4. `db.dropDatabase()` deletes data from database
