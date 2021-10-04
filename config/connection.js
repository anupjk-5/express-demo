require('dotenv').config();
const mysql = require('mysql');

class DatabaseConnection {
    constructor() {
        this.connection = undefined;
        this.config = {};
    }

    setConfig() {
        this.config.host = process.env.HOST;
        this.config.user = process.env.USER;
        this.config.password = process.env.PASSWORD;
        this.config.database =  process.env.DATABASE;
    }

    createConn() {
        this.setConfig();
        this.connection = mysql.createConnection(this.config);
    }

    getConn() {
        if (this.connection === undefined || this.connection === null) {
            this.createConn();
        }

        return this.connection;
    }

    endConn() {
        if (this.connection) {
            this.connection.end(() => {
                console.log('db connection has ended');
            });
            this.connection = null;
        }
    }

    getConfig() {
        return this.config;
    }
}


const DbInstance = new DatabaseConnection();
module.exports = DbInstance;