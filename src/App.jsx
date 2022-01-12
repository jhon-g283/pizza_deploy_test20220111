/**
 * mainクラス
 *
 *
 */

import "./styles.css";
import React from "react";
import Doughfnc from "./Dough_sheet"; //生地表示用関数コンポーネント
import ToppingList from "./Topping"; //トッピングの選択用コンポーネント
import ToppingView from "./Show_Topping"; //配置したトッピングの表示用コンポーネント
import OrderDetail from "./Order_detail"; //配置したトッピングの値段計算、表示用コンポーネント
import Editpanel from "./Edit_panel"; //配置したトッピング用の編集用パネル
import { getpriceobj } from "./PriceList"; //画像名からトッピングの値段を取得するコンポーネント
import InputOrderInfo from "./Input_OrderInfo"; //配送先の入力用コンポーネント
import HelpPopup from "./HelpPopup"; //ヘルプ画面
import DoughSelector from "./Dough_selector"; //生地選択画面

import bcg_topping1 from "./img/background/Toppings1.png";
import bcg_topping2 from "./img/background/Toppings2.png";

// サイドメニューバーの画像
import bcg_sidemenue1 from "./img/background/Sidemenu1.png";
import bcg_sidemenue2 from "./img/background/Sidemenu2.png";
import bcg_sidemenue3 from "./img/background/Paper.png";

import Icon_Dough1 from "./img/dough/Dough1.png"; //初期表示用のsrc

// import bcg_test2 from "./img/background/export3.png";
import bcg_test3 from "./img/background/export9.png";
import bcg_test4 from "./img/background/export10.png";

import bcg_test from "./img/background/export11.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("const --App--");
    console.log(props);
    // 関数をこのクラスで使用できるようにバインド
    this.click_selection_tag = this.click_selection_tag.bind(this);
    this.change_gzai_img = this.change_gzai_img.bind(this);
    this.update_main_state = this.update_main_state.bind(this);
    this.change_index_cnt = this.change_index_cnt.bind(this);
    this.change_img_index = this.change_img_index.bind(this);
    this.PreviewCanvas = this.PreviewCanvas.bind(this);
    this.Change_To_Edit = this.Change_To_Edit.bind(this);
    this.Show_Order_Pop = this.Show_Order_Pop.bind(this);
    this.Resetfnc = this.Resetfnc.bind(this);
    this.Help_Pop = this.Help_Pop.bind(this);
    this.Dough_Pop = this.Dough_Pop.bind(this);
    this.Change_Dough_number = this.Change_Dough_number.bind(this);
    this.onDropDrop_prevent = this.onDropDrop_prevent.bind(this);
    this.state = {
      flg: false, //サイドバーのトッピング表示用フラグ
      flg_review: false, //レビューモードへの切り替えフラグ
      flg_input: false, //入力画面の表示非表示フラグ
      flg_sidebar: false, //ハンバーガーメニューの表示用フラグ
      flg_help: false, //ヘルプ画面用のフラグ
      flg_dough: false, //生地選択画面のフラグ
      flg_camvas_animation: false, //ガイドCanvasのアニメーション変更用のフラグ
      topping_type: "veg", //現在選択してるトッピングの種類
      topping_img_index: 1, //トッピング画面のページ番号,
      dough_src: Object.values({ Icon_Dough1 }), //生地の画像のソース
      cnt: 0, //注文具材の配列インデックス
      max_index: 0, //具材のインデックスの最大値（進む戻るボタンで比較する）
      // add_topping_fnc: this.update_main_state, //具材クローンに渡す移動用関数
      add_index_fnc: this.change_index_cnt, //戻る進むボタンに渡す関数
      add_reset_fnc: this.Resetfnc, //リセット用の関数
      Toppingimage_index_fnc: this.change_img_index, //トッピングのページ（インデックス）の変更用関数
      change_help_flg: this.Help_Pop, //ヘルプメニューのフラグ切り替え用関数
      change_dough_flg: this.Dough_Pop, //生地選択画面のフラグ切り替え用
      change_doug_src: this.Change_Dough_number, //生地のSRC変更用の関数
      range_obj: {}, //判定範囲用のオブジェクト
      range_obj2: {}, //ガイド用キャンバスの位置、長さ
      range_obj3: {}, //出来上がり図用のキャンバスの位置、長さ
      canvas_topping: {}, //使用してるが不要なので処理を消す
      Ingredients_obj: [
        //具材ごとの注文詳細用オブジェクト
        {
          name: "", //具材名
          price: "" //値段
        }
      ],

      Ingredients_imgs: Array().fill(null), //トッピングの画像保持用のオブジェクト
      style_feedin: {}
    };
  }

  // マウント後にIDから要素の大きさを取得
  componentDidMount() {
    let dough_node = document.getElementById("Dough_img2");

    //生地画像の位置情報や大きさを取得してトッピングの範囲を設定
    console.log("componentDidMount:App");
    var Dom_dough = dough_node.getBoundingClientRect(); //情報取得
    let dough_x = Dom_dough.x; //横位置
    let dough_y = Dom_dough.y; //縦位置
    let dough_width = Dom_dough.width; //長さ
    let dough_height = Dom_dough.height; //高さ
    let width_quart = dough_width / 8; //範囲調節用に画像の長さの８分の１の値を取得
    let height_quart = dough_height / 8; //範囲調節用に画像の長さの８分の１の値を取得

    // 高さが低すぎたら調整する。
    if (dough_height < 100) {
      console.log("dough_height + 300 ");
      dough_height += 300;
    }

    let dough_x_end = dough_x + dough_width; //横範囲のの最大値
    let dough_y_end = dough_y + dough_height; //縦範囲の最大値
    console.log(dough_node.getBoundingClientRect());
    console.log("dough_x:" + dough_x); //
    console.log("dough_y:" + dough_y);
    console.log("dough_width:" + dough_width);
    console.log("dough_height:" + dough_height);
    console.log("width_quart:" + width_quart);
    console.log("height_quart:" + height_quart);

    console.log("dough_x_end:" + dough_x_end);
    console.log("dough_y_end:" + dough_y_end);
    dough_x = dough_x + width_quart; //範囲開始地点を延長
    // dough_width = dough_width - width_quart;
    dough_y = dough_y + height_quart; //範囲開始地点を延長
    dough_x = Math.round(dough_x); //四捨五入
    dough_y = Math.round(dough_y); //四捨五入

    // dough_height = dough_height - height_quart;
    dough_x_end = dough_x_end - width_quart; //範囲の終了地点を縮小
    dough_y_end = dough_y_end - height_quart; //範囲の終了地点を縮小

    // 生地の範囲情報をオブジェクトにセット
    let doug_range = {
      dough_x: dough_x,
      dough_y: dough_y,
      dough_x_end: dough_x_end,
      dough_y_end: dough_y_end
    };

    // canvasの位置情報を取得

    let canvas_node = document.getElementById("review_wcanvas"); //canvas要素取得
    let canvas_rect = canvas_node.getBoundingClientRect(); //要素情報を取得
    let canvas_x = canvas_rect.x; //横
    canvas_x = parseInt(canvas_x, 10); //１０進化
    canvas_x = canvas_x + "px"; //ピクセル化
    let canvas_y = canvas_rect.y; //縦
    canvas_y = parseInt(canvas_y, 10); //１０進化
    canvas_y = canvas_y + "px"; //ピクセル化

    var canvas_width = parseInt(canvas_rect.width, 10); //横の長さ
    var canvas_height = parseInt(canvas_rect.height, 10); //縦の長さ

    //更新用のオブジェクト
    let rev_canvas_info = {
      rev_canv_xposi: canvas_x,
      rev_canv_yposi: canvas_y,
      rev_canv_width: canvas_width,
      rev_canv_height: canvas_height
    };

    // console.log(rev_canvas_info);
    // 生地画像の位置情報を取得
    // ※かぶっている処理があるので要修正
    // let Dough_img_node = document.getElementById("Dough_img2"); //画像の要素取得
    // let dough_img_rect = Dough_img_node.getBoundingClientRect(); //要素の位置情報取得
    // let d_img_x = dough_img_rect.x;
    // let d_img_y = dough_img_rect.y;

    // console.log(canvas_rect);
    // console.log(dough_img_rect);
    // console.log("canvas_x:" + canvas_x);
    // console.log("canvas_y:" + canvas_y);
    // console.log("d_img_x:" + d_img_x);
    // console.log("d_img_y:" + d_img_y);

    // let canvas_node2 = document.getElementById("review_wcanvas2"); //canvas要素取得
    let guide_length_x = dough_width - width_quart * 2; //ガイド用のキャンバスの長さを４分の１削る
    let guide_length_y = dough_height - height_quart * 2; //ガイド用のキャンバスの長さを４分の１削る

    console.log("dough_x:" + dough_x);
    console.log("dough_y:" + dough_y);

    // ガイド用のキャンバスに使用する位置や範囲の情報
    let d_img_range = {
      d_img_x: Dom_dough.x, //画像の位置：横
      d_img_y: Dom_dough.y, //画像の位置：縦
      guide_range_xposi: dough_x + "px", //範囲の開始位置
      guide_range_yposi: dough_y + "px", //範囲の開始位置
      guide_length_x: guide_length_x, //範囲の長さ
      guide_length_y: guide_length_y //範囲の高さ
    };

    var src = Object.values({ bcg_test }); //背景画像のsrc

    // スタイルを設定
    let style_tmp = {
      animation: "feed_in_slide 0.5s", //０.５秒でフェードイン
      backgroundImage: "url(" + src + ") ", //背景画像
      // "background-size": "200px 200px",
      backgroundRepeat: "no-repeat" //繰り返しなし
    };
    // console.log(style_tmp);

    // ステート更新
    this.setState({
      range_obj: doug_range,
      range_obj2: d_img_range, //ガイド用キャンバスの位置、長さ
      range_obj3: rev_canvas_info, //出来上がり図のキャンバス用の位置、長さ
      style_feedin: style_tmp, //初期表示時のスタイル
      flg_help: true
    });
    //
  }

  // 具材の配列やインデックス状態を更新する。
  // node:追加具材のノード
  update_main_state(node) {
    console.log("---update_state----");
    let crrent_cnt = this.state.cnt; //現在のインデックス数
    let tmp = this.state.cnt + 1; //インデックスをインクリメント
    let current_tag_push = this.state.Ingredients_imgs.slice(0, crrent_cnt); //インデックス数に応じて要素数を変更した、現在の注文具材の配列を

    let tmp2 = current_tag_push.concat(node); //現在の配列に新たに画像を配列に追加する。

    // （要改修）画像名から具材を把握する------
    let src = node.src; //トッピングで追加した画像（ノード）のsrc

    let tmp_obj = getpriceobj(src); //画像の名前から値段、トッピング名が入ったオブジェクトを取得する。

    var tmp_ing_name = tmp_obj["name"]; //名前
    var tmp_ing_price = tmp_obj["price"]; //値段

    // ステートにある表示中のトッピングの配列を取得する。
    // 現在の配列のインデックスもステートにあるのでインデックスの長さを変更することで
    // トッピングのやり直しや上書きに使用する
    let current_tag_history = this.state.Ingredients_obj.slice(0, crrent_cnt); //インデックスの数に応じて配列を切り出す。
    let add_history = { name: tmp_ing_name, price: tmp_ing_price }; //追加する部分の配列。
    let tmp_array = current_tag_history.concat(add_history); //現在表示中の配列に、追加部分を結合させる。
    // ---------------------

    // state更新
    this.setState({
      Ingredients_obj: tmp_array, //具材の注文状況
      cnt: tmp, //インデックス数
      max_index: tmp, //インデックスの最大値
      Ingredients_imgs: tmp2 //具材の画像配列
    });
  }

  //具材の選択タグをクリックした時に表示させる処理
  click_selection_tag(event, flg_name) {
    console.log("--function click_selection_tag--");
    console.log("flg_name:" + flg_name);

    let tmp_flg;

    if (flg_name === "topping") {
      // 現在のサイドバーのトッピングの部分のフラグの値を反転させる。
      console.log(this.state.flg + "->" + !this.state.fl);
      tmp_flg = !this.state.flg;
      // ステート更新
      this.setState({
        flg: tmp_flg
      });
    } else if (flg_name === "menu") {
      // 現在のメニューバーのトッピングの部分のフラグの値を反転させる。
      console.log(this.state.flg_sidebar + "->" + !this.state.flg_sidebar);
      tmp_flg = !this.state.flg_sidebar;
      // ステート更新
      this.setState({
        flg_sidebar: tmp_flg
      });
    }
  }

  //クローンした具材オブジェクトにつけるイベント(引数でコンポーネントに関数を渡す)
  //マウスムーブに合わせて移動する機能
  onMouseMove_add(event, range) {
    var target = event.target; //ターゲットオブジェクト取得
    var move_check = target.className; //クラス名取得

    // クラス名で動かすかどうかを判断、クラス名がnot_movingなら動かさない
    if (move_check === "not_moving") {
      console.log("can not move");
      return;
    }

    console.log("main-add-function");
    // console.log(range);
    //(要修正)------------
    //カーソルの位置を取得し画像の位置を変更
    var x = event.clientX; //横
    var y = event.clientY; //縦
    // カーソルが画像の真ん中に来るように少し位置をずらす。
    x = x - 50;
    y = y - 50;

    // var move_obj = event.target; //ターゲット取得（ムーブさせてる画像）
    // var width = move_obj.offsetWidth;
    // var height = move_obj.offsetHeight;

    // let clone_x = x - width / 2 + "px";
    // let hight_tmp = y - height / 2;

    // let clone_y = hight_tmp + "px";

    // let x_posi_tmp = x - width / 2 + "px";
    // let y_posi_tmp = hight_tmp + "px";

    // 範囲外の時の処理（スタイル変更で知らせるとか何か考える）
    if (x > range.dough_x_end || x < range.dough_x) {
      console.log("x out of range!:" + x);
    }

    if (y > range.dough_y_end || y < range.dough_y) {
      console.log("y out of range!:" + y);
    }

    // --------------
    // マウスカーソルの位置に画像の位置を変更させる。
    target.style.top = y + "px"; //縦
    target.style.left = x + "px"; //横
    target.style.position = "absolute"; //絶対値指定
    target.style.zIndex = 1000; //高さをいったん１０００に
  }

  //クローンしたトッピングオブジェクトにつけるイベント(引数でコンポーネントに関数を渡す)
  //クリックでマウスムーブのON／OFFの切り替え機能
  onClick_add(event, range) {
    var target = event.target; //ターゲット取得
    var c_name = target.className; //クラス名

    var x = event.clientX; //縦
    var y = event.clientY; //横

    var flg = true; //判定用のフラグ

    // ターゲットが指定の範囲外で固定されないように、引数で受け取った生地の有効範囲内かチェック
    //横の位置は範囲内か？
    if (x > range.dough_x_end || x < range.dough_x) {
      flg = false;
      console.log("can not paste bocause of x out of range!:" + x);
    }
    // 縦の位置は範囲内か？
    if (y > range.dough_y_end || y < range.dough_y) {
      flg = false;
      console.log("can not paste bocause of y out of range!:" + y);
    }

    //範囲内ならクラス名の切り替えを行う
    //not_movingだとmovingへ
    if (c_name === "moving" && flg === true) {
      target.className = "not_moving";
      // target.width = "50";
      console.log("new_className:" + target.className);
    } else if (flg === true) {
      target.className = "moving";
      // target.width = "100";
      console.log("new_className:" + target.className);
    }

    // 範囲外ならガイド用キャンバスのIDから要素を取得して、
    // クラス名を一度変更した後、数秒後に戻す
    if (flg === false) {
      var guidecanvas = document.getElementById("guide_canvas"); //現在のガイド用キャンバス取得
      const pre_classname = guidecanvas.className; //クラス名を取得

      // クラス名を取得した後、時間差でクラス名を設定することでアニメーションを動作させる。
      // 時間差で実行するかんす
      const resetfnc = () => {
        guidecanvas.className = pre_classname; //クラス名を前のクラス名にする。
        console.log("execute settimeout");
      };

      guidecanvas.className = "canv_add"; //クラス名を一度変更
      setTimeout(resetfnc, 1000); //１秒後に実行
    }
  }

  // サイドバーの具材の切り替え
  //サイドバーでstateを変更して操作して外部コンポーネントに渡す
  change_gzai_img(str) {
    var tmp = 1; //画像インデックス初期値
    // トッピングの種類と、画像インデックスを初期値にしてステート更新
    this.setState({ topping_type: str, topping_img_index: tmp });
    console.log("topping type:" + str + "  -> " + this.state["topping_type"]);
  }

  // 画像のindex変更用（要修正インクリメントとデクリメントの切り替え）
  change_img_index(flg) {
    // インクリメントするが、１か２にする
    var current_index = this.state.topping_img_index;
    var tmp = current_index + 1;

    if (tmp > 2) {
      tmp = 1;
    }
    // ステート更新
    this.setState({ topping_img_index: tmp });
    console.log("topping type:" + current_index + "  -> " + tmp);
  }

  // トッピング画像配列のインデックスの操作を行う関数
  change_index_cnt(opt) {
    let tmp = this.state.cnt; //現在のインデックス
    console.log("-- change_index_cnt--");

    if (opt === "back") {
      // 戻るボタン押下時
      if (tmp > 0) {
        // インデックス数が０より大きい時
        console.log("click back");
        tmp = tmp - 1;
      } else {
        // マイナスにしないように０の時は処理終了
        console.log("no more back");
        return;
      }
    } else if (opt === "forward") {
      // 進むボタン押下時
      console.log("click forward");
      tmp = tmp + 1;
    } else if (opt === "reset") {
    }

    this.setState({ cnt: tmp }); //ステート更新

    console.log("operation:" + opt + "tmp" + tmp + "");
  }

  // 完成図の表示機能、Canvasに生地画像とトッピングの画像を複製して描画させる
  PreviewCanvas() {
    console.log("--previewcanvas--");
    var all_topping = document.querySelectorAll(".not_moving"); //固定されている（クラス名から判断）トッピング取得

    var canvas = document.getElementById("review_wcanvas"); //canvas作成

    var context = canvas.getContext("2d"); //コンテキスト取得
    var img_dough = document.getElementById("Dough_img2"); //生地の画像の要素取得
    var imd_dough_w = img_dough.width; //画像の幅取得
    var imd_dough_h = img_dough.height; //画像の高さ取得

    canvas.width = imd_dough_w; //canvasの幅を生地画像と同じに
    canvas.height = imd_dough_h; //canvasの高さを生地画像と同じに

    var tmp = this.state.range_obj3; //出来上がり図用のキャンバスの位置などを取得

    tmp.rev_canv_width = imd_dough_w; //キャンバスの長さをを生地の画像に合わせる：縦
    tmp.rev_canv_height = imd_dough_h; //キャンバスの長さをを生地の画像に合わせる：横

    context.drawImage(img_dough, 0, 0, imd_dough_w, imd_dough_h); //生地画像を描画

    // 生地の位置情報セット
    var img_x = parseInt(this.state.range_obj2.d_img_x, 10); //生地画像の縦位置
    var img_y = parseInt(this.state.range_obj2.d_img_y, 10); //生地画像の横位置

    // トッピングの数だけループしてCanvasに描画
    for (const i of all_topping.values()) {
      let x = i.style.left; //トッピングの横位置
      // 横情報計算
      x = x.replace("px", ""); //pxを消す
      x = parseInt(x, 10); //１０進化

      x = x - img_x; //生地の横位置だけ除いて相対的な位置にする。

      // 縦情報取得
      let y = i.style.top; //トッピングの横位置
      y = y.replace("px", ""); //pxを消す
      y = parseInt(y, 10); //１０進化

      y = y - img_y; //生地の横位置だけ除いて相対的な位置にする。

      // 描画実施
      context.drawImage(i, x, y, i.width, i.height);
    }
    // ステートのレビューモード用のフラグをTrueに更新
    this.setState({ flg_review: true, canvas_topping: all_topping });
  }

  //レビューモードから編集モードへ戻るための関数
  Change_To_Edit() {
    console.log("--cahge_to_edit--");
    //キャンバスを初期化する。
    var canvas = document.getElementById("review_wcanvas"); //canvas取得
    var canvas_x = canvas.width; //canvasの幅
    var canvas_y = canvas.height; //canvasの高さ

    var context = canvas.getContext("2d"); //コンテキスト取得
    context.clearRect(0, 0, canvas_x, canvas_y); //canvasの指定の範囲だけ画素をを初期化
    canvas.width = 0; //canvasの幅を初期化
    canvas.height = 0; //canvasの高さを初期化
    this.setState({ flg_review: false, flg_input: false }); //ステート内のレビューフラグをFalseへ更新
  }

  // 住所入力画面の表示よう関数
  // 出来上がり図のキャンバスの位置を取得して入力画面表示などで使うステート（位置情報）を更新する。
  Show_Order_Pop() {
    console.log("--function Show_Order_Pop---");
    var canvas = document.getElementById("review_wcanvas"); //canvas取得
    var canvas_rect = canvas.getBoundingClientRect(); //位置や長さの叙法取得

    let canvas_x = canvas_rect.x; //横の位置
    canvas_x = parseInt(canvas_x, 10); //１０進化
    canvas_x = canvas_x + "px"; //ピクセル化

    let canvas_y = canvas_rect.y; //縦の位置
    canvas_y = parseInt(canvas_y, 10); //１０進化
    canvas_y = canvas_y + "px"; //ピクセル化

    let canvas_width = canvas_rect.width; //長さ
    canvas_width = parseInt(canvas_width, 10); //１０進化

    let canvas_height = canvas_rect.height; //縦
    canvas_height = parseInt(canvas_height, 10); //１０進化

    // 更新用にオブジェクトでまとめる
    let rev_canvas_info = {
      rev_canv_xposi: canvas_x,
      rev_canv_yposi: canvas_y,
      rev_canv_width: canvas_width,
      rev_canv_height: canvas_height
    };

    // ステート更新
    this.setState({ range_obj3: rev_canvas_info, flg_input: true });
  }

  // リセットボタン・注文後の初期化機能の予定
  Resetfnc(mode) {
    console.log("---Reset function---");

    var tmp_array = [
      //具材ごとの注文詳細用オブジェクト
      {
        name: "", //具材名
        price: "" //値段
      }
    ];

    var tmp2 = Array().fill(null); //トッピング用の空の配列
    var conf;

    if (mode === "reset") {
      conf = confirm("リセットしますか？");
      if (conf) {
        console.log("reset");

        this.setState({
          Ingredients_obj: tmp_array, //具材の注文状況
          cnt: 0, //インデックス数
          max_index: 0,
          Ingredients_imgs: tmp2 //具材の画像配列
        });
      }
    } else if (mode === "order") {
      conf = confirm("注文しますか？");
      if (conf) {
        console.log("reset");

        //ステート更新
        this.setState({
          Ingredients_obj: tmp_array, //具材の注文状況
          cnt: 0, //インデックス数
          max_index: 0, //インデックスうの最大値
          Ingredients_imgs: tmp2 //具材の画像配列
        });
      }
    }

    console.log("--Reset function end--");
  }

  // Help画面の切り替え
  Help_Pop() {
    // フラグを切り替える。
    var tmp = this.state.flg_help;
    tmp = !tmp;

    console.log("--fnction Help_Pop--");
    console.log("help flag change :" + !tmp + " --> " + tmp);

    this.setState({ flg_help: tmp });
  }

  //生地選択画面のフラグ変更用
  Dough_Pop() {
    // ヘルプ画面表示用のフラグを切り替える。
    var tmp = this.state.flg_dough;
    tmp = !tmp;

    console.log("--fnction Dough_Pop--");
    console.log("help flag change :" + !tmp + " --> " + tmp);

    this.setState({ flg_dough: tmp });
  }

  // 生地のsrcを変更する関数
  //生地選択画面に引数として渡す。
  Change_Dough_number(src) {
    var tmp = src; //引数でsrc取得

    console.log("--fnction Change_Dough_number--");

    // ステート更新
    this.setState({ dough_src: tmp });
  }

  // 画面上でのドラッグ時に画像の戻りを防ぐ関数
  //画面全体の<div>に適用することで画面全体で画像の初期位置に戻る処理を止める
  onDropDrop_prevent(event) {
    console.log("App_drop_function");
    // console.log(event.cancelable);
    event.preventDefault(); //eventのpreventDefaultでイベントの処理を終了
    // event.stopPropagation();
  }

  render() {
    console.log("render ---App----");

    var style_ani; //アニメーションを当てるためのスタイル

    // ページ全体の背景の設定用のスタイル。
    let style_bkg = {
      backgroundImage: "url(" + Object.values({ bcg_test }) + ") ", //background-image
      backgroundSize: "100% 100%", //background-size
      height: "100%",
      top: "0%",
      right: "0%",
      left: "0%",
      bottom: "0%"
      // "max-height": "2000px",
      // margin: "0px 0px 0px 0px" ,
      // position :"absolute",
      // padding:"0px 0px 0px 0px"
      // "background-repeat": "no-repeat"
    };

    // 黒板の真ん中の要素の緑色の部分スタイルの設定
    var style_topping = {
      backgroundImage: "100% 100%",
      backgroundColor: "#02462af3", //色を緑へ　background-color
      margin: "0px 10% 0px 10%",
      position: "center", //位置を中心へ
      maxWidth: "500px", // max-width
      backgroundRepeat: "no-repeat" //background-repeat
      // height:"100%",
      // width:"100%",
    };

    // 黒板の上側の要素の緑色の部分スタイルの設定
    var style_topping2 = {
      backgroundImage: "url(" + Object.values({ bcg_test3 }) + ") ",
      backgroundSize: "100% 100%",
      backgroundColor: "#02462af3", //色を緑へ
      margin: "0px 10% 0px 10%",
      position: "center", //位置を中心へ
      height: "30px",
      maxWidth: "500px", //最大値設定
      backgroundRepeat: "no-repeat"
      // transform:"rotate(90deg)",
      // width:"100%",
    };

    // 黒板の下側の要素の緑色の部分スタイルの設定
    var style_topping3 = {
      backgroundImage: "url(" + Object.values({ bcg_test4 }) + ") ",
      backgroundSize: "100% 100%",
      backgroundColor: "#02462af3", //色を緑へ
      margin: "0px 10% 0px 10%",
      position: "center", //位置を中心へ
      height: "30px",
      maxWidth: "500px", //最大値設定
      backgroundRepeat: "no-repeat"
      // transform:"rotate(90deg)",
      // width:"100%",
    };

    // トッピング画面の上側のスタイル
    var style_topping_top = {
      backgroundImage: "url(" + Object.values({ bcg_topping1 }) + ") ",
      backgroundSize: "100% 100%",
      backgroundColor: "white",
      position: "center",
      height: "30px",
      maxWidth: "700px",
      backgroundRepeat: "no-repeat"
      // transform:"rotate(90deg)",
      // margin: "0px 10% 0px 10%",
      // padding: "10px 100px 10px 100px",
      // width:"100%",
    };
    // トッピング画面下側のスタイル
    var style_topping_bottom = {
      backgroundImage: "url(" + Object.values({ bcg_topping2 }) + ") ",
      backgroundSize: "100% 100%",
      backgroundColor: "white",
      position: "center",
      height: "30px",
      maxWidth: "700px",
      backgroundRepeat: "no-repeat"
      // transform:"rotate(90deg)",
      // margin: "0px 10% 0px 10%",
      // padding: "10px 100px 10px 100px",
      // width:"100%",
    };

    // トサイドメニューバーの上側のスタイル
    var style_sidemenue_top = {
      backgroundImage: "url(" + Object.values({ bcg_sidemenue1 }) + ") ",
      backgroundSize: "100% 100%", //background-size
      margin: "0px 10% 0px 10%",
      position: "center",
      height: "30px",
      maxWidth: "500px",
      backgroundRepeat: "no-repeat"
      // width:"100%",
      // padding: "10px 100px 10px 100px",
      // "background-color": "white",
      // transform:"rotate(90deg)",
    };

    // サイドメニューバーの下側のスタイル
    var style_sidemenue_bottom = {
      backgroundImage: "url(" + Object.values({ bcg_sidemenue2 }) + ") ",
      backgroundSize: "100% 100%",
      backgroundColor: "white",
      margin: "0px 10% 0px 10%",
      position: "center",
      height: "30px",
      maxWidth: "500px",
      backgroundRepeat: "no-repeat"
      // width:"100%",
      // "background-clip":"content-box",
      // transform:"rotate(90deg)",
      // padding: "10px 100px 10px 100px",
    };

    var style_sidemenue_middle = {}; //サイドメニューバーの真ん中のスタイル

    // サイドメニューバーのトッピングの変更部分のアニメーションをスタイルで設定
    if (this.state.flg === true) {
      // 開くとき
      style_ani = {
        animation: "acord1 0.5s"
      };
    } else {
      // 閉じる時（要素事態を消すせいか動いてない）
      style_ani = {
        animation: "acord2 0.5s"
      };

      //
    }

    // サイドメニューバーのトッピングの種類変更を行う部分
    const Ingredients = (
      <div className="opt_menu">
        <ul style={style_ani}>
          <li onClick={() => this.change_gzai_img("meat")}>
            <span className="marker">肉</span>
          </li>
          <li onClick={() => this.change_gzai_img("veg")}>
            <span className="marker">野菜</span>
          </li>
          <li onClick={() => this.change_gzai_img("cheese")}>
            <span className="marker">チーズ類</span>
          </li>
          {/* <li onClick={() => this.change_gzai_img("")}>そのほか</li> */}
        </ul>
      </div>
    );

    //サイドメニューの位置調整用
    // ガイド用のキャンバスから位置や長さを取得して調整する。
    let side_list_x_tmp1 = this.state.range_obj2.guide_length_x; //長さ
    let side_list_x_tmp2 = this.state.range_obj2.d_img_x; //横の位置
    let side_list_y_tmp1 = this.state.range_obj2.d_img_y; //縦の位置

    // 横の位置を微調整
    let side_list_x =
      parseInt(side_list_x_tmp1, 10) + parseInt(side_list_x_tmp2, 10) + 50;
    let side_list_y = parseInt(side_list_y_tmp1, 10);

    //サイドメニューバーの横の位置のスタイル
    var style_x = {
      top: side_list_y + "px",
      left: side_list_x + "px",
      backgroundSize: "100% 100%", //background-size
      maxWidth: "200px", //max-width
      margin: "0px 0px 0px 0px",
      padding: "0px 0px 0px 0px"

      // "background-image": "url(" + Object.values({ bcg_test2 }) + ") ",
      // position: "absolute"
      // transform: "scale(0.7, 0.7)"
      // z-index: -9
    };

    var p_class = "";

    if (this.state.flg_sidebar === true) {
      p_class = "test_ani";

      //サイドメニューバーの真ん中のスタイルの中身をフラグ変更時に作成
      style_sidemenue_middle = {
        backgroundImage: "url(" + Object.values({ bcg_sidemenue3 }) + ") ",
        backgroundSize: "100% 100%",
        backgroundColor: "white",
        color: "",
        margin: "0px 10% 0px 10%",
        padding: "10px 0px 10px 0px",
        maxWidth: "500px",
        backgroundRepeat: "no-repeat"
        // position: "center",
        // height: "30px",
        // width:"100%",
        // padding:" 0px 10px 0px 10px",
        // transform:"rotate(90deg)",
      };
    } else {
      style_x.width = 100;
      // Falseならスタイルを空欄にしておく
    }

    // サイドメニュー作成
    // 編集モード時のサイドメニュー
    const side_list_edit_mode = (
      <div className=" sidelist  " style={style_x}>
        <p
          id="menubtn"
          style={style_sidemenue_top}
          onClick={() => this.click_selection_tag(event, "menu")} //フラグを切り替える関数
        >
          menu
        </p>

        <div className={p_class} style={style_sidemenue_middle}>
          <div className="create_tag">
            {/* {this.state.flg_sidebar ? <p id="createbtn">作成</p> : ""} */}
          </div>

          <div>
            {this.state.flg_sidebar ? (
              <p className="">
                {/* <span className="marker">チラシから選ぶ</span> */}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            {this.state.flg_sidebar ? (
              <p
                onClick={this.Dough_Pop} //生地選択画面を表示する関数
              >
                {" "}
                <span className="marker">生地を選ぶ</span>
              </p>
            ) : (
              ""
            )}
          </div>

          <div>
            {this.state.flg_sidebar ? (
              <p
                id="selectbtn"
                onClick={() => this.click_selection_tag(event, "topping")}
              >
                <span className="marker">トッピングを変える</span>
              </p>
            ) : (
              ""
            )}
          </div>

          <div>
            {this.state.flg_sidebar ? (
              <div>{this.state.flg ? Ingredients : ""}</div>
            ) : (
              ""
            )}
          </div>

          <div>
            {this.state.flg_sidebar ? (
              <p id="reviewbtn" onClick={this.PreviewCanvas}>
                <span className="marker_review">出来上がりを見る</span>
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            {/* {this.state.flg_sidebar ? <p id="ordderbtn">注文へ</p> : ""} */}
          </div>
          <div>
            {this.state.flg_sidebar ? (
              <p id="" onClick={this.Help_Pop} className="help_botton">
                <span className="marker">Help</span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div style={style_sidemenue_bottom}></div>
      </div>
    );

    // レビューモード時のサイドメニュー
    const side_list_review_mode = (
      // <div className="sidelist test_border_1　back_to_edit1">
      <div className="sidelist2 input_add_animation">
        <div style={style_sidemenue_top}></div>
        <div style={style_sidemenue_middle}>
          <p
            id="continue_edit"
            onClick={this.Change_To_Edit} //編集モードに戻す関数
          >
            <span className="marker">戻る</span>
          </p>
          <p
            id="ordderbtn"
            onClick={this.Show_Order_Pop} //入力フォームの表示用関数
          >
            <span className="marker_review">注文へ</span>
          </p>
        </div>
        <div style={style_sidemenue_bottom}></div>
      </div>
    );

    // サイドメニュー
    const sidelist = this.state.flg_review
      ? side_list_review_mode
      : side_list_edit_mode;

    // 仕上がり図用のCanvasの下マージン調整用のスタイル。
    var m_bottom = this.state.range_obj3.rev_canv_height;
    m_bottom = m_bottom / 2;
    m_bottom = m_bottom + "px";
    m_bottom = "0px 0px -" + m_bottom + " 5% ";

    var rev_canv_style = { margin: m_bottom };
    // var rev_canv_style = { "margin-bottom": m_bottom };
    // margin-bottom:
    var bottom_div = {};

    // 仕上がり図用のCanvasをフラグで変更させる。
    if (this.state.flg_review === true) {
      rev_canv_style = { margin: m_bottom, animation: "feed_in_slide 0.5s" }; //下側のマージンを調整し、アニメーションを設定
      bottom_div = { height: "200px" }; //見切れ対策用の領域
    }

    // ガイド用のcanvasのスタイル(再描画などの影響でここで宣言する。)
    var style_guide_canvas = {
      top: this.state.range_obj2.guide_range_yposi,
      left: this.state.range_obj2.guide_range_xposi,
      // msrgin:m_bottom,
      position: "absolute"
    };

    // 入力フォーム用のスタイル（絶対値指定だけなので省略可能か確認する必要がある）
    var style_order_info = {
      // top: this.state.range_obj3.rev_canv_yposi,
      // left: this.state.range_obj3.rev_canv_xposi,
      // margin: m_left,
      //canvas_width
      // left: "50%",
      // top: "100px",
      // left: "100px",
      // width:"20%",
      // float: "right"
      // position: "absolute"
    };

    // 仕上がり図用のCanvasのクラスの設定
    var rev_canvas_class;

    if (this.state.flg_input === false) {
      //入力画面非表示の処理

      //表示時に表示用のクラスを当てる。
      rev_canvas_class = "review_canvas   ";

      if (this.state.flg_review === false) {
        // レビューモードを解除した場合は非表示時のクラスに当て直して描画させる。
        rev_canvas_class = rev_canvas_class + " review_canvas_close";
      }
    } else {
      // 入力画面表示時にはさらにクラスを追加して大きさと位置をアニメーションで変更
      rev_canvas_class = "review_canvas  review_canvas2";
    }

    return (
      <div
        className="App "
        style={style_bkg}
        onDragOver={this.onDropDrop_prevent} //画像の戻りを防ぐ関数
        //  onDragEnter={this.onDropDrop_prevent}
      >
        <h1 id="Pizza_id">Pizza Order Made</h1>
        <div style={this.state.style_feedin}>
          {this.state.flg_review ? (
            ""
          ) : (
            <div>
              <ToppingView
                img_array={this.state.Ingredients_imgs} //トッピング画像の入った配列
                move_fnc={this.onMouseMove_add} //マウスムーブ用の関数
                click_fnc={this.onClick_add} //クリック用の関数
                viewing_index={this.state.cnt} //表示する画像配列のインデックス数
                range={this.state.range_obj} //トッピングの可否を判定する範囲オブジェクト
              />
            </div>
          )}
        </div>
        <div className="  ">
          {this.state.flg_review ? (
            ""
          ) : (
            // トッピングの選択メニュー（レビュー時には非表示）
            <div className="topping_list">
              <div style={style_topping_top}></div>
              <ToppingList
                guzai_img={this.state.topping_type} //現在のトッピングの種類
                update_fnc={this.update_main_state} //トッピング配置時の更新用関数
                img_index_fnc={this.change_img_index} //画像インデックスの変更用関数
                img_index={this.state.topping_img_index} //現在の画像インデックス
                range={this.state.range_obj} //トッピングが可能な範囲を渡す。
              />
              <div style={style_topping_bottom}></div>
            </div>
          )}
        </div>

        <div className="leftside " style={style_topping}>
          <div id="Doughfnc_id" className=" ">
            {this.state.flg_review ? (
              ""
            ) : (
              //生地表示用の関数コンポーネント
              <Doughfnc
                dough_src={this.state.dough_src} //生地に使用する画像のsrc
              />
            )}
            {sidelist}
          </div>
          <div></div>
        </div>
        <div className="buttomside ">
          {this.state.flg_review ? (
            ""
          ) : (
            <div className="edit_p">
              {/* 仮で料金表と同じCSSクラスを当てている　後で修正 */}
              <div style={style_topping2}> </div>
              <div style={style_topping}>
                <Editpanel
                  click_fnc={this.state.add_index_fnc} //トッピング配列の表示インデックス変更用関数
                  reset_fnc={this.state.add_reset_fnc} //リセット用関数
                  current_cnt={this.state.cnt} //現在のインデックス数
                  max_index_cnt={this.state.max_index} //現在の最大値のインデックス
                />
              </div>
              <div style={style_topping3}></div>

              <canvas
                id="guide_canvas"
                className=" out_topping"
                style={style_guide_canvas} //ガイド用のキャンバス
                width={this.state.range_obj2.guide_length_x + "px"}
                height={this.state.range_obj2.guide_length_y + "px"}
              ></canvas>
            </div>
          )}
        </div>
        <div className="ing_detail">
          <div style={style_topping2}></div>
          <div style={style_topping}>
            <OrderDetail
              Ingredients_info={this.state.Ingredients_obj} //現在セットした具材の配列
            />
          </div>
          <div style={style_topping3}></div>
        </div>
        <div className=" ">
          <canvas
            //仕上がり図用のキャンバス
            id="review_wcanvas"
            className={rev_canvas_class}
            style={rev_canv_style}
          ></canvas>

          {this.state.flg_input ? (
            <div style={style_order_info}>
              <InputOrderInfo
                close_fnc={this.Change_To_Edit} //編集モードへもどる関数（注文決定後に戻す用）
                topping={this.state.canvas_topping} //未使用
                range={this.state.range_obj2} //未使用
                reset_fnc={this.state.add_reset_fnc} //リセット用関数（注文決定後に戻す用）
              />
            </div>
          ) : (
            <div
              //背景の見切れ調整用のdiv
              style={bottom_div}
            ></div>
          )}
          {this.state.flg_help ? (
            <HelpPopup
              close_fnc={this.state.change_help_flg} //ヘルプ画面の表示フラグを変更する関数
            />
          ) : (
            "--"
          )}

          {this.state.flg_dough ? (
            <DoughSelector
              close_fnc={this.state.change_dough_flg} //生地選択画面の表示フラグ変更用の関数
              change_dough={this.Change_Dough_number} //生地の変更用の関数
            />
          ) : (
            " --"
          )}
        </div>
      </div>
    );
  }
}
