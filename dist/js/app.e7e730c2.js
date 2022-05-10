(function(){"use strict";var t={845:function(t,e,s){var a=s(144),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},r=[],n=s(669),i=s.n(n),c={mounted(){this.$store.dispatch("getProducts"),i().get("https://erasmustartup.eu/kafka",{headers:{Authorization:"Bearer "+this.$store.state.token}}).then((t=>{200===t.status?this.$store.dispatch("setKafka",!0):(this.$store.dispatch("setKafka",!1),this.$store.dispatch("setToken",void 0)),this.$store.dispatch("setLoading",!1)})).catch((t=>{this.$store.dispatch("setKafka",!1),this.$store.dispatch("setToken",void 0),this.$store.dispatch("setLoading",!1)}))}},u=c,d=s(1),l=(0,d.Z)(u,o,r,!1,null,null,null),p=l.exports,m=s(345),h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("navigation"),t._m(0),t._m(1),s("div",{staticClass:"wrap"},[s("router-link",{attrs:{to:"/products"}},[s("button",[t._v("More")])])],1)],1)},v=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex"},[s("div",{staticClass:"side-image"}),s("div",{staticClass:"center-image"}),s("div",{staticClass:"side-image"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex-two"},[s("article",[s("h2",[t._v(" Welcome to EraShop! ")]),s("p",[s("strong",[t._v("Internet eshop made by European students")]),t._v(' during the "Erasmus+ Musical Instruments Start-Up" project. You can expect nothing but '),s("strong",[t._v("musical instruments")]),t._v(" of all kinds here, and of course, every single one of them is handmade and created by one of the teams of students. The teams are made up of multiple students from "),s("b",[t._v("Czech Republic, Germany, France and Spain")]),t._v(", each with its own different role in the whole project. ")])])])}],f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"itemDetail",params:{id:t.product.name}}}},[s("div",{staticClass:"itemBox"},[s("div",{staticClass:"img"},[s("img",{attrs:{src:"https://erasmustartup.eu/images/"+t.product.name+"/0.jpg"}})]),s("p",[t._v(t._s(t.product.name))]),s("p",[t._v(t._s(t.product.price)+"€")]),0==t.product.quantity?s("p",{staticStyle:{color:"red"}},[t._v("Out of stock")]):t._e()])])},g=[],_={name:"itemBox",props:["product","index"]},k=_,$=(0,d.Z)(k,f,g,!1,null,"63b57af6",null),C=$.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"navigation"},[s("router-link",{attrs:{to:"/"}},[s("div",{staticClass:"logo"},[t._v("EraShop")])]),s("div",{staticClass:"icons"},[s("font-awesome-icon",{attrs:{icon:"fa-solid fa-magnifying-glass"}}),s("router-link",{attrs:{to:t.kafka?"/account":"/signIn"}},[s("font-awesome-icon",{attrs:{icon:"fa-solid fa-user"}})],1),s("router-link",{attrs:{to:"/cart"}},[s("font-awesome-icon",{attrs:{icon:"fa-solid fa-cart-shopping"}})],1),s("font-awesome-icon",{attrs:{icon:"fa-solid fa-bars-staggered"}})],1)],1)},y=[],b={name:"navigation",computed:{kafka(){return this.$store.state.kafka},link(){return this.$store.state.link}}},x=b,E=(0,d.Z)(x,w,y,!1,null,"182eaf3a",null),L=E.exports,P=s(966),Z=s.n(P),I={name:"home",components:{navigation:L,carousel:Z(),itemBox:C},computed:{products(){return this.$store.state.products}}},T=I,O=(0,d.Z)(T,h,v,!1,null,"a489424a",null),B=O.exports,j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"products"},[s("navigation"),t._m(0),t.products&&1!=t.loading?s("div",{staticClass:"container"},[t._l(t.products,(function(t,e){return[s("itemBox",{key:t._id,attrs:{index:e,product:t}})]}))],2):s("loader")],1)},S=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"heading-content"},[s("h2",[t._v("Musical Instruments")]),s("p",[t._v("European students")])])}],K=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},z=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loader"},[s("div",{staticClass:"dot-spin"})])}],A={name:"loader"},N=A,D=(0,d.Z)(N,K,z,!1,null,"6d2c2bae",null),M=D.exports,Y={name:"products",components:{navigation:L,itemBox:C,loader:M},computed:{products(){return this.$store.state.products},loading(){return this.$store.state.loading}}},q=Y,F=(0,d.Z)(q,j,S,!1,null,"4609a627",null),U=F.exports,G=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"itemDetail"},[s("navigation"),t.product&&1!=t.loading?s("div",{staticClass:"container"},[t._m(0),s("div",{staticClass:"product-stats"},[s("h1",[t._v(t._s(t.product.name))]),s("p",{staticClass:"price"},[t._v(" Price: "),s("strong",[t._v("$"+t._s(t.product.price))])]),s("p",{staticClass:"description"},[t._v("Description:")]),s("p",{staticClass:"description-data"},[t._v(t._s(t.product.description))]),s("p",{staticClass:"material"},[t._v(" Material: "),s("strong",[t._v(t._s(t.product.material))])]),s("p",{staticClass:"origin"},[t._v(" Country of origin: "),s("strong",[t._v(t._s(t.product.origin))])]),0==t.product.quantity?s("p",{staticStyle:{color:"red"}},[t._v("Out of stock")]):t._e(),s("div",{staticClass:"button-box"},[s("button",{attrs:{disabled:0==t.product.quantity},on:{click:function(e){return t.addToCart()}}},[t._v(" Add to cart ")])])])]):s("loader")],1)},H=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"product"},[s("img",{attrs:{src:"https://d1aeri3ty3izns.cloudfront.net/media/23/235459/600/preview_4.jpg",alt:""}})])}],R={name:"itemDetail",components:{navigation:L,loader:M},methods:{async addToCart(){console.log(this.$store.state.token),console.log(this.$store.state.product.name),i().post("https://erasmustartup.eu/user/cart/add",{itemName:this.$store.state.product.name},{headers:{Authorization:`Bearer ${this.$store.state.token}`}})}},computed:{product(){return this.$store.state.product},loading(){return this.$store.state.loading}},mounted(){this.$store.dispatch("getProduct",this.$route.params.id)}},W=R,J=(0,d.Z)(W,G,H,!1,null,"5faf67e3",null),Q=J.exports,V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"signin"},[s("navigation"),1!=t.kafka?s("div",{staticClass:"container"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[s("div",{staticClass:"main"},[s("h1",[t._v("Sign in")]),s("p",[t._v("Username/mail")]),s("label",{staticClass:"username",attrs:{for:"username"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",id:"username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),s("p",[t._v("Password")]),s("label",{attrs:{for:"password"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("p",{style:{color:t.color}},[t._v(t._s(t.message))]),t._m(0)])])]):s("div",{staticClass:"signedIn"},[s("p",[t._v("You're already signed in!")]),s("div",{staticClass:"account"},[s("p",[t._v("Check out your ")]),s("router-link",{attrs:{to:"/account"}},[t._v("account")]),s("p",[t._v("!")])],1)])],1)},X=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex-one"},[s("input",{staticClass:"submit",attrs:{type:"submit",value:"Login"}})])}],tt={name:"signin",components:{navigation:L},data(){return{username:"",password:"",message:"",color:""}},computed:{kafka(){return this.$store.state.kafka}},methods:{async login(){this.$store.dispatch("setLoading",!0),await i().post("https://erasmustartup.eu/login",{username:this.username,password:this.password}).then((t=>{200===t.status&&(this.$store.dispatch("setToken",t.data),this.$store.commit("setKafka",!0),this.$router.push("/account"))})).catch((t=>{this.$store.dispatch("setLoading",!1),this.color="red",console.log(t),this.message=t.response.data,this.$store.commit("setKafka",!1),this.$store.commit("setToken",void 0)}))}}},et=tt,st=(0,d.Z)(et,V,X,!1,null,"43653444",null),at=st.exports,ot=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cart"},[s("navigation"),this.cart!=[]?s("div",{staticClass:"container"},[s("h1",[t._v("Cart")]),s("div",{staticClass:"cartBox"},[t._l(this.cart,(function(e){return[s("div",{key:e._id,staticClass:"cartProduct"},[s("p",[t._v(t._s(e.name))]),s("div",{staticClass:"line"}),s("p",[t._v(t._s(e.quantity))]),s("div",{staticClass:"line"}),s("p",[t._v(t._s(e.price)+"€")]),s("button",{on:{click:function(s){return t.removeItem(e.name)}}},[s("font-awesome-icon",{attrs:{icon:"fa-solid fa-xmark"}})],1)])]})),s("button",{on:{click:function(e){return t.purchase()}}},[t._v("Purchase")])],2)]):s("div",{staticClass:"empty"},[s("p",[t._v("Your cart is empty!")]),s("div",{staticClass:"shopHere"},[s("p",[t._v("You can shop ")]),s("router-link",{attrs:{to:"/products"}},[t._v("here")]),s("p",[t._v("!")])],1)])],1)},rt=[],nt={name:"cart",components:{navigation:L},data(){return{cart:void 0,cartLoading:!1,cartError:void 0}},mounted(){i().get("/user/cart/data",{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then((t=>{200===t.status&&(this.cart=t.data,this.cartLoading=!1,console.log(this.cart))})).catch((t=>{this.cartError=t.response.data}))},methods:{removeItem(t){this.$store.dispatch("setLoading",!0),i().post("https://erasmustartup.eu/user/cart/remove",{itemName:t},{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then((t=>{200===t.status&&this.$store.dispatch("setLoading",!1)})).catch((t=>{this.$store.dispatch("setLoading",!1),this.cartError=t.response.data}))},purchase(){this.$store.dispatch("setLoading",!0),i().post("http://erasmustartup.eu/user/purchase",{},{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then((t=>{200===t.status&&(this.$store.dispatch("setLoading",!1),this.$store.dispatch("cart",[]))})).catch((t=>{this.$store.dispatch("setLoading",!1),this.cartError=t.response.data}))}}},it=nt,ct=(0,d.Z)(it,ot,rt,!1,null,"78cab390",null),ut=ct.exports,dt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"account"},[s("navigation"),s("div",{staticClass:"accountwrap"},[1!=this.userLoading&&void 0!=this.user?s("div",{staticClass:"account-info"},[s("h1",[t._v("My Account")]),s("div",{staticClass:"account-box"},[s("p",[t._v("Username:")]),s("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.username))]),s("p",[t._v("Email:")]),s("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.email))]),s("p",[t._v("Ballance:")]),s("p",{staticClass:"account-parametr-stats"},[t._v(t._s(this.user.ballance)+" $Era")]),s("div",[s("button",{on:{click:function(e){return t.signOut()}}},[t._v("Sign out")])]),this.user.ownedItems!==[]?s("div",[t._m(0),void 0!=this.user.ownedItems||""!=this.user.ownedItems||this.user.ownedItems!=[]?s("div",[s("p",[t._v("Name:")]),t._l(this.user.ownedItems,(function(e){return s("p",{key:e.name},[t._v(" "+t._s(e.name)+" ")])}))],2):t._e()]):t._e()])]):1!=this.userLoading&&void 0!=this.userError?s("div",{staticClass:"error"},[s("p",[t._v(t._s(this.userError))])]):s("loader")],1)],1)},lt=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"account-center"},[s("h2",[t._v("Owned Items")])])}],pt={name:"account",components:{navigation:L,loader:M},data(){return{user:void 0,userLoading:!1,userError:void 0}},methods:{signOut(){this.$store.dispatch("setToken",void 0),this.$store.commit("setKafka",!1),this.$router.push({path:"/signIn"})}},mounted(){this.$store.dispatch("setLoading",!0),i().get("https://erasmustartup.eu/user/data",{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then((t=>{200===t.status&&(this.user=t.data,this.$store.dispatch("setLoading",!1),console.log(t.data))})).catch((t=>{this.userError=t.response.data,this.$store.dispatch("setLoading",!1)}))}},mt=pt,ht=(0,d.Z)(mt,dt,lt,!1,null,"78378a04",null),vt=ht.exports;a.Z.use(m.Z);const ft=[{path:"/",name:"home",component:B},{path:"/products",name:"products",component:U},{path:"/signin",name:"signIn",component:at},{path:"/cart",name:"cart",component:ut},{path:"/account",name:"account",component:vt},{path:"/:id",name:"itemDetail",component:Q}],gt=new m.Z({base:"",routes:ft});var _t=gt,kt=s(629),$t=s(168);a.Z.use(kt.ZP);const Ct=new $t.ZP({storage:window.localStorage,reducer:t=>({token:t.token,kafka:t.kafka})});var wt=new kt.ZP.Store({state:{products:void 0,product:void 0,loading:!1,searchItemList:!1,nav:!1,kafka:!1,token:void 0},getters:{},mutations:{setProducts(t,e){t.products=e},setProduct(t,e){t.product=e},setKafka(t,e){t.kafka=e},setProductLoading(t,e){t.productLoading=e},setNav(t){t.nav=!t.nav},setToken(t,e){t.token=e}},actions:{async getProducts({commit:t}){t("setProductLoading",!0),await i().get("https://erasmustartup.eu/stock/data").then((e=>{t("setProducts",e.data),setTimeout((()=>{t("setProductLoading",!1)}),500)}))},async getProduct({commit:t},e){t("setProductLoading",!0),await i().get(`https://erasmustartup.eu/stock/${e}`).then((e=>{t("setProduct",e.data),""===e.data||0===e.data.length?(t("setProductLoading",!1),router.push({name:"pageNotFound"})):(document.title=e.data.name,setTimeout((()=>{t("setProductLoading",!1)}),500))}),(t=>{console.log(t)}))},setKafka({commit:t},e){t("setKafka",e)},setToken({commit:t},e){t("setToken",e)},setLoading({commit:t},e){t("setProductLoading",e)}},modules:{},plugins:[Ct.plugin]}),yt=s(947),bt=s(810),xt=s(436);a.Z.config.productionTip=!1,yt.vI.add(xt.Y$T,xt.Ljc,xt.yYj,xt.ILF,xt.g82),a.Z.component("font-awesome-icon",bt.GN),new a.Z({router:_t,store:wt,render:t=>t(p)}).$mount("#app")}},e={};function s(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,s),r.exports}s.m=t,function(){var t=[];s.O=function(e,a,o,r){if(!a){var n=1/0;for(d=0;d<t.length;d++){a=t[d][0],o=t[d][1],r=t[d][2];for(var i=!0,c=0;c<a.length;c++)(!1&r||n>=r)&&Object.keys(s.O).every((function(t){return s.O[t](a[c])}))?a.splice(c--,1):(i=!1,r<n&&(n=r));if(i){t.splice(d--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[a,o,r]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var o,r,n=a[0],i=a[1],c=a[2],u=0;if(n.some((function(e){return 0!==t[e]}))){for(o in i)s.o(i,o)&&(s.m[o]=i[o]);if(c)var d=c(s)}for(e&&e(a);u<n.length;u++)r=n[u],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(d)},a=self["webpackChunkerashop"]=self["webpackChunkerashop"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(845)}));a=s.O(a)})();
//# sourceMappingURL=app.e7e730c2.js.map