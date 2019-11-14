/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";

import Lecture from "views/Lecture/Lecture.jsx";
import FormLecture from "./views/Lecture/FormLecture";
import Student from "./views/Student/Student";
import FormStudent from "./views/Student/FormStudent";
import Major from "./views/Major/Major";
import FormMajor from "./views/Major/FormMajor";
import Course from "./views/Course/Course";
import FormCourse from "./views/Course/FormCourse";
import Kelas from "./views/Kelas/Kelas";
import FormKelas from "./views/Kelas/FormKelas";
import StudyYear from "./views/StudyYear/StudyYear";
import FormStudyYear from "./views/StudyYear/FormStudyYear";
import Schedule from "./views/Schedule/Schedule";
import DetailSchedule from "./views/Schedule/DetailSchedule";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },

  // Student
  {
    path: "/students/create",
    name: "New Student",
    component: FormStudent,
    layout: "/admin",
    child: true
  },
  {
    path: "/students/edit/:id",
    name: "Edit Student",
    component: FormStudent,
    layout: "/admin",
    child: true
  },
  {
    path: "/students/detail/:id",
    name: "Detail Student",
    component: FormStudent,
    layout: "/admin",
    child: true
  },
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-hat-3 text-blue",
    component: Student,
    layout: "/admin"
  },

  // Lectures
  {
    path: "/lectures/create",
    name: "New Lecture",
    component: FormLecture,
    layout: "/admin",
    child: true
  },
  {
    path: "/lectures/edit/:id",
    name: "Edit Lecture",
    component: FormLecture,
    layout: "/admin",
    child: true
  },
  {
    path: "/lectures/detail/:id",
    name: "Detail Lecture",
    component: FormLecture,
    layout: "/admin",
    child: true
  },
  {
    path: "/lectures",
    name: "Lectures",
    icon: "ni ni-circle-08 text-primary",
    component: Lecture,
    layout: "/admin",
  },

  // Majors
  {
    path: "/majors/create",
    name: "New Major",
    component: FormMajor,
    layout: "/admin",
    child: true
  },
  {
    path: "/majors/edit/:id",
    name: "Edit Major",
    component: FormMajor,
    layout: "/admin",
    child: true
  },
  {
    path: "/majors/detail/:id",
    name: "Detail Major",
    component: FormMajor,
    layout: "/admin",
    child: true
  },
  {
    path: "/majors",
    name: "Majors",
    icon: "fas fa-dharmachakra text-red",
    component: Major,
    layout: "/admin",
  },

  // Courses
  {
    path: "/courses/create",
    name: "New Course",
    component: FormCourse,
    layout: "/admin",
    child: true
  },
  {
    path: "/courses/edit/:id",
    name: "Edit Course",
    component: FormCourse,
    layout: "/admin",
    child: true
  },
  {
    path: "/courses/detail/:id",
    name: "Detail Course",
    component: FormCourse,
    layout: "/admin",
    child: true
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "fas fa-journal-whills text-yellow",
    component: Course,
    layout: "/admin",
  },

  // Kelass
  {
    path: "/kelass/create",
    name: "New Kelas",
    component: FormKelas,
    layout: "/admin",
    child: true
  },
  {
    path: "/kelass/edit/:id",
    name: "Edit Kelas",
    component: FormKelas,
    layout: "/admin",
    child: true
  },
  {
    path: "/kelass/detail/:id",
    name: "Detail Kelas",
    component: FormKelas,
    layout: "/admin",
    child: true
  },
  {
    path: "/kelass",
    name: "Kelas",
    icon: "fas fa-users text-info",
    component: Kelas,
    layout: "/admin",
  },

  // StudyYears
  {
    path: "/studyYears/create",
    name: "New StudyYear",
    component: FormStudyYear,
    layout: "/admin",
    child: true
  },
  {
    path: "/studyYears/edit/:id",
    name: "Edit StudyYear",
    component: FormStudyYear,
    layout: "/admin",
    child: true
  },
  {
    path: "/studyYears/detail/:id",
    name: "Detail StudyYear",
    component: FormStudyYear,
    layout: "/admin",
    child: true
  },
  {
    path: "/studyYears",
    name: "Study Years",
    icon: "fas fa-archway text-danger",
    component: StudyYear,
    layout: "/admin",
  },

  // Schedules
  {
    path: "/schedules/detail/:id",
    name: "Detail Schedule",
    component: DetailSchedule,
    layout: "/admin",
    child: true
  },
  {
    path: "/schedules",
    name: "Schedules",
    icon: "fas fa-calendar text-danger",
    component: Schedule,
    layout: "/admin",
  },


  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    child: true
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
