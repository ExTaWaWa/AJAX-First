// let xhr = new XMLHttpRequest();

// readyState
// 0 - 產生一個 XMLHttpRequest,還沒連接要的資料
// 1 - 用了 open（），但是還沒有傳資料過去
// 2 - 接收到有用 send
// 3 - loading
// 4 - 你撈到資料了，數據已經完全接收了

// 格式、要讀取的網址、同步與非同步
// 格式： get（讀取）、post（傳送資料到伺服器）
// xhr.open('get','https://hexschool.github.io/ajaxHomework/data.json',true);
//true => 非同步,不會等到資料傳回來,就讓程式繼續往下跑,等到回傳才會自動回傳
//false => 同步, 它會等資料傳回來,才會讓程式碼繼續往下跑
//通常用true,因為JavaScript具有非同步的特性

// 傳空的資料，因為只有要取資料
// xhr.send(null);
// 在codepen需要用cros anywhere https://cors-anywhere.herokuapp.com/才可以正常抓api

let xhr = new XMLHttpRequest();
xhr.open('get', 'http://opendata2.epa.gov.tw/UV/UV.json', true);
xhr.send(null);

xhr.onload = function () {
  let data = JSON.parse(xhr.responseText);
  // 讓 log 顯示資料
  if (xhr.status == 200) {
    let str = JSON.stringify(data, null, '\t');
    // let str = JSON.parse(xhr.responseText);
    document.querySelector('.msg').textContent = str;
    console.log(str);
  } else {
    console.log('資料錯誤！');
  }

  let cards = '';

  for (let i = 0; i < data.length; i++) {
    cards += `
    <div class="pe-2 col-3">
      <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header">${data[i].County}</div>
        <div class="card-body">
          <h5 class="card-title">${data[i].SiteName}</h5>
          <h3 class="card-subtitle">UV指數：${data[i].UVI}</h3>
          <p class="card-text">${data[i].PublishAgency}</p>
          <p class="card-text">${data[i].PublishTime}</p>
        </div>
      </div>
    </div>`;
  }

  document.querySelector('.UVData').innerHTML = cards;
}
//1.建立了一個XMLHttpRequest()
//2.傳送到對方伺服器要資料
//3.回傳資料到自己的瀏覽器
//4.拿到資料後要怎麼處理

// JSON.stringfy(value, replace , space) 使 JSON 可以顯示在 HTML 畫面，但是排整齊只有console.log，HTML那邊無法，要在研究

let target = (tag) => document.querySelector(tag);
let account = target('.account');
let pass = target('.pass');
let click = target('.click');
let alertText = target('.alertText');

click.addEventListener('click', Post);

function Post(e) {
  // Prevent default 單純傳送數值避免其他 dom 的預設作用
  e.preventDefault();
  // 如果信箱密碼是空的，提醒使用者
  if (account.value.trim() == '' || pass.value.trim() == '') {
    alertText.textContent = '欄位不可為空白';
    alertText.classList.add('text-danger');
    return;
  }

  // 如果有東西，建構 XHR，利用 JSON 寫法傳送
  let detail = {
    email: `${account.value}`,
    password: `${pass.value}`
  }
  let data = JSON.stringify(detail);
  let xhrUp = new XMLHttpRequest();
  xhrUp.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
  // 這邊注意要改 application/json 不然抓不到
  xhrUp.setRequestHeader('Content-type', 'application/json');
  xhrUp.send(data);

  // 送出資料，確認結果返回給使用者
  xhrUp.onload = function result() {
    var text = JSON.parse(xhrUp.responseText).message;
    alertText.textContent = text;
    if (text == '帳號註冊成功') {
      alert('帳號註冊成功！！');
      alertText.classList.add('text-success');
      account.value = '';
      pass.value = '';
    } else {
      alertText.classList.add('text-danger');
    }
  }
}

let accountSign = target('.accountSign');
let passSign = target('.passSign');
let clickSign = target('.clickSign');
let alertTextSign = target('.alertSign');
let logInPage = target('.logInPage');

clickSign.addEventListener('click', Sign);

function Sign(e) {
  // Prevent default 單純傳送數值避免其他 dom 的預設作用
  e.preventDefault();
  // 如果信箱密碼是空的，提醒使用者
  if (accountSign.value.trim() == '' || passSign.value.trim() == '') {
    alertTextSign.textContent = '欄位不可為空白';
    return;
  }

  // 如果有東西，建構 XHR
  let xhrIn = new XMLHttpRequest();
  xhrIn.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signin', true);
  xhrIn.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhrIn.send(`email=${accountSign.value}&password=${passSign.value}`);

  // 送出資料，確認結果返回給使用者
  xhrIn.onload = function logInResult() {
    var textSignIn = JSON.parse(xhrIn.responseText).message;
    alertTextSign.textContent = textSignIn;
    if (textSignIn == '登入成功') {
      alertTextSign.classList.add('text-success');
      alert('登入成功！！');
      logInPage.classList.add('showUp');
    } else {
      alertTextSign.classList.add('text-danger');
    }
  }
}

document.querySelector('.closePopup').addEventListener('click',function(){
  logInPage.classList.remove('showUp');
})