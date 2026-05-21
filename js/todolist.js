// 전체 / 완료 개수 구하기
// list-container 의 총 갯수 -> length를 구해서 그 값을 입력하면 됨
// completed의 총 갯수 가져오면 됨.


// 언제 해당 값을 넣을지를 생각해야함.
// 추가 / 삭제/ 체크 시 모두 적용이 되어야 한다.
// 그러면 일단은 그냥 함수를 만드는 게 좋겠네
function lengthCal() {
    const listLength = list.querySelectorAll('.list-container').length;
    const completedListLength = list.querySelectorAll('.completed').length;
    const lengthContainer = document.querySelector('.length');
    lengthContainer.innerHTML = `
        <p>
            ${completedListLength} / ${listLength}
        </p>
    `
}

// + 버튼 누르면
// 저거 리스트가 하나 떠야하고
// + 버튼은 아래로 내려가야 한다.
// 그러면 그냥 추가만 하면 자동으로 내려가겠죠?

// 항목에 값이 들어가 있지 않으면 생성 안되게 
// 근데 애초에 생성이 되려면 마지막 친구만 확인ㄴ하면 되는 거잖아
// 그럼 lastArea를 봐야겠네?
// lastArea에 접근하려면..?

const additionButton = document.querySelector('.addition-list');
const list = document.querySelector('.list-wrapper');


// locatStorage 추가

// 이거 할 때 마다 지금 현재의 list-container 돌아서 확인하기
function saveStorage() {
    const todoList = []; // 해당 함수가 
    // 그러면 list-container에 대해서 다 돌아야 겟네?
    const listContainer = document.querySelectorAll('.list-container');
    listContainer.forEach(function(container){
        // list-container에 들어있는 값들 저장하고, completed 정도 가져오기
        // 값 가져오기
        const textArea = container.querySelector('.list-text').value;
        
        // completed 가져오기
        
        const completedState = container.querySelector('.list-text');
        const state = completedState.classList.contains('completed');

        todoList.push({textArea, state});
        
    })
    localStorage.setItem('todos', JSON.stringify(todoList));
    console.log("작동");
}

// loadStorage 생각하기
// 그냥  localStorage에 저장되어 있던 배열들 가져와
// 그 배열 값들을 forEach문 돌려
// 각각의 값들을 text, state로 가져와
// 그래서 그 값들을 그 뒤에 html 붙이는 형식으로 해서 가져오면 되는 거 아닌가
function loadStorage() {
    // localStorage에 저장된 배열 가져오기
    const todoList = JSON.parse(localStorage.getItem('todos'));
    //forEach 문으로 각각을 가져오기
    todoList.forEach(function(todo){
        const updateTodo = `
            <div class = "list-container">
                <input type = "checkbox" class = "check-box" ${todo.state ? 'checked' : ''} >
                <textarea rows = "1" placeholder="할 일" class = "list-text ${todo.state ? 'completed' : ''}">${todo.textArea}</textarea>
                <i class="delete-button fa-solid fa-xmark "></i>
            </div>  
        `

        list.insertAdjacentHTML('beforeend', updateTodo);
    })
    lengthCal(); // 여기서 새로 또 작업하게 하기.
    console.log("불러오기");
    // 해당 배열에 들어가 있는 textArea, state 가져오기
    // state는 true, false에 대해 class가 붙거나 안 붙으니까 그거 조건문 작성
    
}

additionButton.addEventListener('click', function() {
    // innerHTHML의 경우 그 안에 있는 내용을 전부 바꿔버린다.
    // 그런데 이렇게 했을 때도 추가해서 결국 =을 넣는 거라서 내용이 바뀜

    // 마지막 친구 데려오기
    const lastListContainer = list.querySelector('.list-container:last-child');
   

    const newTodo = `
        <div class = "list-container">
            <input type = "checkbox" class = "check-box" >
            <textarea rows = "1" placeholder="할 일" class = "list-text"></textarea>
            <i class="delete-button fa-solid fa-xmark "></i>
        </div>
    `

    if(!lastListContainer) {
        list.insertAdjacentHTML('beforeend', newTodo);
        console.log('입력');
        saveStorage();
        lengthCal();
    }
    else {
         const lastText = lastListContainer.querySelector('.list-text');
        const lastTextContent = lastText.value;

        // trim을 붙여서 띄어쓰기 다 빼기. 
        if(lastTextContent.trim()) {
            // 새 리스트 html 내용을 추가해주세용 - 맨 뒤에 추가해달라
            list.insertAdjacentHTML('beforeend', newTodo);
            console.log('입력');
            saveStorage();
            lengthCal();
            
        }
        else {
            alert("할 일 목록을 작성해주세요.");
        }
    }

   
})

// 저기 맞는 x버튼을 누르면 해당되는 list-container를 삭제하면 됨.
// 그러면 this를 써서 가져오면 되겠죠?
// 그런데 부모라서 this로 가져올 수 있을까요?

// 아 신기한 게 저렇게 addEvent로 해서 이벤트로 하면 브라우저에 처음에 없던건
// 걸리지 않는대
// const deleteButton = document.querySelectorAll('.delete-button');
// deleteButton.forEach(function(button){
//     button.addEventListener('click', function() {
//         // 역시 부모라서 this.closest() 써야했죠?
//         let listContainer = this.closest('.list-container');
//         if(listContainer) {
//             listContainer.remove();
//             console.log("삭제완료");
//         }
//     })
// })

// 동적으로 작동하게 만들기
// 애초에 wrapper 자체에 접근을 해서, 차후에 생기는 event에 대응하게 하기
// wrapper에 있는 클릭 이벤트를 가져와서 그 이벤트의 타겟이 뭐를 가지고 있다면
// 가장 가까운 부모에 저게 있으면 가져와라

const listWrapper = document.querySelector('.list-wrapper');
listWrapper.addEventListener('click', function(event) {
    // 만약 그 이벤트가 누른 게 delete-button이라면?
    // 그 가까이에 있는 부모 .list-container를 가져오고
    // 그게 있다면? list-container를 삭제해라.
    if(event.target.classList.contains('delete-button')) {
        let listContainer = event.target.closest('.list-container');
        if(listContainer) {
            listContainer.remove();
            saveStorage();
            console.log('삭제');
            lengthCal()
        }
    }

    // toggle로 classList 추가하는 걸로 해결~
    // checkbox 관련
    if(event.target.classList.contains('check-box')) {
        let listContainer = event.target.closest('.list-container');
        let listText = listContainer.querySelector('.list-text');
        if(listText.value.trim() !== "") {
            listText.classList.toggle('completed');
            console.log('됐나?');
            saveStorage();
            lengthCal()
        }
    }
})

// 입력을 막게 하는 거... 흠
// 그러면 내용을 반영하는 걸 기억해서
// 그 마지막 내용을 뒤에 value로 넣기?
let lastText = ""

// 전반적인 것에 대한 관리가 필요하다면 이렇게 할 수 있다.
// 위의 foreach문은 초기부터 제작이 안되어 있었기 때문에 벌어지는 일 아닐까 싶다.

// textarea 높이 조절하기
listWrapper.addEventListener('input', function(event) {
    if(event.target.classList.contains('list-text')) {
        // 아 높이에 대한 초기화가 필요하구나
        const textarea = event.target;
        
        textarea.style.height = '38px';
        let newHeight = textarea.scrollHeight; // 이런 식으로 해서 그 요소의 scrollHeight 계산

        if(newHeight > 125) {
            newHeight = 108;
            // 이런 식으로 바로 value 값에 영향을 끼칠 수 있구나.
            textarea.value = lastText;
        }
        else {
            lastText = textarea.value;
            
        }
        textarea.style.height = newHeight + 'px';
        console.log(newHeight);

        let textContent = textarea.value;
        saveStorage();
    }
})

// 안에 쓴 길이만큼 height의 길이를 늘리기
// 그런데 이렇게 하려면 일단 그 내가 건드는 listText에 대해서 접근해야함
// 그러고 listText의 height = scrollY 되는 만큼을 가져와야함


// time class에 있는 항목의 내용이 오늘 연월일로 나오게 하기
let time = document.querySelector('.time');
let now = new Date();

// toString() : 날짜랑 시간 초수까지 영어로 변환
// toLocaleString() : 날짜 시간 초수를 한글로
// toLocaleDateString() : 날짜까지만
// toLocalTimeString() : 시간만

time.innerHTML = now.toLocaleDateString();

// localStorage 쓰려고 보기
// 음 일단 이게 (key, value)로 저장이 되잖아?
// 그러면 일단 key, value로 들어가려면
// key를 현재 index를 표현하는 변수가 필요하겟네
// 전반적으로 다 적용되게 let 을 밖으로 빼기
// 일단 얘가 textarea에 작성하면 추가하게 하기

// 로딩 시 실행되야 하는 것들.
// 맨 처음 화면 로딩될 때 실행함.
lengthCal();
loadStorage();