var vm=new Vue({
       el: "#app",
	    data: {
                site:'',
                list:[],
                site:[]
            },
            created() {
                this.init()
            },
	    methods: {
		init(){
		    var map = new BMap.Map("allmap");
                    var point = new BMap.Point(116.331398, 39.897445);
                    map.centerAndZoom(point, 12);
                    var geolocation = new BMap.Geolocation();
                    // 开启SDK辅助定位
                    geolocation.enableSDKLocation();
		      geolocation.getCurrentPosition(function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                            // this.site=r.address.city;
                            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                            var point = new BMap.Point(r.point.lng, r.point.lat);
                            var gc = new BMap.Geocoder();
                            gc.getLocation(point, function (rs) {
                                // var addComp = rs.addressComponents;
                                //console.log(rs.address);//地址信息
                                console.log(rs);
                                let name=rs.addressComponents.district;
                                // actual_address = rs.address;
                                let list=gy_public_county;
                                for(let i=0;i<list.length;i++){
                                    if(list[i].areaName === name){
                                        console.log(list[i]);
                                        let token=common.getCookie('GToken');
                                        common.ajax('/communityList/findCommunityList?isAjaxRequest=1',{
                                            token:token,
                                            areaCode:list[i].areaCode
                                        },function(res){
                                            if(res.code===200){
                                                console.log(res)
                                                vm.site=res.data
                                            }
                                        })
                                    }
                                }
                            });
                        } 
                    });
		},
	back(){
		window.location.href = "../hscm-web-user-h5/index.html"
	}
},
				
			})
