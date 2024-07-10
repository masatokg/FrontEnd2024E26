"use strict";

// ユーザー行採番用の変数
let user_num_count = 1;

// ユーザーリストをhttpsリクエストで取得する関数
let get_users = function () {
    fetch('https://masatokg.watson.jp/FrontEnd2024E/FrontEnd2024E26/php/getUsers.php')
        .then(function (response) {
            // console.log(response);
            // レスポンスのデータ部分をJSONオブジェクトに変換する
            let json_object = response.json();
            // JSONオブジェクトをリターンして関数終了
            return json_object;
        })
        .then(function (jsonData) {
            // リターンされたJSONオブジェクトを関数に引き渡す
            show_users(jsonData);
        })
        .catch(function (error) {
            // エラーがあったらキャッチしてコンソールにエラーメッセージを表示
            console.error('エラー:', error);
        })
};

// JSONオブジェクトデータを受け取ってユーザーリストを表示する関数
let show_users = function (data) {
    // JSONオブジェクトデータをコンソールに表示
    show_log(data);
    // idがresの要素にユーザー数を追記
    document.getElementById('res').innerHTML += ('<br>ユーザー数：' + data.data_array.length);

    // idがuserlist_areaの要素を取得
    let userlist_area = document.getElementById('userlist_area');
    // ユーザーリスト表示エリアを初期化
    let max = data.data_array.length;
    // ユーザーリスト表示エリアにユーザー情報をユーザーの分だけ繰り返して表示
    for (let i = 0; i < max; i++) {
        // ユーザー情報表示用の行のdivを作成
        let user_row = document.createElement('div');
        // ユーザー情報表示用の行のdivにクラスとIDをセット
        user_row.setAttribute('class', 'row');
        user_row.setAttribute('id', 'user_num_count' + user_num_count++);
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivを作成
        let mail_col = document.createElement('div');
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivにクラスとスタイルをセット
        mail_col.setAttribute('class', 'col col-4 border border-primary border-2 m-2');
        mail_col.setAttribute('style', 'font-size: 0.75rem; font-weight: bold; color: blue; background-color: lightgray;');
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivにメールアドレスを表示
        mail_col.innerHTML = "mail: " + data.data_array[i].mail;
        // ユーザー情報表示用の行のdivに名前を表示するdivを作成
        let name_col = document.createElement('div');
        // ユーザー情報表示用の行のdivに名前を表示するdivにクラスとスタイルをセット
        name_col.setAttribute('class', 'col col-4 border border-success border-2 m-2');
        name_col.setAttribute('style', 'font-size: 0.75rem; font-weight: bold; color: blue; background-color: lightgray;');
        // ユーザー情報表示用の行のdivに名前を表示するdivに名前を表示
        name_col.innerHTML = "name: " + data.data_array[i].name;
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivと名前を表示するdivを子要素として追加
        user_row.appendChild(mail_col);
        user_row.appendChild(name_col);
        // ユーザーリスト表示エリアにユーザー情報表示用の行のdivを子要素として追加
        userlist_area.appendChild(user_row);
    }
}

// JSONオブジェクトデータを受け取って丸ごと文字列化してidがresの要素に表示する関数
let show_log = function (data) {
    document.getElementById('res').innerHTML = JSON.stringify(data);
}

// ログインチェックをhttpsリクエストで行う関数
let loginCheck = function () {
    // HTML入力フォームと同じ形式のFormDataオブジェクトを生成
    const formData = new FormData();
    // idがmailの要素のvalueの値を取得
    const mail = document.getElementById('mail').value;
    // idがpasswordの要素のvalueの値を取得
    const password = document.getElementById('password').value;
    // FormDataオブジェクトにmailとpasswordのキーと値をセット
    formData.append('mail', mail);
    formData.append('password', password);
    // fetchでPOSTリクエストを送信
    fetch('https://masatokg.watson.jp/FrontEnd2024E/FrontEnd2024E26/php/getUserInfo.php', {
        // POSTリクエストを指定
        method: 'POST',
        headers: {
            // ヘッダーにContent-Typeを指定
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // bodyにFormDataオブジェクトを文字列化（シリアル化）してセット
        body: new URLSearchParams(formData).toString()
    })
        .then(function (response) {
            // console.log(response);
            // レスポンスのデータ部分をJSONオブジェクトに変換する
            let json_object = response.json();
            // JSONオブジェクトをリターンして関数終了
            return json_object;
        })
        .then(function (jsonData) {
            // 関数が無事に終了したら、処理を続ける
            // ログイン結果を表示する関数にJSONオブジェクトを引き渡す
            show_userinfo(jsonData);
        })
        .catch(function (error) {
            // エラーがあったらキャッチしてコンソールにエラーメッセージを表示
            console.error('エラー:', error);
        })
};

//JSONデータを引数に受け取ってDOM操作を行う関数を作成
let show_userinfo = function (data) {
    // JSON文字列データをコンソールに表示
    show_log(data);
    // idがlogin_resultの要素を取得
    let login_result = document.getElementById('login_result');
    // ログイン結果表示エリアのスタイルを設定
    login_result.setAttribute('style', 'font-size: 0.75rem; font-weight: bold; color: red;');
    // ログイン結果表示エリアを初期化
    login_result.innerHTML = '';
    // JSONのresultキーの値がtrueなら、ログイン結果表示エリアにログイン結果メッセージを表示
    if (data.result) {
        // ユーザー情報表示用の行のdivを作成
        let user_row = document.createElement('div');
        // ユーザー情報表示用の行のdivにクラスとIDをセット
        user_row.setAttribute('class', 'row');
        user_row.setAttribute('id', 'login_user');
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivを作成
        let mail_col = document.createElement('div');
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivにクラスとスタイルをセット
        mail_col.setAttribute('class', 'col col-4 border border-primary border-2 m-2');
        mail_col.setAttribute('style', 'font-size: 0.75rem; font-weight: bold; color: blue; background-color: lightgray;');
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivにメールアドレスを表示
        mail_col.innerHTML = "mail: " + data.data_array[0].mail;
        // ユーザー情報表示用の行のdivに名前を表示するdivを作成
        let name_col = document.createElement('div');
        // ユーザー情報表示用の行のdivに名前を表示するdivにクラスとスタイルをセット
        name_col.setAttribute('class', 'col col-4 border border-success border-2 m-2');
        name_col.setAttribute('style', 'font-size: 0.75rem; font-weight: bold; color: blue; background-color: lightgray;');
        // ユーザー情報表示用の行のdivに名前を表示するdivに名前を表示
        name_col.innerHTML = "name: " + data.data_array[0].name;
        // ユーザー情報表示用の行のdivにメールアドレスを表示するdivと名前を表示するdivを子要素として追加
        user_row.appendChild(mail_col);
        user_row.appendChild(name_col);
        // ログイン結果表示エリアにユーザー情報表示用の行のdivを子要素として追加
        login_result.appendChild(user_row);
    }
    // ログイン結果表示エリアにレスポンスのJSONデータのmessageキーの値を追記
    login_result.innerHTML += ('<br>' + data.message);

}

// ページ読み込み時に実行
window.onload = function () {

    // idがbtn_usersの要素を取得
    let btn_users = document.getElementById('btn_users');
    // ユーザーリスト表示ボタンのスタイルを設定
    btn_users.style.color = 'yellow';
    btn_users.style.fontSize = '1.5rem';
    btn_users.style.fontWeight = 'bold';
    // ユーザーリスト表示ボタンのclickイベントに処理を紐づける
    // （処理：文字色を青に変更してユーザーリスト取得関数get_usersを実行）
    btn_users.addEventListener('click', () => {
        btn_users.style.color = 'blue'; get_users();
    });

    // idがbtn_loginの要素を取得
    let btn_login = document.getElementById('btn_login');
    // ログインボタンのスタイルを設定
    btn_login.style.color = 'yellow';
    btn_login.style.fontSize = '1.5rem';
    btn_login.style.fontWeight = 'bold';
    // ログインボタンのclickイベントに処理を紐づける
    // （処理：文字色を青に変更してログインチェック関数を実行）
    btn_login.addEventListener('click', () => {
        btn_login.style.color = 'blue'; loginCheck();
    });

}