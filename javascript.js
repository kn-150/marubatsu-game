//先攻のマーク
const FIRST_MARK ="○";

//後攻のマーク
const NEXT_MARK = "×";

//ターン数
let count = 1;

//マス目のIDリスト(2次元配列)
const IDs = [
    ['b1', 'b2', 'b3'],
    ['b4', 'b5', 'b6'],
    ['b7', 'b8', 'b9']
];

//ゲームが実行中かどうか判定する変数
let isRun = true;

//先攻のターンかどうか判定する関数
function isFirstMove() {
    let isFirst = count % 2;
    return isFirst == 1;
}

// IDからオブジェクトを取得する
function $(id) {
    return document.getElementById(id);
}

//ターン表記を切り替える関数
function changeDisplayCount() {
    if (isFirstMove()){
        //先攻のターンの場合
        $("display-count").innerHTML = FIRST_MARK + "の番！";
    } else {
        //後攻のターン場合
        $("display-count").innerHTML = NEXT_MARK + "の番！";
    }
}

//試合終了を判定する関数
function judgeEnd(){
    let isEnd = false;
    //横3マスは同じマークか判定する
    for (let row = 0; row < 3; row++){
        //勝敗を判定する
        isEnd = isWin(IDs[row][0],IDs[row][1],IDs[row][2]);
        if(isEnd) {
            displayResult($(IDs[row][0]).value + "の勝ち！");
            return true;
        }
    }
    //縦3マスは同じマークか判定する
    for (let col =0; col <3; col++){
        //勝敗を判定する
        isEnd = isWin(IDs[0][col], IDs[1][col], IDs[2][col]);
        if (isEnd){
            displayResult($(IDs[0][col]).value + "の勝ち！");
            return true;
        }
    }

    //斜め3マスは同じマークか判定する（右下がり）
    isEnd = isWin(IDs[0][0],IDs[1][1],IDs[2][2]);
    if (isEnd) {
        displayResult($(IDs[0][0]).value + "の勝ち！");
        return true;
    }
    //斜め3マスは同じマークか判定する（左下がり）
    isEnd = isWin(IDs[0][2],IDs[1][1],IDs[2][0]);
    if (isEnd) {
        displayResult($(IDs[0][2]).value + "の勝ち！");
        return true;
    }

    //引き分けの判定
    if (count >= 9) {
        displayResult("引き分け！");
        return true;
    }

    //ゲームが続行する場合はfalseを返す
    return false;
}

// 勝利を判定する関数
function isWin(firstId, secondId, thirdId){
    //１つ目のマス目が空の場合は、この処理を終了する
    if ($(firstId).value == '') {
        return false
    }
    //2つ目のマス目が空の場合は、この処理を終了する
    if ($(secondId).value == '') {
        return false
    }
    //3つ目のマス目が空の場合は、この処理を終了する
    if ($(thirdId).value == '') {
        return false
    }
    //空ではなかったとき、３つのマス目が同じマークである場合は勝利
    if(
        ($(firstId).value == $(secondId).value)
        && ($(secondId).value == $(thirdId).value) 
        ) {
            return true;
    }
    //空ではなかったとき、３つのマス目が異なるマークである場合はドロー
    return false;
}

//勝敗の結果を表示する関数
function displayResult (message) {
    $("display-result").innerHTML = message;
    isRun = false;

}

// クリックされたときの処理
function clickAction(event) {
    //ゲーム実行中でなければ、何もせずに終了
    if (!isRun) {
        return;
    }
    // eventからクリックされた時のマス目を取得する
    let id=event.target.id;

    // IDからオブジェクトを取得する
    let object=$(id);

    //すでにマス目に値が設定されている場合はスキップ
    if (object.value != "") {
        return;
    }

    // オブジェクト（マス目）に印をつける
    if (isFirstMove()){
        object.value = FIRST_MARK;
    } else {
        object.value = NEXT_MARK;
    }

    //ゲーム終了を判定する関数
    if (judgeEnd()){
        return;
    }

    //ターン数を+1する
    count = count + 1;

    //ターン表示を切り替える関数
    changeDisplayCount();
}

//もう一度遊ぶ のボタンが押されたときの処理用関数
function resetAction() {
    //ターンを1に戻す
    count = 1;
    changeDisplayCount();
    //マス目を空にする
    for( let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            $(IDs[row][col]).value = "";
        }
    }
    //結果の表示をリセットする
    displayResult("");
    //ゲームを実行中に戻す
    isRun = true;
}

// 画面を読み込んだ時の処理
function onloadAction() {
    //マス目にイベントを設定する
    for( let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            $(IDs[row][col]).onclick = clickAction;
        }
    }

    //もう一度遊ぶボタンにイベントを設定する
    $('reset').onclick = resetAction;
}

// 画面読み込み時のイベントを設定
window.onload = onloadAction();