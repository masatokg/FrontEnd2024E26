<?php
// ヘッダー情報の設定（ドメイン間通信のセキュリティ設定）
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header("Content-type: application/json; charset=UTF-8");

// DB接続情報
$db['host'] = "XXXXXXXXXXXXXXXX";  // DBサーバのURL
$db['user'] = "XXXXXXXXXXXXXXXX";  // ユーザー名
$db['pass'] = "XXXXXXXXXXXXXXXX";  // ユーザー名のパスワード
$db['dbname'] = "XXXXXXXXXXXXXXXX";  // データベース名

// DB接続
$pdo = new PDO(
    'mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'] . ';charset=utf8',
    $db['user'],
    $db['pass']
);


// ユーザー情報取得（プレースホルダでメールアドレス、パスワード指定）
$stmt = $pdo->prepare('SELECT * FROM user WHERE mail = ? AND password = ?');
// プレースホルダに値をバインドしてSQLを実行
$stmt->execute([$_POST['mail'], $_POST['password']]);

// レコード取得
$result = array();
$data_array = array();

// レコード取得結果が1件以外の場合
if ($stmt->rowCount() != 0) {
    $result = [
        "result" => false,
        "message" => "ログイン失敗",
        "data_array" => $data_array
    ];
} else {
    // レコード取得結果が1件以上の場合(ただし１件のはず)
    foreach ($stmt as $row) {
        $data_array[] = [
            "mail" => $row["mail"],
            "name" => $row["user_name"],
        ];
    }
    $result = [
        "result" => true,
        "message" => "ログイン成功",
        "data_array" => $data_array
    ];
}
// データベース接続を切断
$pdo = null;
echo json_encode($result);
