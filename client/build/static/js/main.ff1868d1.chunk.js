(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{105:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),c=a(16),i=a(12),s=a(19),u=a(20),m=a(13),d=a(21),h=a(30),g=a(10),p=a(25),b=a(143),f=a(154),E=a(106),v=a(138),y=a(142),C=a(4),j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={email:"",password:"",redirectTo:null},a.onSubmit=a.onSubmit.bind(Object(m.a)(a)),a.handleChange=a.handleChange.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(g.a)({},e.target.name,e.target.value))}},{key:"onSubmit",value:function(e){e.preventDefault();var t=this.state,a=t.email,n=t.password,r=this.props._login;console.log("handleSubmit"),r(a,n)}},{key:"render",value:function(){var e=this.state,t=e.redirectTo,a=e.email,n=e.password,l=this.props.classes;return t?r.a.createElement(h.a,{to:{pathname:t}}):r.a.createElement("div",{className:l.root},r.a.createElement(v.a,{container:!0,component:E.a,elevation:6,square:!0,className:l.gridContainer,spacing:10},r.a.createElement(v.a,{item:!0,xl:4,lg:4,md:4,sm:4,xs:4,className:l.paper},r.a.createElement(y.a,{component:"h1",variant:"h4"},"Welcome!"),r.a.createElement("form",{className:l.form,xs:12,noValidate:!0,onSubmit:this.onSubmit},r.a.createElement(f.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",value:a,autoComplete:"email",autoFocus:!0,onChange:this.handleChange}),r.a.createElement(f.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",value:n,autoComplete:"current-password",onChange:this.handleChange}),r.a.createElement(b.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:l.submit,disableElevation:!0},"Sign In"),r.a.createElement(v.a,{item:!0},r.a.createElement(p.b,{to:"/register"},"Don't have an account? Sign Up")))),r.a.createElement(v.a,{item:!0,xl:8,lg:8,md:8,sm:8,xs:8,component:E.a,className:l.image})))}}]),t}(n.Component),w=Object(C.a)((function(e){return{root:{display:"flex",direction:"column",justifyContent:"center",alignItems:"center",height:"100vh"},gridContainer:{width:"60%",height:"60%"},image:{backgroundImage:"url(https://source.unsplash.com/random)",backgroundRepeat:"no-repeat",backgroundColor:"dark"===e.palette.type?e.palette.grey[900]:e.palette.grey[50],backgroundSize:"cover",backgroundPosition:"center"},paper:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:e.spacing(100)},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}),{withTheme:!0})(j),O=a(23),S=a.n(O),x=a(144),k=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){console.log("Username: "+n),console.log("Password: "+r),e.preventDefault();var t=a.state,n=t.email,r=t.password;S.a.post("/auth/register",{username:n,password:r}).then((function(e){console.log(e),e.data.errmsg?console.log("duplicate"):(console.log("youre good"),a.setState({redirectTo:"/login"}))})),console.log("username: "+n)},a.state={email:"",password:"",redirectTo:null},a.onSubmit=a.onSubmit.bind(Object(m.a)(a)),a.handleChange=a.handleChange.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(g.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this.state.redirectTo,t=this.props.classes;return e?r.a.createElement(h.a,{to:{pathname:e}}):r.a.createElement("div",{className:t.root},r.a.createElement(x.a,{component:E.a,elevation:6,square:!0,className:t.paper},r.a.createElement(y.a,{component:"h1",variant:"h5"},"Sign up"),r.a.createElement("form",{className:t.form,onSubmit:this.onSubmit},r.a.createElement(v.a,{container:!0,spacing:2},r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(f.a,{variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:this.handeChange})),r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(f.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:this.handeChange}))),r.a.createElement(b.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Sign Up"),r.a.createElement(v.a,{container:!0,justify:"flex-start"},r.a.createElement(v.a,{item:!0},r.a.createElement(p.b,{to:"/login"},"Already have an account? Sign in"))))))}}]),t}(n.Component),N=Object(C.a)((function(e){return{root:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},paper:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"40%",width:"25%"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}}),{withTheme:!0})(k),I=a(47),T=a.n(I),_=S.a.create({baseURL:"/api"}),D={getContact:function(e,t){return _.get("/showAll/".concat(e),t)},addContact:function(e,t){return _.post("/add/".concat(e),t)},deleteContact:function(e,t,a){return _.get("'/delete/".concat(e,"/").concat(t,"'"),a)},searchContact:function(e,t,a){return _.get("/search/".concat(e,"/").concat(t),a)},updateContact:function(e,t,a){return _.post("/update/".concat(e,"/").concat(t),a)}},W=a(149),R=a(148),U=a(151),q=a(146),A=a(150),B=a(145),L=a(147),P=a(65),z=a.n(P),F=a(64),M=a.n(F),G=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateName=function(e){var t=e.target.value;a.setState({name:t})},a.handleCreate=function(){var e,t;return T.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e=a.state.userID,t={contacts:{first_name:"TheFlash",last_name:"Barry",phone_number:"111-222-3344",email:"jl@gmail.com"}},console.log("User: "),console.log(e),console.log("This is the payload"),console.log(t),n.next=8,T.a.awrap(D.addContact(e,t).then((function(e){window.alert("Contact inserted successfully")})));case 8:case"end":return n.stop()}}))},a.contactList=function(){return a.state.contactsarray.map((function(e,t){return r.a.createElement(B.a,null,r.a.createElement(q.a,null," ",e.contacts.first_name," "),r.a.createElement(q.a,null," ",e.contacts.last_name," "),r.a.createElement(q.a,null," ",e.contacts.phone_number," "),r.a.createElement(q.a,null," ",e.contacts.email," "),r.a.createElement(q.a,{align:"right"},r.a.createElement(L.a,{"aria-label":"edit"},r.a.createElement(M.a,null)),r.a.createElement(L.a,{"aria-label":"delete"},r.a.createElement(z.a,null))))}))},a.state={name:"",contactsarray:[],userID:a.props.user._id},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getContacts()}},{key:"getContacts",value:function(){var e=this;D.getContact(this.state.userID).then((function(t){e.setState({name:"",contactsarray:t.data}),console.log(e.state.contactsarray),t.data.errmsg?console.log("Error fetching data"):console.log("Data fetched")})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",null,r.a.createElement(v.a,{container:!0,spacing:3,className:e.gridContainer},r.a.createElement(v.a,{item:!0,xl:7,lg:7,md:7,sm:7,xs:4},r.a.createElement(f.a,{fullWidth:!0,id:"outlined-search",label:"Search field",type:"search",variant:"outlined"})),r.a.createElement(v.a,{item:!0,xl:2,lg:2,md:2,sm:2,xs:2},r.a.createElement(b.a,{variant:"contained",size:"large",color:"primary",onClick:this.handleCreate},"Create Contact"))),r.a.createElement(R.a,null,r.a.createElement(W.a,{"aria-label":"sticky table"},r.a.createElement(A.a,null,r.a.createElement(B.a,{className:e.table},r.a.createElement(q.a,{className:e.tablehead},"First Name"),r.a.createElement(q.a,{className:e.tablehead},"Last Name"),r.a.createElement(q.a,{className:e.tablehead},"Phone Number"),r.a.createElement(q.a,{className:e.tablehead},"Email"),r.a.createElement(q.a,null))),r.a.createElement(U.a,null,this.contactList()))))}}]),t}(n.Component),H=Object(C.a)((function(e){return{tablehead:{fontSize:"18pt"},tablecell:{fontSize:"12pt"},gridContainer:{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",marginBottom:30}}}),{withTheme:!0})(G),J=a(152),V=a(153),K=a(66),Q=a.n(K),X=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={name:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props._logout,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(J.a,{position:"static"},r.a.createElement(V.a,null,r.a.createElement(L.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(Q.a,null)),r.a.createElement(y.a,{variant:"h6",className:t.title}),r.a.createElement(b.a,{color:"inherit",onClick:e},"Logout"))))}}]),t}(n.Component),Y=Object(C.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}),{withTheme:!0})(X),Z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={user:null,loggedIn:!1},a._logout=a._logout.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"_logout",value:function(e){var t=this;e.preventDefault(),console.log("logging out"),S.a.post("/auth/logout").then((function(e){console.log(e.data),200===e.status&&(t.setState({loggedIn:!1,user:null}),window.location.href="/login")}))}},{key:"componentDidMount",value:function(){var e=this;S.a.get("/auth/user").then((function(t){console.log(t.data),t.data.user?(console.log("THERE IS A USER"),e.setState({loggedIn:!0,user:t.data.user})):(e.setState({loggedIn:!1,user:null}),window.location.href="/login")}))}},{key:"render",value:function(){var e=this.state.user,t=this.props.classes;return console.log(null===e),e?r.a.createElement("div",{className:t.root},r.a.createElement(Y,{_logout:this._logout}),r.a.createElement(x.a,{maxWidth:"xl"},r.a.createElement(v.a,{container:!0,className:t.paper,direction:"row",justify:"center",alignItems:"center",spacing:5}),r.a.createElement(v.a,{item:!0,className:t.table},r.a.createElement(H,{user:this.state.user})))):null}}]),t}(n.Component),$=Object(C.a)((function(e){return{root:{height:"100vh"},paper:{marginTop:20},table:{marginTop:40}}}),{withTheme:!0})(Z),ee=a(156),te=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={loggedIn:!1,user:null,redirectTo:null},e._login=e._login.bind(Object(m.a)(e)),e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;S.a.get("/auth/user").then((function(t){console.log(t.data),t.data.user?(console.log("THERE IS A USER"),e.setState({loggedIn:!0,user:t.data.user})):e.setState({loggedIn:!1,user:null})}))}},{key:"_login",value:function(e,t){var a=this;S.a.post("/auth/login",{username:e,password:t}).then((function(e){console.log(e),200===e.status&&(a.setState({loggedIn:!0,user:e.data.user}),window.location.href="/")}))}},{key:"render",value:function(){var e=this,t=this.state.user;return r.a.createElement("div",null,r.a.createElement(ee.a,null),r.a.createElement(h.b,{exact:!0,path:"/",render:function(){return r.a.createElement($,{user:t})}}),r.a.createElement(h.b,{exact:!0,path:"/login",render:function(){return r.a.createElement(w,{_login:e._login})}}),r.a.createElement(h.b,{exact:!0,path:"/register",render:function(){return r.a.createElement(N,null)}}))}}]),t}(n.Component);o.a.render(r.a.createElement(p.a,null,r.a.createElement(te,null)),document.getElementById("root"))},75:function(e,t,a){e.exports=a(105)}},[[75,1,2]]]);
//# sourceMappingURL=main.ff1868d1.chunk.js.map