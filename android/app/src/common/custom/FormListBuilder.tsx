/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemListModel } from "../model/ItemListModel";
import ItemListBuilder from "./ItemListBuider";


class FormListBuilder extends Component<ItemListModel>{
   static SelectedItem : any;
   static handleRefresh?: any;
   static refreshing: boolean;
   constructor(props: ItemListModel){
      super(props);
   }

   render(){
      ItemListBuilder.handleRefresh = FormListBuilder.handleRefresh;
      ItemListBuilder.refreshing = FormListBuilder.refreshing;
     return (
        <SafeAreaView>
        <ItemListBuilder ItemList={this.props.ItemList} style={this.props.style} openModal={this.props.openModal}/>
        </SafeAreaView>
     );
   }
}

export default FormListBuilder;
