// 달력 관련 변동 js 구현
// --- 전역 변수 ---
let currentYear = 2026;
let currentMonth = 6; 
// 그냥 못 뽑아 오나? 

// --- 쿼리 셀렉터 --- 
const calendarDates = document.querySelector('.calendar-dates');
const calendarHeader = document.querySelector('.calendar-header');
const prev = document.querySelector('.prev-button');
const next = document.querySelector('.next-button');

// --- 함수 ---
// 달력 그리기
function renderCalendar() {
    // 1일 요일 가져오기
    // new Date()에서의 월은 0부터 시작한다. 곧 0이 1월인 셈
    const firstDay = new Date(currentYear, currentMonth-1 , 1).getDay(); // 이러면 이제 0은 일요일, 1은 월요일 ,이런 식임

    // 마지막 날 구하기
    const lastDay = new Date(currentYear, currentMonth, 0).getDate(); // 이러면 0은 없는 날짜라서 자동으로 전 달의 마지막 날을 가져올 수 있음
    

    // 빈 칸 채우기 -> 1일 뒤로
    // 만약에 월요일이다 -> 1이 firstDay에 저장되어 있음
    // 그럼 그것만큼 띄워서 아래 calendar-dates에 넣으면 됨
    // 그런데 그 안에 띄어쓰기 어떻게 할 거냐고
    // grid로 하면 그냥 자동으로 넘어가네 ^^
    let dateContents = ``;

    for(let i=0; i<firstDay; i++) {
        dateContents += `<span>  </span>`
    }

    for(let i = 1 ; i <= lastDay; i++) {
        if((i  == new Date().getDate()) && (currentYear == new Date().getFullYear()) && (currentMonth == new Date().getMonth() + 1) ) {
            dateContents += `<span class = "today"> ${i} </span>`
        }
        else {
            dateContents += `<span> ${i} </span>`
        }   
        
    }

    calendarHeader.querySelector('.current').innerHTML = `
        ${currentYear}. ${currentMonth}
    `
    // 날짜 숫자 채우기
    calendarDates.innerHTML = dateContents;
}

// --- 이벤트 리스너 ---
prev.addEventListener('click', function() {
    
    if(currentMonth == 1) {
        currentYear--;
        currentMonth = 12;
    }
    else {
        currentMonth--;
    }
    if(currentYear == 0) {
        event.preventDefault();
    }
   
    renderCalendar();


})

next.addEventListener('click', function() {
    
    if(currentMonth == 12) {
        currentYear++;
        currentMonth = 1;
    }
    else {
        currentMonth++;
    }
    
   
    renderCalendar();


})
// 이전 / 다음 달 버튼 클릭해서 보이게 -> 누르면 위의 함수 호출되게 하면 되겠다
// 그렇게 해서 currentMonth, currentYear는 위의 전역변수로 넣어두고


// --- 업데이트 ---
renderCalendar();