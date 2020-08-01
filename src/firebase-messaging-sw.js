// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'apiKey': "AIzaSyA33knB8mXn_B2t8wipGY5ht5hkC1YmRX0",
    'authDomain': "angufyrbse-app-4e675.firebaseapp.com",
    'databaseURL': "https://angufyrbse-app-4e675.firebaseio.com",
    'projectId': "angufyrbse-app-4e675",
    'storageBucket': "angufyrbse-app-4e675.appspot.com",
    'messagingSenderId': "889302759006",
    'appId': "1:889302759006:web:b39dac08c8c3219be966cf",
    'measurementId': "G-ERSS5X82EG"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();