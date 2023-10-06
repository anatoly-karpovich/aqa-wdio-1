import SignInService from "../../../services/signIn.service.js";

class SignInApiSteps {
  async signInAsAdminAndGetToken() {
    let resp = await SignInService.login({ data: { username: "aqacourse@gmail.com", password: "password" } });
    return resp.data.token;
  }
}

export default new SignInApiSteps();
