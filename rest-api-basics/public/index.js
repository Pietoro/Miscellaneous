const API = '/api/units';

fillUnitsList();

document.getElementById('form-add-unit').onsubmit = addUnit;

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
        `<li>
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

  console.log(event);
  console.log(event.target.elements.unitJob.value);

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
  console.log(response.status);
  fillUnitsList();
}
