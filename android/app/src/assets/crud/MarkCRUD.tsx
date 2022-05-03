/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import SQLite from 'react-native-sqlite-storage';
import { Mark } from "../../models/Marks";
import { db } from "../DBConfig";

SQLite.enablePromise(true);

export default class MarkCRUD extends Component<Mark>{
    constructor(props: Mark){
        super(props);
    }


    static async createTable(){
        let query = `CREATE TABLE IF NOT EXISTS Marks(
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          SubjectCode VARCHAR(10) NOT NULL,
          Mark INTEGER NOT NULL,
          Weight INTEGER,
          Title VARCHAR(20),
          Description VARCHAR(250)
        )`;

        (await db).transaction(function(trans){
            trans.executeSql(query, [], 
                (txn, res) => console.log(res.rows.item(0)), 
                (err) => console.log('failed to create mark table'));
                  
        });
    }

    static async getMarks(){
         let query = `SELECT * FROM Marks`;
         let records: any[] = [];
         let results = (await db).transaction(function(trans){
            trans.executeSql(query,[],
                function(txn, res){
                    records = res.rows.raw();
                }
            )
         }).catch(err => {
            console.log(err);
         });

         return records;
    }

    static async addMark(mark: Mark){
        let query = `INSERT INTO Marks(SubjectCode, Mark, Weight, Title, Description) 
        VALUES(?,?,?,?,?)`;
        let params = [mark.SubjectCode, mark.Mark, mark.Weight, mark.Title, mark.Description];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log(mark + ' successfully added.'),
            (err) => console.log(err)
           )
        }).catch(err => console.log(err));

        return results;
    }

    static async deleteMark(id: string){
        let query = `DELETE FROM Marks where Id=${id}`;
        let results = (await db).transaction(function(trans){
           trans.executeSql(query,[])
        }).catch(err => console.log(err));

        return results;
    }
}