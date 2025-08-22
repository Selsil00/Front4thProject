const year = document.querySelector('.year');
const month = document.querySelector('.month');
const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const clockContainer = document.querySelector('.clock');

const batteryDiv = document.querySelector('.battery');
let battery = 100;

const selHour = document.getElementById("selHour");
const selMin  = document.getElementById("selMin");
const selSec  = document.getElementById("selSec");

const listHour = document.getElementById("listHour");
const listMin  = document.getElementById("listMin");
const listSec  = document.getElementById("listSec");

const btnHour = document.getElementById("btnHour");
const btnMin  = document.getElementById("btnMin");
const btnSec  = document.getElementById("btnSec");

const btnAdd  = document.getElementById("btnAddAlarm");
const alarmList = document.getElementById("alarmList");

let use12Hour = false; // 기본은 24시간제
const toggleBtn = document.getElementById("toggleFormat");

let alarms = [];
const zz = n => n.toString().padStart(2, "0");

function clock(){

    const now = new Date();

    year.innerText  = now.getFullYear();
    month.innerText = now.getMonth() + 1;
    day.innerText   = now.getDate();

    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    if (use12Hour) {
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12;
        if (h === 0) h = 12;          // 0시는 12시로
        hour.innerText = zz(h);       // 시: 숫자만
        min.innerText  = zz(m);
        sec.innerText  = zz(s) + " " + ampm; // 초 뒤에 AM/PM
    } else {
        hour.innerText = zz(h);
        min.innerText  = zz(m);
        sec.innerText  = zz(s);       
    }
        // clockDiv.innerText = `${year}-${month}-${day} ${hour}:${min}:${sec}`; 참고사항 나중에 한 줄로 표현하려고 하면 이렇게 표현 가능
    };

function updateBattery() {
    if (battery > 0) {
        battery -= 1;
        batteryDiv.innerText = "배터리: " + battery + "%";
    } else {
        batteryDiv.innerText = " 0% (방전)";
        clockContainer.style.backgroundColor = "black";
        clockContainer.style.color = "black";
    }
}

function fillList(ul, max, targetSpan) {
  ul.innerHTML = "";
  for (let i = 0; i <= max; i++) {
    const li = document.createElement("li");
    li.textContent = zz(i);
    li.addEventListener("click", () => {
      targetSpan.textContent = zz(i);
      ul.classList.remove("show"); // 선택 후 닫기
    });
    ul.appendChild(li);
  }
}
fillList(listHour, 23, selHour);
fillList(listMin, 59, selMin);
fillList(listSec, 59, selSec);

// 버튼 토글
btnHour.addEventListener("click", () => listHour.classList.toggle("show"));
btnMin .addEventListener("click", () => listMin.classList.toggle("show"));
btnSec .addEventListener("click", () => listSec.classList.toggle("show"));

// 알람 추가

btnAdd.addEventListener("click", () => {
  const h = parseInt(selHour.textContent);
  const m = parseInt(selMin.textContent);
  const s = parseInt(selSec.textContent);

  if (alarms.length >= 3) {
    alert("알람은 최대 3개까지만 가능합니다.");
    return;
  }

  alarms.push({h,m,s});
  
});



setInterval(clock, 1000); //setInterval 함수로 매번 불러오기, 1000 =  1초

setInterval(updateBattery, 1000);




toggleBtn.addEventListener("click", () => {
  use12Hour = !use12Hour;
});