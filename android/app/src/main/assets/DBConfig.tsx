/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import SQLite from 'react-native-sqlite-storage';


const dbName = 'Timely.db';
const dbLocation = '~Timely.db'

const db = SQLite.openDatabase({
  name: dbName,
  createFromLocation: dbLocation,
},
() => {},
error => console.log('Error msg: ' + error));

export {db, dbName};
