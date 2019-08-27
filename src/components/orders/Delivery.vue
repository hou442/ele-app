<template>
    <section class="checkout-section">
        <div class="delivery">
            <div class="delivery-left">
                <span class="delivery-time">送达时间</span>
                <div v-if="shopInfo.delivery_mode.text" class="delivery-extra">
                    <span>{{shopInfo.delivery_mode.text}}</span>
                </div>
            </div>
            <div class="delivery-right">
                <span class="delivery-select">尽快送达({{deliveryTime(shopInfo.order_lead_time)}})</span>
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
        <div class="cart-item">
            <div class="cart-item-title">支付方式</div>
            <div class="pay-text">在线方式</div>
        </div>
    </section>
</template>

<script>
export default {
    name:"delivery",
    props:{
        shopInfo:Object
    },
    methods:{
        deliveryTime(time){
            let date = new Date();
            date.setMinutes(date.getMinutes() + time);
            return date.getHours() + ":" + date.getMinutes();
        }
    }
}
</script>

<style scoped>
.checkout-section{
    background-color: red;
}
.delivery{
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.8rem;
}
.delivery .delivery-time{
    font-size:1rem;
    font-weight: 700;
}
.delivery .delivery-extra{
    background-color: dodgerblue;
    padding: 1px;
    color: #fff;
    text-align: center;
    margin-top: 0.3rem;
    font-size: 0.8rem;
    font-weight: 500;
    width: 3.4rem;
}
.delivery-right .delivery-select{
    color: dodgerblue;
    font-weight: 500;
}
.delivery-right .fa-angle-right{
    color: gray;
    margin-left: 0.4rem;
}
.cart-item{
    display: flex;
    justify-content: space-between;
    height: 3rem;
    align-items: center;
}
.cart-item-title{
    font-size:1rem;
    font-weight: 700;
}
.cart-item .pay-text{
    color: dodgerblue;
    font-weight: 500;

}

</style>