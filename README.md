# SimpleNodeDialy
Node.jsの勉強として作成した簡素な日記記録アプリ。
# Demo  
npmで以下のモジュールをインストールしてください。（バージョンは動作確認時のバージョンです）  

    config@1.21.0
    ejs@2.5.2
    log4js@0.6.38
    sqlite3@3.1.4

dataディレクトリに含まれるddlを用いて、dataディレクトリ内にDBを用意します。  

    $ cd app/data
    $ sqlite3 dialy.db < dialy.ddl 

以下のコマンドでnodeJSを起動し、http://localhost:8888/list にアクセスするとページが表示されます。  

    $ cd app/
    $ node index.js
