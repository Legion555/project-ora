(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{24:function(e,t,a){},25:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a(2),n=a.n(s),l=a(16),r=a.n(l),o=(a(24),a(3)),i=(a(25),a(5)),u=a.n(i),j=function(e){var t=Object(s.useState)("login"),a=Object(o.a)(t,2),n=a[0],l=(a[1],Object(s.useState)("")),r=Object(o.a)(l,2),i=r[0],j=r[1],d=Object(s.useState)(""),b=Object(o.a)(d,2),h=b[0],O=b[1],g=Object(s.useState)(""),m=Object(o.a)(g,2),x=m[0],p=m[1],f=Object(s.useState)(""),v=Object(o.a)(f,2),S=v[0],C=v[1],N=Object(s.useState)(""),k=Object(o.a)(N,2),w=k[0],I=k[1];Object(s.useEffect)((function(){var t={email:localStorage.getItem("userEmail"),password:localStorage.getItem("userPassword")};u.a.post("/api/users/login",t).then((function(t){e.setLoggedIn(!0)}))}),[]);return Object(c.jsxs)("div",{className:"auth-container",children:["login"===n&&Object(c.jsxs)("div",{className:"login-container",children:[Object(c.jsx)("input",{onChange:function(e){return j(e.target.value)},placeholder:"Email",name:"email",value:i}),Object(c.jsx)("input",{onChange:function(e){return O(e.target.value)},placeholder:"Password",name:"password",value:h}),Object(c.jsx)("button",{onClick:function(t){t.preventDefault();var a={email:i,password:h};u.a.post("/api/users/login",a).then((function(t){var a=t.headers["auth-token"];localStorage.setItem("userToken",a),localStorage.setItem("userEmail",i),localStorage.setItem("userPassword",h),e.setLoggedIn(!0)}))},children:"Login"})]}),"register"===n&&Object(c.jsx)("div",{className:"register-container",children:Object(c.jsxs)("form",{className:"input-main",children:[Object(c.jsx)("input",{onChange:function(e){return p(e.target.value)},placeholder:"Name",name:"name",value:x}),Object(c.jsx)("input",{onChange:function(e){return C(e.target.value)},placeholder:"Email",name:"email",value:S}),Object(c.jsx)("input",{onChange:function(e){return I(e.target.value)},placeholder:"Password",name:"password",value:w}),Object(c.jsx)("button",{onClick:function(e){e.preventDefault();var t={name:x,email:S,password:w};u.a.post("/api/users/register",t).then((function(e){p(""),C(""),I("")}))},children:"Register"})]})})]})},d=a(18),b=a(7),h=a(17),O=a.p+"static/media/circle.423a605e.png",g=function(e){var t=Object(s.useState)({}),a=Object(o.a)(t,2),n=a[0],l=a[1],r=Object(s.useState)({}),i=Object(o.a)(r,2),j=i[0],g=i[1],m=Object(s.useState)(""),x=Object(o.a)(m,2),p=x[0],f=x[1],v=Object(s.useState)(""),S=Object(o.a)(v,2),C=S[0],N=S[1],k=Object(s.useState)(""),w=Object(o.a)(k,2),I=w[0],D=w[1],E=Object(s.useState)([]),y=Object(o.a)(E,2),L=(y[0],y[1],Object(s.useState)("default")),_=Object(o.a)(L,2),T=_[0],P=_[1],A=Object(s.useState)(""),M=Object(o.a)(A,2),B=M[0],J=M[1],R=Object(s.useState)(""),V=Object(o.a)(R,2),U=V[0],q=V[1],z=Object(s.useState)(""),F=Object(o.a)(z,2),G=(F[0],F[1],Object(s.useState)(0)),H=Object(o.a)(G,2),K=H[0],Q=H[1],W=function(){var e=localStorage.getItem("userToken");u.a.get("./api/classes",{headers:{"auth-token":e}}).then((function(e){console.log(e.data),g(e.data),P("classes")})).catch((function(e){console.error("Error: "+e)}))};return Object(c.jsxs)("div",{className:"dashboard",children:[Object(c.jsxs)("div",{className:"navigation-container",children:[Object(c.jsxs)("div",{className:"links",children:[Object(c.jsx)("img",{src:O,width:"60px"}),Object(c.jsxs)("a",{onClick:function(){return P("default")},className:"link",children:[Object(c.jsx)(h.a,{className:"icon"}),Object(c.jsx)("br",{}),"Dashboard"]}),Object(c.jsxs)("a",{onClick:W,className:"link",children:[Object(c.jsx)(b.a,{className:"icon"}),Object(c.jsx)("br",{}),"Classes"]})]}),Object(c.jsx)("div",{className:"logout",children:Object(c.jsx)("a",{onClick:function(){localStorage.clear(),e.setLoggedIn(!1)},children:Object(c.jsx)(d.a,{})})})]}),Object(c.jsxs)("div",{className:"content-container",children:[Object(c.jsxs)("div",{className:"breadcrumb",children:["default"===T&&Object(c.jsx)("p",{children:"Dashboard"}),"classes"===T&&Object(c.jsx)("p",{children:"Classes"})]}),"default"===T&&Object(c.jsx)("div",{className:"default-container",children:Object(c.jsxs)("div",{className:"section-card",children:[Object(c.jsx)("h1",{children:"Classes"}),Object(c.jsx)(b.a,{className:"icon"}),Object(c.jsx)("button",{onClick:W,children:"View"})]})}),"classes"===T&&Object(c.jsxs)("div",{className:"classes-container",children:[Object(c.jsxs)("form",{className:"add-class",children:[Object(c.jsx)("input",{type:"text",value:p,placeholder:"Class name",onChange:function(e){return f(e.target.value)}}),Object(c.jsx)("input",{type:"text",value:C,placeholder:"Class book",onChange:function(e){return N(e.target.value)}}),Object(c.jsx)("input",{type:"text",value:I,placeholder:"Local teacher",onChange:function(e){return D(e.target.value)}}),Object(c.jsx)("button",{onClick:function(e){e.preventDefault();var t={name:p,book:C,localTeacher:I,students:[]};u.a.post("/api/classes/create",t).then((function(e){console.log("Class added successfully."),W(),f(""),N(""),D("")}))},children:"Add class"})]}),Object(c.jsx)("div",{className:"class-cards",children:j.map((function(e){return Object(c.jsxs)("div",{className:"class-card",children:[Object(c.jsx)("h3",{children:e.name}),Object(c.jsxs)("p",{children:["Book: ",e.book]}),Object(c.jsxs)("p",{children:["Students: ",e.students.length]}),Object(c.jsx)("button",{onClick:function(t){return function(e){var t=localStorage.getItem("userToken");u.a.get("./api/classes/"+e,{headers:{"auth-token":t}}).then((function(e){console.log(e.data[0]),l(e.data[0]),P("class")})).catch((function(e){console.error("Error: "+e)}))}(e._id)},children:"View class"}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{onClick:function(t){return function(e){u.a.delete("/api/classes/delete/"+e).then((function(e){console.log("Class deleted"),W()})).catch((function(e){console.log(e)}))}(e._id)},children:"Delete class"})]},e._id)}))})]}),"class"===T&&Object(c.jsxs)("div",{className:"class-container",children:[Object(c.jsxs)("div",{className:"class-details-container",children:[Object(c.jsx)("h2",{children:n.name}),Object(c.jsx)("h2",{children:n.book}),Object(c.jsx)("h2",{children:n.localTeacher})]}),Object(c.jsxs)("form",{className:"add-student-container",children:[Object(c.jsx)("input",{type:"text",value:B,placeholder:"name...",onChange:function(e){return J(e.target.value)}}),Object(c.jsx)("input",{type:"text",value:U,placeholder:"age...",onChange:function(e){return q(e.target.value)}}),Object(c.jsx)("button",{onClick:function(e){e.preventDefault();var t=n,a={name:B,age:U,class:n.name,_id:Math.floor(1e5*Math.random())};t.students.push(a),u.a.put("/api/classes/createStudent",n).then((function(e){console.log(e.data),l(t),J(""),q("")})).catch((function(e){console.log(e)}))},children:"Add student"})]}),Object(c.jsx)("div",{className:"students-container",children:n.students.map((function(e){return Object(c.jsxs)("div",{className:"student-card",children:[Object(c.jsx)("h3",{children:e.name}),Object(c.jsxs)("p",{children:["Age: ",e.age]}),Object(c.jsx)("button",{onClick:function(t){return function(e){var t=n,a=t.students.map((function(e){return e._id})).indexOf(e);t.students.splice(a,1),u.a.put("/api/classes/deleteStudent",t).then((function(e){console.log(e.data),l(t),Q(K+1)})).catch((function(e){console.log(e)}))}(e._id)},children:"Remove student"})]})}))})]})]})]})};var m=function(){var e=Object(s.useState)({}),t=Object(o.a)(e,2),a=t[0],n=t[1],l=Object(s.useState)(!1),r=Object(o.a)(l,2),i=r[0],u=r[1];return Object(c.jsxs)("div",{className:"app",children:[!i&&Object(c.jsx)(j,{userData:a,setUserData:n,setLoggedIn:u}),i&&Object(c.jsx)(g,{setLoggedIn:u})]})};r.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(m,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.49532549.chunk.js.map