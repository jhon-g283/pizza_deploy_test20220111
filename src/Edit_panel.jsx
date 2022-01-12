// 配置したトッピングの編集用のコンポーネント

import React from "react";
// import bord1 from "./img/background/Bord1.png";
// import bord2 from "./img/background/Bord2.png";
import bord4 from "./img/background/Bord4.png";

export default function Edit_panel(props) {
  console.log("--function-- Editp_anel");
  // console.log(props);

  var current = props.current_cnt; //現在のインデックス数
  var max = props.max_index_cnt; //現在のインデックス数最大値
  var flg = false; //最大現在のインデックス数が最大値かどうかのフラグ

  //
  var fnc = () => {
    console.log("--can not click forward--");
    console.log("max_index:" + max);
  };

  // 背景のスタイル
  var bcg_style = {
    backgroundImage: "url(" + Object.values({ bord4 }) + ") ",
    backgroundSize: "30% 100%", //background-size
    backgroundRepeat: "no-repeat", //background-repeat
    backgroundPosition: "center" //background-position
    // "background-color": "white"
  };

  var back_class = "";

  // インデックス数が最大値かどうかで
  if (current == max) {
    flg = true; //
    if (max == 0) {
      back_class = "font_block"; //
    }
  }

  const edit_node = (
    <div className="edit_p1">
      <div>
        <li
          className={back_class}
          onClick={() => props.click_fnc("back")} //インデックスを戻す
          style={bcg_style}
        >
          <span className="edit_add_border">戻る</span>
        </li>
        {flg ? (
          //インデックスが最大の時の処理（これ以上進めなくする。）
          <li onClick={fnc} className="font_block ">
            進む
          </li>
        ) : (
          <li
            onClick={() => props.click_fnc("forward")} //表示するインデックスをインクリメント
            style={bcg_style}
          >
            <span className="edit_add_border"> 進む</span>
          </li>
        )}

        <li
          onClick={() => props.reset_fnc("reset")} //リセット処理
          style={bcg_style}
        >
          <span className="edit_add_border">リセット</span>
        </li>
      </div>
    </div>
  );

  return edit_node;
}
