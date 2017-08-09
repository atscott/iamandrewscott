import {RecipeInfo} from './recipe-list.component';

export function sortByMissingIngredientCount(l: RecipeInfo[]) {
  return l.sort((a, b) => a.dontHave.length - b.dontHave.length);
}

export function sortByPercent(l: RecipeInfo[]) {
  return l.sort((a, b) => {
    if (a.percentIHave - b.percentIHave === 0) {
      return b.have.length - a.have.length;
    }
    return b.percentIHave - a.percentIHave;
  });
}