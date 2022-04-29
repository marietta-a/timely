/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'Timely',
  location: 'default',
  createFromLocation: '~Timely.db',
});

export default db;
