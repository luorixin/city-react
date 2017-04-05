import * as constants from '../constants/actionType'
import { combineReducers } from 'redux'

export const getChinaData = state => {
  return state.data.china;
}
export const getForeginData = state => {
  return state.data.foreign;
}
export const getSelectedNumbers = state => {
  let countryNum = state.data.foreign.selectIds.length ;
  let cityNum = state.data.china.selectIds.length ;
  return {
    cityNum : cityNum,
    countryNum : countryNum
  }
}
export const getActiveTab = state => {
  return {
    china : state.data.china.isActived,
    foreign : state.data.foreign.isActived,
  } 
}
/*state data tree
  {
    "china": {
      byCityId : [{
        "city_id": "1003474",
        "city_level": "3",
        "city_name": "Changzhi",
        "city_name_cn": "长治",
        "province_id" : 1003334,
        "tier_id": 1156000023,
        "isChecked" : false,
      }],
      cityIds:[],
      byTierId:[{
        "tier_id": 1156000023,
        "tier_name_en_us": "Third-tier City",
        "tier_name_zh_cn": "三线城市",
        "isChecked" : false,
      }]
      tierIds:[],
      byProvinceId : [{
        "province_id": "1003334",
        "province_name": "Beijing",
        "province_name_cn": "北京",
        "region_id" : 1156000011,
        "isChecked" : false,
      }],
      provinceIds : [],
      byRegionId : [
        {
          "region": "huabei",
          "region_cn": "华北地区",
          "region_id": 1156000011,
          "isChecked" : false,
        }
      ],
      regionIds : [],
      selectIds:[],
      isSelected:false,
      isActived:true

    },
    "foreign":{
      byCountryId : [{
        
      }],
      countryIds : [],
      byContinentId : [{

      }],
      continentIds : [],
      selectIds:[],
      isSelected:false,
      isActived:false,
    },
    searchList:[]

  }

*/
const convertStateTree = json => {
  let chinaJson = {
      byCityId : [],
      cityIds:[],
      byTierId:[],
      tierIds:[],
      byProvinceId : [],
      provinceIds : [],
      byRegionId : [],
      regionIds : [],
      selectIds:[],
      isSelected:false,
      isActived:true,
    }
  let foreignJson = {
      byCountryId : [],
      countryIds : [],
      byContinentId : [],
      continentIds : [],
      selectIds:[],
      isSelected:false,
      isActived:false,
    }
  let regionIdsSet = new Set();
  let provinceIdsSet = new Set();
  let tierIdsSet = new Set();
  for (let value of json.china) {
    regionIdsSet.add(value.region_id);
    provinceIdsSet.add(value.province_id);
    chinaJson.byRegionId.push({
      "region": value.region,
      "region_cn": value.region_cn,
      "region_id": value.region_id,
      "isChecked" : false,
    })
    chinaJson.byProvinceId.push({
      "province_id": value.province_id,
      "province_name": value.province_name,
      "province_name_cn": value.province_name_cn,
      "region_id" : value.region_id,
      "isChecked" : false,
    })

    for(let ct of value.cities){
      chinaJson.cityIds.push(ct.city_id);
      tierIdsSet.add(ct.tier_id);
      chinaJson.byCityId.push({
        "city_id": ct.city_id,
        "city_level": ct.city_level,
        "city_name": ct.city_name,
        "city_name_cn": ct.city_name_cn,
        "province_id" : value.province_id,
        "tier_id": ct.tier_id,
        "isChecked" : false,
      })
      chinaJson.byTierId.push({
        "tier_id": ct.tier_id,
        "tier_name_en_us": ct.tier_name_en_us,
        "tier_name_zh_cn": ct.tier_name_zh_cn,
        "isChecked" : false,
      })
    }
  }
  //去重
  chinaJson.regionIds = Array.from(regionIdsSet).sort(function(a,b){
    return a>b;
  });
  chinaJson.provinceIds = Array.from(provinceIdsSet).sort(function(a,b){
    return a>b;
  });
  chinaJson.tierIds = Array.from(tierIdsSet).sort(function(a,b){
    return a>b;
  });
  //国外
  let continentIdsSet = new Set();
  for(let value of json.foreign){
    continentIdsSet.add(value.continent_id);
    foreignJson.byContinentId.push({
      "continent_id" : value.continent_id,
      "continent_name" : value.continent_name,
      "continent_name_cn" : value.continent_name_cn,
      "isChecked" : false,
    });
    foreignJson.countryIds.push(value.foreign_id);
    foreignJson.byCountryId.push({
      "foreign_id": value.foreign_id,
      "foreign_name": value.foreign_name,
      "foreign_name_cn": value.foreign_name_cn,
      "continent_id" : value.continent_id,
      "isChecked" : false,
    })
  }
  foreignJson.continentIds = Array.from(continentIdsSet).sort(function (a,b) {
    return a>b;
  })
  return {"china":chinaJson,"foreign":foreignJson,"searchList":[]};
}

const checkRegion = (state,id) => {
  let isChecked = false;
  for(let value of state.data.china.byRegionId){
    if (value.region_id == id) {
      value.isChecked = !value.isChecked;
      isChecked = value.isChecked;
    };
  }
  //对应城市
  relateCity(state,null,null,id,isChecked);
  relateCheck(state)
  return state;
}

const checkProvince = (state,id) => {
  let isChecked = false;
  for(let value of state.data.china.byProvinceId){
    if (value.province_id == id) {
      value.isChecked = !value.isChecked;
      isChecked = value.isChecked;
    };
  }
  //对应城市
  relateCity(state,null,id,null,isChecked);
  relateCheck(state)
  return state;
}

const checkTier = (state,id) => {
  let isChecked = false;
  for(let value of state.data.china.byTierId){
    if (value.tier_id == id) {
      value.isChecked = !value.isChecked;
      isChecked = value.isChecked;
    };
  }
  //对应城市
  relateCity(state,id,null,null,isChecked);
  //关联
  relateCheck(state)
  return state;
}

const checkCity = (state,id) => {
  for(let value of state.data.china.byCityId){
    if (value.city_id == id) {
      value.isChecked = !value.isChecked;
    };
  }
  relateCheck(state)
  return state;
}

//对应城市上级被点击，其所属的所有城市都应该和上级的状态一样
const relateCity = (state,tierId,provinceId,regionId,isChecked) => {
  let provinceIds = new Array();
  if (regionId) {
    for(let value of state.data.china.byProvinceId){
      if (value.region_id == regionId) {
        value.isChecked = isChecked;
        provinceIds.push(value.province_id);
      };
    }
  };
  for(let value of state.data.china.byCityId){
    if (tierId && value.tier_id == tierId) {
      value.isChecked = isChecked;
    }
    if (provinceId && value.province_id == provinceId) {
      value.isChecked = isChecked;
    };
    if (provinceIds.length>0) {
      if(provinceIds.includes(value.province_id)){
        value.isChecked = isChecked;
      }
      // for(let pid of provinceIds){
      //   if (value.province_id == pid) {
      //     value.isChecked = isChecked;
      //   };
      // }
    };
  }
}

//根据选中城市判断对应的等级，省份，区域是否选中
const relateCheck = (state) => {
  let check_false_province=new Set(),check_false_tier=new Set(),check_false_region=new Set();
  state.data.china.selectIds = [];
  state.data.china.isSelected = true;
  for(let value of state.data.china.byCityId){
    if(!value.isChecked){
        check_false_province.add(value.province_id);
        check_false_tier.add(value.tier_id);
        state.data.china.isSelected = false;
    }else{
      state.data.china.selectIds.push(value.city_id);
    }
  }
  //关于tier的选中
  for(let value of state.data.china.byTierId){
    if (check_false_tier.has(value.tier_id)) {
      value.isChecked = false;
    }else{
      value.isChecked = true;
    }
  }
  //关于province选中
  for(let value of state.data.china.byProvinceId){
    if (check_false_province.has(value.province_id)) {
      value.isChecked = false;
      check_false_region.add(value.region_id);
    }else{
      value.isChecked = true;
    }
  }
  //关于region选中
  for(let value of state.data.china.byRegionId){
    if (check_false_region.has(value.region_id)) {
      value.isChecked = false;
    }else{
      value.isChecked = true;
    }
  }
  return state;
}

const checkCountry = (state,id,isChecked) => {
  if (id=="china") {
    state.data.china.selectIds = [];
    state.data.china.isSelected = isChecked;
    for(let value of state.data.china.byCityId){
      value.isChecked = isChecked;
      if (isChecked) {
        state.data.china.selectIds.push(value.city_id);
      };
    }
    for(let value of state.data.china.byTierId){
      value.isChecked = isChecked;
    }
    for(let value of state.data.china.byProvinceId){
      value.isChecked = isChecked;
    }
    for(let value of state.data.china.byRegionId){
      value.isChecked = isChecked;
    }
  };
  if (id == "foreign") {
    state.data.foreign.selectIds = [];
    state.data.foreign.isSelected = isChecked;
    for(let value of state.data.foreign.byContinentId){
      value.isChecked = isChecked;
    }
    for(let value of state.data.foreign.byCountryId){
      value.isChecked = isChecked;
      if (isChecked) {
        state.data.foreign.selectIds.push(value.foreign_id);
      }
    }
  };
  return state;
}

const checkTool = (state,type) => {
  if (type==-1) {
    if (state.data.china.isActived) {
       state.data.china.selectIds = [];
      for(let value of state.data.china.byCityId){
        value.isChecked = !value.isChecked;
        if (value.isChecked) {
          state.data.china.selectIds.push(value.city_id);
        };
      }
      relateCheck(state);
    };
    if (state.data.foreign.isActived) {
      state.data.foreign.selectIds = [];
      for(let value of state.data.foreign.byCountryId){
        value.isChecked = !value.isChecked;
        if (value.isChecked) {
          state.data.foreign.selectIds.push(value.foreign_id);
        };
      }
      relateCheck_foreign(state);
    };
  }else{
    if (state.data.china.isActived) {
      checkCountry(state,"china",false);
    }
    if (state.data.foreign.isActived) {
      checkCountry(state,"foreign",false);
    };
  }
  return state;
}

const checkContient = (state,id) => {
  let isChecked = false;
  for(let value of state.data.foreign.byContinentId){
    if (value.continent_id == id) {
      value.isChecked = !value.isChecked
      isChecked = value.isChecked;
    };
  }
  relateCountries(state,id,isChecked);
  relateCheck_foreign(state);
  return state;
}

const relateCountries = (state,id,isChecked) => {
  for(let value of state.data.foreign.byCountryId){
    if (id == value.continent_id) {
      value.isChecked = isChecked;
    };
  }
}

const checkForeign = (state,id) => {
  for(let value of state.data.foreign.byCountryId){
    if (value.foreign_id == id) {
      value.isChecked = !value.isChecked;
    };
  }
  relateCheck_foreign(state);
  return state;
}

const relateCheck_foreign = state => {
  let continentIdsSet = new Set();
  state.data.foreign.selectIds = [];
  state.data.foreign.isSelected = true;
  for(let value of state.data.foreign.byCountryId){
    if (!value.isChecked) {
      continentIdsSet.add(value.continent_id);
      state.data.foreign.isSelected = false;
    }else{
      state.data.foreign.selectIds.push(value.city_id);
    }
  }
  
  for(let value of state.data.foreign.byContinentId){
    value.isChecked = !continentIdsSet.has(value.continent_id);
  }
}

const removeFromArray = (array,value) => {
  let index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

const getSearch = (state,searchValue) => {
  state.data.searchList = [];
  if (searchValue=="") return state;
  //中国城市
  for(let value of state.data.china.byCityId){
    let reg = value.city_name.toLowerCase() + "|\\|" + value.city_name + "|\\|" + value.city_name_cn + "|\\|" + value.city_id;
    if (reg.indexOf(searchValue)>-1) {
      state.data.searchList.push(value.city_id);
    };
  }
  //中国省份
  for(let value of state.data.china.byProvinceId){
    let reg = value.province_name.toLowerCase() + "|\\|" + value.province_name + "|\\|" + value.province_name_cn + "|\\|" + value.province_id;
    if (reg.indexOf(searchValue)>-1) {
      state.data.searchList.push(value.province_id);
    };
  }
  //外国国家
  for(let value of state.data.foreign.byCountryId){
    let reg = value.foreign_name_cn.toLowerCase() + "|\\|" + value.foreign_name + "|\\|" + value.foreign_name_cn + "|\\|" + value.foreign_id;
    if (reg.indexOf(searchValue)>-1) {
      state.data.searchList.push(value.foreign_id);
    };
  }
  return state;
}

const setActiveTab = (state,value) => {
  if (value == "china") {
    state.data.china.isActived = true; 
    state.data.foreign.isActived = false; 
  }else{
    state.data.china.isActived = false; 
    state.data.foreign.isActived = true; 
  }
  return state;
}
const datas = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_DATA_START:
      return {
        isLoading : false
      }
    case constants.GET_DATA_SUCCESS:
      return Object.assign({},state,{isLoading:true,url:action.url,data:convertStateTree(action.json)});
    case constants.CHECK_CITY:
      return Object.assign({},checkCity(state,action.id));
    case constants.CHECK_REGION:
      return Object.assign({},checkRegion(state,action.id));
    case constants.CHECK_TIER:
      return Object.assign({},checkTier(state,action.id));
    case constants.CHECK_PROVINCE:
      return Object.assign({},checkProvince(state,action.id));
    case constants.CHECK_COUNTRY:
      return Object.assign({},checkCountry(state,action.id,action.isChecked));
    case constants.CHECK_TOOL:
      return Object.assign({},checkTool(state,action.tp));
    case constants.CHECK_CONTIENT:
      return Object.assign({},checkContient(state,action.id));
    case constants.CHECK_FOREIGN:
      return Object.assign({},checkForeign(state,action.id));
    case constants.GET_SEARCH:
      return Object.assign({},getSearch(state,action.value));
    case constants.GET_ACTIVE:
      return Object.assign({},setActiveTab(state,action.value));
    default:
      return state
  }
}
// const city = combineReducers(
//   byId
// )
export default datas;