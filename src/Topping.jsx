// トッピングを並べて選択を行う。部分のコンポーネント

import React from "react";
import Icon_right from "./img/Rightpic.png";
import Icon_left from "./img/Leftpic.png";
import Imagelist from "./Imagelist"; //画像のsrcを取得する

import Toppinginfo from "./Topping_info"; //トッピングの情報表示用コンポーネント

export default class Topping_List extends React.Component {
  //コンストラクタ
  constructor(props) {
    super(props);
    this.change_select_img = this.change_select_img.bind(this);
    this.onMouseMove_SetState = this.onMouseMove_SetState.bind(this);
    this.cloneObj = this.cloneObj.bind(this);
    this.set_Icon = this.set_Icon.bind(this);
    this.change_img_index = this.change_img_index.bind(this);
    this.onDragMove_SetState = this.onDragMove_SetState.bind(this);
    this.onDragEnd_SetState = this.onDragEnd_SetState.bind(this);
    this.onDropDrop_SetState = this.onDropDrop_SetState.bind(this);
    this.change_d_flg = this.change_d_flg.bind(this);
    this.onTough_SetState = this.onTough_SetState.bind(this);
    this.show_popup = this.show_popup.bind(this);
    // let p = document.getElementById("Pizza_id");

    console.log("const:Topping_List");

    this.state = {
      select_img: "", //現在選択しているトッピングの画像用文字列
      img_pop: "",
      //初期表示の位置（後で調整できるようにする。）
      x_posi: "-999px", //横位置
      y_posi: "412px", //縦位置
      x_posi_pop: "-999px", //ポップアップの横位置
      y_posi_pop: "-999px", //ポップアップの縦位置
      pop_display: "none", //ポップアップの表示非表示の状態
      guide_msg_num: "1", //ガイドメッセージのフラグ
      d_flg: false
    };
  }

  componentDidMount() {
    // let p = document.getElementById("Doughfnc_id");
    // //
    // console.log("conponentdidm:Topping_List");
    // console.log(p.getBoundingClientRect());
    // //getBoundingClientRect
  }

  change_d_flg(flg) {
    console.log("drag_flg");
    if (flg === true) {
      this.setState({ d_flg: false });
    } else {
      this.setState({ d_flg: true });
    }
  }

  // 現在選択しているトッピングの画像の位置をカーソルに合わせる。
  onMouseMove_SetState(event) {
    // （要修正）ーーーーーーーーーー
    // カーソルの位置調整を調整する必要あり
    let x = event.clientX; //横位置
    let y = event.clientY; //縦位置
    let selecting_target = event.target; //ターゲット取得
    let width = selecting_target.offsetWidth; //洗濯したターゲットの長さ
    let height = selecting_target.offsetHeight; //選択したターゲットの高さ
    let x_posi_tmp = x - width / 2 + "px"; //横に位置を調整
    let height_tmp = y - height / 2; //縦の位置を調整
    if (height_tmp < 600) {
      //height_tmp = height_tmp + 600;
    }
    let y_posi_tmp = height_tmp + "px"; //

    if (y - width / 2 < 600) {
      //y_posi_tmp = y - height / 2 + 600 + "px";
    }
    // ーーーーーーーーーーーーーーー

    // state更新
    this.setState({
      x_posi: x_posi_tmp,
      y_posi: y_posi_tmp
    });
    event.preventDefault();
  }

  // 現在選択しているトッピングの画像の位置をカーソルに合わせる。(Drag版)
  onDragMove_SetState(event) {
    // （要修正）ーーーーーーーーーー
    // カーソルの位置調整を調整する必要あり
    let x = event.clientX;
    let y = event.clientY;
    let selecting_target = event.target;
    let width = selecting_target.offsetWidth;
    let height = selecting_target.offsetHeight;
    let x_posi_tmp = x - width / 2 + "px";
    let height_tmp = y - height / 2;
    if (height_tmp < 600) {
      //height_tmp = height_tmp + 600;
    }
    let y_posi_tmp = height_tmp + "px";

    if (y - width / 2 < 600) {
      //y_posi_tmp = y - height / 2 + 600 + "px";
    }
    // ーーーーーーーーーーーーーーー

    // 画像要素のスタイル情報を変更
    selecting_target.style.left = x_posi_tmp;
    selecting_target.style.top = y_posi_tmp;
    selecting_target.style.position = "absolute";

    // state更新
    // this.setState({
    //   x_posi: x_posi_tmp,
    //   y_posi: y_posi_tmp,
    //   d_flg: true
    // });

    // event.preventDefault();
  }

  //トッピングのドラッグ終了時の処理
  onDragEnd_SetState(event, range) {
    // カーソルの位置調整を調整する必要あり
    let x = event.clientX; //横位置
    let y = event.clientY; //縦位置
    let selecting_target = event.target; //ターゲット取得
    let width = selecting_target.offsetWidth; //洗濯したターゲットの長さ
    let height = selecting_target.offsetHeight; //選択したターゲットの高さ
    let x_posi_tmp = x - width / 2 + "px"; //横に位置を調整
    let height_tmp = y - height / 2; //縦の位置を調整
    if (height_tmp < 600) {
      //height_tmp = height_tmp + 600;
    }
    let y_posi_tmp = height_tmp + "px"; //

    if (y - width / 2 < 600) {
      //y_posi_tmp = y - height / 2 + 600 + "px";
    }

    var flg = true;
    // ターゲットが指定の範囲外で固定されないように、引数で受け取った生地の有効範囲内かチェック
    if (x > range.dough_x_end || x < range.dough_x) {
      flg = false;
    }

    if (y > range.dough_y_end || y < range.dough_y) {
      flg = false;
    }

    var guide_canv = document.getElementById("guide_canvas");
    var tmp_guide_msg_num;

    // トッピングが範囲内にあるか無いかでガイド用キャンバスのクラス名を変更する。
    if (flg === true) {
      // 範囲内
      guide_canv.className = "on_topping";
      tmp_guide_msg_num = "3"; //メッセージを変更
    } else {
      // 範囲外
      guide_canv.className = "out_topping";
    }

    // ーーーーーーーーーーーーーーー

    console.log("drag_end");

    // 画像要素のスタイル情報を変更
    selecting_target.style.left = x_posi_tmp;
    selecting_target.style.top = y_posi_tmp;
    selecting_target.style.position = "absolute";
    // selecting_target.style.draggable = "false";
    // state更新
    this.setState({
      x_posi: x_posi_tmp,
      y_posi: y_posi_tmp,
      guide_msg_num: tmp_guide_msg_num
    });
    // event.preventDefault();
  }

  //画面上でのドラッグ時に画像の戻りを防ぐ関数
  //トッピング内にも適応しておく
  onDropDrop_SetState(event) {
    console.log("drop_function");

    event.preventDefault(); //eventのpreventDefaultでイベントの処理を終了
  }

  // タッチ移動でのトッピングの移動処理
  onTough_SetState(event) {
    let touches = event.targetTouches[0]; //タッチ位置などの情報取得

    // カーソルの位置調整を調整する必要あり
    let x = touches.clientX; //横位置
    let y = touches.clientY; //縦位置
    let selecting_target = event.target; //ターゲット取得

    let width = selecting_target.offsetWidth; //洗濯したターゲットの長さ
    let height = selecting_target.offsetHeight; //選択したターゲットの高さ
    let x_posi_tmp = x - width / 2 + "px"; //横に位置を調整
    let height_tmp = y - height / 2; //縦の位置を調整
    let y_posi_tmp = height_tmp + "px"; //

    //位置情報を元にターゲットオブジェクトのスタイルを変更
    selecting_target.style.left = x_posi_tmp; //横位置
    selecting_target.style.top = y_posi_tmp; //縦位置
    selecting_target.style.position = "absolute"; //位置を絶対値指定

    // event.preventDefault(); //eventのpreventDefaultでイベントの処理を終了
  }

  //トッピング画像をクローンを使用して複製したものを、管理用配列に追加することで画面に配置する
  cloneObj = function (event, range) {
    //onmousedownイベントに変更すること
    var click_obj = event.target; //クリックした要素をevent.targetで取得
    console.log("clone");

    var x = event.clientX; //縦位置
    var y = event.clientY; //横位置

    var flg = true; //判定用のフラグ
    // console.log(this.state.d_flg);
    if (this.state.d_flg === true) {
      alert("Dragging!");
    }

    // console.log(typeof x);
    // console.log(typeof range.dough_x_end);
    // ターゲットが指定の範囲外で固定されないように、引数で受け取った生地の有効範囲内かチェック
    if (x > range.dough_x_end || x < range.dough_x) {
      flg = false;
      console.log("can not clone bocause of x out of range!:" + x);
      console.log(" range is:" + range.dough_x + " - " + range.dough_x_end);
    }

    if (y > range.dough_y_end || y < range.dough_y) {
      flg = false;
      console.log("can not clone bocause of y out of range!:" + y);
      console.log(" range is:" + range.dough_y + " - " + range.dough_y_end);
    }

    //範囲内でクリックを実行
    if (flg === true) {
      var clone_obj = click_obj.cloneNode(true); //要素をクローンする

      this.props.update_fnc(clone_obj); //渡された関数を使用して管理用配列に画像ノードを追加
      //bind()はつけない

      // トッピングのクラスをアニメーション用のものに変更した後、数秒後に戻す
      const pre_classname_topping = click_obj.className;

      //時間差で実行する関数
      const resetfnc = () => {
        click_obj.className = pre_classname_topping; //クラス名を元に戻す
        console.log("execute settimeout Topping stanped");
      };

      click_obj.className = "stanp_add"; //クラス名を変更
      setTimeout(resetfnc, 1000); //１秒後にクラス名を戻す関数を実行
    } else {
      //範囲外でクリック実行

      // falseの場合はガイド用キャンバスのクラス（スタイル）を一時変更後、並列処理で元に戻す
      var guidecanvas = document.getElementById("guide_canvas"); //ガイド用キャンバスの要素
      const pre_classname = guidecanvas.className; //前のクラス名

      // 時間差で実行する関数
      const resetfnc = () => {
        guidecanvas.className = pre_classname; //クラスを元に戻す
        console.log("execute settimeout Topping");
      };

      guidecanvas.className = "canv_add"; //クラス名変更
      setTimeout(resetfnc, 1000); //１秒後に戻す
    }
  };

  // 選択したリスト内の画像とトッピング用オブジェクト（画像）を同じにする
  change_select_img(event) {
    let selecting_element = event.target; //ターゲット取得
    let selecting_img_src = selecting_element.src; //ターゲットの画像のsrcを取得
    let x = event.clientX; //横位置
    let y = event.clientY; //縦位置
    y = y + 20; //微調整

    console.log("--click--");

    // ステート更新でクリックした位置の少し下に表示させる。
    this.setState({
      select_img: selecting_img_src, //選択したトッピングのsrc
      x_posi: x + "px", //縦位置
      y_posi: y + "px", //横位置
      guide_msg_num: "2"
    });
  }

  //トッピングの種類とインデックス、画面上の列に応じて画像のsrcを変更
  set_Icon(col) {
    var icon = this.props.guzai_img; //現在のトッピングのタイプ
    var num = this.props.img_index; //トッピングタイプごとの画像インデックス
    console.log("--set icon--");
    var set_info_obj = { type: icon, num: num }; //画像のソース取得用の関数に渡す引数作成

    var set_src_obj = Imagelist(set_info_obj);
    // 画像のsrcオブジェクトから現在のタイプとインデックスに応じた配列（オブジェクトを取得）

    var result = set_src_obj[col]; //トッピング画像の列に応じた画像のソースをセットする。

    return result;
  }

  // トッピングのページ変更用の関数
  change_img_index = function () {
    var current_index = this.props.img_index; //現在のインデックス
    this.props.img_index_fnc(current_index); //※引数は使ってない
  };

  // トッピングにカーソルを合わせた際の処理
  show_popup(event, turn) {
    // カーソルオンの動き
    if (turn === "on") {
      var target = event.target; //ターゲット取得
      var src = target.src; //画像のsrc
      var rect = target.getBoundingClientRect(); //ターゲットの位置や長さ取得
      var x = rect.x; //横位置
      var y = rect.y; //縦位置
      var height = rect.height; //高さ
      x = parseInt(x, 10);
      y = parseInt(y, 10);
      y = y - height;

      // console.log("x:" + x);

      // console.log("y:" + y);

      // 更新もなるべく避けたほうがいい
      // メッセージ用ポップアップの位置や表示・非表示の状態を更新
      this.setState({
        x_posi_pop: x,
        y_posi_pop: y,
        pop_display: "block",
        img_pop: src //引数として渡すため、カーソルをおいてる画像のsrcセット
      });
      //カーソルアウトの動き
    } else if (turn === "off") {
      // ステート更新で非表示に設定
      this.setState({ pop_display: "none" });
    }
  }

  render() {
    console.log("render--Topping_List");
    // トッピングのスタイル
    var style = {
      top: this.state.y_posi, //縦の位置
      left: this.state.x_posi, //横の位置
      zIndex: 1000, //z位置
      position: "absolute" //絶対値指定
    };
    // ポップアップメッセージのスタイル
    var style_pop = {
      top: this.state.y_posi_pop, //縦の位置
      left: this.state.x_posi_pop, //横の位置
      display: this.state.pop_display,
      zIndex: 1000, //z位置
      position: "absolute" //絶対値指定
    };

    var msg_top = this.props.range.dough_y - 40; //メッセージの縦位置
    var msg_left = this.props.range.dough_x; //メッセージの横位置
    // メッセージのスタイル
    var style_msg = {
      top: msg_top, //縦の位置
      left: msg_left, //横の位置
      // display: this.state.pop_display,
      zIndex: 1000, //z位置
      position: "absolute" //絶対値指定
    };

    // ポップアップメッセージの内容
    var info_pop = (
      <div className="topping_info_pop" style={style_pop}>
        <Toppinginfo
          topping_type={this.props.guzai_img} //現在のトッピングタイプ
          topping_page={this.props.img_index} //現在のページ数
          selecting_topping={this.state["img_pop"]} //選択中のトッピング
        />
      </div>
    );

    // ガイド用メッセージ
    var guide_msg = "";

    var msg_n = this.state.guide_msg_num; //メッセージ内容を変更するためのフラグ
    //状況によってメッセージを変更する
    if (msg_n === "1") {
      // 初回時
      msg_top = this.props.range.dough_y - 90;
      var style_msg = {
        top: msg_top, //縦の位置
        left: msg_left, //横の位置
        // display: this.state.pop_display,
        zIndex: 1000, //z位置
        position: "absolute" //絶対値指定
      };
      guide_msg = (
        <p className="guide_message" style={style_msg}>
          クリックしてトッピングを決める
        </p>
      );
    } else if (msg_n === "2") {
      // クリック時
      guide_msg = (
        <div>
          <p className="guide_message " style={style_msg}>
            ドラッグして生地におく
          </p>
          <a className=" guide_message2" style={style_msg}>
            ↓
          </a>
        </div>
      );
    } else if (msg_n === "3") {
      // ドラッグ時
      guide_msg = (
        <p className="guide_message" style={style_msg}>
          クリックで生地に置く
        </p>
      );
    }

    var topping_class = "";

    return (
      <div>
        <div className="topping_img">
          <img
            src={Icon_left} //左矢印
            alt=""
            width="20px"
            height="50px"
            className="add_border_b Img_select"
            onClick={() => this.props.img_index_fnc()} //クリックでトッピングの画像を変更

            // 画像のインデックスを変更する関数を実施
          ></img>
          <img
            src={this.set_Icon("1")} //トッピング１列目
            alt=""
            width="100px"
            height="100px"
            className="add_inner_border_b"
            onClick={this.change_select_img}
            onMouseOver={() => this.show_popup(event, "on")} //マウスドラッグ時の処理
            onMouseLeave={() => this.show_popup(event, "off")} //マウスが離れた時の処理
          ></img>

          <img
            src={this.set_Icon("2")} //トッピング2列目
            alt=""
            width="100px"
            height="100px"
            className="add_inner_border_b"
            // onMouseMove={this.cloneObj}
            onClick={this.change_select_img}
            onMouseOver={() => this.show_popup(event, "on")} //マウスドラッグ時の処理
            onMouseLeave={() => this.show_popup(event, "off")} //マウスが離れた時の処理
          ></img>
          <img
            src={this.set_Icon("3")} //トッピング3列目
            alt=""
            width="100px"
            height="100px"
            className="add_inner_border_b"
            //onMouseMove={this.cloneObj}
            onClick={this.change_select_img}
            onMouseOver={() => this.show_popup(event, "on")} //マウスドラッグ時の処理
            onMouseLeave={() => this.show_popup(event, "off")} //マウスが離れた時の処理
          ></img>

          <img
            src={Icon_right} //右矢印
            alt=""
            width="20px"
            height="50px"
            className="Img_select add_border_b"
            onClick={this.change_img_index}
          ></img>

          <img
            src={this.state["select_img"]} //選択中のトッピング
            className={topping_class}
            id="move_topping"
            alt=""
            width="100px"
            height="100px"
            style={style}
            // draggable="false"
            onClick={() => this.cloneObj(event, this.props.range)}
            // onMouseMove={this.onMouseMove_SetState}

            // Drag処理
            onDragEnd={() => this.onDragEnd_SetState(event, this.props.range)} //ドラッグ終了
            onDragOver={this.onDropDrop_SetState} //ドラッグ移動
            onTouchMove={this.onTough_SetState} //タッチ移動
            onDrag={this.onDragMove_SetState}
            onTouchEnd={() => this.onDragEnd_SetState(event, this.props.range)} //ドラッグ終了(タッチ移動)
            // onDrag={(event) => console.log(event.client)}

            // onDragExit={() => this.change_d_flg(false)}
            // onDragEnter={() => this.change_d_flg(true)}
            // onDragStart={() => this.change_d_flg(true)}
            // onDrop={this.onDropDrop_SetState}

            //引数にエリア情報追加
          ></img>
        </div>
        {/* <div className="topping_info_obj">
          <Toppinginfo
            topping_type={this.props.guzai_img} //現在のトッピングタイプ
            topping_page={this.props.img_index} //現在のページ数
            selecting_topping={this.state["select_img"]} //選択中のトッピング
          />
        </div> */}
        {guide_msg}
        {info_pop}
      </div>
    );
  }
}
