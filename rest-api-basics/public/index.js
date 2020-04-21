const API = '/api/units';

fillUnitsList();

document.getElementById('btn-add-unit').onclick = newUnitForm;

async function getUnitsData() {

  const response = await fetch(API);
  const units = await response.json();
  return units;
}

async function fillUnitsList() {

  const units = await getUnitsData();

  if(units) {
    document.getElementById('units-list').innerHTML = units
      .map((unit) => 
        `<li onclick="editUnitForm('${unit._id}')">
          ${unit.name}
          <ul>
            <li>${unit.race}</li>
            <li>${unit.job}</li>
            <li>${unit.level}</li>
            <li>${unit.equipment}</li>
          </ul>
        </li>`
      )
      .reduce((total, el) => total + el, '');
  }
}

async function addUnit(event) {
  event.preventDefault();

  const newUnit = {
    name: event.target.elements.unitName.value,
    race: event.target.elements.unitRace.value,
    job: event.target.elements.unitJob.value,
    level: 1,
    equipment: []
  }

  const response = await fetch(API, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(newUnit) // body data type must match "Content-Type" header
  });
  if(response.status === 201) {
    fillUnitsList();
  }
}

function newUnitForm() {

  document.getElementById('form-container').innerHTML = `
    <form id="form-add-unit">
      <div class="form">
        <label for="unitName">Name</label>
        <input type="text" name="unitName">
      </div>
      <div class="form">
        <label for="unitRace">Race</label>
        <input type="text" name="unitRace">
      </div>
      <div class="form">
        <label for="unitJob">Job</label>
        <input type="text" name="unitJob">
      </div>
      <button type="submit">Add unit</button>
    </form>`;

    document.getElementById('form-add-unit').onsubmit = addUnit;

    document.getElementById('form-container').scrollIntoView();
}


async function editUnitForm(unitId) {

  const unit = await getUnit(unitId);

  document.getElementById('form-container').innerHTML = `
    <form id="form-edit-unit">
      <div class="form">
        <label for="unitName">Name</label>
        <input type="text" name="unitName" value="${unit.name}">
      </div>
      <div class="form">
        <label for="unitJob">Job</label>
        <input type="text" name="unitJob" value="${unit.job}">
      </div>
      <div class="form">
        <label for="unitLevel">Level</label>
        <input type="text" name="unitLevel" value="${unit.level}">
      </div>
      <input type="hidden" name="unitId" value="${unitId}"/>
      <button type="submit">Edit unit</button>
      <button id="btn-dismiss" type="button">Dismiss unit</button>
    </form>`;

    document.getElementById('form-edit-unit').onsubmit = editUnit;
    document.getElementById('btn-dismiss').onclick = () => dismissUnit(unitId);

    document.getElementById('form-container').scrollIntoView();
}

async function getUnit(unitId) {

  const response = await fetch(API + `/${unitId}`);
  return await response.json();
}

async function editUnit() {
  event.preventDefault();

  const editedUnit = {
    name: event.target.elements.unitName.value,
    job: event.target.elements.unitJob.value,
    level: event.target.elements.unitLevel.value
  }

  const response = await fetch(API  + `/${event.target.elements.unitId.value}`, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(editedUnit) // body data type must match "Content-Type" header
  });
  if(response.status === 200) {
    fillUnitsList();
    document.getElementById('form-container').removeChild(document.getElementById('form-edit-unit'));
    document.getElementById('units-container').scrollIntoView();
  }
}

async function dismissUnit(unitId) {

  const response = await fetch(API  + `/${unitId}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
  });
  if(response.status === 200) {
    fillUnitsList();
    document.getElementById('form-container').removeChild(document.getElementById('form-edit-unit'));
    document.getElementById('units-container').scrollIntoView();
  }
}
