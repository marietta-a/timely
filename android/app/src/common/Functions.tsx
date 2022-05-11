/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

function longest(arr: any[]){
    return arr.reduce(function(a:any, b:any){
        return a.length > b.length ? a : b;
    });
}

function isNullOrEmpty(val?: any) {
    return val === '' || val === null || val === undefined || Object.values(val).length < 1;
}


const defaultHiddenFields = ['Id', 'DateCreated', 'CreatedBy', 'SubjectCode'];

export {longest, defaultHiddenFields, isNullOrEmpty};
