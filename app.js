const app = new Vue({
  el: "#app",
  data: {
    title: "Login",
    newUser: "",
    newPass: "",
    email: "",
    userBallance: "",
    token: "",
    users: [],
  },
  methods: {
    addUser() {
      this.users.push({
        newUser: this.newUser,
        newPass: this.newPass,
        email: this.email,
      });
      this.newUser = "";
      this.newPass = "";
      this.email = "";
    },
    postFetch() {
      const postRequest = new Request("http://localhost:3000/newUser", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          newUser: document.getElementById("newUser").value,
          newPass: document.getElementById("newPass").value,
          email: document.getElementById("email").value
        }),
      });
      const newFetch = fetch(postRequest);
    },
    getFetch() {
      const getRequest = new Request("http://localhost:3000/users", {
        method: "GET",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
      });
      const newFetct = fetch(getRequest);
      newFetct.then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
      });
    },
    removeBallance() {
      const postRequest = new Request("http://localhost:3000/removeBallance", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: document.getElementById("username").value,
          ballance: document.getElementById("ballance").value,
        }),
      });
      const newFetch = fetch(postRequest);
    },
    addBallance(){
      const postRequest = new Request("http://localhost:3000/addBallance", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: document.getElementById("username").value,
          ballance: document.getElementById("ballance").value,
        }),
      });
      const newFetch = fetch(postRequest);
    },
    //Login
    login() {
      const postRequest = new Request("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
      }); 
      const newFetch = fetch(postRequest);
    },
    addItem(){
      const postRequest = new Request("http://localhost:3000/addItem", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          itemName: document.getElementById("itemName").value,
          itemPrice: document.getElementById("itemPrice").value,
          itemQuantity: document.getElementById("itemQuantity").value,
        }),
      });
      const newFetch = fetch(postRequest);
    },
    getStock(){
      const getRequest = new Request("http://localhost:3000/getStock", {
        method: "GET",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
      });
      const newFetct = fetch(getRequest);
      newFetct.then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
      });
    },
    addToCart(){
      const postRequest = new Request("http://localhost:3000/addToCart", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: document.getElementById("cartToken").value,
          itemName: document.getElementById("cartItem").value,
        }),
      });
      const newFetch = fetch(postRequest);
    },
    purchase(){
      const postRequest = new Request("http://localhost:3000/purchase", {
        method: "POST",
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: document.getElementById("purchaseToken").value,
        }),
      });
      const newFetch = fetch(postRequest);
    }
  },
});