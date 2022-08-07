"use strict";
// 프론트 html 과 연결되어 있는 자바 스크립트 파일
const id = document.querySelector("#id"),
    password= document.querySelector("#password"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);
function login(){
    const req = {
        id : id.value,
        password : password.value
    };
// 프론트
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href=  "/" ;
        } else {
            alert(res.msg);
        }
    })
    .catch((err) =>{
        console.error(new Error("회원가입 중 에러 발생"));
    });
}