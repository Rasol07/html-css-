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

for (let i=0; i<length; i++){
    button_selector.eq(i).on('click', function(){
        $('.tab-button').removeClass('orange');
        $('.tab-button').eq(i).addClass('orange');
        $('.tab-content').removeClass('show');
        $('.tab-content').eq(i).addClass('show');
    })
}