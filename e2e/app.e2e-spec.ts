import { BeerCocktailsPage } from './app.po';

describe('beer-cocktails App', () => {
  let page: BeerCocktailsPage;

  beforeEach(() => {
    page = new BeerCocktailsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
