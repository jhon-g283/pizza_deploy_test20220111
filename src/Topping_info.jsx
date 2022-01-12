// トッピングの情報を表示するコンポーネント

import React from "react";

import { getpriceobj } from "./PriceList"; //値段の情報を取得する関数

export default function Toppinginfo(props) {
  console.log("---function Toppinginfo--");

  var type = props.topping_type; //トッピングのタイプ
  var img_src = props.selecting_topping; //選択中のトッピング
  var page = props.topping_page; //現在表示してるページ数

  var topping_names = { veg: "野菜", meat: "肉", cheese: "チーズ" }; //トッピングの種類を表示するオブジェクト
  var selecting_type = topping_names[type]; //現在トッピングの種類
  var name;
  var price;

  //ない場合の処理
  if (selecting_type === undefined) {
    selecting_type = "test";
  }

  // トッピングの種類とページ数をセット
  var result;
  // var result = (
  //   <div>
  //     {selecting_type} {page} ページ目{" "}
  //   </div>
  // );

  var selecting_topping_info = getpriceobj(img_src); //値段を取得

  // srcからトッピングを何か選択している場合かどうかを判断
  if (img_src !== "") {
    name = selecting_topping_info["name"];
    price = selecting_topping_info["price"];

    var info = (
      <div>
        <div>-クリックで選択-</div>
        <div>トッピング名:{name}</div>
        <div>値段（１個）:{price}¥</div>
      </div>
    );

    result = (
      <div>
        {result} {info}
      </div>
    );
  } else {
    // 何も選択していない場合
    var info = (
      <div>
        <div>-トッピングを選択してください-</div>
        <div>両端の切り替えボタンで次のページへ</div>
        <div>メニューバーから種類を変更できます。</div>
      </div>
    );
    result = (
      <div className="">
        {result} {info}
      </div>
    );
  }

  console.log("selecting_topping_info");

  return result;
}
