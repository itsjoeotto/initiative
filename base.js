import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDUwuUL2FrbtJ7Pxl28rIjo5ifM5olPVdo",
    authDomain: "initiative-5e872.firebaseapp.com",
    databaseURL: "https://initiative-5e872.firebaseio.com",
  });

  const base = Rebase.createClass(firebaseApp.database());

  export { firebaseApp };

  export default base;