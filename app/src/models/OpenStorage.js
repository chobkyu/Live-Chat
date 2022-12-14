"use strict";

const db = require("../config/db");

class OpenStorage{

    static async newOpen(chatInfo){
        console.log(chatInfo.detail+"asdfa");
        return new Promise((resolve, reject)=>{
            const query = "insert into openchat(openName,openCategory,openDetail) values(?,?,?);";
            db.query(query,[chatInfo.name,chatInfo.category,chatInfo.detail],(err)=>{
                if(err) reject('${err}');
                resolve({success:true});
            });
        
        });
    }

    static async openChatAll(){
        return new Promise((resolve,reject)=>{
            const query = "select * from openchat;";
            db.query(query,(err,rows)=>{
                if(err){reject('${err}')};
                resolve(rows);
            })
        })
    }

    static async selectOpen(key){
        return new Promise((resolve, reject)=>{
            const query = "select * from openchat where openName = ?;";
            db.query(query,[key],(err,rows)=>{
                if(err){reject('${err}')};
                resolve(rows);
            })
        })
    }

    static async deleteOpen(seq){
        return new Promise((resolve, reject) => {
            const query = "delete from openchat where seq = ?;";
            db.query(query,[seq],(err)=>{
                if(err) reject('${err}');
                resolve({success:true});
            })
        })
    }
}

module.exports = OpenStorage;