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
const wait = (timeout : number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
function groupBy(objectArray : Array<any>, property : any) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
const defaultHiddenFields = ['Id', 'DateCreated', 'CreatedBy', 'SubjectCode'];

export {longest, defaultHiddenFields, isNullOrEmpty, wait, groupBy};
