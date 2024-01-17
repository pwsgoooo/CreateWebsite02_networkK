var calendarBody = document.querySelector(".calendar__body__display");
var scheduleDate = document.querySelector(".schedule__date");
var selectedDate = document.querySelector('input[name="selectedDate"]'); // name으로 찾기
var today = new Date();
var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
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
var monthShortList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var monthLongList = [
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
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1);
  const dateOfToday = String(today.getDate());
  const day = String(today.getDay());
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  clock.innerText = `${year}. ${month}. ${dateOfToday}. ${dayList[day]} ${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

// Convert "Date" to "1st Jan Sun"
function formatDate(date) {
  const month = monthShortList[date.getMonth()];
  const dateOfSchedule = convertOrdinalSuffix(date.getDate());
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${dateOfSchedule} ${month} ${day}`;
}

// 1st, 2nd, 3rd 변환
function convertOrdinalSuffix(number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = number % 10;
  if (number >= 11 && number <= 13) {
    return number + "th";
  }
  return number + suffixes[remainder] || number + "th";
}

// Show schedules on the right side when you click td tag of the calendar
// 하지만 월이 바뀌면
var tdDatesList = document.querySelectorAll(".td__date"); // 노드리스트
var updateForm = document.querySelector("#update");
//var tdDatesArray = Array.from(tdDatesList); // 노드리스트를 배열로 변환하는 방법

console.log(
  "shceduleDate의 data-date : " + scheduleDate.getAttribute("data-date")
);
console.log(
  "shceduleDate의 data-date : " + scheduleDate.getAttribute("data-date")
);
for (let i = 0; i <= 41; i++) {
  // td는 42개
  if (tdDatesList[i].classList.contains("active")) {
    tdDatesList[i].classList.remove("active");
    console.log("시작");
  }
  if (
    scheduleDate.getAttribute("data-date") ===
    tdDatesList[i].getAttribute("data-date")
  ) {
    tdDatesList[i].classList.add("active");
  }
}

// 클릭 이벤트 추가
tdDatesList.forEach((item) =>
  item.addEventListener("click", (event) => clickDate(event))
);
// 클릭하면 액티브 제거 후, 액티브 추가
function clickDate(event) {
  for (let i = 0; i <= 41; i++) {
    // td는 42개
    if (tdDatesList[i].classList.contains("active")) {
      tdDatesList[i].classList.remove("active");
    }
  }
  event.target.classList.add("active");
  // format date
  scheduleDate.setAttribute(
    "data-date",
    event.target.getAttribute("data-date")
  ); // 우측사이드 날짜에 데이트 데이터를 넣어 db로 출력
  scheduleDate.innerHTML = formatDate(
    new Date(event.target.getAttribute("data-date"))
  );

  console.log("event : " + event.target);
  console.log("td event : " + event.target.tagName);
  selectedDate.value = event.target.getAttribute("data-date");
  //selectedDate.value = event.target.getAttribute("data-date").slice(8);
  updateForm.submit();
}

console.log(firstDate);
console.log(pageFirstDate.getMonth());
console.log(firstDate.getMonth() + 1); // 4 달은 +1 해줘야함
console.log(firstDate.getDay()); // 일요일: 0 ~ 토요일: 6 0부터 6을 반환
console.log(daysInYear[firstDate.getMonth()]); // 오늘 날짜의 달을 얻어서 그 달의 일 수를 반환
console.log(firstDate.getFullYear()); // 2023
console.log(today);
