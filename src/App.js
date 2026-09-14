import {Suspense, lazy} from "react";   
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {PrivateRoute, PublicRoute} from './routes';
import {Error, Login, Privacy, Tos} from "./pages/index";
import { GlobalState } from './GlobalParent';
import Topbar from "./components/Topbar";
import Loader from "./components/Loader";
import Reset from "./pages/reset";
import "./App.css";
import Chatbot from "./components/Chatbot";
import Dump from "./pages/dump";

export default function App() {
  const {token,pathname,userLevel,theme} = GlobalState()//, roles = ["SuperAdmin", "Admin", "Employee", "Student", "Applicant"];
 
  if(window.self != window.top) return window.location.href = "http://www.google.com/"; //Prevent iframes

  const SuperAdminRoutes = [
    {path:"", component:lazy(()=>import("./pages/home"))},
    {path:"institute/new", component:lazy(()=>import("./pages/SuperAdmin/institute/new"))},
    {path:"institute/manage", component:lazy(()=>import("./pages/SuperAdmin/institute/manage"))},
    {path:"institute/:id", component:lazy(()=>import("./pages/SuperAdmin/institute/institute"))},
    {path:"posts/new", component:lazy(()=>import("./pages/SuperAdmin/posts/new"))},
    {path:"posts/manage", component:lazy(()=>import("./pages/SuperAdmin/posts/manage"))},
    {path:"posts/manage/:id", component:lazy(()=>import("./pages/SuperAdmin/posts/postManage"))},
    {path:"user/create", component:lazy(()=>import("./pages/SuperAdmin/user/create"))},
    {path:"user/manage", component:lazy(()=>import("./pages/SuperAdmin/user/manage"))},
    {path:"user/:id", component:lazy(()=>import("./pages/SuperAdmin/user/user"))},
    {path:"refer", component:lazy(()=>import("./pages/SuperAdmin/company/refer"))},
    {path:"send-mail", component:lazy(()=>import("./pages/SuperAdmin/sendMail"))},
    {path:"applications", component:lazy(()=>import("./pages/SuperAdmin/applications"))},
    {path:"profile", component:lazy(()=>import("./pages/SuperAdmin/profile"))},
    {path:"crm/leads", component:lazy(()=>import("./pages/SuperAdmin/crm/leads"))},
    {path:"crm/campaigns", component:lazy(()=>import("./pages/SuperAdmin/crm/campaigns"))},
    {path:"crm/forms", component:lazy(()=>import("./pages/SuperAdmin/crm/forms"))},
    {path:"crm/form", component:lazy(()=>import("./pages/SuperAdmin/crm/form"))},
    {path:"crm/dashboard", component:lazy(()=>import("./pages/SuperAdmin/crm/dashboard"))},
    {path:"crm/settings", component:lazy(()=>import("./pages/SuperAdmin/crm/settings"))},
    {path:"crm/leadold/:id", component:lazy(()=>import("./pages/SuperAdmin/crm/leOLD"))},
    {path:"crm/lead/:id", component:lazy(()=>import("./pages/SuperAdmin/crm/lead"))},
    {path:"your-activity", component:lazy(()=>import("./pages/sessions"))},
    {path:"change-password", component:lazy(()=>import("./pages/password"))},
  ],  AdminRoutes = [
    {path:"", component:lazy(()=>import("./pages/home"))},
    {path:"department/new", component:lazy(()=>import("./pages/Admin/department/new"))},
    {path:"department/manage", component:lazy(()=>import("./pages/Admin/department/manage"))},
    {path:"department/:id", component:lazy(()=>import("./pages/Admin/department/department"))},
    {path:"batch/new", component:lazy(()=>import("./pages/Admin/batch/new"))},
    {path:"batch/manage", component:lazy(()=>import("./pages/Admin/batch/manage"))},
    {path:"batch/:id", component:lazy(()=>import("./pages/Admin/batch/batch"))},
    {path:"posts/new", component:lazy(()=>import("./pages/SuperAdmin/posts/new"))},
    {path:"posts/manage", component:lazy(()=>import("./pages/SuperAdmin/posts/manage"))},
    {path:"posts/manage/:id", component:lazy(()=>import("./pages/SuperAdmin/posts/postManage"))},
    {path:"user/create", component:lazy(()=>import("./pages/Admin/user/create"))},
    {path:"user/manage", component:lazy(()=>import("./pages/Admin/user/manage"))},
    {path:"user/:id", component:lazy(()=>import("./pages/Admin/user/user"))},
    {path:"stu/:id", component:lazy(()=>import("./pages/Admin/user/stu"))},
    {path:"send-mail", component:lazy(()=>import("./pages/SuperAdmin/sendMail"))},
    {path:"applications", component:lazy(()=>import("./pages/SuperAdmin/applications"))},
    {path:"calendar", component:lazy(()=>import("./pages/calendar"))},
    {path:"crm/settings", component:lazy(()=>import("./pages/SuperAdmin/crm/settings"))},
    {path:"profile", component:lazy(()=>import("./pages/Admin/profile"))},
    {path:"crm/leads", component:lazy(()=>import("./pages/SuperAdmin/crm/leads"))},
    {path:"crm/dashboard", component:lazy(()=>import("./pages/SuperAdmin/crm/dashboard"))},
    {path:"crm/lead/:id", component:lazy(()=>import("./pages/SuperAdmin/crm/leOLD"))},
    {path:"your-activity", component:lazy(()=>import("./pages/sessions"))},
    {path:"change-password", component:lazy(()=>import("./pages/password"))},
  ], EmployeeRoutes = [
    {path:"", component:lazy(()=>import("./pages/Employee/home"))},
    {path:"your-activity", component:lazy(()=>import("./pages/sessions"))},
    {path:"calendar", component:lazy(()=>import("./pages/calendar"))},
    {path:"classrooms", component:lazy(()=>import("./pages/Employee/classrooms"))},
    {path:"classroom/:id", component:lazy(()=>import("./pages/Employee/classroom"))},
    {path:"change-password", component:lazy(()=>import("./pages/password"))},
    {path:"profile", component:lazy(()=>import("./pages/Employee/profile"))},
  ], StudentRoutes = [
    {path:"", component:lazy(()=>import("./pages/Employee/home"))},
    {path:"your-activity", component:lazy(()=>import("./pages/sessions"))},
    {path:"calendar", component:lazy(()=>import("./pages/calendar"))},
    {path:"classroom", component:lazy(()=>import("./pages/Student/classroom"))},
    {path:"change-password", component:lazy(()=>import("./pages/password"))},
    {path:"profile", component:lazy(()=>import("./pages/Student/profile"))},
  ], ApplicantRoutes = [
    {path:"", component:lazy(()=>import("./pages/home"))},
    {path:"applicationProcess", component:lazy(()=>import("./pages/Applicant/ApplicationProcess"))}
  ];

  const routes = [SuperAdminRoutes, AdminRoutes, EmployeeRoutes, StudentRoutes, ApplicantRoutes];

  return <Router>
    <div data-theme-background={theme} style={{background:"var(--background)"}}>
        <Topbar setTheme={()=>{}}/>
        <Chatbot/>
        <div className={"trueApp" + (token && userLevel !== 3 ? "" : " noToken") + (pathname === "/login" ?" loginPage" : "" )}>
          <Suspense fallback={<Loader/>}>
          <Switch>
            <PublicRoute restricted component={Login} path="/login" exact/>
            <PublicRoute restricted component={Reset} path="/reset/:token" exact/>
            <PublicRoute component={Tos} path="/tos" exact/>
            <PublicRoute component={Privacy} path="/privacy" exact/>
            <PublicRoute component={Dump} path="/dump" exact/>

            {userLevel >= -1 ? routes?.[userLevel+1].map(item => <PrivateRoute perm1={item.perm1} alt={item.alt} perm2={item.perm2} component={item.component} path={"/"+item.path} exact/>) : <div/>}
          
            <Route component={token ? Error : FakeCompo}/>
          </Switch>
          </Suspense>
        </div>
    </div>
  </Router>;
}

function FakeCompo(){
  return <Redirect to="/login"/>
}