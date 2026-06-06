// 우측 다이어리 항목 쪽에 생겨야 하는 것들~

// current-date 날짜 오늘로 항상 만들기

// 왼쪽에 있는 날짜 누르면 해댱 날짜로 위에 변화하고, 
// 그 날짜애 있는 localStorage 데이터들 넣기

// 데이터들 구조에 대해서 생각하는 일이 필요하겠군요.


// --- 전역변수 ---
const today = new Date();

const currentDate = document.querySelector('.current-date');


// --- 함수 ---
function showDate() {
    const year = selectedDate.year;
    const month = selectedDate.month;
    const day = selectedDate.day;
    

    currentDate.innerHTML = `
        ${year}. ${month}. ${day}
    `;
}

// --- 이벤트 리스너 ---
calendarDates.addEventListener('click', function(e){
    if(e.target.tagName === 'SPAN') {
        // focus
        selectedDate.year = currentYear;
        selectedDate.month = currentMonth;
        selectedDate.day = parseInt(e.target.textContent.trim());
        
        console.log(day);
    }
    renderCalendar();

    showDate();
})

// --- 업데이트 ---

showDate();


