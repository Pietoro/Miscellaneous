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
  btnOk.classList.add('btn-alert-ok');
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
