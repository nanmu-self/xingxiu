<template>
  <div id="page" class="site">
    <div class="container">
      <div class="login">
        <div class="hero">
          <h1></h1>
          <h1>楠木宝库后台</h1>

          <h2>在这里开启您的新篇章<i class="ri-heart-2-line"></i></h2>
        </div>
        <div class="main">
          <form action="##" method="post">
            <p>
              <input
                name="adminName"
                type="text"
                placeholder="用户名"
                required=""
              />
            </p>
            <p class="password">
              <input
                id="passwordInput"
                name="pw"
                type="password"
                placeholder="密码"
                required=""
              />
              <i id="togglePassword" class="ri-eye-off-line"></i>
            </p>
            <p class="mrt2">
              <button id="login_post" class="submit shadow-blur" type="button">
                登入管理 <i class="ri-navigation-line"></i>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
:root {
  --primary-color: #4460f1;
  --white-color: #ffffff;

  --light-text-color: #9398b3;
  --light-bg-color: #f2f4ff;
  --dark-color: #333333;

  --background-color: #f7f7f7;
}

* {
  margin: 0;
  padding: 0;
}

*,
::before::after {
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans SC", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  color: var(--dark-color);
  background-color: var(--background-color);
  user-select: none;
  -webkit-user-drag: none;
}

a {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

ul {
  list-style: none;
}

.login .hero h1 {
  font-size: 4.5em;
  font-weight: 700;
  line-height: normal;
  text-shadow: 2px 2px 5px #5a5a5ac9;
  letter-spacing: 2px;
  cursor: pointer;
}

.login .hero h1 a {
  text-decoration: none;
  color: black;
  transition: all 0.3s;
}

.login .hero h1 a:hover {
  color: #333;
}

h2 {
  font-weight: 700;
  text-shadow: 1px 1px 2px #747474d4;
  font-family: "Noto Serif SC", serif;
  color: #2e2e2e;
  font-size: 1.7rem;
  letter-spacing: 3px;
}

.site {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}

.container {
  max-width: 1000px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
}

.login {
  display: flex;
  flex-wrap: wrap;
}

.hero {
  flex: 1 0 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  /* gap: 50px; */
  padding: 70px 0;
  margin-right: 100px;
}

.hero::before {
  content: "";
  position: absolute;
  top: 15%;
  left: 0;
  width: 280px;
  height: 100px;
  background: linear-gradient(to right, var(--primary-color), #c471ed, #f64f59);
  /* z-index: -1; */
  filter: blur(70px);
}

.hero a {
  font-weight: 700;
  color: var(--primary-color);
  transition: color 0.3s;
}

.hero a:hover,
form .password a:hover {
  color: var(--dark-color);
  text-decoration: underline;
}

.main {
  flex: 1 0 33.3333%;
}

.main form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main form p {
  position: relative;
}

.main form p.FlexRow {
  display: flex;
  gap: 1rem;
}

.main form p.FlexRow #clearLogin,
.main form p.FlexRow #toAdmin {
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid transparent;
}

.main form p.FlexRow #clearLogin {
  background: none;
  border-color: #ff5a5a;
  color: #ff5a5a;
}

.main form p.FlexRow #clearLogin:hover {
  background: #ff5a5a;
  border-color: transparent;
  color: #ffffff;
}

.main form p.FlexRow #toAdmin {
  background: #4298fd;
}

.main form p.FlexRow #toAdmin:hover {
  background: none;
  border-color: #4298fd;
  color: #4298fd;
}

.main form p.LoginTrue {
  font-size: 1.2rem;
  font-family: "Noto Serif SC", serif;
  padding: 0.5rem 1rem;
  border: 1px dashed #b7b7b7;
  border-radius: 0.5rem;
  color: #7e7e7e;
}

form input {
  font: inherit;
  font-size: 14px;
  width: 100%;
  border: 0;
  outline: 0;
  padding: 0 20px;
  line-height: 60px;
  border-radius: 10px;
  box-sizing: border-box;
}

form input[type="password"] {
  font-family: “Microsoft YaHei”, Arial !important;
  font-size: 30px;
  letter-spacing: 5px;
}

form button:not(.submit) {
  background-color: var(--light-bg-color);
}

/*#passwordInput[type='password'] {*/
/*    font-family: Arial;*/
/*    font-size: 38px;*/
/*    letter-spacing: 5px;*/
/*}*/

input::placeholder {
  color: var(--dark-color);
  font-family: "Noto Sans SC", sans-serif;
  font-size: 16px;
  color: #7b7373;
}

form .password i {
  position: absolute;
  top: calc(60px / 2);
  right: 20px;
  margin-top: -8px;
  line-height: 1;
  color: var(--light-text-color);
  cursor: pointer;
}

form .password a {
  font-size: 13px;
  color: var(--light-text-color);
  float: right;
  margin: 5px 20px 0 0;
}

form button.submit {
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 5px;
  color: var(--white-color);
  background-color: #000000;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  outline: none;
  border: none;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

form button.submit:hover {
  background-color: #3e3e3e;
}

form button.submit[disabled="disabled"] {
  background-color: #545454;
}

.shadow-blur {
  position: relative;
}

.shadow-blur::before {
  content: "";
  display: block;
  background: inherit;
  filter: blur(0.5rem);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 5px;
  left: 5px;
  z-index: -1;
  opacity: 0.4;
  transform-origin: 0 0;
  border-radius: inherit;
  transform: scale(1, 1);
}

.separator {
  position: relative;
  margin: 50px 0 30px;
}

.separator::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: var(--light-text-color);
  opacity: 0.3;
  z-index: 1;
}

.separator p {
  font-size: 14px;
  width: fit-content;
  padding: 0 10px;
  color: var(--light-text-color);
  background-color: var(--background-color);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.options ul {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.options ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white-color);
  box-shadow: var(--light-text-color) 0 10px 20px -10px;
  transition: all 0.3s ease-out;
}

.options ul li a:hover {
  color: var(--white-color);
  box-shadow: none;
}

.Copyright p {
  padding: 12px;
}

.Copyright p {
  font-size: 0.9rem;
  text-align: center;
  color: #656565;
}

.Copyright p a {
  position: relative;
  transition: all 0.5s;
}

.Copyright p a::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: -5px;
  height: 1px;
  background-image: linear-gradient(45deg, #e3e3e3, #8f8b8b, #e3e3e3);
  width: 0%;
  transition: all 0.2s;
  border-radius: 10px;
}

.Copyright p a:hover:before {
  width: 100%;
}

.Copyright p a:hover {
  color: #8c8c8c;
}

.mrt2 {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .login {
    flex-direction: column;
  }

  .login .hero h1 {
    font-size: 3em;
  }

  .login .hero h2 {
    font-size: 1.3em;
  }

  .Copyright p a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
  }
}
</style>
