// -- 전역 변수 --

// -- 쿼리 셀렉터 --
const todos = document.querySelector('.todoList-container');
const plusTodo = document.querySelector('.plus-todolist');
const todoContainer = document.querySelector('.todo-wrapper');
// -- 함수 --
// localStorage에 데이터 저장하기

function saveStorage() {
    // todo-wrapper에 들어있는 값들을 다 가져오기
    // completed인 거 아닌 거 구분해서 가져오기
    const todoLists = [];

    const todo = document.querySelectorAll('.todo');

    todo.forEach(function(list) {
        const text = list.querySelector('.todo-content').value;
        
        const state = list.querySelector('.todo-content').classList.contains('completed');

        todoLists.push({text, state});
    })

    localStorage.setItem('todos', JSON.stringify(todoLists));
}

function loadStorage() {
    const todo = JSON.parse(localStorage.getItem('todos'));
    if(!todo) return;

    todo.forEach(function(list) {
        const todos = `
            <div class = "todo">
                <input type="checkbox" class = "check" ${list.state ? 'checked' : ''}>
                <input type="text" class = "todo-content ${list.state ? 'completed' : ''}" value = "${list.text}"> 
                    
            </div>
        `

        todoContainer.insertAdjacentHTML('beforeend', todos);
    })
}


// -- 이벤트 리스너
todos.addEventListener('click', function(e) {
    if(e.target.classList.contains('plus-todolist')){
        const todoContents = `
        <div class = "todo">
            <input type="checkbox" class = "check">
            <input type="text" class = "todo-content"> 
                
        </div>
    `

        todoContainer.insertAdjacentHTML('beforeend', todoContents);

        console.log('추가');
    }

    // 그러면 해당 요소에 있는 가까운 거에 text-decoration 넣기
    if(e.target.classList.contains('check')){
        let currentTodo = e.target.closest('.todo');
        
        let currentText = currentTodo.querySelector('.todo-content');
        if(currentText.value.trim() !== '') {
            
            currentText.classList.toggle('completed');
        }
       
    }

    saveStorage();
    
})

todoContainer.addEventListener('keydown', function(e){
    // 이런 식으로 keydown으로 받고, e.target 자체의 value를 가져와서 계산
    if(e.key === 'Backspace' && e.target.value === '') {
        e.target.closest('.todo').remove();
    }

    saveStorage();
})


// -- 업데이트 -- 
loadStorage();



// 필요한 거 
// + 버튼 누르면 추가되는 거 구현해야 함.
// 그러면 button은 따로 있으니까 그냥 따로 해서 만들면 되겠다.
// 삭제하는 거 -> 비어있을 때 또 백스페이스 누르면 사라지게 하기
// 완전 그 todo-content의 길이가 비어있다면 
// keyDown 이벤트 들어갔을 떄
// 그럴 때 내용 자체를 삭제시켜라. 

// 누르면 옆에 글자 - 생기게 하기

// localStorage에 데이터 저장하는 거
