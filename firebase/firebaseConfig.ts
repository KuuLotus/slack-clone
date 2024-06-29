// 必要なSDKの関数をインポート
import { initializeApp } from "firebase/app";
// 使用したいFirebase製品のSDKを追加

// Firebaseのウェブアプリ設定
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
};

// Firebaseを初期化
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
