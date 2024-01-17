var calenderDate = document.querySelector(".calendar__head__date");
var calendarBody = document.querySelector(".calendar__body__display");
var today = new Date();
var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
var selectedDate = today;
var dayList = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
var monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// 윤년은 1년이 366일 (윤년은 2월에 1일이 더 많음)
// leapYear: 윤년인 연도의 1월부터 12월까지의 일 수
// notLeapYear: 평년인 연도의 1월부터 12월까지의 일 수
var leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var pageFirstDate = firstDate;
var daysInYear; // 윤년인지 아닌지 leapYear 또는 notLeapYear를 담는다.
var pageYear; // 현재 달력에 표시되는 연도
var pageMonth; // 현재 달력에 표시되는 월

var scheduleDate = document.querySelector(".schedule__date");

const clock = document.querySelector(".header__clock");

const moveYear = document.querySelector("#yearTest");
const moveMonth = document.querySelector("#monthTest");

/* 날짜 YYYYMMDD 포맷으로 반환
function getFormatDate(date){
  var year = date.getFullYear();              // yyyy
  var month = (1 + date.getMonth());          // m
  month = month >= 10 ? month : '0' + month;  // mm 두자리로 저장
  var date = date.getDate();                   // d
  date = date >= 10 ? date : '0' + date;         // dd 두자리로 저장
  return  year + '' + month + '' + date;       
}
*/

// 4로 나누어 떨어지는 해는 윤년, 그 밖의 해는 평년
if (firstDate.getFullYear() % 4 === 0) {
  daysInYear = leapYear;
} else {
  daysInYear = notLeapYear;
}

// 웹페이지 가장 맨 위에 나오는 시계
function getClock() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const dateNum = String(date.getDate());
  const day = String(date.getDay());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${year}. ${month}. ${dateNum}. ${dayList[day]} ${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);

// 왼쪽 탭에 요일과 일을 보여주는 함수
function showSchedule() {
  console.log("현재 표시되는 연도: " + selectedDate.getFullYear());
  console.log("현재 표시되는 월: " + (selectedDate.getMonth() + 1));
  console.log("현재 표시되는 일: " + selectedDate.getDate());
  console.log("현재 표시되는 요일: " + dayList[selectedDate.getDay()]);
  scheduleDate.innerText = `${selectedDate.getFullYear()}. ${
    selectedDate.getMonth() + 1
  }. ${selectedDate.getDate()}. ${dayList[selectedDate.getDay()]}`;
}
showSchedule();

// 달력 표시 함수 (firstDate를 이용하여 표시)
function showCalendar() {
  let horizontalCnt = 1; // 일을 표시하는 행의 번호
  let date = 1; // 1 ~ 31일

  for (var i = 0; i < 6; i++) {
    // 일을 표시하기 위해 6행
    var tr = document.createElement("tr");
    tr.setAttribute("id", "tr" + horizontalCnt);
    for (var j = 0; j < 7; j++) {
      // 일요일부터 월요일까지 7열
      // 일을 표시하는 첫째 행에서 첫번째 날보다 적을 때 또는
      // 오늘 일자의 달을 얻어 그 달의 일 수를 반환하여 date보다 크면
      // 그 칸에는 일자를 넣지 않는다. 아닌 경우 칸에 일자를 넣는다.
      if (
        (i === 0 && j < firstDate.getDay()) ||
        date > daysInYear[firstDate.getMonth()]
      ) {
        var td = document.createElement("td");
        tr.appendChild(td);
      } else {
        var td = document.createElement("td");
        td.textContent = date;
        td.setAttribute("id", date);
        tr.appendChild(td);

        var input = document.createElement("input");

        var attYear = firstDate.getFullYear();
        var attMonth = firstDate.getMonth() + 1;
        attMonth = attMonth >= 10 ? attMonth : "0" + attMonth; // mm 두자리로 저장
        var attDate = td.id;
        attDate = attDate >= 10 ? attDate : "0" + attDate; // dd 두자리로 저장

        input.setAttribute("id", attYear + attMonth + attDate);
        input.setAttribute("name", "date");
        input.setAttribute("value", attYear + attMonth + attDate);
        input.setAttribute("type", "submit");
        td.appendChild(input);
        date++;
      }
    }
    horizontalCnt++;
    calendarBody.appendChild(tr);
  }
}
// 달력 표시
showCalendar();

// 달력 제거 함수
// 달력의 일자가 있는 1행부터 6행까지 tr을 제거
// 행의 변수는 tr1, tr2, tr3...
function removeCalendar() {
  let catchTr = 1;
  for (var i = 1; i <= 6; i++) {
    var tr = document.getElementById("tr" + catchTr);
    tr.remove();
    catchTr++;
  }
}

// 옵션 선택하여 달력 변경 (현재 선택된 옵션 보여주기)
// console.log("연도 " + moveYear.options[moveYear.selectedIndex].value);
// console.log("월 " + moveMonth.options[moveMonth.selectedIndex].value);

// 원하는 날짜로 이동하는 함수
function moveDate() {
  console.log("특정 날짜로 이동");
  var moveYearValue = moveYear.options[moveYear.selectedIndex].value;
  var moveMonthValue = moveMonth.options[moveMonth.selectedIndex].value;
  if (!moveYearValue || !moveMonthValue) return;
  console.log("현재 표시된 연도는 : " + moveYearValue);
  console.log("현재 표시된 월은 : " + moveMonthValue + moveMonth.selectedIndex);

  // 달력 제목의 날짜 변경
  calenderDate.innerHTML =
    moveMonthValue + "&nbsp;&nbsp;&nbsp;" + moveYearValue;

  // todo 박스 초기화
  todoInputBox.value = "";
  const divs = document.querySelectorAll("#todo__input__list > div");
  divs.forEach(function (e) {
    e.remove();
  });
  const btns = document.querySelectorAll("#todo__input__list > button");
  btns.forEach(function (e) {
    e.remove();
  });

  // 오늘 날짜의 연도가 윤년인지 확인한다.
  pageFirstDate = new Date(moveYearValue, moveMonth.selectedIndex - 1, 1);

  if (today.getFullYear() % 4 === 0) {
    daysInYear = leapYear;
  } else {
    daysInYear = notLeapYear;
  }
  firstDate = pageFirstDate;
  console.log("pageFirstDate: " + pageFirstDate);
  console.log("firstDate: " + firstDate);
  removeCalendar();
  showCalendar();
  showMain();
  //clickedDate1 = document.getElementById(today.getDate());
  //clickedDate1.classList.add("active");
  clickStart();
  //reshowingList();
}

// Today 버튼을 클릭 시, 오늘 날짜로 이동하는 함수
function moveToday() {
  console.log("오늘 날짜로 이동");

  // 우측 달력 제목의 날짜 변경
  calenderDate.innerHTML =
    monthList[today.getMonth()] + "&nbsp;&nbsp;&nbsp;" + today.getFullYear();

  // todo 박스 초기화
  todoInputBox.value = "";
  const divs = document.querySelectorAll("#todo__input__list > div");
  divs.forEach(function (e) {
    e.remove();
  });
  const btns = document.querySelectorAll("#todo__input__list > button");
  btns.forEach(function (e) {
    e.remove();
  });

  // 오늘 날짜의 연도가 윤년인지 확인한다.
  pageFirstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  if (today.getFullYear() % 4 === 0) {
    daysInYear = leapYear;
  } else {
    daysInYear = notLeapYear;
  }
  firstDate = pageFirstDate;

  removeCalendar();
  showCalendar();
  showMain();
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add("active");
  clickStart();
  //reshowingList();
}

// 이전 달로 이동하는 함수
function prev() {
  todoInputBox.value = "";
  const divs = document.querySelectorAll("#todo__input__list > div");
  divs.forEach(function (e) {
    e.remove();
  });
  const btns = document.querySelectorAll("#todo__input__list > button");
  btns.forEach(function (e) {
    e.remove();
  });

  if (pageFirstDate.getMonth() === 0) {
    // 현재 달력이 1월인 경우, 연도를 -1 해줘야 한다. 월은 12월로 해준다.
    pageFirstDate = new Date(firstDate.getFullYear() - 1, 11, 1);
    if (firstDate.getFullYear() % 4 === 0) {
      // 저번 연도로 갈 때, 윤년인지 확인
      daysInYear = leapYear;
    } else {
      daysInYear = notLeapYear;
    }
  } else {
    // 현재 달력이 1월이 아닌 경우
    pageFirstDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() - 1,
      1
    );
  }
  firstDate = pageFirstDate;

  calenderDate.innerHTML =
    monthList[firstDate.getMonth()] +
    "&nbsp;&nbsp;&nbsp;" +
    firstDate.getFullYear();

  removeCalendar();
  showCalendar();
  showMain();
  //clickedDate1 = document.getElementById(today.getDate());
  //clickedDate1.classList.add("active");
  clickStart();
  //reshowingList();
}

// 다음 달로 이동하는 함수
function next() {
  todoInputBox.value = "";
  const divs = document.querySelectorAll("#todo__input__list > div");
  divs.forEach(function (e) {
    e.remove();
  });
  const btns = document.querySelectorAll("#todo__input__list > button");
  btns.forEach(function (e) {
    e.remove();
  });
  if (pageFirstDate.getMonth() === 11) {
    pageFirstDate = new Date(firstDate.getFullYear() + 1, 0, 1);

    if (firstDate.getFullYear() % 4 === 0) {
      daysInYear = leapYear;
    } else {
      daysInYear = notLeapYear;
    }
  } else {
    pageFirstDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      1
    );
  }
  firstDate = pageFirstDate;

  calenderDate.innerHTML =
    monthList[firstDate.getMonth()] +
    "&nbsp;&nbsp;&nbsp;" +
    firstDate.getFullYear();

  removeCalendar();
  showCalendar();
  showMain();
  //clickedDate1 = document.getElementById(today.getDate());
  //clickedDate1.classList.add("active");
  clickStart();
  //reshowingList();
}

// 우측 탭에 '월 연도'를 보여줌.
calenderDate.innerHTML =
  monthList[firstDate.getMonth()] +
  "&nbsp;&nbsp;&nbsp;" +
  firstDate.getFullYear();

// 처음으로 달력을 보여줄 때, 선택된 날은 오늘이다.
var selectedDateObj = document.getElementById(today.getDate());
selectedDateObj.classList.add("active");

const todayBtn = document.querySelector(".calendar__head__move__today");
const prevBtn = document.querySelector(".calendar__head__move__prev");
const nextBtn = document.querySelector(".calendar__head__move__next");
todayBtn.addEventListener("click", moveToday);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

var tdGroup = [];

// 일마다 클릭이 가능하도록 이벤트를 추가
function clickStart() {
  for (let i = 1; i <= daysInYear[firstDate.getMonth()]; i++) {
    tdGroup[i] = document.getElementById(i);
    tdGroup[i].addEventListener("click", changeSelectedDate);

    tdGroup[i].classList.add("test"); // 테스트로 레드로바꿔보자.
  }
}

// 달력 안 날짜 클릭 시, 클릭된 날짜를 설정
function changeSelectedDate(e) {
  console.log("clicked");
  for (let i = 1; i <= daysInYear[firstDate.getMonth()]; i++) {
    if (tdGroup[i].classList.contains("active")) {
      tdGroup[i].classList.remove("active");
    }
  }
  selectedDateObj = e.currentTarget;
  selectedDateObj.classList.add("active");

  selectedDate = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    selectedDateObj.id
  );

  // showMain();

  // 날짜 8자리 형식으로 포맷 (YYYYMMDD)
  keyValue =
    selectedDate.getFullYear() +
    ("0" + (selectedDate.getMonth() + 1)).slice(-2) +
    ("0" + selectedDate.getDate()).slice(-2);
  //console.log("현재 키값 : " + keyValue);
  //reshowingList();
  console.log(keyValue);

  document.getElementById("update").submit();
}

clickStart();

function reshowingList() {
  // 이미 위에서 날짜를 바꿀 때 키밸류를 바꾸는데 또 바꿀 필요가?
  //keyValue = today.getFullYear() + "" + today.getMonth() + "" + today.getDate();
  if (todoList[keyValue] === undefined) {
    todoInputList.textContent = "";
    todoList[keyValue] = [];
    const divs = document.querySelectorAll("#todo__input__list > div");
    divs.forEach(function (e) {
      e.remove();
    });
    const btns = document.querySelectorAll("#todo__input__list > button");
    btns.forEach(function (e1) {
      e1.remove();
    });
  } else if (todoList[keyValue].length === 0) {
    todoInputList.textContent = "";
    const divs = document.querySelectorAll("#todo__input__list > div");
    divs.forEach(function (e) {
      e.remove();
    });
    const btns = document.querySelectorAll("#todo__input__list > button");
    btns.forEach(function (e1) {
      e1.remove();
    });
  } else {
    const divs = document.querySelectorAll("#todo__input__list > div");
    divs.forEach(function (e) {
      e.remove();
    });
    const btns = document.querySelectorAll("#todo__input__list > button");
    btns.forEach(function (e1) {
      e1.remove();
    });
    var div = document.createElement("div");
    for (var i = 0; i < todoList[keyValue].length; i++) {
      var div = document.createElement("div");
      div.textContent = "-" + todoList[keyValue][i];
      var btn = document.createElement("button");
      btn.setAttribute("type", "button");
      //btn.setAttribute("id", "del__data"); 아래 줄과 중복인데?
      btn.setAttribute("id", dataCnt + keyValue);
      btn.setAttribute("class", "del__data");
      btn.textContent = delText;
      todoInputList.appendChild(div);
      todoInputList.appendChild(btn);
      div.addEventListener("click", checkList);
      btn.addEventListener("click", deleteTodo);
      todoInputBox.value = "";
      function deleteTodo() {
        div.remove();
        btn.remove();
      }
    }
  }
}

var todoList2 = document.querySelector("#todo__input__list");
showTodoList();
function showTodoList() {}

// todo
var todoInputBox = document.getElementById("todo__input__box");
var inputDate = document.getElementById("input__data"); // 입력 버튼
var todoInputList = document.getElementById("todo__input__list");
var delText = "X";
//inputDate.addEventListener("click", addTodoList);
var keyValue =
  today.getFullYear() + "" + today.getMonth() + "" + today.getDate();
let todoList = [];
todoList[keyValue] = [];

function addTodoList() {
  //아래 코드가 있다면 submit 이 작동하지 않는다.
  // var div = document.createElement("div");
  // div.textContent = "-" + todoInputBox.value;
  // var btn = document.createElement("button");
  // btn.setAttribute("type", "button");
  // btn.setAttribute("class", "del__data");
  // btn.textContent = delText;
  // todoInputList.appendChild(div);
  // todoInputList.appendChild(btn);
  // todoList[keyValue].push(todoInputBox.value);
  // console.log(todoList);
  // // index : todoList 안의 todo 순서 번호
  // var index =
  //   (Array.prototype.indexOf.call(todoInputList.children, btn) + 1) / 2;
  // btn.setAttribute("id", keyValue + index);
  // todoInputBox.value = "";
  // div.addEventListener("click", checkList);
  // btn.addEventListener("click", deleteTodo);
  // function deleteTodo() {
  //   div.remove();
  //   btn.remove();
  // }
}

function arrangeIndex() {}

function checkList(e) {
  e.currentTarget.classList.add("checked");
}

console.log(firstDate);
console.log(pageFirstDate.getMonth());
console.log(firstDate.getMonth() + 1); // 4 달은 +1 해줘야함
console.log(firstDate.getDay()); // 일요일: 0 ~ 토요일: 6 0부터 6을 반환
console.log(daysInYear[firstDate.getMonth()]); // 오늘 날짜의 달을 얻어서 그 달의 일 수를 반환
console.log(firstDate.getFullYear()); // 2023
console.log(today);
