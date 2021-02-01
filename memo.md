
#Vueインスタンスライフサイクル
  ◎Vueインスタンスライフサイクルとは
    Vueの内部構造。作成から最後まで。
  ◎具体的内容
  【はじまり】
  ① new Vue() ： 新しいVueインスタンス作成を命令
    - beforeCreate() ： メソッド
  ② インスタンスがつくられる (data, methodなどのプロパティはこのときにできる)
    - created() : メソッド
  ③ elがあるかどうか
    ③-1 YES
      templateをrender関数にコンパイル
    ③-2 NO
      vm.$mount()が呼ばれたときに、templateをrender関数にコンパイル
    - beforeMount() : メソッド --仮想NODEが仮想DOMになる前--
  ④ $elを作って実際のDOMに追加 （このときに仮想DOM→表示されるDOMになる）
    - mounted() : メソッド --仮想DOMをDOMに反映させる（上に乗せる）イメージ--
  ⑤ マウント！！（DOM作成完了！）
  ⑥ データが変更
    - beforeUpdate() : メソッド (DOMの再描画前)
  ⑦ DOMを再描画
    - updated() : メソッド (DOMの再描画後)
  ⑧ DOMを再描画
    -beforeDestroy() : メソッド (破壊前)
  ⑨ 破壊
    -destroyed() : メソッド(破壊後)
  【おわり】

#コンポーネント
  ◎コンポーネントとは
    再利用できるようにしたもの
  ◎コンポーネントの種類
    ・グローバルコンポーネント
  ◎コンポーネントの注意点
    （１）dataはfunctionのreturnでオブジェクトを返す
      なぜ？：コンポーネントの独立性を高めるため
      →オブジェクトにした場合、同じコンポーネントで同じデータを共有してしまう
  ◎コンポーネントの使用方法
    ①定義の方法
      Vue.component(第一引数, 第二引数)
      第一引数：コンポーネントの名前
      第二引数：内容（書き方はインスタンスの中身と似ている）
      （例）
      Vue.component('sho', {
        data: function() {
          return {
            name: sho,
            age: 24,
          }
        },
        .....
      })
    ②呼び出しの方法
      <コンポーネント名></コンポーネント名>
      （例）
      <my-component></my-component>
  ◎コンポーネントの登録方法
    ①グローバル登録
      Vue.component('コンポーネント名', {
        // コンポーネントの中身
      })
    ②ローカル登録
      (1)変数定義
      var 変数名 = {
        //コンポーネントの中身
      }
      (2)登録
      new Vue ({
        el: '',
        components: {
          'コンポーネント名': 変数名
        }
      })

#ES5とES6の書き方の違い
  （ES5）
    data: function() {
    }
  (ES6)
    data() {
    }

#単一ファイルコンポーネントをグローバル登録する方法
  （main.js）
    import コンポーネント名 from 'コンポーネントファイルの相対パス'
    Vue.component('コンポーネント名' コンポーネントファイル名);
  （コンポーネント.vue）
    コンポーネントの内容を記述
    ※ 使用するページでのimportは不要！
  → すべてのページで<コンポーネント名 ></コンポーネント名>で使えるようになる

  単一ファイルコンポーネントをローカル登録する方法
  (登録先のファイル)
    import 登録するコンポーネント from '相対パス'

    <script>
      export default {
        components: {
          変数登録: 登録するコンポーネント
        }
      }
    </script>

#vueファイル
  ◎vueファイルとは
    インポートをしたら、最終的にコンポーネントをオブジェクトになるファイル

#単一ファイルコンポーネントの注意点
  <template></template>内は一つのルートしかかけない
  （例）
   <templete>
    <div>
      <p></p>
      <button></button>
    </div>
   </templete>

#コンポーネントの記述方式
  ◎ケバブケース
    like-header
  ◎パスカルケース
    LikeHeader
  基本的にはパスカルケースで書く！
  注）DOMテンプレートの中ではケバブケースで！（htmlファイルの場合）
  キャメルケースはなし！
  コンポーネントはバスカルかケバブ

#コンポーネント間のデータのやり取り
  ◎親から子 (props)
    (1)子コンポーネントで「props」を定義
      props: ["number"]
    (2)親コンポーネントのタグ内で属性を指定（属性はケバブケースで記述）
      <LikeNumber :total-number="number"></LikeNumber>

    ※バリデーション (props をオブジェクトで指定) → エラーの早期発見のため
    (1) props: {
          プロパティ名 : 型
          totalNumber: Number
        }
    (2) totalNumber: {
          type: Number,
          // 必ずこの属性が必要かどうかを決める
          required: true,
        }



  ◎子から親 ($emit()) → 好きなタイミングで親コンポーネントのメソッドを発火できる
    (1)送り口 : 子コンポーネントで$emit()を定義
      $emit("変数名（自由定義）", 受け渡すデータ名)

      methods: {
        increment() {
          this.$emit("my-click", this.totalNumber + 1);
        }
      }
    
    (2)受け口
      v-on="'変数名（自由定義）' = ''