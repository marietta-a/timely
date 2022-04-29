/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */

import React from "react"
import { SafeAreaView } from "react-native"
import HeaderElement from "../common/HeaderElement"
import EventPage from "../pages/event/EventPage";
import { MarkPage } from "../pages/mark/MarkPage";
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
function MarkScreen(){
  return (
    <SafeAreaView>
      <MarkPage/>
    </SafeAreaView>
  );
}

export {SubjectScreen, EventScreen, HeaderScreen, MarkScreen};
