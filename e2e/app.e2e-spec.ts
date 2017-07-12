import { BasketLiliPage } from './app.po';

describe('basket-lili App', () => {
  let page: BasketLiliPage;

  beforeEach(() => {
    page = new BasketLiliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
