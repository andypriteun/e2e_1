export default {
  tags: ['ep-879'],
  'ep-879: Login using exisiting Fox Account': (client) => {
    const EXISTING_FOX_USER_ONE_EMAIL = process.env.EXISTING_FOX_USER_ONE_EMAIL;
    const EXISTING_FOX_USER_ONE_PASSWORD = process.env.EXISTING_FOX_USER_ONE_PASSWORD;
    const navigation = client.page.navigation();
    const foxLogin = client.page.foxLogin();
    const loginPage = client.page.login();
    const homepage = client.page.homepage();
    navigation.goToHome();
    homepage.waitForElementPresent('@homeLoginButton');
    homepage.click('@homeLoginButton');
    foxLogin.waitForElementPresent('@loginSection');
    foxLogin.login(EXISTING_FOX_USER_ONE_EMAIL, EXISTING_FOX_USER_ONE_PASSWORD);
    homepage.expect.element('@loadingMessage').to.be.present;
    homepage.waitForElementPresent('@homeSection');

    navigation.click('@logOut');
    navigation.click('@register');
    loginPage.click('@foxLoginButton');
    client.window_handles(function(result) {
     const handle = result.value[1];
     client.switchWindow(handle);
    });
    foxLogin.waitForElementPresent('@foxUserDropdown');
    foxLogin.click('@foxUserDropdown');
    foxLogin.waitForElementPresent('@foxLogOutUser');
    client.pause(1000);
    foxLogin.click('@foxLogOutUser');
    client.closeWindow();
    client.window_handles(function(result) {
    const handle = result.value[0];
    client.switchWindow(handle);
  });

    navigation.waitForElementPresent('@logIn');
    navigation.click('@logIn');
    loginPage.click('@foxLoginButton');
    foxLogin.waitForElementPresent('@loginSection');
    foxLogin.login(EXISTING_FOX_USER_ONE_EMAIL, EXISTING_FOX_USER_ONE_PASSWORD);
    homepage.expect.element('@loadingMessage').to.be.present;
    homepage.waitForElementPresent('@homeSection');
  },
  after: (client) => {
    client.end();
  },
};
