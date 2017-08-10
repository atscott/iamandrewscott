import {RecipeInfo} from './recipe-list.component';

export function sortByMissingIngredientCount(l: RecipeInfo[]) {
  l.sort((a, b) => a.dontHave.length - b.dontHave.length);
  return l;
}

export function sortByPercent(l: RecipeInfo[]) {
  l.sort((a, b) => {
    if (a.percentIHave - b.percentIHave === 0) {
      return b.have.length - a.have.length;
    }
    return b.percentIHave - a.percentIHave;
  });
  return l;
}

export function removeGarnishIngredients(l: RecipeInfo[]) {
  return l.map((info) => {
    const copy = {...info};
    copy.dontHave = info.dontHave.filter(
        (ingredient) => (ingredient.type as {} as string) !== 'garnish');
    copy.have = info.have.filter(
        (ingredient) => (ingredient.type as {} as string) !== 'garnish');
    copy.percentIHave =
        copy.have.length / (copy.dontHave.length + copy.have.length);
    return copy
  });
}