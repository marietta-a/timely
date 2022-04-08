/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from "react"
import { SafeAreaView } from "react-native"
import AddButton from "../common/AddButton";
import HeaderElement from "../common/HeaderElement"
import SubjectPage from "../pages/subject/SubjectPage"

function SubjectScreen(){
    return (
      <SafeAreaView>
        <SubjectPage/>
      </SafeAreaView>
    );
  }
function HeaderScreen(){
    return (
      <SafeAreaView>
        <HeaderElement title="Subjects"/>
      </SafeAreaView>
    );
  }
function AddButtonScreen(){
    return (
        <SafeAreaView>
          <AddButton/>
        </SafeAreaView>
    );
}

export {SubjectScreen, HeaderScreen, AddButtonScreen};
