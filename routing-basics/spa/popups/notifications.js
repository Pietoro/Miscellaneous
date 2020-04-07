export default function showNotification(header, text) {

  console.log('salut');
  
  const notificationsBox = document.createElement('div');
  notificationsBox.classList.add('notification-box');

  const notificationHeader = document.createElement('h3');
  notificationHeader.appendChild(document.createTextNode(header));
  const notificationText = document.createTextNode(text);
  
  notificationsBox.appendChild(notificationHeader);
  notificationsBox.appendChild(notificationText);
  const notificationContainer =   document.getElementById('notifications');
  notificationContainer.insertBefore(notificationsBox, notificationContainer.firstChild);

}
