import { TradeworksPage } from './app.po';

describe('tradeworks App', () => {
  let page: TradeworksPage;

  beforeEach(() => {
    page = new TradeworksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
