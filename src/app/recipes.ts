export type Measurement = {
  amount: number,
  type: 'ounce'|'liter'|'teaspoon'|'tablespoon'|'cup'|'garnish',
}

export type Ingredient = {
  name: string,
  moreInfo?: string,
  measurement?: Measurement,
};

export type Recipe = {
  ingredients: Ingredient[],
  name: string,
  description: string,
  directions: string,
  recipeUrl?: string,
  imageUrl?: string,
};

const recipes: Recipe[] = [
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [
      {
        name: 'whiskey',
        measurement: {amount: 2, type: 'ounce'},
      },
      {
        name: 'lime juice',
        measurement: {amount: 1, type: 'ounce'},
      },
      {
        name: 'lager',
        measurement: {amount: 10, type: 'ounce'},
      },
      {
        name: 'lime',
        moreInfo: 'wedge',
        measurement: {amount: 1, type: 'garnish'}
      },
      {
        name: 'ice cubes',
      }
    ],
  },
  {
    name: 'Sloe Work Day',
    description: '',
    directions: '',
    ingredients: [
      {
        name: 'blackberry puree',
        measurement: {amount: 2, type: 'ounce'},
      },
      {
        name: 'gin',
        moreInfo: 'sloe gin',
        measurement: {amount: 1.5, type: 'ounce'},
      },
      {
        name: 'elderflower liqueur',
        measurement: {amount: .75, type: 'ounce'},
      },
      {
        name: 'lemon juice',
        measurement: {amount: .5, type: 'ounce'},
      },
      {name: 'IPA', measurement: {amount: 4, type: 'ounce'}}, {
        name: 'mint',
        moreInfo: 'sprig',
        measurement: {amount: 1, type: 'garnish'}

      }
    ],
  },
  {
    name: 'Root Beer',
    description: '',
    directions: '',
    ingredients: [
      {
        name: 'amaretto',
        measurement: {amount: .3, type: 'ounce'},
      },
      {
        name: 'root liqueur',
        measurement: {amount: .66, type: 'ounce'},
      },
      {
        name: 'lager',
        measurement: {amount: 11, type: 'ounce'},
      }
    ],
  },
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [],
  },
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [],
  },
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [],
  },
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [],
  },
  {
    name: 'The Frank Booth',
    description: '',
    directions: '',
    ingredients: [],
  },
];

const allIngredients =
    recipes.map((r) => r.ingredients)
        .reduce(
            (ingredientSet, ingredientList) => ingredientList.reduce(
                (newSet, i) => newSet.add(i.name), ingredientSet),
            new Set<string>());
console.log(`all ingredients: ${allIngredients}`);

const ingredientsIHave: Set<string> = new Set([]);

// recipes that include at least one ingredient I have
const possibleRecipes: Set<Recipe> = new Set(recipes.filter(
    (r) => r.ingredients.some((i) => ingredientsIHave.has(i.name))));

const haversAndHaveNots = recipes.map((recipe) => {
  const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
    if (ingredientsIHave.has(i.name)) {
      return {
        have: acc.have.add(i.name), dontHave: acc.dontHave
      }
    } else {
      return {
        have: acc.have, dontHave: acc.dontHave.add(i.name)
      }
    }
  }, {have: new Set<string>(), dontHave: new Set<string>()});
  // not sure this is useful. probably just want to rank by ingredients I don't
  // have, descending
  const percentIHave =
      have.size === 0 ? 0 : have.size / recipe.ingredients.length;

  return {recipe, have, dontHave, percentIHave};
});

const orderedRecipesByHaveNots =
    haversAndHaveNots.sort((a, b) => a.dontHave.size - b.dontHave.size);
const orderedRecipesByPercent =
    haversAndHaveNots.sort((a, b) => b.percentIHave - a.percentIHave);
console.log(orderedRecipesByHaveNots);
console.log(orderedRecipesByPercent);