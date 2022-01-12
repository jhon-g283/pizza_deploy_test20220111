import React from "react";

// 具材の表示用の関数コンポーネント
// ノードを入れた配列を引数で受け取って、Map関数で画像を要素の塊にして返却する。
export default function ToppingView(props) {
  console.log("--function-- ToppingView");

  var stop_index = props.viewing_index; //現在表示できるインデックス数

  //コールバック関数に渡すオブジェクト：トッピングの配置可能な領域のオブジェクト
  const p_dough_range = props.range;

  // map関数で<img>の配列にして返却
  const map_array = props.img_array.map((element, index) => {
    // 現在表示してるインデックス数を超えたら処理を終了
    if (stop_index <= index) {
      // console.log("return");
      return;
    }

    // <img>タグに渡すスタイル情報を作成
    let element_style = {
      zIndex: 1000, //Z位置
      position: "absolute", //絶対値指定
      top: element.style.top, //配列内のオブジェクトから縦位置をコピー
      left: element.style.left //配列内のオブジェクトから横位置をコピー
    };

    let img_key = "img_key" + index;

    // Map関数に返す返り値
    let img_element = (
      <img
        className="not_moving"
        draggable="false"
        src={element.src} //画像のsrc
        alt={element.alt} //画像のalt
        width={element.width} //長さ
        height={element.height} //高さ
        style={element_style} //スタイル
        onMouseMove={() => props.move_fnc(event, p_dough_range)} //マウスで動かした時の関数
        onClick={() => props.click_fnc(event, p_dough_range)} //マウスでクリックした時の関数
        key={img_key}
        //style={element.style}
        // onMouseMove={this.cloneObj}
        // onClick={this.change_select_img}
      ></img>
    );

    return img_element;
  });

  return map_array; //mapで作った配列を返却
}
