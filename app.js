// 1. NodeJS 설치, mysql 설치, express 설치, ejs 설치, body-parser 설치
// 2. planetscale 가입 및 데이터베이스 생성, dotenv 설칭
// 서버를 띄우기 위한 기본 세팅 (express 라이브러리)
const express = require("express"); // Load express
const ejs = require("ejs");
const app = express(); // express 활성화
const port = 8080;
var bodyParser = require("body-parser");
var session = require("express-session");

require("dotenv").config(); // planetscale에서 정보를 확인하고, mysql2 설치 후 환경변수 설정

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

// Middleware setup

// 1. bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up EJS as the view engine
// views 파일들을 현재 폴더 밑에 있는 views라는 폴더안에 있는 것을 사용하겠다는 뜻
app.set("views", __dirname + "/views");
app.set("view engine", "ejs"); //view engine 으로 ejs를 사용한다.

// 정적 파일들 public 폴더에 넣어서 보여주기 (html, css, js, image 등)
app.use(express.static(__dirname + "/public"));
// Serve React static files
// app.use(express.static(__dirname + "/client/build"));

// 2. Session (npm install express-session)
app.use(
  session({
    secret: "jaehyo",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

// 3. res.locals
app.use((req, res, next) => {
  res.locals.user_id = "";
  res.locals.user_name = "";
  if (req.session.member) {
    res.locals.user_id = req.session.member.user_id;
    res.locals.user_name = req.session.member.user_name;
  }
  next();
});

// // 라우팅
// app.get("/", function (req, res) {
//   var date = null;
//   if (!req.query.date) {
//     date = "20230706";
//   } else {
//     date = req.query.date;
//   }

//   var sql = `select * from todo where date = ${date}`;
//   connection.query(sql, function (err, results, field) {
//     if (err) throw err;
//     console.log(results); // cmd 또는 터미널에 출력
//     res.render("calendar", { lists: results });
//   });
//   console.log("현재 표시되는 일정 날짜는 : " + date);
// });

app.post("/todo", function (req, res) {
  const date = req.body.date;
  const content = req.body.content;
  var sql = `insert into todo(date, content) values('${date}', '${content}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(
      "<script>alert('일정을 등록하였습니다.'); location.href='/'</script>"
    );
    console.log("데이터 1개를 삽입하였습니다.");
  });
});

app.get("/todoList", (req, res) => {
  var sql = `select * from todo`;
  connection.query(sql, function (err, results, field) {
    if (err) throw err;
    // console.log(results); // cmd 또는 터미널에 출력
    res.render("todoList", { lists: results });
  });
});

app.post("/delete", function (req, res) {
  var idx = req.body.idx;
  var date = req.body.date;
  var sql = `delete from todo where idx='${idx}'`;

  connection.query(sql, function (err) {
    if (err) throw err;
    res.send(
      `"<script>alert('${idx}번 ${date}일정을 삭제하였습니다.'); location.href='/'</script>"`
    );
  });
});

// 3000 포트에 서버 띄우기
// listen(서버 띄울 포트 번호, 띄운 후 실행할 코드)
app.listen(8080, () =>
  console.log(`listening on 8080. Address : http://localhost:${port}`)
);

/////////////////////////////////////////////////////////////////////////

// 경로에 / 만 입력하면 홈 경로
// app.get("/", function (요청, 응답) {
//   //응답.send("홈 입니다.");
//   응답.sendFile(__dirname + "./views/calendar.ejs");
// });

// 코드 수정 후 서버를 재실행(터미널에서 node server.js 타이핑)
// 하기 귀찮으므로 자동화 시키자.
// 터미널에서 npm install -g nodemon 입력 (-g의 의미는 모든 폴더에서 nodemon을 이용가능)
// 서버 실행 : nodemon server.js
// 윈도우 10은 보안오류가 뜬다.
// 1. 관리자권한으로 PowerShell 실행
// 2. PowerShell 에서 executionpolicy 입력 -> Restricted 라고 나온다.
// 3. set-executionpolicy unrestricted 입력 -> 예 or 아니오 라고 나온다.
// 4. y 입력
// 다시 터미널에서 nodemon server.js 입력
// 이제 코드를 수정하고 저장하면 다시 서버를 자동으로 재실행 시킨다.

// https://askforyou.tistory.com/6

// 에러 : Can't set headers after they are sent.
// 이유 : send와 같이 응답을 여러 개를 보내면 에러가 나온다.
// 참조 : https://velog.io/@soshin_dev/ERRHTTPHEADERSSENT-Cannot-set-headers-after-they-are-sent-to-the-client-%EC%98%A4%EB%A5%98#:~:text=%EC%98%A4%EB%A5%98%20%5BERR_HTTP_HEADERS_SENT%5D%20%EB%8A%94%20%EC%84%9C%EB%B2%84%EA%B0%80,%ED%95%A0%20%EB%95%8C%20%EC%83%9D%EA%B8%B0%EB%8A%94%20%EC%98%A4%EB%A5%98%20%EC%9E%85%EB%8B%88%EB%8B%A4.

//velog.io/@0xjuchan/Node.js-DB%EC%97%90-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B3%A0-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0

// test_app.post("/send_data", function (req, res) {
//   var resData = {};
//   var id = req.body.id;
//   var content = req.body.content;
//   var select_query = conn.query(
//     "select ID, CONTENT from calendar",
//     function (err, rows) {
//       if (err) throw err;
//       if (rows[0]) {
//         resData.id = rows[0].id;
//         resData.content = rosw[0].content;
//       } else {
//         resData.id = 0;
//         resData.content = "nothing";
//       }
//       res.join(resData);
//     }
//   );
// });

//////////////////////////////////////////////////////////////////////

// Define a route that renders the EJS template
// Default route to display the current month's calendar
app.get("/testCalendar", (req, res) => {
  // Set Today
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthAbbreviation = getMonthAbbreviation(currentMonth);
  const currentYear = currentDate.getFullYear();
  console.log("현재 날짜 : " + currentDate);
  // Make a calendar
  const calendarData = generateCalendarData(currentYear, currentMonth);

  const offset = 1000 * 60 * 60 * 9;
  const tempDate = new Date(new Date(currentDate).getTime() + offset);
  const selectedDate = tempDate.toISOString().slice(0, 10);
  const selectedFormattedDate = formatDate(new Date(tempDate));

  console.log("선택된 날짜 : " + selectedDate);
  var sql = `select * from schedule`;
  connection.query(sql, function (err, results, field) {
    if (err) throw err;
    //console.log(results); // cmd 또는 터미널에 출력
    res.render("testCalendar", {
      lists: results,
      calendarData,
      currentYear,
      currentMonth,
      currentMonthAbbreviation,
      selectedDate,
      selectedFormattedDate,
    });
  });
});

// Route to display the calendar for a specific month
app.get("/testCalendar/:year-:month/:date", (req, res) => {
  const { year, month, date } = req.params;
  const currentYear = year;
  const currentMonth = Number(month);
  const currentMonthAbbreviation = getMonthAbbreviation(currentMonth);

  const offset = 1000 * 60 * 60 * 9;
  const tempDate = new Date(new Date(date).getTime() + offset);
  const selectedDate = tempDate.toISOString().slice(0, 10);
  const selectedFormattedDate = formatDate(new Date(tempDate));

  const calendarData = generateCalendarData(currentYear, currentMonth);
  var sql = `select * from schedule`;
  connection.query(sql, function (err, results, field) {
    if (err) throw err;
    //console.log(results); // cmd 또는 터미널에 출력
    res.render("testCalendar", {
      lists: results,
      calendarData,
      currentYear,
      currentMonth,
      currentMonthAbbreviation,
      selectedDate,
      selectedFormattedDate,
    });
  });
  //console.log(selectedDate);
});

// Route to handle moving to the previous month
app.post("/testCalendar/prevMonth", (req, res) => {
  const { currentYear, currentMonth } = req.body;
  var prevMonth =
    parseInt(currentMonth) === 1 ? 12 : parseInt(currentMonth) - 1;
  if (prevMonth < 10) {
    prevMonth = 0 + prevMonth.toString();
  }
  const prevYear =
    parseInt(currentMonth) === 1 ? parseInt(currentYear) - 1 : currentYear;
  res.redirect(
    `/testCalendar/${prevYear}-${prevMonth}/${prevYear}-${prevMonth}-01`
  );
});

// Route to handle moving to the next month
app.post("/testCalendar/nextMonth", (req, res) => {
  const { currentYear, currentMonth } = req.body;
  var nextMonth =
    parseInt(currentMonth) === 12 ? 1 : parseInt(currentMonth) + 1;
  if (nextMonth < 10) {
    nextMonth = 0 + nextMonth.toString();
  }
  const nextYear =
    parseInt(currentMonth) === 12 ? parseInt(currentYear) + 1 : currentYear;
  res.redirect(
    `/testCalendar/${nextYear}-${nextMonth}/${nextYear}-${nextMonth}-01`
  );
});

// Route to handle moving to the select date
app.get("/testCalendar/selectDate", (req, res) => {
  const { currentYear, currentMonth, selectedDate } = req.query;
  //var showMonth = selectedDate.slice(5, 7);
  //var showDate = selectedDate.slice(8);
  //console.log(showMonth, showDate);

  //res.send(`/${currentYear}/${currentMonth}/${selectedDate}`);
  res.redirect(`/testCalendar/${currentYear}-${currentMonth}/${selectedDate}`);
});

// Function to generate calendar data (You can replace this with data fetched from your database)
function generateCalendarData(year, month) {
  const firstDay = new Date(year, month - 1, 1); // month는 실제 월이므로 자바스크립트 객체를 쓸 때는 -1을 해준다.
  // console.log("firstDay : " + firstDay);
  var startDate = new Date(firstDay); // 달력의 첫번째 날 (1일이 아닌 달력의 1행1열에 있는 일)
  // console.log("startDate : " + new Date(firstDay));
  startDate.setDate(startDate.getDate() - startDate.getDay()); // 1일에서 화요일인 2를 빼면 -1이다.
  // console.log("startDate.getDate() : " + startDate.getDate()); // 31에서 1을 빼서 30이 되는듯.
  // console.log("startDate.getDay() : " + startDate.getDay()); // 요일
  // console.log("set후에 startDate : " + startDate);

  const calendarData = [];

  const offset = 1000 * 60 * 60 * 9; // toISOString 사용 시, 영국보다 9시간이 빨라 차이가 생김.
  startDate = new Date(startDate.getTime() + offset);

  for (let row = 0; row < 6; row++) {
    const weekData = [];
    for (let col = 0; col < 7; col++) {
      weekData.push({
        date: startDate.getDate(),
        dateString: startDate.toISOString().slice(0, 10), // Store the date as a data attribute for further use
        // date는 실제 일과 일치, dateString은 실제 일보다 1이 작다.? 말이 안됨.
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        // T전까지 추출함. 0000-00-00
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    calendarData.push(weekData);
  }
  return calendarData;
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/loginProc", (req, res) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;

  var sql = `select * from member where user_id=? and user_pw=?`;
  var values = [user_id, user_pw];

  connection.query(sql, values, function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.send(
        "<script> alert('The username or password is not correct.'); location.href='/login';</script>"
      );
    } else {
      req.session.member = result[0];
      res.send("<script> alert('Logged in.'); location.href='/';</script>");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.member = null;
  res.send("<script> alert('Logged out.'); location.href='/';</script>");
});

app.get("/board", (req, res) => {
  var sql = `select * from board`;
  connection.query(sql, function (err, results, field) {
    if (err) throw err;
    //console.log(results); // cmd 또는 터미널에 출력
    res.render("board", {
      lists: results,
    });
  });
});

app.get("/boardWrite", (req, res) => {
  // 로그인 상태에서 아이디, 로그아웃 상태에서는 null
  // console.log(res.locals.user_id);
  // 로그인 상태에서 아이디, 로그아웃 상태에서는 undefined
  // console.log(req.session.member.user_id);
  // 조건을 여러개 쓰는 이유 : http://b1ix.net/329
  if (req.session.member && req.session.member.user_id !== undefined) {
    res.render("boardWrite");
  } else {
    res.send("<script>location.href='/board';</script>");
  }
});

app.post("/writeProc", (req, res) => {
  const title = req.body.title;
  const name = req.body.title;
  const content = req.body.content;

  var sql = `insert into board(title, name, date, content) values('${title}', '${name}', now(), '${content}' )`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("게시판에 글을 올렸습니다.");
    res.send("<script>location.href='/board';</script>");
  });
});

app.get("/boardDelete", (req, res) => {
  var idx = req.query.idx;
  var sql = `delete from board where idx='${idx}'`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send("<script>alert('Deleted');</script>");
  });
});

function getMonthAbbreviation(month) {
  const months = [
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
  if (month >= 1 && month <= 12) {
    return months[month - 1];
  }
  return "";
}

function formatDate(date) {
  const months = [
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
  const month = months[date.getMonth()];
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
