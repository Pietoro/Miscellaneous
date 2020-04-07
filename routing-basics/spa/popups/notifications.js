export default function showNotification(header, text, displayTime = 5000) {

  
  const notificationBox = document.createElement('div');
  notificationBox.classList.add('notification-box');

  const notificationHeader = document.createElement('h3');
  notificationHeader.appendChild(document.createTextNode(header));
  const notificationText = document.createTextNode(text);
  
  notificationBox.appendChild(notificationHeader);
  notificationBox.appendChild(notificationText);
  const notificationContainer =   document.getElementById('notifications');
  notificationContainer.insertBefore(notificationBox, notificationContainer.firstChild);

  setTimeout(() => notificationContainer.removeChild(notificationBox), displayTime);
  const fadeOutTime = displayTime / 2;
  setTimeout(() => notificationBox.style.opacity = '30%', fadeOutTime);
}
