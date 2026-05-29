/* 
1. 퀴즈에 들어갈 항목들 배열로 만들기 
key : value로 정리할 수 있을텐데

2. 해당 퀴즈 항목들을 적용 시키는 방법
- 일단 forEach문 돌려서 하나 작업해서 맞은지 틀린지 구분해서 진행시키는 방식?
- 하나 문제 나옴
- 보기에 클릭을 함
- 클릭한 것이 답의 인덱스의 값과 같은지 보기 
- 맞으면 맞다는 화면을, 틀리면 틀리다는 화면 보여주기
- 그냥 두개 상관없이 5초 뒤에 다음 forEach문 값으로 넘어가기

3. 모두 끝나면 끝났다는 페이지로 넘어가고 
4. 해당 페이지에서 전체 문제랑 맞은 갯수 보여주기
 */

// 일단은 퀴즈 내용들 배열로 만들기
// 딱히 내가 작성하는 탭은 안 만들었으니까 하드코딩으로 넣자
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

// 2. 해당 퀴즈 항목들을 적용 시키는 방법
// - 일단 forEach문 돌려서 하나 작업해서 맞은지 틀린지 구분해서 진행시키는 방식?
// - 하나 문제 나옴
// - 보기에 클릭을 함
// - 클릭한 것이 답의 인덱스의 값과 같은지 보기 
// - 맞으면 맞다는 화면을, 틀리면 틀리다는 화면 보여주기
// - 그냥 두개 상관없이 5초 뒤에 다음 forEach문 값으로 넘어가기

// 버튼 눌렀을 때 5초 뒤에 다음 question 값으로 넘어가게 하기
const exampleButton = document.querySelector('.example');

// questions.forEach(function(quest){
//     // 화면에 띄운다.
//     const card = document.querySelector('.card-container');
//     const cardContent = `
//         <div class = "question-container">
//             <p>
//                 ${quest.question};
//             </p>
            
//         </div>
        
//         <!-- 이거는 2x2로 해서 grid 로 하면 될듯 -->
//         <div class = "example-container">
//             <div class = "example">
//                 <button> 1 </button>
//                 <p> 보기 </p>
//             </div>

//             <div class = "example">
//                 <button> 1 </button>
//                 <p> ${quest.options[0]} </p>
//                 <button> 2 </button>
//                 <p> ${quest.options[1]} </p>
//                 <button> 3 </button>
//                 <p> ${quest.options[2]} </p>
//                 <button> 4 </button>
//                 <p> ${quest.options[3]} </p>
//             </div>
//         </div>
//     `

//     // exampleButton 관련해서 넘어가는 거 
// })

// 지금 현재 어느 question 인덱스인지
let currentIndex = 0;
let correctCount = 0;
let totalCount = questions.length;
const card = document.querySelector('.card-container');
const answerBackground = document.querySelector('.answer-background');
const answer = document.querySelector('.answer');

// 안에 카드 보여주는 거
function showQuestion() {
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

const exampleButtons = document.querySelectorAll('.example');

// 여기서도 동적으로 작동하는 거는 이렇게 작동되지 않는 모양임.
// 그 전의 더 큰 container의 event 쪽을 잡는 형식으로 ㄱㄱ 합시다
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
            currentIndex++;
            setTimeout(function() {
                showQuestion()
            }, 2000);
        }
        
    }
})


// exampleButtons.forEach(function(exampleButton) {
//     exampleButton.addEventListener('click',function() {
//         console.log("클릭");
//         const clickIndex = exampleButton.querySelector('button').dataset.index;

//         if(clickIndex == questions[currentIndex].answer) {
//             console.log("정답");
//         }
//         else {
//             console.log("오답");
//         }

//         currentIndex++;
//         setTimeout(function() {
//             showQuestion()
//         }, 2000);
//     })
    
// })

// exampleButton.forEach
// exampleButton.addEventListener('click', function(e) {
//     // 일단 현재 인덱스에 클릭한 거랑 button 내부의 값이랑 같으면 맞았다는 화면 띄우기
//     // 다르면 틀렸다는 화면 띄우기
//     // 인덱스 늘리고
//     // 그리고 5초 대기하고
//     // showQuestion하기 
//     const examples = event.target.closest('.example');
    
//     if(!example) return;
//     else {
//         const clickIndex = examples.querySelector('button').dataset.index;

//         if(clickIndex == questions[currentIndex].answer) {
//             console.log("정답");
//         }
//         else {
//             console.log("오답");
//         }

//         // 인덱스 늘리기 
//         currentIndex++;
//         setTimeout(function() {
//             showQuestion()
//         }, 2000);
//     }
// })

showQuestion();