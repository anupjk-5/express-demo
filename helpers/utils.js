const database = require('../config/connection');
const { v4: uuid } = require('uuid');

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        const connection = database.getConn();

        connection.query(query, params, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results, fields);
            }
        });
    });
}

exports.executeQuery = executeQuery;

const getId = () => uuid().substr(0, 8);

exports.getId = getId;