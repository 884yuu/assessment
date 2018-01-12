(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
  * 指定した要素の子要素をすべて削除する
  * @param {HTMLElemnt} element HTMLの要素
  */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    //エンターキーでもクリック関数を呼び出す
    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick(); 
        }
    };

    //ボタンがクリックされた場合の処理

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;

        //ガード句：入力なしの場合は、アラート画面を出力

        if (userName.length === 0) {
            window.alert('名前を入力してから診断ボタンを押してください');
            return;
        }

        //診断結果表示エリアの作成

        //子要素の削除
        removeAllChildren(resultDivided);

        //h3タグ、pタグの生成
        const header = document.createElement('h3');
        header.innerText = '肩書を生成しました：';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたの肩書') + '&text=' + encodeURIComponent(result) + 
        ' http://nazr.in/10Ew';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
        
    }

    const answers1 = [
        '黄金の',
        'まばゆい',
        '大地の',
        '伝説の',
        '白い',
        'どこにでもいる',
        '自ら志願した',
        'なんとなく',
        '三割増しの'
    ];
    const answers2 = [
        '兵士',
        '人間国宝',
        '光',
        '根っこ',
        '実力者',
        '神',
        'プログラマー',
        '作曲家'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */

    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfCharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfCharCode += userName.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って、添え字の数値を求める
        const index1 = sumOfCharCode % answers1.length;
        const index2 = sumOfCharCode % answers2.length;
        let result = '{userName}の肩書は「' + answers1[index1] + answers2[index2] + '」です。';
        //書き換えが発生するので、const→letに変更

        //{userName} をユーザーの名前に置き換える
        result = result.replace(/\{userName\}/g, userName);

        //結果を出力
        return result;
    }

    //テストコード
    console.log(assessment('ハヤシユウ'));
    console.log(assessment('884yuu'));
    console.log(assessment('ハヤシユウ'));
    console.assert(
        assessment('ハヤシユウ') === 'ハヤシユウの肩書は「伝説のプログラマー」です。', '診断結果の特定の部分を名前に置き換える処理が正しくありません。'
    )
    console.assert(
        assessment('ハヤシユウ') === assessment('ハヤシユウ'), '同じ名前を入れた場合の診断結果が異なり、処理が正しくありません。'
    )
})();
