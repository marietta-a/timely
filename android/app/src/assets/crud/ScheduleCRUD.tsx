/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { db } from "../../main/assets/DBConfig";
import { Schedule } from "../../models/Schedule";


export default class ScheduleCRUD extends Component<Schedule>{
    constructor(props: Schedule){
        super(props);
    }
    

    static async createTable(){
        let query = `CREATE TABLE IF NOT EXISTS Schedules(
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          DayOfTheWeek VARCHAR(10) NOT NULL,
          SubjectCode VARCHAR(20) NOT NULL,
          StartTime VARCHAR(50) NOT NULL,
          EndTime VARCHAR(50),
          Room VARCHAR(50),
          CreatedBy VARCHAR(50),
          DateCreated VARCHAR(20)
        )`;

        (await db).transaction(function(trans){
            trans.executeSql(query, [], 
                (txn, res) => {}, 
                (err) => console.log('failed to create schedule table'));
                  
        });
    }

    static async getScheduleByIds(Ids: number[]){
         let query = 'SELECT * FROM Schedules where Id in (?)';
         
         let records: Schedule[] = [];
         const transaction = async() => (await db).transaction(function(trans){
            return trans.executeSql(query,[Ids],
                function(txn, res){
                   res.rows.raw().map(item => {
                        var entry = Object.entries(item);
                        var record = Object.fromEntries(entry);
                        var schedule = Object.assign(new Schedule(), record);
                        records.push(schedule);
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

    static async getSchedules(){
         let query = 'SELECT * FROM Schedules';
         
         let records: Schedule[] = [];
         const transaction = async() => (await db).transaction(function(trans){
            return trans.executeSql(query,[],
                function(txn, res){
                   res.rows.raw().map(item => {
                        var entry = Object.entries(item);
                        var record = Object.fromEntries(entry);
                        var schedule = Object.assign(new Schedule(), record);
                        records.push(schedule);
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

    static async addSchedule(schedule: Schedule){
        let query = `INSERT INTO Schedules(DayOfTheWeek, SubjectCode, StartTime, EndTime, Room, DateCreated, CreatedBy) 
        VALUES(?,?,?,?,?,?,?)`;
        let params = [schedule.DayOfTheWeek, schedule.SubjectCode, schedule.StartTime, schedule?.EndTime, schedule?.Room, schedule?.DateCreated, schedule?.CreatedBy];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log(schedule + ' successfully added.'),
            (err) => console.log(err)
           )
        }).catch(err => console.log(err));

        return results;
    }

    static async updateSchedule(schedule: Schedule){
        let query = `UPDATE Schedules set
        DayOfTheWeek=?,
        SubjectCode=?,
        StartTime=?,
        EndTime=?,
        Room=?,
        DateCreated=?,
        CreatedBy=?
        Where Id=?
        `;
        let params = [schedule.DayOfTheWeek, schedule.SubjectCode, schedule.StartTime, schedule.EndTime, schedule.StartTime, schedule.Room, schedule.DateCreated, schedule.CreatedBy, schedule.Id];

        let results = (await db).transaction(function(trans){
           trans.executeSql(query,params,
            (txn, res) => console.log('successfully updated.'),
            (err) => console.log(err)
           );
        }).catch(err => console.log(err));

        return results;
    }

    static async deleteSchedule(id: number){
        let query = 'DELETE FROM Schedules where Id=?';
        let results = (await db).transaction(function(trans){
           trans.executeSql(query,[id],
            (txn, res) => console.log('successfully deleted.'),
            (err) => console.log(err))
        }).catch(err => console.log(err));

        return results;
    }
}