// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBquOi8RjipStQUXrQiKAxo1kfhNELRSQo",
  authDomain: "todo-nado.firebaseapp.com",
  projectId: "todo-nado",
  storageBucket: "todo-nado.appspot.com",
  messagingSenderId: "1037836607269",
  appId: "1:1037836607269:web:6cf9cd484d25a789d304cc",
  measurementId: "G-KQK2SD3VXF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

userState();

// db에 데이터 쓰는 샘플코드
export async function readDb() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 회원가입하는 코드
export function signup() {
  console.log("singup")
  // const auignupth = getAuth();
  const singupDisplayName = document.getElementById("signup_name").value;
  const signupEmail = document.getElementById("signup_email").value;
  const signupPassword = document.getElementById("signup_pw").value;

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("회원가입 성공 : ", user);

      // 이메일, 비밀번호 외의 사용자 정보는 여기서 넣으세요.
      updateProfile(auth.currentUser, {
        displayName: singupDisplayName,
      })
        .then(() => {
          console.log("이름넣기 완", auth.currentUser);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

/*
 이메일 링크를 사용하여 연결/재인증 : https://firebase.google.com/docs/auth/web/email-link-auth?hl=ko#linkingre-authentication_with_email_link
*/
// 로그인 하는 코드
export function login() {
  console.log("login")
  // const auth = getAuth();
  const loginEmail = document.getElementById("login_email").value;
  const loginPassword = document.getElementById("login_pw").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      
      console.log(userCredential);
      console.log("로그인됨 : ", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

// 로그인 후 사용자 데이터 가져오기(현재 로그인한 사용자 가져오기)
// 로그 아웃 전까지 유지? 되는? 듯 하는? 그런? 거?
export function userState() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("로그인 중인 상태 : ", user);
    } else {
      // User is signed out
      // ...
      console.log("로그인 필요한 상태");
    }
  });
}

// 이메일 인증 메일 보내기
export function emailVerification() {
  const auth = getAuth();
  auth.languageCode = "it";
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
  });
}

// 로그아웃
// export function logout() {
//   const onSignOut = async () => {
//     try {
//       const auth = getAuth(app);
//       await signOut(auth);
//       toast.success("로그아웃 되었습니다.");
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.code);
//     }
//   };
// }
