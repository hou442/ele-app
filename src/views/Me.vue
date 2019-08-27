<template>
  <div class="me">
    <div class="headInfo">
      <div class="head-img"></div>
        <div class="head-profile">
          <p class="user-id" v-if="userInfo">{{userInfo._id}}</p>
          <p class="user-id" v-else @click="handleLogin">登录/注册</p>
            <p class="user-phone">
              <i class="fa fa-mobile"></i>
              <span v-if="userInfo">{{encryptPhone(userInfo.phone)}}</span>
              <span v-else>登录后查看更多特权</span>
            </p>
        </div>
        <i class="fa fa-angle-right"></i>
    </div>
    <div class="useInfo">
      <div class="address-cell">
        <div class="address-index" @click="toAddress">
          <i class="fa fa-map-marker"></i>
          <span>我的地址</span>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="shop-index">
          <i class="fa fa-shopping-bag"></i>
          <span>金币商城</span>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="serve-index">
          <i class="fa fa-user-o"></i>
          <span>我的客服</span>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="rule-index">
          <i class="fa fa-bookmark"></i>
          <span>规则中心</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <button @click="handleLogout" class="logOut-btn">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data () {
    return {
      userInfo:""
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => vm.getData());    
  },
  methods:{
    handleLogin(){
      this.$router.push('/login');
    },
    getData(){
      const user_id = localStorage.ele_login;
      this.$axios(`/api/user/user_info/${user_id}`)
        .then(res => {
          console.log(res.data);
          this.userInfo = res.data;
      })
    },
    encryptPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    handleLogout(){
      localStorage.removeItem("ele_login");
      this.$router.push('/login');
    },
    toAddress(){
      if(this.userInfo.myAddress.length > 0){
        this.$router.push('/MyAddress')
      }else{
        this.$router.push({
                name:"addaddress",
                params:{
                  title:"添加地址",
                  addressInfo:{
                      name:"",
                      sex:"",
                      phone:"",
                      address:"",
                      bottom:"",
                      tag:""
                  }
                }
            })
      }
    }
  }
};
</script>

<style>
.me{
  height: 100%;
}
.headInfo{
  height: 18%;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  position: relative;
}
.head-img{
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-size: 65px;
  background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
  margin-left:20px;
  margin-right: 15px;
}
.head-profile .user-id{
  max-width: 40vw;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  font-size: 22px;
  color: #fff;
  font-weight: bold;
}
.user-phone{
  margin-top:10px;
}
.user-phone span{
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  margin-left: 3px;
}
.user-phone .fa-mobile{
  color: #fff;
  font-size: 0.78rem;
}
.headInfo .fa-angle-right{
  float: right;
  position: absolute;
  right: 1rem;
  color: #fff;
  font-size: 1.25rem;
}
.useInfo{
  height: 18%;
}
.address-index{
  display: block;
  height: 7vh;
  background-color: #fff;
  margin-bottom: 2.5vh;
  margin-top: 2vh;
}
.address-index span{
  font-size: 1rem;
}
.address-index .fa-angle-right{
  float: right;
  position: absolute;
  right: 1rem;
  color:gray;
  font-size: 1.25rem;
  margin-top: 9px;
}
.fa-map-marker,
.fa-user-o,
.fa-bookmark{
  font-size: 1rem;
  margin:12px 10px 0 20px;
  color: dodgerblue;
}
.shop-index{
  display: block;
  height: 7vh;
  background-color: #fff;
  margin-bottom: 2.5vh;
  margin-top: 2vh;
}
.shop-index span{
  font-size: 1rem;
}
.shop-index .fa-angle-right{
  float: right;
  position: absolute;
  right: 1rem;
  color:gray;
  font-size: 1.25rem;
  margin-top: 9px;
}
.fa-shopping-bag{
  font-size: 1rem;
  margin:12px 10px 0 20px;
  color: #32CD32	;  
}
.serve-index,
.rule-index{
  display: block;
  height: 7vh;
  background-color: #fff;
  border: 0.5px solid #F5F5F5;
  /* margin-bottom: 2.5vh; */
  /* margin-top: 2vh; */
}
.serve-index span,
.rule-index span{
  font-size: 1rem;
}
.serve-index .fa-angle-right,
.rule-index .fa-angle-right{
  float: right;
  position: absolute;
  right: 1rem;
  color:gray;
  font-size: 1.25rem;
  margin-top: 9px;
}
.logOut-btn{
  display: block;
  height: 8vh;
  width: 100%;
  background-color: #fff;
  font-size: 1rem;
  color: red;
  font-weight: 500;
  margin-top: 0.8rem;
}
</style>
