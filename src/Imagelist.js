// トッピング画像のソース情報取得

//使用するトッピングの画像のインポート
import Icon_cheese1 from "./img/topping/cheese1.png";
import Icon_cheesebl from "./img/topping/CheeseBL.png";
import Icon_cheesecd from "./img/topping/CheeseCD.png";
import Icon_cheesekm from "./img/topping/CheeseKM.png";
import Icon_cheesemt from "./img/topping/CheeseMT.png";
import Icon_cheesepz from "./img/topping/CheesePZ.png";

import Icon_Veg1 from "./img/topping/Veg1.png";
import Icon_Broccoli from "./img/topping/Broccoli.png";
import Icon_Karifu from "./img/topping/Karifurawa.png";
import Icon_Piiman from "./img/topping/Piiman.png";
import Icon_Papurika from "./img/topping/Papurika.png";
import Icon_Tomato from "./img/topping/Tomato.png";
import Icon_Tomato2 from "./img/topping/Tomato2.png";
import Icon_Kinoko from "./img/topping/Kinoko.png";

import Icon_Meat1 from "./img/topping/Meat1.png";
import Icon_Meat from "./img/topping/Meat.png";
import Icon_Buta from "./img/topping/Butaniku.png";
import Icon_Octp from "./img/topping/Octopus.png";
import Icon_Winer from "./img/topping/Winer.png";
import Icon_Chicken from "./img/topping/Chicken.png";

import Icon_Ika1 from "./img/topping/Ika1.png";

export default function Getimage_src(obj) {
  // console.log(obj);
  // var n = obj.IndexOf(".png");
  // 文字列が画像かどうかチェック

  // 文字列を加工

  // サイドメニュー画像の変更用
  // インポートした画像オブジェクトを、返却用のオブジェクトにそれぞれ設定して返す。
  // 返却するのは現在選択中のトッピングの種類、と番号によって取得したインデックスのもの
  var Img_list = {
    veg: {
      1: { 1: Icon_Piiman, 2: Icon_Broccoli, 3: Icon_Tomato2 },
      2: { 1: Icon_Karifu, 2: Icon_Papurika, 3: Icon_Kinoko }
    },
    meat: {
      1: { 1: Icon_Meat1, 2: Icon_Chicken, 3: Icon_Meat },
      2: { 1: Icon_Buta, 2: Icon_Octp, 3: Icon_Winer }
    },

    cheese: {
      1: { 1: Icon_cheese1, 2: Icon_cheesebl, 3: Icon_cheesekm },
      2: { 1: Icon_cheesecd, 2: Icon_cheesemt, 3: Icon_cheesepz }
    }
  };

  var type = obj["type"]; //トッピングの種類を引数から取得
  var n = obj["num"]; //トッピングのインデックスを引数から取得。

  var result = Img_list[type][n]; //種類とインデックスに合わせたオブジェクトにして返す

  return result;
}
