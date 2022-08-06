"use strict";
const { rejects } = require('assert');
const { resolve } = require('path');
const db = require("../confilg/db");


class UserStorage {
    static #getUserInfo(data, id) {
        
                const users = JSON.parse(data);
                const idx = users.id.indexOf(id);
                const userKeys = Object.keys(users);
                const userInfo = userKeys.reduce((newUser,info)=> {
                    newUser[info] = users[info][idx];
                    return newUser;
                }, {});
                return userInfo;
    }
    static #getUsers(data,isAll, fields) {
        const users = JSON.parse(data);
        if(isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
    

    static getUserInfo(id) {
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query,[id], (err, data) =>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        
        });
    }

    

    static async save(userInfo) {
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(id, name, password,lab) VALUES(?,?,?,?);";
            db.query(
                query,
                [userInfo.id, userInfo.name, userInfo.password, userInfo.lab], 
                (err) =>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        
        });
    }
}
module.exports = UserStorage;