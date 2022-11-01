"use strict";

const session = require("express-session");
const { json, response } = require("express");
const db = require("../../config/db");
const Open = require("../../models/WriteStorage");

const output = {
    board : (req, res) => {
        if(req.session.userId){
            res.render("board/page",{login:'로그아웃'});
        }else{
            res.render("board/page",{login:'로그인'});
        }
    },
    newBoard : (req, res) => {
        res.render('board/newBoard');
    },
    writeG :  (req, res) => {
        res.render('board/newBoard');
    },
    page : (req, res, next) => {
        var page = req.params.page;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write";
        db.query(sql, function (err, rows, fields) {
            if(err) console.error(err);
            else res.render('board/page.ejs', { rows : rows, page: page, length:rows.length-1, page_num:10});
        })
    },
    content : (req, res, next) => {
        var seq = req.params.seq;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write WHERE seq=?";
        console.log(seq);
        db.query(`UPDATE socket.write SET views=views+1 WHERE seq='${seq}'`);
        db.query(sql, [seq], (err, row) => {
            if(err) console.error(err);
            else res.render('board/content', {row : row[0]});
        });
        
    },
    listUpdate : (req, res) => {
        res.render('board/listUpdate');
    },
    listUpdateG : (req, res) => {
        var body = req.body;
        var sql = `SELECT * FROM socket.write WHERE seq=?`;
        var params = [body.seq, body.writer, body.title, body.content];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
            else res.render('/listUpdate', {row : row[0]});
        });
    },
    update : (req, res, next) => {
        var seq = req.params.seq;
        var body = req.body;
        var sql = `SELECT * FROM socket.write WHERE seq='${seq}'`;
        var params = [body.seq, body.writer, body.title, body.content, body.date, body.views];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
        res.render('board/update', {row : row[0]});
        });
    },
}

const process = {
    writeP : (req, res) => {
        var body = req.body;
        const id = req.session.userId;
        console.log(seq);
        var sql = `INSERT INTO socket.write VALUES(?, '${id}', ?, ?, NOW(), 0, ?)`;
        var params = [body.writer, body.title, body.content, body.passwd];
        db.query(sql, params, function(err) {
            if(err) console.error(err);
            else res.redirect('/board/page/1');
        })
    },
    listUpdateP : (req, res, next) => {
        const id = req.session.userId;

        var seq = req.body.seq;
        var title = req.body.title;
        var content = req.body.content;
        var date = req.body.date;
        var views = req.body.views;
        var passwd = req.body.passwd;
        var body = req.body;
        var writer = req.body.writer;
        var params = [body.title, body.content, body.date];
        var seq = req.body.seq;        
        var sql = `UPDATE socket.write SET seq = '${seq}', writer = '${id}',  title = ?, content = ?, date = NOW() WHERE seq = '${seq}'?`;
        db.query(sql, params, (err,result) => {
            if(err) console.error(err);
                res.redirect('/board/listUpdate');
            });
    },
}

module.exports = {
    output,
    process,
};