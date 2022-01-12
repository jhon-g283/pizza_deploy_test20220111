// 住所情報の入力用フォーム

import React from "react";
import Icon_mail from "./img/background/Mail2.png"; //メールのアイコン
import Icon_name from "./img/background/Name.png"; //名前のアイコン
import Icon_tel from "./img/background/Tel.png"; //電話番号のアイコン
import Icon_address from "./img/background/Address.png"; //住所のアイコン
import Icon_Post from "./img/background/Post.png"; //ポストのアイコン
import Icon_pack from "./img/background/Package1.png"; //パッケージの画像
import Icon_Oppack from "./img/background/Opacitypac.png"; //パッケージの裏側の画像

export default class Input_OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log("const PreviewCanvas");
    //close_fnc
    this.state = {
      flg: false, //確認画面の表示用フラグ
      mail: "test@", //入力フォーム：メールアドレス
      name: "test", //入力フォーム：名前
      address: "test", //入力フォーム：住所
      tel: "000", //入力フォーム：電話番号
      info_obj: [],
      canv_obj: {},
      img_style_s: "",
      val_check_flags: {
        //バリデーションチェック用フラグ
        mail: false, //入力フォーム：メールアドレス
        name: true, //入力フォーム：名前(空欄かどうかを見るので最初からTrue)
        address: true, //入力フォーム：住所(空欄かどうかを見るので最初からTrue)
        tel: false //入力フォーム：電話番号
      }
    };

    this.getforminfo = this.getforminfo.bind(this);
    this.Backbutton_function = this.Backbutton_function.bind(this);
    this.onChangeFunction = this.onChangeFunction.bind(this);
    this.clickOrder = this.clickOrder.bind(this);
    this.Onloadfunction = this.Onloadfunction.bind(this);
    this.test_PostFunction = this.test_PostFunction.bind(this); //テスト用
  }

  // テスト用のPOST関数
  test_PostFunction() {
    var body_obj = { order_info: this.state.info_obj };
    fetch("https://q0u8y.sse.codesandbox.io/post_test", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body_obj)
      // body: "test:test"
    })
      .then((response) => {
        var txt = response.text(); //仮でテキストにする

        return txt;
      })
      .then((data) => {
        //このthenでレスポンスを取り出せる
        console.log(data); //
        // var alt2 = confirm("one more?");
        // if (alt2) {
        //   this.test_PostFunction();
        // }
      });
  }

  //コンポーネントマウント時の処理
  componentDidMount() {
    console.log("--componentDidMount PreviewCanvas--");
    var rev_canvas = document.getElementById("review_wcanvas"); //レビュー用のキャンバスの取得
    var camvas_rect = rev_canvas.getBoundingClientRect(); //位置や大きさの取得
    var rev_width = camvas_rect.width; //長さ取得
    var rev_height = camvas_rect.height; //高さ取得
    var rev_left = camvas_rect.x; //横の位置取得
    var rev_top = camvas_rect.y; //縦の位置取得

    // 各情報を四捨五入する
    rev_width = Math.round(rev_width);
    rev_height = Math.round(rev_height);
    rev_left = Math.round(rev_left);
    rev_top = Math.round(rev_top);
    //     var rev_context = rev_canvas.getContext("2d");

    console.log("rev_width:" + rev_width);
    console.log("rev_height:" + rev_height);
    console.log("rev_left:" + rev_left);
    console.log("rev_top:" + rev_top);
    console.log("rev_canvas" + rev_canvas.top);

    // ステート更新用のオブジェクト
    var tmp = {
      width: rev_width,
      height: rev_height,
      left: rev_left,
      top: rev_top
    };

    // ステート更新
    this.setState({ canv_obj: tmp });
  }

  // 確認ボタン押下時の処理
  getforminfo() {
    console.log("--getforminfo--");
    // フォーム内容の取得
    var form_val = document.forms["input_info"]; //入力フォームを名前から取得しオブジェクトへ
    var mail_info = "mail:" + form_val["mail"].value; //メールアドレス
    var tel_info = "tel:" + form_val["tel"].value; //電話番号
    var address_info = "address:" + form_val["address"].value; //住所
    var name_info = "name:" + form_val["name"].value; //名前

    var flg_check = this.state.val_check_flags; //入力内容のチェック用フラグのオブジェクト

    for (const i of Object.values(flg_check)) {
      if (i === true) {
        alert("入力に不備があります。");
        return;
      }
    }

    var tmp = {
      mail: mail_info,
      tel: tel_info,
      address: address_info,
      name: name_info
    };

    this.setState({
      flg: true,
      info_obj: tmp
    });
  }

  // フォームのロード時の処理
  Onloadfunction(event) {
    console.log("---function Onloadfunction--");

    var img_element = event.target; //ロードしたターゲット要素
    const new_classname = "package_close package_clsose_pre"; //アニメーションで当てるクラス名

    const resetfnc = () => {
      img_element.className = new_classname; //クラス名を変更
      console.log("execute settimeout");
    };

    setTimeout(resetfnc, 1000); //1秒後に関数実施

    var tmp = "scale(-1, 1)"; //画像を反転させるCSS文字列
    this.setState({ img_style_s: tmp });
  }

  //戻るボタンの処理
  Backbutton_function() {
    console.log("--Backbutton_function--");
    this.setState({ flg: false }); //フラグを更新
  }

  //Formの編集時の表示用関数
  // ReactはInputタグのValueの制御を取ってしまうようなのでOnChangeのコールバックで常にこの関数を実施させる
  // 引数：input_tag・・入力してるテキストボックスの種類
  onChangeFunction(event, input_tag) {
    var tmp = event.target.value; //入力しているEvent（タグ）の値
    var reg;
    var match_result;
    var tmp_flgs = this.state.val_check_flags;

    // テキストボックスの種類に応じて更新するステートを切り替える。
    if (input_tag === "name") {
      // 名前の更新時
      // 空欄かどうかチェックしフラグを更新
      if (tmp === "") {
        tmp_flgs.name = true;
      } else {
        tmp_flgs.name = false;
      }

      this.setState({ name: tmp, val_check_flags: tmp_flgs }); //入力内容とチェック用のフラグを更新
    } else if (input_tag === "mail") {
      // メールの更新時
      reg = /[^0-9^a-z^A-Z^\.\-@]/; //検査内容の正規表現文字列
      match_result = tmp.match(reg); //チェック実施

      // チェック結果に応じてフラグ更新
      if (match_result === null) {
        tmp_flgs.mail = false;
      } else {
        tmp_flgs.mail = true;
      }

      this.setState({ mail: tmp, val_check_flags: tmp_flgs }); //入力内容とチェック用のフラグを更新
    } else if (input_tag === "tel") {
      // 電話番号の更新時
      reg = /[^0-9^\-]/; //検査内容の正規表現
      match_result = tmp.match(reg); //チェック実施

      // チェック内容に応じてフラグ更新
      if (match_result === null) {
        tmp_flgs.tel = false;
      } else {
        tmp_flgs.tel = true;
      }

      this.setState({ tel: tmp, val_check_flags: tmp_flgs }); //入力内容とチェック用のフラグを更新
    } else if (input_tag === "address") {
      // 住所更新の場合
      // 空かどうかチェック
      if (tmp === "") {
        tmp_flgs.address = true;
      } else {
        tmp_flgs.address = false;
      }

      this.setState({ address: tmp, val_check_flags: tmp_flgs }); //入力内容とチェック用のフラグを更新
    }
    // console.log(this.state.val_check_flags);
  }

  // 注文確定ボタンの処理
  clickOrder() {
    console.log("---functon clickOrder--");
    var alt = confirm("注文を確定しますか？");
    if (alt) {
      console.log("---Order OK--");
      // expressのサーバーへPOSTß
      var body_obj = { order_info: this.state.info_obj };
      var url = "http://localhost:3000/users/post_test";
      // "https://q0u8y.sse.codesandbox.io/post_test"
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body_obj)
        // body: "test:test"
      })
        .then((response) => {
          var txt = response.text(); //仮でテキストにする

          return txt;
        })
        .then((data) => {
          //このthenでレスポンスを取り出せる
          console.log(data); //
          var alt2 = confirm(data);

          if (alt2) {
            this.test_PostFunction();
          }
        });

      // Appの編集モードの切り替え用関数を実施
      this.props.close_fnc();
      // Appのリセット用関数を実施
      this.props.reset_fnc("order");
    } else {
      console.log("---Order Canceled--");
      // キャンセル時は戻るボタン用の関数実施
      this.Backbutton_function();
    }
    console.log("---functon clickOrder end--");
  }

  render() {
    console.log("--render PreviewCanvas--");

    var info = []; //確認画面用の要素を入れる配列
    var tmp_obj = this.state.info_obj; //入力内容を取得

    // 入力内容のオブジェクトからループで確認用の画面で使う要素を作成
    for (const [key, value] of Object.entries(tmp_obj)) {
      // console.log(value);
      let tag = (
        <div>
          <p name={key}>{value}</p>
        </div>
      );
      info.push(tag); //配列にプッシュ
    }

    // 確認用画面表示のフラグがTrueなら表示する。
    info = this.state.flg ? <div>{info}</div> : "";

    var img_style = {}; //ピザのパッケージの箱の画像
    var top = ""; //縦の位置
    var left = ""; //横の位置
    var width = ""; //長さ
    var height = ""; //高さ
    var img_class = ""; //クラス

    left = this.state.canv_obj.left; //出来上がり図のキャンバスの横位置
    top = this.state.canv_obj.top; //出来上がり図のキャンバスの縦の位置
    width = this.state.canv_obj.width; //出来上がり図のキャンバスの長さ
    height = this.state.canv_obj.height; //出来上がり図のキャンバスの高さ
    left = left + width / 2; //横の位置
    height = height / 2; //縦の位置
    width = width / 2; //scale(0.5,0.5)に合わせて長さを半分に調整
    // スタイル用のオブジェクトへセット
    img_style = {
      top: top,
      left: left,
      width: width,
      height: height,
      position: "absolute"
      // backgroundColor: "white"
    };

    // 入力フォームの決定ボタン
    var input_button = (
      <div className="form_class">
        <b>入力完了：</b>
        <button onClick={this.getforminfo}>Go!!</button>
      </div>
    );
    // 確認画面の戻るボタン
    var back_button = (
      <button className="check_buttons" onClick={this.Backbutton_function}>
        内容を修正する
      </button>
    );
    // 確認画面の決定ボタン
    var order_button = (
      <button className="check_buttons" onClick={this.clickOrder}>
        注文する
      </button>
    );

    //入力内容表示画面のスタイル
    var check_style = {
      "background-color": "white",
      margin: "0px 5%",
      "background-image": "url(" + Object.values({ Icon_Post }) + ") ",
      "background-size": "100% 100%"
    };

    var check_class = "check_class"; //入力情報確認画面のクラス名
    var input_order = "input_order"; //入力画面のクラス名

    //確認画面のフラグに応じてクラスを変更してアニメーション
    if (this.state.flg === true) {
      check_class = "check_class input_add_animation2"; //アニメーションフェードインのクラスを追加
      img_class = "test_border_1 package_clsose_pre"; //ピザのパッケージの閉じる前の状態ののクラス
    } else {
      input_order = "input_order input_add_animation"; //アニメーションフェードインのクラスを追加
      img_class = "package_reverse"; //ピザのパッケージの裏側状態ののクラス
    }

    // 確認画面の表示要素
    var order_check = (
      <div>
        <div className={check_class}>
          <p>注文確認</p>
          <div className="" style={check_style}>
            {info}
          </div>
          <div className="check_buttons ">
            {back_button}
            {order_button}
          </div>
        </div>
        <img
          onLoad={this.Onloadfunction} //画像の読み込み時の関数
          src={Icon_pack} //画像
          className={img_class}
          style={img_style}
          alt=""
        ></img>
      </div>
    );

    // 各入力項目の調整用スタイル
    var pic_style = { margin: "0px 0px -2px 0px", padding: "0px 0px 0px 0px" };

    // 入力フォーム、入力部分作成
    var input_elements = (
      <div className="">
        <form name="input_info">
          <div className="form_class">
            {/* <b>name:</b> */}
            <img
              src={Icon_name} //名前入力の画像
              width="50px"
              height="20px"
              style={pic_style}
              alt=""
            ></img>
            <input
              type="text"
              name="name" //名前入力
              className="tbox"
              value={this.state.name}
              onChange={() => this.onChangeFunction(event, "name")} //編集時にステートを変更
            ></input>
            {this.state.val_check_flags.name === true ? (
              <p
                className="error_msg" //エラー時のメッセージ
              >
                {" "}
                <span className="text_alert">!!</span> お名前を入力してください
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form_class">
            {/* <b>mail:</b> */}
            <img
              src={Icon_mail} //メールアドレスの画像
              width="50px"
              height="20px"
              alt=""
            ></img>

            <input
              type="text"
              name="mail" //メールアドレスの入力
              className="tbox"
              value={this.state.mail}
              onChange={() => this.onChangeFunction(event, "mail")} //編集時にステートを変更
            ></input>
            {this.state.val_check_flags.mail === true ? (
              <p
                className="error_msg" //エラー時のメッセージ
              >
                {" "}
                <span className="text_alert">!!</span>半英数 @ドメイン{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form_class">
            {/* <b>tel:</b> */}
            <img
              src={Icon_tel} //電話番号の画像
              width="50px"
              height="20px"
              style={pic_style}
              alt=""
            ></img>

            <input
              type="text"
              name="tel" //電話番号の入力
              className="tbox"
              value={this.state.tel}
              onChange={() => this.onChangeFunction(event, "tel")} //編集時にステートを変更
            ></input>
            {this.state.val_check_flags.tel === true ? (
              <p
                className="error_msg" //エラー時のメッセージ
              >
                {" "}
                <span className="text_alert">!!</span> 半英数 -(ハイフン){" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form_class">
            {/* <b>address:</b> */}
            <img
              src={Icon_address} //住所の画像
              width="50px"
              height="20px"
              style={pic_style}
              alt=""
            ></img>

            <input
              type="text"
              name="address" //住所の入力
              className="tbox"
              value={this.state.address}
              onChange={() => this.onChangeFunction(event, "address")} //編集時にステートを変更
            ></input>
            {this.state.val_check_flags.address === true ? (
              <p
                className="error_msg" //エラー時のメッセージ
              >
                <span className="text_alert">!!</span> 住所を入力してください
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );

    //入力フォームの要素
    var forms = (
      <div className={input_order}>
        {/* <canvas id="order_canvas"></canvas> */}
        <div>{input_elements}</div>
        <div>{input_button}</div>
        <div className="package_reverse2">
          <img
            src={Icon_Oppack} //裏返しのパッケージ画像
            // onLoad={this.Onloadfunction(event)}
            className={img_class}
            style={img_style}
            alt=""
          ></img>
        </div>
      </div>
    );

    var result;
    // 確認画面のフラグなら確認画面、それ以外なら入力画面を表示
    if (this.state.flg === false) {
      // return result;
      result = forms;
    } else {
      // return order_check;
      result = order_check;
    }

    return result;
  }
}
