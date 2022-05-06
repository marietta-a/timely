/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import MarkCRUD from "../assets/crud/MarkCRUD";
import { db } from "../main/assets/DBConfig";
import { Mark } from "../models/Marks";

async function getMarks(allMarks : Mark[]){
   var emptyMark : Mark[] = [];
   const [marks, setMarks] = useState(emptyMark);
   console.log('fetching marks ...');

   useEffect(() => {
        const fetchRecords = async() => {
            var record = await MarkCRUD.getMarks();
            var res = JSON.stringify(record);
            var obj = JSON.parse(res);
            var data = Object.entries(obj).map(item => {return Object.setPrototypeOf(item[1], Mark)})
            console.log(data);
            setMarks(data);
            return data;
        };

        fetchRecords();
   });
   
   var sss = JSON.stringify(marks);
   console.log('Marks .... : ' + sss);
   return marks;
}

export {getMarks};
