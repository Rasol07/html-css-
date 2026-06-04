// -- 전역 변수 --

// -- 쿼리 셀렉터 --
const todos = document.querySelector('.todoList-container');
const plusTodo = document.querySelector('.plus-todolist');

// -- 함수 --
// localStorage에 데이터 저장하기



// -- 이벤트 리스너
todos.addEventListener('click', function(e) {
    if(e.target.classList.contains('plus-todolist')){
        const todoContents = `
        <div class = "todo">
            <input type="checkbox" class = "check">
            <input type="text" class = "todo-content"> 
                
        </div>
    `

        todos.insertAdjacentHTML('beforebegin', todoContents);

        console.log('추가');
    }
    
})

// -- 업데이트 -- 

// 필요한 거 
// + 버튼 누르면 추가되는 거 구현해야 함.
// 그러면 button은 따로 있으니까 그냥 따로 해서 만들면 되겠다.
// 삭제하는 거 -> 비어있을 때 또 백스페이스 누르면 사라지게 하기
// 누르면 옆에 글자 - 생기게 하기

// localStorage에 데이터 저장하는 거
