// 画像名から値段やトッピングの名前をオブジェクトを使って返却させる、

function GetPrice(img_name) {
  console.log("--function GetPrice--");

  //  引数が空なら処理終了
  if (img_name === "") {
    // console.log(test);
    return;
  }

  // アップ環境の画像のソースの仕様に対する文字列の処理を行い、画像名を取得
  var priod_index = img_name.lastIndexOf(".");

  var haifun_index = img_name.lastIndexOf("-");
  var name_length = img_name.length;
  var length_to_end = name_length - priod_index;
  var get_length = name_length - length_to_end;

  var name = img_name.slice(haifun_index + 1, get_length); //画像名（拡張子抜き）取得

  console.log("before:" + img_name);

  // 計算用
  //
  //
  //
  //
  var Price_list = {
    circle: {
      name: "veg1",
      price: 100,
      type1: "veg",
      sortid: 1,
      type: 1,
      type2: 2
    },
    triangle: {
      name: "meat1",
      price: 100,
      type1: "meat",
      sortid: 2,
      type: 1,
      type2: 2
    },
    // ブロッコリー
    Broccoli: {
      name: "ブロッコリー",
      price: 10,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Tomato: {
      name: "トマト",
      price: 5,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    cheese1: {
      name: "チーズ",
      price: 50,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    // Ika1.png
    Ika1: {
      name: "いか",
      price: 50,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Veg1: {
      name: "ピーマン",
      price: 20,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Papurika: {
      name: "パプリカ",
      price: 40,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Butaniku: {
      name: "豚肉",
      price: 200,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    CheeseBL: {
      name: "ブルーチーズ",
      price: 30,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    CheeseCD: {
      name: "チェダーチーズ",
      price: 55,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    CheeseKM: {
      name: "カマンベールチーズ",
      price: 40,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    CheeseMT: {
      name: "モッツァレラチーズ",
      price: 70,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    CheesePZ: {
      name: "パルメザンチーズ",
      price: 10,
      type1: "cheese",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Karifurawa: {
      name: "カリフラワー",
      price: 20,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Meat: {
      name: "牛肉",
      price: 200,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Octopus: {
      name: "タコ",
      price: 120,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Papurika: {
      name: "パプリカ",
      price: 40,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Piiman: {
      name: "ピーマン",
      price: 40,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Winer: {
      name: "ウィンナー",
      price: 60,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Chicken: {
      name: "チキン",
      price: 40,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Meat1: {
      name: "サラミ",
      price: 20,
      type1: "meat",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Kinoko: {
      name: "マッシュルーム",
      price: 10,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    },
    Tomato2: {
      name: "トマト",
      price: 5,
      type1: "veg",
      sortid: 3,
      type: 1,
      type2: 2
    }
  };

  // 名前から該当するオブジェクトを取得して返却
  var result = Price_list[name];

  // console.log(result);

  if (result === undefined) {
    var test = {
      name: "test",
      price: 100,
      type1: "test",
      sortid: 1,
      type: 1,
      type2: 2
    };

    return test;
  }

  // console.log(result);

  return result;
}

// GetPriceとしてエクスポート
export { GetPrice as getpriceobj };
