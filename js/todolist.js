// + 버튼 누르면
// 저거 리스트가 하나 떠야하고
// + 버튼은 아래로 내려가야 한다.
// 그러면 그냥 추가만 하면 자동으로 내려가겠죠?
const additionButton = document.querySelector('.addition-list');
const list = document.querySelector('.list-wrapper');

additionButton.addEventListener('click', function() {
    // innerHTHML의 경우 그 안에 있는 내용을 전부 바꿔버린다.
    // 그런데 이렇게 했을 때도 추가해서 결국 =을 넣는 거라서 내용이 바뀜

    const newTodo = `
        <div class = "list-container">
            <input type = "checkbox" class = "check-box" >
            <textarea id = "todo-text" rows = "1" placeholder="할 일" class = "list-text"></textarea>
            <i class="delete-button fa-solid fa-xmark "></i>
        </div>
    `

    // 새 리스트 html 내용을 추가해주세용
    list.insertAdjacentHTML('beforeend', newTodo);
    console.log('입력');
})

// 저기 맞는 x버튼을 누르면 해당되는 list-container를 삭제하면 됨.
// 그러면 this를 써서 가져오면 되겠죠?
// 그런데 부모라서 this로 가져올 수 있을까요?
// 거의 다 왔어 아니 진짜 다왔다.
// 아니다 한 개 더 남았다. 
// 아맞다 두 개 더 남았다.

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
            console.log('삭제');
        }
    }

    // toggle로 classList 추가하는 걸로 해결~
    if(event.target.classList.contains('check-box')) {
        let listContainer = event.target.closest('.list-container');
        let listText = listContainer.querySelector('.list-text');
        if(listText.value.trim() !== "") {
            listText.classList.toggle('completed');
            console.log('됐나?');
        }
    }
})

// 입력을 막게 하는 거... 흠
// 그러면 내용을 반영하는 걸 기억해서
// 그 마지막 내용을 뒤에 value로 넣기?
let lastText = ""

// 전반적인 것에 대한 관리가 필요하다면 이렇게 할 수 있다.
// 위의 foreach문은 초기부터 제작이 안되어 있었기 때문에 벌어지는 일 아닐까 싶다.

listWrapper.addEventListener('input', function(event) {
    if(event.target.classList.contains('list-text')) {
        // 아 높이에 대한 초기화가 필요하구나
        const textarea = event.target;
        
        textarea.style.height = '38px';
        let newHeight = textarea.scrollHeight;

        if(newHeight > 107) {
            newHeight = 107;
            // 이런 식으로 바로 value 값에 영향을 끼칠 수 있구나.
            textarea.value = lastText;
        }
        else {
            lastText = textarea.value;
            
        }
        textarea.style.height = newHeight + 'px';
        console.log(newHeight);
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

