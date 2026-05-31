// -- 하드코딩 데이터 --
const questions = [
    {
        question: "友達 의 뜻은?",
        options : ["공부", "친목", "친구", "전구"],
        answer : 3
    },
    {
        question: "机 의 발음은?",
        options : ["かぎ", "しごと", "いえ", "つくえ"],
        answer : 4
    },
    {
        question: "駅 의 뜻은?",
        options : ["자동차", "역", "길", "전철"],
        answer : 2
    },
    {
        question: "기쁘다 의 일본어는?",
        options : ["悲しい", "眠い ", "嬉しい ", "忙しい "],
        answer : 3
    },
]


// -- 전역변수 & 상수 -- 
// 쿼리 셀렉터 상수
const exampleButton = document.querySelector('.example');
const card = document.querySelector('.card-container');
const answerBackground = document.querySelector('.answer-background');
const answer = document.querySelector('.answer');
const timerPlace = document.querySelector('.timer');

// 변수
let currentIndex = 0;
let correctCount = 0;
let totalCount = questions.length;
let timer = null;
let timeLeft = 10;

// -- 함수 --
// 문제 랜덤화
questions.sort(function() {
    return Math.random() - 0.5; // 이런 식으로 해서 양수와 음수로 구분되게 함.
})

// 문제 나타나기
function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timer = setInterval(function() {
        // 여기에 그 1초마다 timeLeft 줄어드는 거 해야하고.
        // 그 경우가 아니면 저렇게 표시하면 된다.
        // 음. 그리고 마지막 문제에 도착하면 이 타이머가 꺼지게 만들어야 겠네.

        timeLeft--;
        timerPlace.innerHTML = `${timeLeft}초`;
        
        if(timeLeft<=0) {
            nextQuestion();
        }
        
    }, 1000);
    // 정답 화면 없애는 거  -> display : none 걸기
    answerBackground.classList.remove('look');
    answer.classList.remove('correct');
    answer.classList.remove('wrong');
    answer.classList.add('dislook');

    const content = `
        <div class = "question-container">
            <p>
                ${questions[currentIndex].question}
            </p>
            
        </div>
        
        
        <div class = "example-container">
            <div class = "example">
                <button data-index = "1"> 1 </button>
                <p> ${questions[currentIndex].options[0]} </p>
            </div>

            <div class = "example">
                <button data-index = "2"> 2</button>
                <p> ${questions[currentIndex].options[1]} </p>
            </div>

            <div class = "example">
                <button data-index = "3"> 3</button>
                <p> ${questions[currentIndex].options[2]} </p>
            </div>

            <div class = "example">
                <button data-index = "4"> 4</button>
                <p> ${questions[currentIndex].options[3]} </p>
            </div>
        </div>
    `

    card.innerHTML = content;
    console.log("업데이트");
}

// 다음 문제 작업
function nextQuestion() {
    clearInterval(timer);
    currentIndex++;
    setTimeout(function() {
        showQuestion()
    }, 2000);
}

// -- 이벤트 리스너 --
// 문제 클릭만 있음
card.addEventListener('click', function(e){
    const example = e.target.closest('.example');
    if(!example) return;
    else {
        console.log("클릭");
        const clickIndex = example.querySelector('button').dataset.index;

        if(clickIndex == questions[currentIndex].answer) {
            console.log("정답");
            // 여기에 정답 화면 띄우는 거 만들기
            answerBackground.classList.add('look');
            answer.classList.add('correct');
            answer.querySelector('p').innerHTML = "정답입니다!";
            correctCount++;
        }

        else {
            console.log("오답");
            // 오답 화면 만들기
            answerBackground.classList.add('look');
            answer.classList.add('wrong');
            answer.querySelector('p').innerHTML = "오답입니다!";
        }
        
        // 구분 없이 인덱스는 올라감. 
        // 아 이거 조건 만들어야겠구나.
        // 전체 questions의 갯수 보다 많아지지 않게 해야한다.

        if(currentIndex >= questions.length - 1) {
            // 결과 화면 넘어가기 
            // 그냥 결과 화면 답 내용에 넣는 방식으로 해야겠다 귀찮아.
            clearInterval(timer);

            setTimeout(function(){
                answerBackground.classList.add('look');
                answer.classList.remove('correct');
                answer.classList.remove('wrong');
                answer.classList.add('look');
                // 그냥 alert로 알려주는 것도 나쁘진 않겠는데.
                answer.querySelector('p').innerHTML = `${totalCount}개 중 ${correctCount}개 맞추셨습니다. `;
            }, 2000);

            
            
            
        }
        else {
            nextQuestion();
        }
        
    }
})


// -- 초기화 -- 
showQuestion();