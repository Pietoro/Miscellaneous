import privacyIndex from "./views/privacy/index.js";
import privacyRodo from "./views/privacy/rodo.js";
import privacyFrodo from "./views/privacy/frodo.js";
import notfoundIndex from "./views/notfound/index.js";
import homeIndex from "./views/index.js";
import shopIndex from "./views/shop/index.js";
import shopDetails from "./views/shop/details.js";

window.link = link;

const DOMAIN = 'awesome.io';
const ROUTES = ['home','shop','privacy','notfound'];
const VIEWS = {
  'notfound': ['index'],
  'home': ['index'],
  'shop': ['index', 'details'],
  'privacy': ['index','rodo','frodo']
};

let path = {
  route: 'home',
  view: 'index',
  id: ''
};

let prevPath = {
  route: 'home',
  view: 'index',
  id: ''
};

function link(newRoute = 'home', newView = 'index', newId = '') {

  const root = document.querySelector('main');

  if(newRoute === path.route && newView === path.view && newId === path.id) return;
  if(!ROUTES.includes(newRoute) || !VIEWS[newRoute].includes(newView) || newRoute === 'notfound') {
    notfoundIndex(root, path);
  }

  switch(newRoute) {
    case 'home':
      homeIndex(root);
      break;
    case 'shop':
      switch(newView) {
        case 'index':
          shopIndex(root);
          break;
        case 'details':
          shopDetails(root, newId);
          break;
      }
      break;
    case 'privacy':
      switch(newView) {
        case 'index':
          privacyIndex(root);
          break;
        case 'rodo':
          privacyRodo(root);
          break;
        case 'frodo':
          privacyFrodo(root);
          break;
      }
      break;
    }

  prevPath = path;
  path = {
    route: newRoute,
    view: newView,
    id: newId
  }

  displayUrl();
  
}

function displayUrl() {
  const urlRoute = (path.route === 'home' && path.view === 'index') ? `` : `${path.route}`;
  const urlView = path.view  === 'index' ? `` : `/${path.view}`;
  const urlId = path.id === '' ? `` : `?id=${path.id}`;
  document.querySelector('.url').innerHTML = `${DOMAIN}/${urlRoute}${urlView}${urlId}`;
}
