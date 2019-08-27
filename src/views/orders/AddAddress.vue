<template>
    <div class="addAddress">
        <Header :isLeft="true" :title="title"/>
        <!-- 添加地址 -->
        <div class="viewBody">
            <div class="content">
                <FormBlock label="联系人" placeholder="姓名"
                :tags="sexes" @checkSex="checkSex"
                :sex="addressInfo.sex" 
                v-model="addressInfo.name"/>
    
                <FormBlock label="电话" placeholder="手机号码"
                v-model="addressInfo.phone"/>
                <FormBlock label="地址" 
                placeholder="城市/地区/街道"
                icon="angle-right"
                @click="showSearch=true" 
                v-model="addressInfo.address"/>
                <FormBlock label="门牌号" placeholder="广东财经大学29栋720"
                icon="edit" textarea="textarea"
                v-model="addressInfo.bottom"/>
                <div class="formblock">
                    <div class="label-wrap">标签</div>
                    <TabTag :tags="tags" 
                    :selectTag="addressInfo.tag"
                    @checkTag="checkTag"/>
                </div>
            </div>        
        </div>
        <!-- 搜索地址 -->
        <AddressSearch @close="showSearch=false" 
        :showSearch="showSearch" :addressInfo="addressInfo"/>
        <div class="form-button-wrap">
            <button class="form-button" @click="handleSave">确定</button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Header from '../../components/Header';
import FormBlock from '../../components/orders/FormBlock'
import TabTag from '../../components/orders/TabTag'
import AddressSearch from '../../components/orders/AddressSearch'
import { log } from 'util';
export default {
    name:"addaddress",
    data () {
        return {
            title:"",
            tags:["家","公司","学校"],
            sexes:["先生","女士"],
            addressInfo:{},
            showSearch:false
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.addressInfo = to.params.addressInfo;
            vm.title = to.params.title;
        })
    },
    components:{
        Header,
        FormBlock,
        TabTag,
        AddressSearch
    },
    methods:{
        checkTag(item){
            // console.log(item);
            this.addressInfo.tag = item;
        },
        checkSex(item){
            this.addressInfo.sex = item;
        },
        handleSave(){
            // console.log(this.addressInfo);
            if(!this.addressInfo.name){
                this.showMsg("请输入联系人")
            }
            if(!this.addressInfo.phone){
                this.showMsg("请输入联系电话")
            }
            if(!this.addressInfo.bottom){
                this.showMsg("请输入收货地址")
            }

            //存储数据
            if(this.title == "添加地址"){
                this.addAddress();
            }else{
                this.editAddress();
            }
        },
        addAddress(){
            this.$axios
                .post(`/api/user/add_address/${localStorage.ele_login}`,this.addressInfo)
                    .then(res => {
                        // console.log(res.data); 
                        if(!this.$store.getters.userInfo){
                            this.$store.dispatch("setUserInfo",this.addressInfo);
                        }
                        this.$router.push('myAddress');
                    })
                    .catch(err => {
                        console.log(err);
                    })
        },
        editAddress(){
            this.$axios.post(`/api/user/edit_address/${localStorage.ele_login}
/${this.addressInfo._id}`,this.addressInfo)
                .then(res => {
                    this.$router.push('/myaddress');
                })
                .catch(err => console.log(err)
                )
        },
        showMsg(msg){
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        }
    }
}
</script>

<style scoped>
.addAddress{
    width: 100%;
    padding-top: 2.35rem;
}
.viewbody {
  width: 100%;
  height: 100%;
  /* overflow: auto;s */
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.content {
  /* padding-left: 4vw; */
  background: #fff;
  /* font-size: 0.94rem; */
}
.formblock {
  /* border-top: 0.266667vw solid #eee; */
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  /* height: 2.75rem; */
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  /* padding: 3.733333vw 0; */
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
  font-size: 0.8rem;
  margin:1vw 0 0 5vw;
}
.form-button-wrap{
    display: flex;
    justify-content: center;
}
.form-button{
    width: 94%;
    height: 13vw;
    border-radius: 5%;
    color: #fff;
    background-color: 	#00FF00;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 4vw;
}

</style>