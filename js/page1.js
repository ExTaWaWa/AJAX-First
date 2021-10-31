let targetLi = document.querySelectorAll('ul li');

// type-01
for (var i = 0; i < targetLi.length; i++) {
  (function (i) {
    targetLi[i].addEventListener('click', function () {
      // preventDefault();
      console.log(i);
      alert(i + 1);
    })
  })(i)
}

// type-02
for (let i = 0; i < targetLi.length; i++) {
  targetLi[i].addEventListener('click', function () {
    // console.log(i);
    alert(i + 1);
  })
}

// setTimeout
// 原題目
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000)
}

// type - 1
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000)
}

// type - 2
for (var i = 0; i < 5; i++) {
  (function(i){
    setTimeout(() => {
      console.log(i);
    }, 1000)
  })(i)
}

// type - 3
for (var i = 0; i < 5; i++) {
  setTimeout((i) => {
    console.log(i);
  }, 1000, i)
}