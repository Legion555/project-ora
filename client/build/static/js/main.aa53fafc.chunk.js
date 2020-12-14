(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{25:function(e,a,t){},26:function(e,a,t){},44:function(e,a,t){"use strict";t.r(a);var s=t(1),c=t(2),n=t.n(c),r=t(17),l=t.n(r),o=(t(25),t(3)),i=(t(26),t(4)),d=t.n(i),u=Object(c.createContext)(),j=function(e){var a=Object(c.useState)({}),t=Object(o.a)(a,2),n=t[0],r=t[1];return Object(s.jsx)(u.Provider,{value:[n,r],children:e.children})},h=function(e){var a=Object(c.useContext)(u),t=Object(o.a)(a,2),n=(t[0],t[1]),r=Object(c.useState)(""),l=Object(o.a)(r,2),i=l[0],j=l[1],h=Object(c.useState)("login"),b=Object(o.a)(h,2),m=b[0],O=b[1],p=Object(c.useState)(""),g=Object(o.a)(p,2),f=g[0],x=g[1],v=Object(c.useState)(""),k=Object(o.a)(v,2),w=k[0],C=k[1],N=Object(c.useState)(""),S=Object(o.a)(N,2),D=S[0],y=S[1],I=Object(c.useState)(""),T=Object(o.a)(I,2),E=T[0],A=T[1],_=Object(c.useState)(""),P=Object(o.a)(_,2),L=P[0],z=P[1];Object(c.useEffect)((function(){var a=localStorage.getItem("userEmail"),t=localStorage.getItem("userPassword");if(null!==a){var s={email:a,password:t};d.a.post("/api/users/login",s).then((function(t){d.a.get("/api/users",{params:{email:a}}).then((function(a){var t=a.data;n(t),e.setLoggedIn(!0)})).catch((function(e){console.log(e)}))}))}}),[]);return Object(s.jsxs)("div",{className:"auth-container",children:["login"===m&&Object(s.jsxs)("div",{className:"login-container",children:[Object(s.jsx)("h1",{children:"Login with an existing account"}),Object(s.jsxs)("form",{children:[Object(s.jsx)("input",{className:"email"===i[0]?"error":void 0,onChange:function(e){return x(e.target.value)},placeholder:"email"===i[0]?i[1]:"Email",name:"email",value:f}),Object(s.jsx)("input",{className:"password"===i[0]?"error":void 0,onChange:function(e){return C(e.target.value)},placeholder:"password"===i[0]?i[1]:"Password",name:"password",value:w}),Object(s.jsx)("button",{onClick:function(a,t,s){a.preventDefault();var c={email:f,password:w};d.a.post("/api/users/login",c).then((function(a){switch(console.log(a.data),a.data){case'"email" is not allowed to be empty':j(["email","Email cannot be empty"]);break;case'"email" length must be at least 6 characters long':j(["email","Email must be at least 6 characters long"]),x("");break;case'"email" must be a valid email':j(["email","Must be a valid email"]),x("");break;case"email-not-found":j(["email","Email not found"]);break;case'"password" is not allowed to be empty':j(["password","Password cannot be empty"]);break;case'"password" length must be at least 6 characters long':j(["password","Password is too short"]),C("");break;case"invalid-password":j(["password","Invalid password"]),C("");break;case"user-not-authorized":j("not-authorized"),x(""),C("");break;default:var t=a.headers["auth-token"];localStorage.setItem("userToken",t),localStorage.setItem("userEmail",f),localStorage.setItem("userPassword",w),e.setLoggedIn(!0)}d.a.get("/api/users",{params:{email:f}}).then((function(e){var a=e.data;n(a)})).catch((function(e){console.log("Error: "+e)}))}))},children:"Login"})]}),"not-authorized"===i&&Object(s.jsxs)("p",{children:["Not approved yet.",Object(s.jsx)("br",{}),"Please wait for Manager's approval."]}),Object(s.jsx)("p",{className:"register-link",onClick:function(){return O("register")},children:"Register a new account"})]}),"register"===m&&Object(s.jsxs)("div",{className:"register-container",children:[Object(s.jsx)("h1",{children:"Register a new account"}),"registered"!==i&&Object(s.jsxs)("form",{className:"input-main",children:[Object(s.jsx)("input",{className:"name"===i[0]?"error":void 0,onChange:function(e){return y(e.target.value)},placeholder:"name"===i[0]?i[1]:"Name",name:"name",value:D}),Object(s.jsx)("input",{className:"email"===i[0]?"error":void 0,onChange:function(e){return A(e.target.value)},placeholder:"email"===i[0]?i[1]:"Email",name:"email",value:E}),Object(s.jsx)("input",{className:"password"===i[0]?"error":void 0,onChange:function(e){return z(e.target.value)},placeholder:"password"===i[0]?i[1]:"Password",name:"password",value:L}),Object(s.jsx)("button",{onClick:function(e){e.preventDefault();var a={name:D,email:E,password:L};d.a.post("/api/users/register",a).then((function(e){switch(e.data){case'"name" is not allowed to be empty':j(["name","Name cannot be empty"]);break;case'"email" is not allowed to be empty':j(["email","Email cannot be empty"]);break;case'"email" length must be at least 6 characters long':j(["email","Email must be at least 6 characters long"]),A("");break;case'"email" must be a valid email':j(["email","Must be a valid email"]),A("");break;case"email-duplicate":j(["email","doubleEmails"]),A("");break;case'"password" is not allowed to be empty':j(["password","Password cannot be empty"]);break;case'"password" length must be at least 6 characters long':j(["password","Password is too short"]),z("");break;default:j("registered"),y(""),A(""),z("")}})).catch((function(e){console.log(e)}))},children:"Register"})]}),"registered"===i&&Object(s.jsxs)("p",{children:["Successfully registered!",Object(s.jsx)("br",{}),"Please wait for Manager's approval."]}),Object(s.jsx)("p",{className:"login-link",onClick:function(){return O("login")},children:"Login with an existing account"})]})]})},b=function(e){var a=localStorage.getItem("userToken");return Object(s.jsx)("div",{className:"teachers-container",children:Object(s.jsx)("div",{className:"teacher-cards",children:e.teachers.map((function(t){return Object(s.jsxs)("div",{className:"class-card",children:[Object(s.jsx)("h3",{children:t.name}),Object(s.jsxs)("p",{children:["Auth status: ",t.isAuthed?"Authorized":"Unauthorized"]}),Object(s.jsx)("button",{onClick:function(s){return function(t,s){t.preventDefault(),d.a.put("/api/teachers/authTeacher/"+s,{headers:{"auth-token":a}}).then((function(a){console.log(a.data),e.readAllTeachers()})).catch((function(e){console.log(e)}))}(s,t._id)},children:"Authorize"}),Object(s.jsx)("button",{onClick:function(s){return function(t,s){t.preventDefault(),d.a.delete("/api/teachers/deleteTeacher/"+s,{headers:{"auth-token":a}}).then((function(a){console.log(a.data),e.readAllTeachers()})).catch((function(e){console.log(e)}))}(s,t._id)},children:"Remove teacher"})]},t._id)}))})})},m=function(e){var a=localStorage.getItem("userToken"),t=Object(c.useContext)(u),n=Object(o.a)(t,2),r=n[0],l=(n[1],Object(c.useState)("")),i=Object(o.a)(l,2),j=i[0],h=i[1],b=Object(c.useState)(""),m=Object(o.a)(b,2),O=m[0],p=m[1];return Object(s.jsxs)("div",{className:"classes-container",children:[Object(s.jsxs)("form",{className:"add-class",children:[Object(s.jsx)("input",{type:"text",value:j,placeholder:"Class name",onChange:function(e){return h(e.target.value)}}),Object(s.jsx)("input",{type:"text",value:O,placeholder:"Class book",onChange:function(e){return p(e.target.value)}}),Object(s.jsx)("button",{onClick:function(a){a.preventDefault();var t=localStorage.getItem("userToken"),s={name:j,book:O,localTeacherName:r.name,localTeacherId:r._id};d.a.post("/api/classes/create",s,{headers:{"auth-token":t}}).then((function(a){var s=r.classes,c={name:j,id:a.data,teacherId:r._id,date:Date.now()};s.push(c);var n={userId:r._id,classes:s};d.a.put("/api/teachers/addClass",n,{headers:{"auth-token":t}}).then((function(a){e.readAllClasses()})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))},children:"Add class"})]}),Object(s.jsx)("div",{className:"class-cards",children:e.classes.map((function(t){return Object(s.jsxs)("div",{className:"class-card",children:[Object(s.jsx)("h3",{children:t.name}),Object(s.jsxs)("p",{children:["Book: ",t.book]}),Object(s.jsxs)("p",{children:["Local Teacher: ",t.localTeacherName]}),Object(s.jsx)("button",{onClick:function(a){return function(a){var t=localStorage.getItem("userToken");d.a.get("./api/classes/"+a,{headers:{"auth-token":t}}).then((function(a){console.log(a.data[0]),e.setClassData(a.data[0]),e.setView("class")})).catch((function(e){console.error("Error: "+e)}))}(t._id)},children:"View class"}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:function(s){return function(t){d.a.delete("/api/classes/delete/"+t).then((function(s){var c=r.classes.filter((function(e){return e.id!==t}));console.log(c);var n={userId:r._id,classes:c};d.a.put("/api/teachers/deleteClass",n,{headers:{"auth-token":a}}).then((function(a){e.readAllClasses()})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}(t._id)},className:"delete-class-button",children:"Delete class"})]},t._id)}))})]})},O=function(e){var a=Object(c.useState)(""),t=Object(o.a)(a,2),n=t[0],r=t[1],l=Object(c.useState)(""),i=Object(o.a)(l,2),u=i[0],j=i[1],h=function(a){var t=e.classData,s=t.students.map((function(e){return e._id})).indexOf(a);t.students.splice(s,1),d.a.put("/api/classes/deleteStudent",t).then((function(a){console.log(a.data),function(a){var t=localStorage.getItem("userToken");d.a.get("./api/classes/"+a,{headers:{"auth-token":t}}).then((function(a){console.log(a.data[0]),e.setClassData(a.data[0])})).catch((function(e){console.error("Error: "+e)}))}(e.classData._id)})).catch((function(e){console.log(e)}))};return Object(s.jsxs)("div",{className:"class-container",children:[Object(s.jsxs)("div",{className:"class-details-container",children:[Object(s.jsx)("h2",{children:e.classData.name}),Object(s.jsx)("h2",{children:e.classData.book}),Object(s.jsx)("h2",{children:e.classData.localTeacher})]}),Object(s.jsxs)("form",{className:"add-student-container",children:[Object(s.jsx)("input",{type:"text",value:n,placeholder:"name...",onChange:function(e){return r(e.target.value)}}),Object(s.jsx)("input",{type:"text",value:u,placeholder:"age...",onChange:function(e){return j(e.target.value)}}),Object(s.jsx)("button",{onClick:function(a){a.preventDefault();var t=e.classData,s={name:n,age:u,class:e.classData.name,_id:Math.floor(1e5*Math.random())};t.students.push(s),d.a.put("/api/classes/createStudent",e.classData).then((function(e){console.log(e.data),r(""),j("")})).catch((function(e){console.log(e)}))},children:"Add student"})]}),Object(s.jsx)("div",{className:"students-container",children:e.classData.students.map((function(e){return Object(s.jsxs)("div",{className:"student-card",children:[Object(s.jsx)("h3",{children:e.name}),Object(s.jsxs)("p",{children:["Age: ",e.age]}),Object(s.jsx)("button",{onClick:function(a){return h(e._id)},children:"Remove student"})]})}))})]})},p=t(19),g=t(7),f=t(8),x=t(18),v=t.p+"static/media/circle.423a605e.png",k=function(e){var a=localStorage.getItem("userToken"),t=Object(c.useContext)(u),n=Object(o.a)(t,2),r=n[0],l=(n[1],Object(c.useState)("default")),i=Object(o.a)(l,2),j=i[0],h=i[1],k=Object(c.useState)({}),w=Object(o.a)(k,2),C=w[0],N=w[1],S=Object(c.useState)({}),D=Object(o.a)(S,2),y=D[0],I=D[1],T=Object(c.useState)({}),E=Object(o.a)(T,2),A=E[0],_=E[1],P=function(){d.a.get("./api/teachers",{headers:{"auth-token":a}}).then((function(e){console.log(e.data),N(e.data),h("teachers")})).catch((function(e){console.error("Error: "+e)}))},L=function(){d.a.get("./api/classes",{headers:{"auth-token":a}}).then((function(e){I(e.data),h("classes")})).catch((function(e){console.error("Error: "+e)}))},z=function(){var e=r.classes.map((function(e){return e.id}));console.log(e),d.a.get("./api/classes/readAuthorizedClasses",{params:{classIds:e}},{headers:{"auth-token":a}}).then((function(e){console.log(e.data),I(e.data),h("classes")})).catch((function(e){console.error("Error: "+e)}))};return Object(s.jsxs)("div",{className:"dashboard",children:[Object(s.jsxs)("div",{className:"navigation-container",children:[Object(s.jsxs)("div",{className:"links",children:[Object(s.jsx)("img",{src:v,alt:"profile",width:"60px"}),Object(s.jsxs)("p",{children:[r.name,Object(s.jsx)("br",{}),Object(s.jsx)("i",{children:r.authority})]}),Object(s.jsxs)("p",{className:"link",onClick:function(){return h("default")},children:[Object(s.jsx)(x.a,{className:"icon"}),Object(s.jsx)("br",{}),"Dashboard"]}),"admin"===r.authority&&Object(s.jsxs)("p",{className:"link",onClick:P,children:[Object(s.jsx)(g.a,{className:"icon"}),Object(s.jsx)("br",{}),"Teachers"]}),Object(s.jsxs)("p",{className:"link",onClick:"admin"===r.authority?L:z,children:[Object(s.jsx)(f.a,{className:"icon"}),Object(s.jsx)("br",{}),"Classes"]})]}),Object(s.jsx)("div",{className:"logout",children:Object(s.jsx)("p",{onClick:function(){localStorage.clear(),e.setLoggedIn(!1)},children:Object(s.jsx)(p.a,{})})})]}),Object(s.jsxs)("div",{className:"content-container",children:[Object(s.jsxs)("div",{className:"breadcrumb",children:["default"===j&&Object(s.jsx)("p",{children:"Dashboard"}),"teachers"===j&&Object(s.jsx)("p",{children:"Teachers"}),"classes"===j&&Object(s.jsx)("p",{children:"Classes"}),"class"===j&&Object(s.jsxs)("p",{children:[Object(s.jsx)("span",{onClick:"admin"===r.authority?L:z,children:"Classes"})," > ",A.name]})]}),"default"===j&&Object(s.jsxs)("div",{className:"default-container",children:["admin"===r.authority&&Object(s.jsxs)("div",{className:"section-card",children:[Object(s.jsx)("h1",{children:"Teachers"}),Object(s.jsx)(g.a,{className:"icon"}),Object(s.jsx)("button",{onClick:P,children:"View"})]}),"teacher"===r.authority&&Object(s.jsxs)("div",{className:"section-card",children:[Object(s.jsx)("h1",{children:"Classes"}),Object(s.jsx)(f.a,{className:"icon"}),Object(s.jsx)("button",{onClick:"admin"===r.authority?L:z,children:"View"})]})]}),"teachers"===j&&Object(s.jsx)(b,{setView:h,teachers:C,setTeachers:N,readAllTeachers:P}),"classes"===j&&Object(s.jsx)(m,{setView:h,classes:y,classData:A,setClassData:_,readAllClasses:L}),"class"===j&&Object(s.jsx)(O,{setView:h,classes:y,classData:A,setClassData:_})]})]})};var w=function(){var e=Object(c.useState)(!1),a=Object(o.a)(e,2),t=a[0],n=a[1];return Object(s.jsx)(j,{children:Object(s.jsxs)("div",{className:"app",children:[!t&&Object(s.jsx)(h,{setLoggedIn:n}),t&&Object(s.jsx)(k,{setLoggedIn:n})]})})};l.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(w,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.aa53fafc.chunk.js.map