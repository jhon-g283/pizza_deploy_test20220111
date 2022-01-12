// ヘルプ用のポップアップ
// スタイルはCSSで固定の値にさせる。

import React from "react";
// testよう
import Icon_right from "./img/right.png";
import Icon_left from "./img/left.png";
import Icon_circle from "./img/circle.png";
import Icon_triangle from "./img/triangle.png";
import Icon_square from "./img/square.png";

//Help用の画像が必要
//
//
import Icon_Exp0 from "./img/help_img/Exp0.png";
import Icon_Exp0A from "./img/help_img/Exp0A.png";

import Icon_Exp1 from "./img/help_img/Exp1.png";
import Icon_Exp2 from "./img/help_img/Exp2.png";
import Icon_Exp3 from "./img/help_img/Exp3.png";
import Icon_Exp4 from "./img/help_img/Exp4.png";
import Icon_Exp5 from "./img/help_img/Exp5.png";
import Icon_Exp6 from "./img/help_img/Exp6.png";
import Icon_Exp7 from "./img/help_img/Exp7.png";

export default class HelpPopup extends React.Component {
  constructor(props) {
    super(props);
    //クローズ用にAppのフラグを変える関数が必要
    //
    this.change_page = this.change_page.bind(this);
    this.set_img_src = this.set_img_src.bind(this);
    this.state = {
      page: 0 //ヘルプ用のページ番号
    };
  }

  // ページ更新用関数
  change_page(flg) {
    console.log("--function change_page--");

    var tmp = this.state.page;

    if (flg === true) {
      tmp = tmp + 1;
      console.log(tmp);

      if (tmp === 8) {
        tmp = 0;
      }
    } else {
      tmp = tmp - 1;
      console.log(tmp);
      if (tmp === -1) {
        tmp = 7;
      }
    }

    this.setState({ page: tmp });
  }

  // ページに応じて画像のsrcを返却
  set_img_src(page_n) {
    console.log("--function set_img_src--");
    var src;
    var img_obj;
    var img_list = {
      0: { Icon_Exp0 },
      1: { Icon_Exp0A },
      2: { Icon_Exp1 },
      3: { Icon_Exp2 },
      4: { Icon_Exp3 },
      5: { Icon_Exp4 },
      6: { Icon_Exp5 },
      7: { Icon_Exp6 },
      8: { Icon_Exp7 }
      // 9:{ Icon_Exp8 },
    };

    img_obj = img_list[page_n]; //該当ページの画像取得

    src = Object.values(img_obj);

    return src;
  }

  render() {
    const closebtn = (
      <div>
        <p
          className="close_btn"
          onClick={this.props.close_fnc} //ヘルプ画面の表示フラグ変更
        >
          close x
        </p>
      </div>
    );
    const help_messsage = (
      <div>
        <p>ヘルプページ</p>
      </div>
    );
    var page = this.state.page; //現在のページ数取得
    // ページ数に合わせた説明文
    var msg_obj = {
      0: "",
      1: "1 画面の説明",
      2: "2 トッピングエリア:選択",
      3: "3 トッピングの手順",
      4: "4 トッピンングの変更",
      5: "5 生地の変更",
      6: "6 編集エリアと出来上がりの確認",
      7: "7 注文"
    };
    var msg = msg_obj[page];

    // ヘルプ用の画像
    const help_img = (
      <div>
        <img
          src={this.set_img_src(page)}
          alt=""
          draggable="false"
          className="help_img"
          onTouchStart={(event) => console.log("st" + event.clientX)}
          onDragStart={(event) => console.log("st" + event.clientX)}
          onDrag={(event) => console.log("dg" + event.clientX)}
          onDragEnd={(event) => console.log("ed" + event.clientX)}
          onDrop={(event) => console.log("dp" + event.clientX)}
        ></img>
      </div>
    );
    // ヘルプの切り替え用画像：左
    const help_img_change_left = (
      <img
        src={Icon_left}
        onClick={() => this.change_page(false)} //ページ変更：後ろ側へ
        className="Img_select add_border_b"
        alt=""
        width="20px"
        height="50px"
      ></img>
    );
    // ヘルプの切り替え用画像：右
    const help_img_change_right = (
      <img
        src={Icon_right}
        onClick={() => this.change_page(true)} //ページ変更：前側
        className="Img_select add_border_b"
        alt=""
        width="20px"
        height="50px"
      ></img>
    );

    const return_img = (
      <div className="">
        {help_img_change_left}
        <a>左右の矢印でページ変更</a>
        {help_img_change_right}
      </div>
    );

    const result = (
      <div>
        <div className="help_menu">
          <div>{closebtn}</div>
          <div>{help_messsage}</div>
          {/* {page} */}
          {msg}
          {help_img}
          {return_img}
        </div>
        <div className="help_menu2"></div>
      </div>
    );

    return result;
  }
}
