<?php
// ヘッダー情報の設定（ドメイン間通信のセキュリティ設定）
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header("Content-type: application/json; charset=UTF-8");

// DB接続情報
$db['host'] = "mysql306.phy.lolipop.lan";  // DBサーバのURL
$db['user'] = "LAA1512010";  // ユーザー名
$db['pass'] = "frontend24e";  // ユーザー名のパスワード
$db['dbname'] = "LAA1512010-frontend24e";  // データベース名
// DB接続
$pdo = new PDO(
    'mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'] . ';charset=utf8',
    $db['user'],
    $db['pass']
);

// ユーザーリスト取得
$stmt = $pdo->query('SELECT * FROM user');

// ユーザーリスト取得結果を配列に格納
$result = array();
$data_array = array();
// ユーザーリスト取得結果が0件の場合
if ($stmt->rowCount() == 0) {
    $data_array = [
        "mail" => $_POST['mail'],
        "name" => "",
    ];
    $result = [
        "result" => false,
        "message" => "ユーザーリスト取得失敗",
        "usercount" => $stmt->rowCount(),
        "data_array" => $data_array
    ];
} else {
    // ユーザーリスト取得結果が1件以上の場合
    foreach ($stmt as $row) {
        // ユーザーリスト取得結果を配列に格納
        $data_array[] = [
            "mail" => $row["mail"],
            "name" => $row["user_name"],
        ];
    }
    // ユーザーリスト取得成功メイン情報
    $result = [
        "result" => true,
        "message" => "ユーザーリスト取得成功",
        "data_array" => $data_array
    ];
}
// データベース接続を切断
$pdo = null;

// オブジェクトをPHPでJSON文字列形式に変換関数
echo json_encode($result);


