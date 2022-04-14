/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemListBuilder from "./ItemListBuider";


const FormListBuilder: React.FC<{
  ItemList? : any[],
  Headers: any[]
}> = ({ItemList, Headers}) => {
     return (
        <SafeAreaView>
           <ItemListBuilder ItemList={ItemList} H/>
        </SafeAreaView>
     );
};

export default FormListBuilder;
