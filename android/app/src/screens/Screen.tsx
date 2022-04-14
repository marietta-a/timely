/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from "react"
import { SafeAreaView } from "react-native"
import AddButton from "../common/custom/AddButton";
import HeaderElement from "../common/HeaderElement"
import EventPage from "../pages/event/EventPage";
import SubjectPage from "../pages/subject/SubjectPage"

function SubjectScreen(){
    return (
      <SafeAreaView>
        <SubjectPage/>
      </SafeAreaView>
    );
  }
function EventScreen(){
  return (
    <SafeAreaView>
      <EventPage/>
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

export {SubjectScreen, EventScreen, HeaderScreen, AddButtonScreen};
