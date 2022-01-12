//配置したトッピングの明細情報を表示するコンポーネント

import React from "react";
import bord2 from "./img/background/Bord2.png";
import bord4 from "./img/background/Bord4.png";

export default function OrderDetail(props) {
  let sum_price = 0; //合計値
  var ing_obj = props.Ingredients_info; //セットしたトッピングの配列
  let array_ing = []; //具材の名前用配列
  let array_ing_total = []; //具材の合計金額
  let tmp;

  // スタイル用オブジェクト
  var bcg_style = {
    backgroundImage: "url(" + Object.values({ bord4 }) + ") ",
    backgroundSize: "55% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
    // "background-color": "white"
  };

  console.log("--function--- OrderDetail");

  // ing_obj{name:トッピング名,price:値段}のオブジェクトのインデックス数だけループする
  for (let v in ing_obj) {
    // 合計金額を加算していく
    sum_price += ing_obj[v]["price"];
    tmp = ing_obj[v]["name"]; //トッピング名を取得
    // console.log(getpriceobj);

    // すでに追加したトッピング名かどうかをチェック
    let tmp_ayyay = array_ing.find((element) => element === tmp);

    // 新規追加の場合
    if (tmp_ayyay === undefined) {
      console.log("push---");
      // 挿入用のオブジェクト
      let tmp_insert = { name: tmp, total_price: ing_obj[v]["price"] };
      array_ing.push(ing_obj[v]["name"]); //トッピング名の配列にトッピングを追加
      array_ing_total.push(tmp_insert); //トッピングの合計金額にも追加
      // console.log(array_ing);
      // console.log(array_ing_total);
    } else {
      // すでに追加している場合、トッピングの合計金額のオブジェクトをループさせて一致した名前のものに値段を追加する。
      for (const i of array_ing_total.keys()) {
        // 名前が一致した場合
        if (array_ing_total[i]["name"] === tmp) {
          // 値段の配列に合計金額を追記
          array_ing_total[i]["total_price"] += ing_obj[v]["price"];
        }
      }
    }
  }

  var result = <div>合計：{sum_price}</div>;

  // トッピング名と合計金額のオブジェクトからmapメソッドを使用してトッピングの一覧を作成する。
  const result_map = array_ing_total.map((element, index) => {
    var detail_keyname = "key" + { index }; //key名
    var returnelement = (
      <li className="ing_detail_list" style={bcg_style} key={detail_keyname}>
        {element.name} : {element.total_price}
      </li>
    );

    return returnelement;
  });

  // 合計金額とその内訳として返却
  result = (
    <div>
      <div className="ing_detail_sum">{result}</div>

      {result_map}
    </div>
  );

  return result;
}
