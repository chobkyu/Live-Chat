"use strict";

const { json } = require("express");
const Open = require("../../models/Open");
const output = {
    chat : async (req,res) => {  //오픈 채팅 목록 페이지
        if(!req.session.userId){
            res.send(`
                <script>
                    alert("로그인 페이지로 이동합니다");
                    location.href="/login";
                </script>            
            `);
        }
        const option = req.query.option;
        if(option===undefined){
            const open = new Open();
            const rows = await open.OpenAll();
            res.render("chat/openChat",{rows:rows});
        }
        else if(option==='search'){
            const key = req.query.key;
            console.log(key);
            const open = new Open();
            const rows = await open.selectOpen(key);
            res.render("chat/openChat",{rows:rows});
        }
        
    },
    random : (req,res) => {
        if(!req.session.userId){
            res.send(`
                <script>
                    alert("로그인 페이지로 이동합니다");
                    location.href="/login";
                </script>            
            `);
        }else{
            res.render('chat/random');
        }
        
    },
    open : (req,res) => {
        
        res.render("chat/newOpen");
    },

    openRoom : (req,res) => {
        console.log(req.query.seq);
        var data = req.query.seq;
        var userId = req.session.userId;
        res.render("chat/openRoom",{userId});
    },
    //----------------일대일 채팅-----------------//
    oneChat : (req, res) => {
        var arr = [1,2,3,4,5];
        console.log(arr);

        var sec = 2;
        var num=0;
        for(var i=0;i<arr.length;i++){
            if(sec===arr[i]){
                num = i;
            }
        }
        arr.splice(num, 1);


        console.log(arr);
        res.render("chat/oneChat");
    }
}

const process = {
    open : async (req,res) => {
        console.log(req.body);
        const open = new Open(req.body);
        const response = await open.Open();
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
}