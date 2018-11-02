import { ShopSitePage } from './app.po';

describe('shop-site App', function() {
  let page: ShopSitePage;

  beforeEach(() => {
    page = new ShopSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
