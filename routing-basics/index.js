const DOMAIN = 'awesome.io';
const ROUTES = ['home','shop','privacy','notfound'];
const VIEWS = {
  'notfound': ['index'],
  'home': ['index'],
  'shop': ['index'],
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
  if(newRoute === path.route && newView === path.view && newId === path.id) return;
  if(!ROUTES.includes(newRoute) || !VIEWS[newRoute].includes(newView)) {
    notFound();
    return;
  }

  prevPath = path;
  path = {
    route: newRoute,
    view: newView,
    id: newId
  }

  document.getElementById(`view-${prevPath.route}-${prevPath.view}`).style.display = 'none';
  document.getElementById(`route-${prevPath.route}`).style.display = 'none';
  document.getElementById(`route-${newRoute}`).style.display = 'block';
  document.getElementById(`view-${newRoute}-${newView}`).style.display = 'block';

  displayUrl();
  
}

function notFound(redirect = path) {
  link('notfound');
  document.getElementById('link-goback').onclick = () => link(prevPath.route, prevPath.view, prevPath.id);
}

function displayUrl() {
  const urlRoute = (path.route === 'home' && path.view === 'index') ? `` : `${path.route}`;
  const urlView = path.view  === 'index' ? `` : `/${path.view}`;
  const urlId = path.id === '' ? `` : `?id=${path.id}`;
  document.querySelector('.url').innerHTML = `${DOMAIN}/${urlRoute}${urlView}${urlId}`;
}
