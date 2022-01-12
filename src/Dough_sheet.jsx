import React from "react";
import Icon_dough from "./img/dough/dough.png";
import Icon_bkg from "./img/background/Manaita.png"; //背景の画像

export default function Dough_fnc(props) {
  //（要修正）propsで画像を変更する

  console.log("--function-- Dough_fnc");
  // console.log(props.dough_src);

  var src = Object.values({ Icon_bkg });

  var img_src = props.dough_src; //引数で画像のsrc取得

  // 空欄の場合はデフォルトで画像取得
  if (img_src === "") {
    img_src = { Icon_dough };
  }

  // 背景のスタイル
  var style = {
    backgroundImage: "url(" + src + ") ", //background-imag
    backgroundSize: "100% 100%", //background-size
    backgroundRepeat: "no-repeat", //background-repeat
    borderRadius: "40px 40px 40px 40px" //border-radius
  };
  // console.log(style);
  const dough_img = (
    <img
      // src={Icon_dough}
      src={img_src}
      alt=""
      width="70%"
      id="Dough_img2"
      className=" test_border_1"
      style={style}
    ></img>
  );

  return dough_img;
}
