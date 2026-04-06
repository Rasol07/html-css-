// .eq를 붙여 index하는 것 querySelectionAll... [0]과 같다.
$('.tab-button').eq(0).on('click', function(){
    // document.querySelectorAll('.tab-button').classList.remove("orange");
    // document.querySelectorAll('.tab-button')[0].classList.add('orange');
    // 위와 같이 querySelector 문으로 하면 for-each 문으로 각각 다 조절해줘야함.
    // 그래서 jQuery씀
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(0).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(0).addClass('show');
})

// 위에 있는 index를 변수로 받으면 되는 거 아닌가.

// 자주 쓰는 셀렉터는 변수에 집어넣기
let button_selector = $('.tab-button');
let content_selector = $('.tab-content');
let length = $('.tab-content').length; // 이런 식으로 총 길이 구할 수 있음.

console.log(length);

// 반복문
for (let i=0; i<3; i++){
    console.log('안녕');
}

// for (let i=0; i<length; i++){
//     tabOpen(i);
// }

// 탭 기능 이벤트 리스너 1개만 쓰기
$('.list').click(function(e){
    // 지금 누른 게 버튼 0이면 버튼 0에 orange 박스 0 show
    // 이건 tabOpen
    // if(e.target == document.querySelectorAll('.tab-button')[0]){
    //     tabOpen(0);
    // }
    // 탭열기 (data-id 값);
    // e.target 은 지금 누른 버튼 가져옴
    tabOpen(e.target.dataset.id);
    console.log(e.target.dataset.id);
})

function tabOpen(index) {
    button_selector.eq(index).on('click', function(){
        $('.tab-button').removeClass('orange');
        $('.tab-button').eq(index).addClass('orange');
        $('.tab-content').removeClass('show');
        $('.tab-content').eq(index).addClass('show');
    })
}

// 배열로 하면 편하지 않을까?

// var car = '소나타';
// var carPrice = 50000;
// var carColor = 'white';

//array 자료형 : 자료형 상관 없음
var car = ['소나타', 50000, 'white'];
console.log(car[1]);

//object 자료형으로 이름붙여서 저장할 수 있다. 순서 개념이 없음.
var car2 = {name : '소나타', price : [50000, 3000, 4000]};
console.log(car2.name); // 이런 식으로 key를 가져올 수 있다.

document.querySelectorAll('.car-title')[0].innerHTML = car2.name;
document.querySelectorAll('.car-title')[1].innerHTML = car2.price[0];
console.log(document.querySelector('.tab-button').dataset.id);