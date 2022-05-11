(function(){"use strict";var t={733:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var a=n(144),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],o=n(6198),i=(n(5666),n(9669)),c=n.n(i),u={created:function(){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.dispatch("getProducts"),e.next=3,c().get("https://erasmustartup.eu/kafka",{headers:{Authorization:"Bearer "+t.$store.state.token}}).then((function(e){200===e.status?t.$store.dispatch("setKafka",!0):(t.$store.dispatch("setKafka",!1),t.$store.dispatch("setToken",void 0)),t.$store.dispatch("setLoading",!1)})).catch((function(e){t.$store.dispatch("setKafka",!1),t.$store.dispatch("setToken",void 0),t.$store.dispatch("setLoading",!1)}));case 3:case"end":return e.stop()}}),e)})))()}},d=u,l=n(1001),p=(0,l.Z)(d,r,s,!1,null,null,null),m=p.exports,v=n(8345),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("navigation"),t._m(0),t._m(1),n("div",{staticClass:"wrap"},[n("router-link",{attrs:{to:"/products"}},[n("button",[t._v("More")])])],1)],1)},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex"},[n("div",{staticClass:"side-image"}),n("div",{staticClass:"center-image"}),n("div",{staticClass:"side-image"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex-two"},[n("article",[n("h2",[t._v(" Welcome to EraShop! ")]),n("p",[n("strong",[t._v("Internet eshop made by European students")]),t._v(' during the "Erasmus+ Musical Instruments Start-Up" project. You can expect nothing but '),n("strong",[t._v("musical instruments")]),t._v(" of all kinds here, and of course, every single one of them is handmade and created by one of the teams of students. The teams are made up of multiple students from "),n("b",[t._v("Czech Republic, Germany, France and Spain")]),t._v(", each with its own different role in the whole project. ")])])])}],g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"itemDetail",params:{id:t.product.name}}}},[n("div",{staticClass:"itemBox"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:"https://erasmustartup.eu/images/"+t.product.name+"/0.jpg"}})]),n("p",[t._v(t._s(t.product.name))]),n("p",[t._v(t._s(t.product.price)+"€")]),0==t.product.quantity?n("p",{staticStyle:{color:"red"}},[t._v("Out of stock")]):t._e()])])},_=[],k={name:"itemBox",props:["product","index"]},w=k,C=(0,l.Z)(w,g,_,!1,null,"5fc70830",null),$=C.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navigation"},[n("router-link",{attrs:{to:"/"}},[n("div",{staticClass:"logo"},[t._v("EraShop")])]),n("div",{staticClass:"icons"},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-magnifying-glass"}}),n("router-link",{attrs:{to:t.kafka?"/account":"/signIn"}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-user"}})],1),n("router-link",{attrs:{to:"/cart"}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-cart-shopping"}})],1),n("font-awesome-icon",{attrs:{icon:"fa-solid fa-bars-staggered"}})],1)],1)},L=[],b=(n(9254),{name:"navigation",computed:{kafka:function(){return this.$store.state.kafka},link:function(){return this.$store.state.link}}}),y=b,E=(0,l.Z)(y,x,L,!1,null,"182eaf3a",null),Z=E.exports,P=n(2966),I=n.n(P),R={name:"home",components:{navigation:Z,carousel:I(),itemBox:$},computed:{products:function(){return this.$store.state.products}}},T=R,O=(0,l.Z)(T,f,h,!1,null,"640870fe",null),B=O.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"products"},[n("navigation"),t._m(0),t.products&&1!=t.loading?n("div",{staticClass:"container"},[t._l(t.products,(function(t,e){return[n("itemBox",{key:t._id,attrs:{index:e,product:t}})]}))],2):n("loader")],1)},S=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"heading-content"},[n("h2",[t._v("Musical Instruments")]),n("p",[t._v("European students")])])}],z=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},A=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loader"},[n("div",{staticClass:"dot-spin"})])}],K={name:"loader"},N=K,Y=(0,l.Z)(N,z,A,!1,null,"6d2c2bae",null),D=Y.exports,M={name:"products",components:{navigation:Z,itemBox:$,loader:D},computed:{products:function(){return this.$store.state.products},loading:function(){return this.$store.state.loading}}},q=M,F=(0,l.Z)(q,j,S,!1,null,"35977597",null),U=F.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"itemDetail"},[n("navigation"),t.product&&1!=t.loading?n("div",{staticClass:"container"},[t._m(0),n("div",{staticClass:"product-stats"},[n("h1",[t._v(t._s(t.product.name))]),n("p",{staticClass:"price"},[t._v(" Price: "),n("strong",[t._v("$"+t._s(t.product.price))])]),n("p",{staticClass:"description"},[t._v("Description:")]),n("p",{staticClass:"description-data"},[t._v(t._s(t.product.description))]),n("p",{staticClass:"material"},[t._v(" Material: "),n("strong",[t._v(t._s(t.product.material))])]),n("p",{staticClass:"origin"},[t._v(" Country of origin: "),n("strong",[t._v(t._s(t.product.origin))])]),0==t.product.quantity?n("p",{staticStyle:{color:"red"}},[t._v("Out of stock")]):t._e(),n("div",{staticClass:"button-box"},[n("button",{attrs:{disabled:0==t.product.quantity},on:{click:function(e){return t.addToCart()}}},[t._v(" Add to cart ")])])])]):n("loader")],1)},H=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"product"},[n("img",{attrs:{src:"https://d1aeri3ty3izns.cloudfront.net/media/23/235459/600/preview_4.jpg",alt:""}})])}],W=(n(8309),{name:"itemDetail",components:{navigation:Z,loader:D},methods:{addToCart:function(){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t.$store.state.token),console.log(t.$store.state.product.name),e.next=4,c().post("https://erasmustartup.eu/user/cart/add",{itemName:t.$store.state.product.name},{headers:{Authorization:"Bearer ".concat(t.$store.state.token)}});case 4:case"end":return e.stop()}}),e)})))()}},computed:{product:function(){return this.$store.state.product},loading:function(){return this.$store.state.loading}},mounted:function(){this.$store.dispatch("getProduct",this.$route.params.id)}}),J=W,Q=(0,l.Z)(J,G,H,!1,null,"527755ce",null),V=Q.exports,X=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"signin"},[n("navigation"),1==this.$store.state.loader?n("loader"):1!=t.kafka?n("div",{staticClass:"container"},[n("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[n("div",{staticClass:"main"},[n("h1",[t._v("Sign in")]),n("p",[t._v("Username/mail")]),n("label",{staticClass:"username",attrs:{for:"username"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",id:"username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),n("p",[t._v("Password")]),n("label",{attrs:{for:"password"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),n("p",{style:{color:t.color}},[t._v(t._s(t.message))]),n("div",{staticClass:"flex-one"},[n("input",{staticClass:"submit",attrs:{type:"submit",value:"Login"}})])])])]):n("div",{staticClass:"signedIn"},[n("p",[t._v("You're already signed in!")]),n("div",{staticClass:"account"},[n("p",[t._v("Check out your ")]),n("router-link",{attrs:{to:"/account"}},[t._v("account")]),n("p",[t._v("!")])],1)])],1)},tt=[],et={name:"signin",components:{navigation:Z,loader:D},data:function(){return{username:"",password:"",message:"",color:""}},computed:{kafka:function(){return this.$store.state.kafka}},methods:{login:function(){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.dispatch("setLoading",!0),e.next=3,c().post("https://erasmustartup.eu/login",{username:t.username,password:t.password}).then((function(e){200===e.status&&(t.$store.dispatch("setToken",e.data),t.$store.commit("setKafka",!0),t.$router.push("/account"))})).catch((function(e){t.$store.dispatch("setLoading",!1),t.color="red",console.log(e),t.message=e.response.data,t.$store.commit("setKafka",!1),t.$store.commit("setToken",void 0)}));case 3:case"end":return e.stop()}}),e)})))()}}},nt=et,at=(0,l.Z)(nt,X,tt,!1,null,"68cef927",null),rt=at.exports,st=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cart"},[n("navigation"),1==this.$store.state.kafka?n("div",{staticClass:"logged"},[1==this.cartLoading?n("loader"):this.cart!=[]||""!=this.cart||void 0!=this.cart||null!=this.cart?n("div",{staticClass:"container"},[n("h1",[t._v("Cart")]),n("div",{staticClass:"cartBox"},[t._l(this.cart,(function(e){return[n("div",{key:e._id,staticClass:"cartProduct"},[n("p",[t._v(t._s(e.name))]),n("div",{staticClass:"line"}),n("p",[t._v(t._s(e.quantity))]),n("div",{staticClass:"line"}),n("p",[t._v(t._s(e.price)+"€")]),n("button",{on:{click:function(n){return t.removeItem(e.name)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-xmark"}})],1)])]})),n("button",{on:{click:function(e){return t.purchase()}}},[t._v("Purchase")])],2)]):n("div",{staticClass:"empty"},[n("p",[t._v("Your cart is empty!")]),n("div",{staticClass:"shopHere"},[n("p",[t._v("You can shop ")]),n("router-link",{attrs:{to:"/products"}},[t._v("here")]),n("p",[t._v("!")])],1)])],1):n("div",{staticClass:"notLogged"},[n("p",[t._v("You need to be signed in to view your cart!")]),n("div",{staticClass:"wrap"},[n("p",[t._v("Sign in ")]),n("router-link",{attrs:{to:"/signIn"}},[t._v("here")]),n("p",[t._v("!")])],1)])],1)},ot=[],it={name:"cart",components:{navigation:Z,loader:D},data:function(){return{cart:void 0,cartLoading:!1,cartError:void 0}},mounted:function(){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.cartLoading=!0,e.next=3,c().get("https://erasmustartup.eu/user/cart/data",{headers:{Authorization:"Bearer ".concat(t.$store.state.token)}}).then((function(e){t.cartLoading=!1,200===e.status&&(t.cartLoading=!1,t.cart=void 0,t.cartLoading=!1,t.cart=e.data,t.cartLoading=!1,console.log(t.cart),t.cartLoading=!1,console.log(t.cartLoading))})).catch((function(e){t.cartError=e.response.data,t.cartLoading=!1}));case 3:case"end":return e.stop()}}),e)})))()},methods:{removeItem:function(t){var e=this;return(0,o.Z)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.cartLoading=!0,n.next=3,c().post("https://erasmustartup.eu/user/cart/remove",{itemName:t},{headers:{Authorization:"Bearer ".concat(e.$store.state.token)}}).then(function(){var t=(0,o.Z)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==n.status){t.next=4;break}return e.$store.dispatch("setLoading",!0),t.next=4,c().get("https://erasmustartup.eu/user/cart/data",{headers:{Authorization:"Bearer ".concat(e.$store.state.token)}}).then((function(t){200===t.status&&(e.cart=void 0,e.cart=t.data,e.cartLoading=!1,console.log(e.cart))})).catch((function(t){e.cartError=t.response.data,e.cartLoading=!1}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.cartError=t.response.data,e.cartLoading=!1}));case 3:case"end":return n.stop()}}),n)})))()},purchase:function(){var t=this;this.$store.dispatch("setLoading",!0),c().post("https://erasmustartup.eu/user/purchase",{},{headers:{Authorization:"Bearer ".concat(this.$store.state.token)}}).then((function(e){200===e.status&&(t.$store.dispatch("setLoading",!1),t.$store.dispatch("cart",[]))})).catch((function(e){t.$store.dispatch("setLoading",!1),t.cartError=e.response.data}))}}},ct=it,ut=(0,l.Z)(ct,st,ot,!1,null,"086c09aa",null),dt=ut.exports,lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"account"},[n("navigation"),n("div",{staticClass:"accountwrap"},[1==this.$store.state.loading?n("loader"):1!=this.userLoading&&void 0!=this.user?n("div",{staticClass:"account-info"},[n("h1",[t._v("My Account")]),n("div",{staticClass:"account-box"},[n("p",[t._v("Username:")]),n("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.username))]),n("p",[t._v("Email:")]),n("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.email))]),n("p",[t._v("Ballance:")]),n("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.ballance)+" $Era")]),n("div",{staticClass:"account-out"},[n("button",{on:{click:function(e){return t.signOut()}}},[t._v("Sign out")])]),n("div",{staticClass:"line"}),this.user.ownedItems!==[]?n("div",[n("div",{staticClass:"account-center"},[n("h2",[t._v("Owned Items")])]),void 0!=this.user.ownedItems||""!=this.user.ownedItems||this.user.ownedItems!=[]?n("div",{staticClass:"account-owned"},[n("p",[t._v("Name:")]),t._l(this.user.ownedItems,(function(e){return n("p",{key:e.name},[t._v(" "+t._s(e.name)+" ")])}))],2):t._e()]):t._e()])]):n("div",{staticClass:"error"},[n("p",[t._v(t._s(this.userError))])])],1)],1)},pt=[],mt={name:"account",components:{navigation:Z,loader:D},data:function(){return{user:void 0,userLoading:!1,userError:void 0}},methods:{signOut:function(){this.$store.dispatch("setToken",void 0),this.$store.commit("setKafka",!1),this.$router.push({path:"/signIn"})}},mounted:function(){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.dispatch("setLoading",!0),e.next=3,c().get("https://erasmustartup.eu/user/data",{headers:{Authorization:"Bearer ".concat(t.$store.state.token)}}).then((function(e){200===e.status&&(t.user=e.data,t.$store.dispatch("setLoading",!1),console.log(e.data))})).catch((function(e){t.userError=e.response.data,t.$store.dispatch("setLoading",!1)}));case 3:case"end":return e.stop()}}),e)})))()}},vt=mt,ft=(0,l.Z)(vt,lt,pt,!1,null,"1d550110",null),ht=ft.exports;a.Z.use(v.Z);var gt=[{path:"/",name:"home",component:B},{path:"/products",name:"products",component:U},{path:"/signin",name:"signIn",component:rt},{path:"/cart",name:"cart",component:dt},{path:"/account",name:"account",component:ht},{path:"/:id",name:"itemDetail",component:V}],_t=new v.Z({base:"",routes:gt}),kt=_t,wt=n(629),Ct=n(3168);a.Z.use(wt.ZP);var $t=new Ct.ZP({storage:window.localStorage,reducer:function(t){return{token:t.token,kafka:t.kafka}}}),xt=new wt.ZP.Store({state:{products:void 0,product:void 0,loading:!1,searchItemList:!1,nav:!1,kafka:!1,token:void 0},getters:{},mutations:{setProducts:function(t,e){t.products=e},setProduct:function(t,e){t.product=e},setKafka:function(t,e){t.kafka=e},setProductLoading:function(t,e){t.productLoading=e},setNav:function(t){t.nav=!t.nav},setToken:function(t,e){t.token=e}},actions:{getProducts:function(t){return(0,o.Z)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,n("setProductLoading",!0),e.next=4,c().get("https://erasmustartup.eu/stock/data").then((function(t){n("setProducts",t.data),setTimeout((function(){n("setProductLoading",!1)}),500)}));case 4:case"end":return e.stop()}}),e)})))()},getProduct:function(t,e){return(0,o.Z)(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.commit,a("setProductLoading",!0),n.next=4,c().get("https://erasmustartup.eu/stock/".concat(e)).then((function(t){a("setProduct",t.data),""===t.data||0===t.data.length?(a("setProductLoading",!1),router.push({name:"pageNotFound"})):(document.title=t.data.name,setTimeout((function(){a("setProductLoading",!1)}),500))}),(function(t){console.log(t)}));case 4:case"end":return n.stop()}}),n)})))()},setKafka:function(t,e){var n=t.commit;n("setKafka",e)},setToken:function(t,e){var n=t.commit;n("setToken",e)},setLoading:function(t,e){var n=t.commit;n("setProductLoading",e)}},modules:{},plugins:[$t.plugin]}),Lt=n(8947),bt=n(7810),yt=n(1436);a.Z.config.productionTip=!1,Lt.vI.add(yt.Y$T,yt.Ljc,yt.yYj,yt.ILF,yt.g82),a.Z.component("font-awesome-icon",bt.GN),new a.Z({router:kt,store:xt,render:function(t){return t(m)}}).$mount("#app")}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var s=e[a]={exports:{}};return t[a].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,a,r,s){if(!a){var o=1/0;for(d=0;d<t.length;d++){a=t[d][0],r=t[d][1],s=t[d][2];for(var i=!0,c=0;c<a.length;c++)(!1&s||o>=s)&&Object.keys(n.O).every((function(t){return n.O[t](a[c])}))?a.splice(c--,1):(i=!1,s<o&&(o=s));if(i){t.splice(d--,1);var u=r();void 0!==u&&(e=u)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[a,r,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var r,s,o=a[0],i=a[1],c=a[2],u=0;if(o.some((function(e){return 0!==t[e]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(c)var d=c(n)}for(e&&e(a);u<o.length;u++)s=o[u],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(d)},a=self["webpackChunkerashop"]=self["webpackChunkerashop"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(733)}));a=n.O(a)})();
//# sourceMappingURL=app-legacy.4f4bee9e.js.map