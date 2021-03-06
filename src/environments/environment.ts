// The file contents for the current environment will overwrite these during
// build. The build system defaults to the dev environment which uses
// `environment.ts`, but if you do `ng build --env=prod` then
// `environment.prod.ts` will be used instead. The list of which env maps to
// which file can be found in `.angular-cli.json`.

export const environment = {
  production : false,
  firebase : {
    apiKey : 'AIzaSyCvYFCEkmXiTuZjLLrUsjk9D97SL-3_Xhg',
    authDomain : 'i-am-andrew-scott.firebaseapp.com',
    databaseURL : 'https://i-am-andrew-scott.firebaseio.com',
    projectId : 'i-am-andrew-scott',
    storageBucket : 'i-am-andrew-scott.appspot.com',
    messagingSenderId : '829745632683'
  }
};