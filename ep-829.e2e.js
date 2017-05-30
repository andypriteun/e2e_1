export default {
  tags: ['ep-829'],
  'EP 829: OAuth login process': (client) => {
    const EXISTING_FOX_USER_ONE_EMAIL = process.env.EXISTING_FOX_USER_ONE_EMAIL;
    const EXISTING_FOX_USER_ONE_PASSWORD = process.env.EXISTING_FOX_USER_ONE_PASSWORD;
    const navigation = client.page.navigation();
    const foxLogin = client.page.foxLogin();
    const homepage = client.page.homepage();
    navigation.goToHome();
    navigation.waitForElementPresent('@foxSportsLogo');
    navigation.click('@foxSportsLogo');
    client.window_handles(function(result) {
      const handle = result.value[1];
      client.switchWindow(handle);
    });
    foxLogin.waitForElementPresent('@headerLogin');
    foxLogin.click('@headerLogin');
    foxLogin.waitForElementPresent('@emailInput');
    foxLogin.login(EXISTING_FOX_USER_ONE_EMAIL, EXISTING_FOX_USER_ONE_PASSWORD);
    navigation.goToHome();
    homepage.waitForElementPresent('@homeLoginButton');
    homepage.click('@homeLoginButton');
    homepage.expect.element('@homeSection').to.be.present;
  },
  after: (client) => {
    client.end();
  },
};
