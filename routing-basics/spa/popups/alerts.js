export default function showAlert(header, text, onOk = () => {}) {

  const alert = document.createElement('aside');
  alert.setAttribute('id','alert');
  alert.classList.add('alert');
  alert.innerHTML = `<div class="alert-bg"></div>`;

  const alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');

  const alertHeader = document.createElement('h3');
  alertHeader.innerHTML = header;

  const alertText = document.createTextNode(text);
  const alertBtnContainer = document.createElement('div');
  alertBtnContainer.classList.add('btn-alert-container');

  const btnOk = document.createElement('button');
  btnOk.classList.add('btn-alert');
  btnOk.innerHTML = 'OK';

  document.querySelector('body').appendChild(alert);
  alert.appendChild(alertBox);
  alertBox.appendChild(alertHeader);
  alertBox.appendChild(alertText);
  alertBox.appendChild(alertBtnContainer);
  alertBtnContainer.appendChild(btnOk);

  btnOk.onclick = () => {
    document.querySelector('body').removeChild(alert);
    onOk();
  }
}

export function showConfirm(header, text, onYes = () => {}, onNo = () => {}) {

  const alert = document.createElement('aside');
  alert.setAttribute('id','alert');
  alert.classList.add('alert');
  alert.innerHTML = `<div class="alert-bg"></div>`;

  const alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');

  const alertHeader = document.createElement('h3');
  alertHeader.innerHTML = header;

  const alertText = document.createTextNode(text);
  const alertBtnContainer = document.createElement('div');
  alertBtnContainer.classList.add('btn-alert-container');

  const btnYes = document.createElement('button');
  btnYes.classList.add('btn-alert');
  btnYes.innerHTML = 'Yes';

  const btnNo = document.createElement('button');
  btnNo.classList.add('btn-alert');
  btnNo.classList.add('btn-alert-no');
  btnNo.innerHTML = 'No';

  document.querySelector('body').appendChild(alert);
  alert.appendChild(alertBox);
  alertBox.appendChild(alertHeader);
  alertBox.appendChild(alertText);
  alertBox.appendChild(alertBtnContainer);
  alertBtnContainer.appendChild(btnYes);
  alertBtnContainer.appendChild(btnNo);

  btnYes.onclick = () => {
    document.querySelector('body').removeChild(alert);
    onYes();
  }

  btnNo.onclick = () => {
    document.querySelector('body').removeChild(alert);
    onNo();
  }
}
