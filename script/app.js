import { signup, login } from "./firebase";

const openLoginMd = document.getElementById("open_login_md");
const loginMd = document.querySelector(".login-wrap");

openLoginMd.addEventListener("click", () => {
  console.log("클릭함");
  console.log(loginMd.classList);
  loginMd.classList.remove("none");
});


// 회원가입 버튼 클릭 - Test
document.getElementById('signup_btn').addEventListener('click', (event) => {
  event.preventDefault()
  console.log("회원가입 테스트 - signup_btn 클릭")
  signup();

})


// 로그인 버튼 클릭 - Test
document.getElementById('login_btn').addEventListener('click', (event) => {
  event.preventDefault()
  console.log("로그인 테스트 - login_btn 클릭")
  login();

})