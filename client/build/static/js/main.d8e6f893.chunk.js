(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),s=n.n(c),o=n(14),r=n.n(o),l=(n(20),n(2)),i=(n(21),n(4)),u=n.n(i),j=function(e){var t=Object(c.useState)("login"),n=Object(l.a)(t,2),s=n[0],o=(n[1],Object(c.useState)("")),r=Object(l.a)(o,2),i=r[0],j=r[1],d=Object(c.useState)(""),b=Object(l.a)(d,2),g=b[0],O=b[1],h=Object(c.useState)(""),p=Object(l.a)(h,2),m=p[0],f=p[1],v=Object(c.useState)(""),x=Object(l.a)(v,2),S=x[0],C=x[1],w=Object(c.useState)(""),k=Object(l.a)(w,2),I=k[0],N=k[1];Object(c.useEffect)((function(){var t={email:localStorage.getItem("userEmail"),password:localStorage.getItem("userPassword")};u.a.post("/api/users/login",t).then((function(t){e.setLoggedIn(!0)}))}),[]);return Object(a.jsxs)("div",{className:"auth-container",children:["login"===s&&Object(a.jsxs)("div",{className:"login-container",children:[Object(a.jsx)("input",{onChange:function(e){return j(e.target.value)},placeholder:"Email",name:"email",value:i}),Object(a.jsx)("input",{onChange:function(e){return O(e.target.value)},placeholder:"Password",name:"password",value:g}),Object(a.jsx)("button",{onClick:function(t){t.preventDefault();var n={email:i,password:g};u.a.post("/api/users/login",n).then((function(t){var n=t.headers["auth-token"];localStorage.setItem("userToken",n),localStorage.setItem("userEmail",i),localStorage.setItem("userPassword",g),e.setLoggedIn(!0)}))},children:"Login"})]}),"register"===s&&Object(a.jsx)("div",{className:"register-container",children:Object(a.jsxs)("form",{className:"input-main",children:[Object(a.jsx)("input",{onChange:function(e){return f(e.target.value)},placeholder:"Name",name:"name",value:m}),Object(a.jsx)("input",{onChange:function(e){return C(e.target.value)},placeholder:"Email",name:"email",value:S}),Object(a.jsx)("input",{onChange:function(e){return N(e.target.value)},placeholder:"Password",name:"password",value:I}),Object(a.jsx)("button",{onClick:function(e){e.preventDefault();var t={name:m,email:S,password:I};u.a.post("/api/users/register",t).then((function(e){f(""),C(""),N("")}))},children:"Register"})]})})]})},d=function(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),s=n[0],o=n[1],r=Object(c.useState)({}),i=Object(l.a)(r,2),j=i[0],d=i[1],b=Object(c.useState)(""),g=Object(l.a)(b,2),O=g[0],h=g[1],p=Object(c.useState)(""),m=Object(l.a)(p,2),f=m[0],v=m[1],x=Object(c.useState)(""),S=Object(l.a)(x,2),C=S[0],w=S[1],k=Object(c.useState)(""),I=Object(l.a)(k,2),N=I[0],E=I[1],L=function(){u.a.get("./api/students/").then((function(e){console.log(e.data),o(e.data),h("students")})).catch((function(e){console.error("Error: "+e)}))};return Object(a.jsxs)("div",{className:"dashboard",children:[Object(a.jsxs)("div",{className:"view-selector",children:[Object(a.jsx)("button",{onClick:L,children:"View student data"}),Object(a.jsx)("button",{onClick:function(){var e=localStorage.getItem("userToken");u.a.get("./api/classes",{headers:{"auth-token":e}}).then((function(e){console.log(e.data),d(e.data),h("classes")})).catch((function(e){console.error("Error: "+e)}))},children:"View class data"}),Object(a.jsx)("button",{onClick:function(){return e="5fc9e502fa9b2f266c1824b6",void u.a.get("./api/students/"+e).then((function(e){console.log(e.data)})).catch((function(e){console.error("Error: "+e)}));var e},children:"View one student"})]}),Object(a.jsxs)("form",{children:[Object(a.jsx)("input",{type:"text",value:f,placeholder:"name...",onChange:function(e){return v(e.target.value)}}),Object(a.jsx)("input",{type:"text",value:C,placeholder:"age...",onChange:function(e){return w(e.target.value)}}),Object(a.jsx)("input",{type:"text",value:N,placeholder:"class...",onChange:function(e){return E(e.target.value)}}),Object(a.jsx)("button",{onClick:function(e){if(e.preventDefault(),f.length>0){var t={name:f,age:C,class:N};u.a.post("/api/students/register",t).then((function(e){console.log(e.data),v(""),w(""),E(""),L()})).catch((function(e){console.log(e)}))}},children:"Add student"})]}),Object(a.jsxs)("div",{className:"content-container",children:[s.map((function(e){return Object(a.jsxs)("div",{className:"student-card",children:[Object(a.jsxs)("p",{children:["Name: ",e.name]}),Object(a.jsxs)("p",{children:["Age: ",e.age]}),Object(a.jsxs)("p",{children:["Class: ",e.class]}),Object(a.jsx)("button",{onClick:function(){return t=e._id,void u.a.delete("./api/students/delete/"+t).then((function(e){console.log(e.data),L()})).catch((function(e){console.error("Error: "+e)}));var t},children:"Remove"})]},e._id)})),"classes"===O&&j.map((function(e){return Object(a.jsx)("div",{className:"class-card",children:Object(a.jsx)("p",{children:e.name})},e._id)}))]}),Object(a.jsx)("button",{onClick:function(){localStorage.removeItem("userEmail"),localStorage.removeItem("userPassword"),e.setLoggedIn(!1)},children:"Logout"})]})};var b=function(){var e=Object(c.useState)({}),t=Object(l.a)(e,2),n=t[0],s=t[1],o=Object(c.useState)(!1),r=Object(l.a)(o,2),i=r[0],u=r[1];return Object(a.jsxs)("div",{className:"app",children:[!i&&Object(a.jsx)(j,{userData:n,setUserData:s,setLoggedIn:u}),i&&Object(a.jsx)(d,{setLoggedIn:u})]})};r.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.d8e6f893.chunk.js.map