const mysql=require("mysql");


//async database constructor
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
//https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
//constructor creates a new mysql connection with this configuration
    query(sql, args) {
        return new Promise ((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    console.log(error.sql)
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    close () {
        return new Promise((resolve, reject) => {
            this.connection.end(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve();
                }
            })
        })
    }
};

module.exports = Database;
