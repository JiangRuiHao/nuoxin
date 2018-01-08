// 使用 Mock,梳理需求
var Mock = require('mockjs')
var fs = require('fs')
var data = Mock.mock({
  'users': [],
  'carts': [],
  // 首页的banner图数据
  'banner|3-6': [
    {'img': '@image(375x525,@color,@ctitle(3))'}
  ],
  // 蛋糕商品分类数据
  'classifys|6-10': [{
    // 分类id
    'classifys_id|+1': 1,
    // 分类图片
    'imgs': {
      // 小图
      'small': '@image(710x180,@color,@ctitle(3))',
      // 大图
      'big': '@image(640x530,@color,@ctitle(3))'
    },
    // 分类的名称
    'classifys_title': '@ctitle(4)',
    // 每个分类下的商品数据
    'products|5-15': [{
      // 商品id
      'product_id|+1': 1,
      // 图片
      'imgs': {
        // 小图
        'small': '@image(1200x520,@color,@ctitle(3))',
        // 大图
        'big': '@image(282x200,@color,@ctitle(3))',
        // 中图
        'medium': '@image(750x420,@color,@ctitle(3))'
      },
      // 商品名称
      'proName': '@ctitle(5,10)',
      // 商品英文名称(随机的英文人名)
      'proEName': '@name(middle)',
      // 商品详情(介绍)
      'details': '@cparagraph',
      // 商品价格
      'proPrice|99-300.2': 100,
      // 单位ml、g啥的
      'unit|50-500': 100,
      // 品牌-详情页
      'brand': '@ctitle(2,5)',
      // 保质期(年为单位)
      'expiration|0-3.1': 100,
      // 选购一次商品数量
      'proNum': 1,
      // 销售小标签
      'sellName': '@ctitle(2,4)',
      // 该商品的默认生日祝福语
      'blessing': '请填写生日祝福',
      // 该商品控制删除按钮的变量(用于购物车)
      'proDelBol': true,
      // 该商品勾选的变量(用于购物车)
      'selected': true,
      // 每份蛋糕商品该有的
      'thing1': '每份含餐具5套',
      'thing2': '金色蜡烛1根',
      // 控制生日牌显示隐藏的变量
      'wishBol': true,
      // 控制生日牌隐藏时新启用的样式
      'newClass': false,
      // 显示隐藏切成9份的变量
      'cut9Bol': 1,
      // 控制英文名位置变量(主要用于礼品加入购物车显示)
      'giftProENameBol': false
    }]
  }],
  // 精品推荐商品数据
  'BoutiquePro|10-20': [{
    // 图片
    'imgs': {
      // 小图
      'small': '@image(282x200,@color,@ctitle(3))',
      // 大图
      'big': '@image(282x200,@color,@ctitle(3))'
    },
    // 精品商品的名称
    'proName': '@ctitle(2,3)(精品配件)',
    // 选购数量(最少1)
    'proNum': 1,
    // 价格
    'proPrice|5-30.2': 100,
    // 商品英文名称
    'proEName': '',
    // 每份蛋糕商品该有的
    'thing1': '',
    'thing2': '',
    // 控制生日牌显示隐藏的变量
    'wishBol': false,
    // 该商品勾选的变量(用于购物车)
    'selected': true,
    // 商品id
    'product_id|1000-2000': 100,
    // 该商品控制删除按钮的变量(用于购物车)
    'proDelBol': true,
    // 控制生日牌隐藏时新启用的样式
    'newClass': true,
    // 控制英文名位置变量(主要用于礼品加入购物车显示)
    'giftProENameBol': false
  }],
  // 礼品馆数据(礼盒)
  'giftPro|1-10': [{
    // 图片
    'imgs': {
      // 小图
      'small': '@image(1200x520,@color,@ctitle(3))',
      // 大图
      'big': '@image(282x200,@color,@ctitle(3))',
      // 中图
      'medium': '@image(750x420,@color,@ctitle(3))'
    },
    // 礼品名称
    'proName': '@ctitle(3,5)(礼盒)',
    // 商品英文名称
    'proEName': '@name(middle)',
    // 选购数量(最少1)
    'proNum': 1,
    // 价格
    'proPrice|99-299.2': 100,
    // 每份蛋糕商品该有的
    'thing1': '',
    'thing2': '',
    // 控制生日牌显示隐藏的变量
    'wishBol': false,
    // 该商品勾选的变量(用于购物车)
    'selected': true,
    // 商品id
    'product_id|3000-4000': 100,
    // 该商品控制删除按钮的变量(用于购物车)
    'proDelBol': true,
    // 控制生日牌隐藏时新启用的样式
    'newClass': true,
    // 显示隐藏切成9份的变量
    'cut9Bol': 0,
    // 控制英文名位置变量(主要用于礼品加入购物车显示)
    'giftProENameBol': true
  }],
  // 'citys': ['上海', '北京', '广州', '南京', '成都', '重庆', '深圳', '杭州', '苏州', '天津', '宁波', '无锡', '绍兴', '嘉兴']
  'citys': [
    {
      'province': '上海直辖市',
      'city': '上海',
      'county': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区']
    },
    {
      'province': '北京直辖市',
      'city': '北京',
      'county': ['东城区', '西城区', '朝阳区', '海淀区', '石景山区', '丰台区', '顺义区', '怀柔区', '密云县', '延安县', '昌平区', '平谷区', '门头沟区', '房山区', '通州区']
    },
    {
      'province': '广东省',
      'city': '广州',
      'county': ['越秀区', '海珠区', '荔湾区', '天河区', '白云区', '黄浦区', '花都区', '番禺区', '萝岗区', '从化市', '增城市']
    },
    {
      'province': '江西省',
      'city': '南京',
      'county': ['玄武区', '鼓楼区', '秦淮区', '栖霞区', '江宁区', '浦口区', '六合区', '溧水区', '高淳区']
    },
    {
      'province': '四川省',
      'city': '成都',
      'county': ['锦江区', '青羊区', '金牛区', '武侯区', '成华区', '青白江区', '龙泉驿区', '新都区', '温江区']
    },
    {
      'province': '重庆直辖市',
      'city': '重庆',
      'county': ['渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '渝北区', '巴南区', '万州区', '涪陵区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '綦江区', '大足区']
    },
    {
      'province': '广东省',
      'city': '深圳',
      'county': ['罗湖区', '福田区', '南山区', '盐田区', '宝安区', '龙岗区']
    },
    {
      'province': '浙江省',
      'city': '杭州',
      'county': ['西湖区', '上城区', '下城区', '江干区', '拱墅区', '滨江区', '萧山区', '余杭区']
    },
    {
      'province': '江苏省',
      'city': '苏州',
      'county': ['吴中区', '相城区', '姑苏区', '工业园区', '高新区', '吴江区']
    },
    {
      'province': '天津直辖市',
      'city': '天津',
      'county': ['和平区', '河南区', '河东区', '南开区', '红桥区', '河北区', '东丽区', '西青区', '津南区', '北辰区', '塘沽区', '大港区', '汉沽区', '宝坻区', '武清区']
    },
    {
      'province': '浙江省',
      'city': '宁波',
      'county': ['海曙区', '江东区', '江北区', '鄞州区', '镇海区', '北仑区']
    },
    {
      'province': '江苏省',
      'city': '无锡',
      'county': ['无锡市区', '崇安区', '南长区', '北塘区', '滨湖区', '无锡新区', '惠山区', '锡山区', '江阴市', '宜兴市']
    },
    {
      'province': '浙江省',
      'city': '绍兴',
      'county': ['越城区', '柯桥区', '上虞区', '诸暨市', '嵊州市', '新昌县']
    },
    {
      'province': '浙江省',
      'city': '嘉兴',
      'county': ['南湖区', '秀洲区', '海宁市', '平湖区', '桐乡市']
    }
  ],
  'sites': []
})
// 写入到db.json中
fs.writeFile('db.json', JSON.stringify(data, null, 4), function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('数据写入成功~')
})
