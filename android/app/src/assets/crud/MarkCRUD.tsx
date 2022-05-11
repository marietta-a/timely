/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import SQLite, { Transaction } from 'react-native-sqlite-storage';
import { db } from "../../main/assets/DBConfig";
import { Mark } from "../../models/Marks";

export default class MarkCRUD extends Component<Mark>{
    constructor(props: Mark){
        super(props);
    }
    

    static async createTable(){
        let query = `CREATE TABLE IF NOT EXISTS Marks(
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          SubjectCode INTEGER NOT NULL,
          Mark INTEGER NOT NULL,
          Weight INTEGER,
          Title VARCHAR(20),
          Description VARCHAR(250),
          CreatedBy VARCHAR(50),
          DateCreated VARCHAR(20)
        )`;

        (await db).transaction(function(trans){
            trans.executeSql(query, [], 
                (txn, res) => {}, 
                (err) => console.log('failed to create mark table'));
                  
        });
    }

    static async getMarks(){
         let query = 'SELECT * FROM Marks';
         
         let records: Mark[] = [];
         const transaction = async() => (await db).transaction(function(trans){
            return trans.executeSql(query,[],
                function(txn, res){
                   res.rows.raw().map(item => {
                        var entry = Object.entries(item);
                        var record = Object.fromEntries(entry);
                        var mark = Object.setPrototypeOf(record, Mark);
                        mark.Subject = null;
                        records.push(mark);
                    });
                   // console.log(records);
                    return records;
                }
            );
         }).catch(err => {
            console.log('displaying error:' + err);
            records = [];
            return records;
         }).finally(() => {console.log('fetch completed'); return records; });

         await transaction();
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

    static async updateMark(mark: Mark){
        let query = `UPDATE Marks set
              SubjectCode=?,
              Mark=?,
              Weight=?,
              Title=?,
              Description=?
              Where Id=?
        `;
        let params = [mark.SubjectCode, mark.Mark, mark.Weight, mark.Title, mark.Description, mark.Id];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log(mark + ' successfully updated.'),
            (err) => console.log(err)
           )
        }).catch(err => console.log(err));

        return results;
    }

    static async deleteMark(id: number){
        let query = 'DELETE FROM Marks where Id=?';
        let results = (await db).transaction(function(trans){
           trans.executeSql(query,[id],
            (txn, res) => console.log('successfully deleted.'),
            (err) => console.log(err))
        }).catch(err => console.log(err));

        return results;
    }
}