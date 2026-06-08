// 우측 다이어리 항목 쪽에 생겨야 하는 것들~

// current-date 날짜 오늘로 항상 만들기

// 왼쪽에 있는 날짜 누르면 해댱 날짜로 위에 변화하고, 
// 그 날짜애 있는 localStorage 데이터들 넣기

// 데이터들 구조에 대해서 생각하는 일이 필요하겠군요.


// --- 전역변수 ---
const today = new Date();

const currentDate = document.querySelector('.current-date');

const plusButton = document.querySelector('.plus-button');
const modal = document.querySelector('.modal-background');
const enterDiary = document.querySelector('.diary-enter');
const closeButton = document.querySelector('.diary-close');
const saveButton = document.querySelector('.diary-save');
const titleEnter = document.querySelector('.title-enter');
const contentEnter = document.querySelector('.content-enter');

const diaryContainer = document.querySelector('.diary-container');
// 다이어리 내용 정리 관련


// --- 함수 ---
function showDate() {
    const year = selectedDate.year;
    const month = selectedDate.month;
    const day = selectedDate.day;
    

    currentDate.innerHTML = `
        ${year}. ${month}. ${day}
    `;
}

function showDiary() {
    diaryContainer.innerHTML = ``;
    // 그러면 해당 키값의 data를 배열로 가져오기
    let selected = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;

    const diaryData = JSON.parse(localStorage.getItem(selected));

    if(!diaryData) return;

     // 이렇게 안하면 계속 그 diaryData가 중첩해서 보일 거임
    diaryData.forEach(function(diary) {
        const diaryContent = `
            <div class = "diary">
                <span class = "title">
                    ${diary.title}
                </span>
                <p class = "time">${diary.time}</p>
                <p class = "diary-content">
                    ${diary.content}
                </p>
            </div>
        `
        diaryContainer.insertAdjacentHTML('beforeend',diaryContent);
    })
    console.log(selected);
    console.log(diaryData);
}

// --- 이벤트 리스너 ---
calendarDates.addEventListener('click', function(e){
    if(e.target.tagName === 'SPAN') {
        // focus
        selectedDate.year = currentYear;
        selectedDate.month = currentMonth;
        selectedDate.day = parseInt(e.target.textContent.trim());
        
        console.log(selectedDate.day);
    }
    renderCalendar();

    showDate();
    showDiary();
})

plusButton.addEventListener('click', function() {
    modal.style.display = 'block';
    enterDiary.style.display = 'flex';
})

modal.addEventListener('click', function() {
    modal.style.display = 'none';
    enterDiary.style.display = 'none';
})
closeButton.addEventListener('click', function(){
    modal.style.display = 'none';
    enterDiary.style.display = 'none';
})

saveButton.addEventListener('click', function() {
    // localStorage에 값 저장하는 거.........
    const dataKey = `${currentYear}-${currentMonth}-${day}`; // 날짜로 key 저장
    const data = JSON.parse(localStorage.getItem(dataKey)) || []; // 이미 들어가있으면 거기에 추가하게 가져오고 아니면 비어있게 초기화

    const newDiary = {
        title : titleEnter.value,
        content : contentEnter.value,
        time : new Date().toLocaleTimeString()
    }
    // localStorage 자체에 들어가 있는 걸 가져와서 뒤에 붙이는 형식
    data.push(newDiary);

    localStorage.setItem(dataKey, JSON.stringify(data));
    showDiary();

    modal.style.display = 'none';
    enterDiary.style.display = 'none';
})

// --- 업데이트 ---

showDate();
showDiary();


