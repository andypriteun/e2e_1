export default {
  tags: ['ep-871'],
  'EP 871: Display vital elements upon successful log in': (client) => {
    const EXISTING_USER_TWO_EMAIL = process.env.EXISTING_USER_TWO_EMAIL;
    const EXISTING_USER_TWO_PASSWORD = process.env.EXISTING_USER_TWO_PASSWORD;
    const navigation = client.page.navigation();
    const loginPage = client.page.login();
    navigation.goToHome();
    loginPage
      .navigate()
      .login(EXISTING_USER_TWO_EMAIL, EXISTING_USER_TWO_PASSWORD);
    navigation.goToTeam();
    navigation.expect.element('@team').text.to.match((/Team/i));
    navigation.expect.element('@points').text.to.match((/Punten/i));
    navigation.expect.element('@transfers').text.to.match((/Transfers/i));
    navigation.expect.element('@leagues').text.to.match((/Leagues/i));
    navigation.expect.element('@news').text.to.match((/Nieuws/i));
    navigation.expect.element('@rules').text.to.match((/Regels/i));
    navigation.expect.element('@prizes').text.to.match((/Prijzen/i));
    navigation.expect.element('@faq').text.to.match((/faq/i));
    navigation.expect.element('@support').text.to.match((/Support/i));
    navigation.expect.element('@account').text.to.match((/Mijn account |/i));
    navigation.expect.element('@logOut').text.to.match((/Log uit/i));
  },
  after: (client) => {
    client.end();
  },
};
