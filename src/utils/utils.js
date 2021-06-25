export default {
	/**
	 * 坐标转换，百度地图坐标转换成腾讯地图坐标
	 * lng 腾讯经度（pointy）
	 * lat 腾讯纬度（pointx）
	 * 经度>纬度
	 */
	bMapToQQMap(lng, lat) {
		
		
		var pi = 3.14159265358979324 * 3000.0 / 180.0;
		var x = lng - 0.0065;
		var y = lat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
		lng = z * Math.cos(theta);
		lat = z * Math.sin(theta);

		return [lng, lat];

	},
	/**
	 * 坐标转换，腾讯地图转换成百度地图坐标
	 * lng 腾讯经度（pointy）
	 * lat 腾讯纬度（pointx）
	 * 经度>纬度
	 */
	qqMapToBMap(lng, lat) {

		if (lng == null || lng == '' || lat == null || lat == '')
			return [lng, lat];

		var x_pi = 3.14159265358979324;
		var x = parseFloat(lng);
		var y = parseFloat(lat);
		var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
		var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
		var lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
		var lat = (z * Math.sin(theta) + 0.006).toFixed(5);
		return [lng, lat];

	}
}
