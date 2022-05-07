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
import { Subject } from "../../models/Subject";


export default class MarkCRUD extends Component<Subject>{
    constructor(props: Subject){
        super(props);
    }
    

    static async createTable(){
        let query = `CREATE TABLE IF NOT EXISTS Subjects(
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name VARCHAR(150) NOT NULL,
          Color VARCHAR(20),
          Teacher VARCHAR(250),
          CreatedBy VARCHAR(50),
          DateCreated VARCHAR(20)
        )`;

        (await db).transaction(function(trans){
            trans.executeSql(query, [], 
                (txn, res) => {}, 
                (err) => console.log('failed to create mark table'));
                  
        });
    }

    static async getSubjects(){
         let query = 'SELECT * FROM Subjects';
         
         let records: Subject[] = [];
         const transaction = async() => (await db).transaction(function(trans){
            return trans.executeSql(query,[],
                function(txn, res){
                   res.rows.raw().map(item => {
                        var entry = Object.entries(item);
                        var record = Object.fromEntries(entry);
                        var subject = Object.setPrototypeOf(record, Subject);
                        records.push(subject);
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

    static async addSubject(subject: Subject){
        let query = `INSERT INTO Subjects(Name, Teacher, Color, DateCreated, CreatedBy) 
        VALUES(?,?,?,?,?)`;
        let params = [subject.Name, subject.Teacher, subject.Color, subject.DateCreated, subject.CreatedBy];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log(subject + ' successfully added.'),
            (err) => console.log(err)
           )
        }).catch(err => console.log(err));

        return results;
    }

    static async updateSubject(subject: Subject){
        let query = `UPDATE Subjects set
        Name=?,
        Teacher=?,
        Color=?,
        DateCreated=?,
        CreatedBy=?
        Where Id=?
        `;
        let params = [subject.Name, subject.Teacher, subject.Color, subject.DateCreated, subject.CreatedBy, subject.Id];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log('successfully updated.'),
            (err) => console.log(err)
           );
        }).catch(err => console.log(err));

        return results;
    }

    static async deleteSubject(id: number){
        let query = 'DELETE FROM Subjects where Id=?';
        let results = (await db).transaction(function(trans){
           trans.executeSql(query,[id],
            (txn, res) => console.log('successfully deleted.'),
            (err) => console.log(err))
        }).catch(err => console.log(err));

        return results;
    }
}