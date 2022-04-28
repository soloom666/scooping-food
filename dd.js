//dd.js => 叮咚买菜
const pay = () =>{
	id("tv_submit").findOne().click()
}

const selectTime = (countT,status) =>{

	//选择送达时间
	id("tv_single_product_time_text").findOne().click()
	var selectedTime=null;
	hourClock_unfilterd=textContains(':00').find()
	hourClock=hourClock_unfilterd.filter(item => item.clickable&&item.checkable&&enabled)
	if(hourClock.length>0){
		selectedTime=hourClock[0]
	}else{
		quarClock_unfilterd=textContains(':15').find()
		quarClock=quarClock_unfilterd.filter(item => item.clickable&&item.checkable&&enabled)
		if(quarClock.length>0){
			selectedTime=quarClock[0]
		}else{
			halfClock_unfilterd=textContains(':30').find()
			halfClock=halfClock_unfilterd.filter(item => item.clickable&&item.checkable&&enabled)
			if(halfClock.length>0){
				selectedTime=halfClock[0]
			}else{
				clock_last_unfilterd=textContains(':45').find()
				clock_last=clock_last_unfilterd.filter(item => item.clickable&&item.checkable&&enabled)
				if(clock_last.length>0){
					selectedTime=clock_last[0]
				}
			}
		}
	}
	if(selectedTime!=null){
		sleep(60)
		selectedTime.parent().click()
		sleep(200)
		status=true
		pay()
	}else{
		countT=countT+1;
		if(countT>18000){
			toast('抢菜选择时间失败')
			exit;
		}
		sleep(100)
		selectTime(countT,false)

	}
}

const check = (d) => {
	var a=text(d).findOne().bounds();
	var b=a.centerX();
	var c=a.centerY();
	click(b,c)
}

const submit_order = (count) => {
	toast('抢菜第'+count+'次尝试')

		//id("bottom_right_button_ll").findOne().click() //结算按钮点击
		check("全选")
		id("vg_car").findOne().children().forEach(child => {
			var target = child.findOne(id("btn_submit"));
			target.click();
			});

		sleep(800)

		if(textStartsWith('我知道了').exists()){
			toast('配送运力已约满')
			textStartsWith('我知道了').findOne().parent().click()
		}else if(textStartsWith('全选').exists()){
			sleep(100)
			count=count+1;
			if(count>18000){
				toast('抢菜失败')
				exit;
			}
			submit_order(count)
		}else if (textStartsWith('返回购物车').exists()) {
			toast('前方拥堵')
			textStartsWith('返回购物车').findOne().parent().click()
		}else{
			if(textStartsWith('放弃机会').exists()){
				toast('跳过加购')
				textStartsWith('放弃机会').findOne().parent().click()
			}


			selectTime(0,false)
		}
}

const start = () => {

	const appName = "叮咚买菜";
	launchApp(appName);
	sleep(20);  
	auto.waitFor()
	submit_order(0)
}
start()
