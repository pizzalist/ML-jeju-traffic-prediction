


var time = 0;
var starFlag = true;
$(document).ready(function(){
    buttonEvt();
});

function init(){
document.getElementById("time").innerHTML = "00:00:00";
}

function buttonEvt(){
var hour = 0;
var min = 0;
var sec = 0;
var timer;

  // start btn
$("#startbtn").click(function(){

    if(starFlag){
    starFlag = false;
    if(time == 0){
        init();
    }

    timer = setInterval(function(){
        time++;

        min = Math.floor(time/60);
        hour = Math.floor(min/60);
        sec = time%60;
        min = min%60;

        var th = hour;
        var tm = min;
        var ts = sec;
        if(th<10){
        th = "0" + hour;
        }
        if(tm < 10){
        tm = "0" + min;
        }
        if(ts < 10){
        ts = "0" + sec;
        }

        document.getElementById("time").innerHTML = th + ":" + tm + ":" + ts;
    }, 1000);
    }
});

  // pause btn
$("#pausebtn").click(function(){
    if(time != 0){
    clearInterval(timer);
    starFlag = true;
    }
});

  // stop btn
$("#stopbtn").click(function(){
    if(time != 0){
    clearInterval(timer);
    starFlag = true;
    time = 0;
    init();
    }
    });
}


function putValue() {
document.querySelector(".millisecond").innerText = ms;
document.querySelector(".second").innerText = sec;
document.querySelector(".minute").innerText = min;
document.querySelector(".hour2").innerText = h;
}
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');

setInterval (()=> {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
})

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#todo')
    const addButton = document.querySelector('#add-button')
    const todoList = document.querySelector('#todo-list')
    const alert = document.querySelector('span')

      // '+' 버튼 익명 화살표 함수 
    const addTodo = () => {
        if (input.value !== '') {
            const item = document.createElement('div')
          // 체크박스
            const checkbox = document.createElement('input')
            checkbox.type='checkbox'
          // text
            const text = document.createElement('span');
          // 제거하기 버튼
            const deleteButton = document.createElement('button')
            deleteButton.textContent="💣"

            text.textContent = input.value
            input.value=''
        
            item.appendChild(checkbox)
            item.appendChild(text)
            item.appendChild(deleteButton)
            todoList.appendChild(item)

          // 제거하기 버튼 클릭 이벤트 리스너
            deleteButton.addEventListener('click', (event) => {
                todoList.removeChild(event.currentTarget.parentNode)
            })
            input.value =''
            alert.textContent = ''
        }
        else
            alert.textContent = '할 일을 입력하세요!'
    }

    addButton.addEventListener('click', addTodo)

      // 할 일 입력창에서 enter key가 눌렸을 때
    input.addEventListener('keypress', (event) => {
        const ENTER = 13
        if (event.keyCode === ENTER)
            addTodo();
    })
})

