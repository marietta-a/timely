/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react"
import { Events } from "../../../models/Events"
import SQLite from 'react-native-sqlite-storage';
import db from "../../DBConfig";

export default class EventCRUD extends Component<Events>{
    constructor(props: Events){
        super(props);
        SQLite.DEBUG(true);
    }

    executeQuery = (sql: any, params = []) => new Promise(async (resolve, reject) => {
        (await db).transaction((trans) => {
            trans.executeSql(sql, params, (_trans, results) => {
                resolve(results);
            },
            (error) => {
                reject(error);
            });
        });
    });

   static async createTable(){
        var query = `CREATE TABLE IF NOT EXISTS Events (
             Id INTEGER PRIMARY KEY NOT NULL, 
             Name varchar(20) NOT NULL, 
             EventDate varchar(20),
             Time varchar(10),
             SubjectCode varchar(10),
             EventTypeCode varchar(10),
             Description varchar(20),
             CreatedBy varchar(50),
             DateCreated varchar(20)
            )`;        
        let Table = await this.executeQuery(query, []);
        console.log(Table);
    }
}
