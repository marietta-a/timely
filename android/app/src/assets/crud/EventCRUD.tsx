/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react"
import { Events } from "../../models/Events"
import SQLite from 'react-native-sqlite-storage';
import {db} from "../DBConfig";

SQLite.enablePromise(true);

export default class EventCRUD extends Component<Events>{
    constructor(props: Events){
        super(props);
        SQLite.DEBUG(true);
    }

   static async createTable(){
        var query = `CREATE TABLE IF NOT EXISTS Events(
             Id INTEGER PRIMARY KEY AUTOINCREMENT, 
             Name VARCHAR(100) NOT NULL, 
             EventDate VARCHAR(20),
             Time VARCHAR(10),
             SubjectCode VARCHAR(10),
             EventTypeCode VARCHAR(10),
             Description VARCHAR(20),
             CreatedBy VARCHAR(50),
             DateCreated VARCHAR(20)
            )`;  
        
       /* (await db).transaction(function(trans){
            trans.executeSql(query,
               [],
              (txn, res) => {console.log('table successfully created')},
              (err) => console.log(err));
        }); 
       /* (await db).transaction(function (txn) {
            txn.executeSql(
              `SELECT * FROM Events`,
              [],
              function (tx, res) {
                console.log('item:', res.rows.length);
                console.log(res.rows.item(res.rows.length - 1));
                if (res.rows.length == 0) {
                  txn.executeSql(dropQuery, [])
                     .catch(err => console.log(err));
                  txn.executeSql(query, [])
                  .catch(err => console.log(err));
                  txn.executeSql(insertQuery, [])
                  .catch(err => console.log(err));
                }
              }
            );
          })*/
    }
}
