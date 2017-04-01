import React , { Component,PropTypes } from "react"
import { render } from 'react-dom'

class City extends Component{
	constructor(props){
		console.log(props)
		super(props);
	}
	render(){
		return (
			<div className="location-box">
				<div className="header border-bottom clearfix">
					<div className="fl">You Have Selected 
					<span className="sum-count sel-city-num">{this.props.selectedNum.cityNum}</span> City(ies) ; 
					<span className="sum-count sel-country-num">{this.props.selectedNum.countryNum}</span> Country(ies) 
					</div>
					<CitySearch {...this.props}/>
				</div>
				<div className="tabbox border-bottom clearfix">
					<div className="fl tab active">
						<label htmlFor="_china"><input type="checkbox" id="_china" title="China" onChange={(e) => this.props.clickCountryCheck('china',e.target.checked)} checked={this.props.china.isSelected}/>China</label>
					</div>
					<div className="fl tab">
						<label htmlFor="_overseas"><input type="checkbox" id="_overseas" title="Overseas" onChange={(e) => this.props.clickCountryCheck('foregin',e.target.checked)} checked={this.props.foregin.isSelected}/>Overseas</label>
					</div>
					<div className="fr">
						<span className="loc-btn" id="invert-btn" onClick={() => this.props.clickToolCheck(-1)}>Invert</span>
						<span className="loc-btn" id="clear-btn" onClick={() => this.props.clickToolCheck(false)}>Clear</span>
					</div>
				</div>
				<div className="toggle-box act">
					<Tier tierIds = {this.props.china.tierIds} byTierId={this.props.china.byTierId} clickTierCheck={this.props.clickTierCheck}/>
					<Regions {...this.props}/>
				</div>
			</div>
		)
	}
}
//搜索
class CitySearch extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow:"none"
		}
		this.handleChange = (event) => {  // input值改变的时候进行判断赋值  
            let newValue = event.target.value;	
            let isShow = "none";
            if (newValue!=="") {
        		this.props.getSearchList(newValue);
        		isShow = "block";
            };
            this.setState({
        		isShow:isShow
        	})
        }
        this.handleClick = (e) => {
        	let value = e.target.value;
        	let isShow = "none";
            if (value!=="") {
        		this.props.getSearchList(value);
        		isShow = "block";
            };
            this.setState({
        		isShow:isShow
        	})
        }
        this.itemClick = (e) => {
        	let ids = e.target.id.split("_itemid");
        	this.setState({
        		isShow:"none"
        	})
        	let notice = document.getElementsByClassName("notice-color")
        	for(let value of notice){
				value.className = "";
			}
			for(let id of ids){
				if (id!=""){
        			document.getElementById(id).parentNode.className = "notice-color";
        		}
			}
        }
	}

	render(){
		return (
			<div className="fr search-box">
				<i className="fa fa-search"></i>
				<input type="text" id="location_search" placeholder="Search"  onChange={this.handleChange} onClick={this.handleClick}/>
				<div className="result-list" style={{display:this.state.isShow}}>
					<ul>
						{
					 		this.props.searchList.map((item,index) => {
					 			let thisValue = {};
					 			for(let value of this.props.china.byCityId){
						 			if(value.city_id === item){
						 				thisValue.name_cn = value.city_name_cn;
						 				thisValue.id = value.city_id;
						 				thisValue.provinceId = value.province_id;
						 				break;
						 			}
						 		}
						 		for(let value of this.props.china.byProvinceId){
						 			if(value.province_id === item){
						 				thisValue.name_cn = value.province_name_cn;
						 				thisValue.id = value.province_id;
						 				thisValue.provinceId = value.province_id;
						 				break;
						 			}
						 		}
						 		if (!thisValue.hasOwnProperty("id")) return "";
					 			return (<li className="result-item" key={"_item_key_"+thisValue.id} id={"_itemid"+thisValue.id +"_itemid"+thisValue.provinceId} title={thisValue.name_cn} onClick={this.itemClick}>{thisValue.name_cn}</li>)
					 		})
						}
					</ul>
				</div>
			</div>
		)
	}
}
//tier
class Tier extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return( 
			<div className="border-bottom loc-type-header loction-row clearfix">
			{
			 	this.props.tierIds.map((item, index) => {
			 		let thisValue = {};
			 		for(let value of this.props.byTierId){
			 			if(value.tier_id === item){
			 				thisValue = value;
			 				break;
			 			}
			 		}
	            	return (
	            		<div key={'tier_key_'+index} className="fl col-width row-title">
	            			<label htmlFor={"_tier"+thisValue.tier_id}><input type="checkbox" checked={thisValue.isChecked} onChange={() => this.props.clickTierCheck(thisValue.tier_id)}  id={"_tier"+thisValue.tier_id} title={thisValue.tier_name_en_us}/>{thisValue.tier_name_en_us}</label>
	            		</div>
	            	)
	        	})
			}
			</div>
		)
	}
}
//Regions
class Regions extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return( 
			<div>
			{
			 	this.props.china.regionIds.map((item, index) => {
			 		let thisValue = {};
			 		let trClass = index%2===0?"odd":""
			 		for(let value of this.props.china.byRegionId){
			 			if(value.region_id === item){
			 				thisValue = value;
			 				break;
			 			}
			 		}
	            	return (
	            		<div key={"region_key_"+index} className={"border-bottom loction-row com-row clearfix "+trClass}>
		            		<div className="row-type row-header fl col-width">
		            			<label htmlFor={thisValue.region_id}><input type="checkbox" checked={thisValue.isChecked} onChange={()=>this.props.clickRegionCheck(thisValue.region_id)}  id={thisValue.region_id} title={thisValue.region_cn}/>{thisValue.region_cn}</label>
		            		</div>
		            		<Province region_id={thisValue.region_id} {...this.props}/>
		            	</div>
	            	)
	        	})
			}
			</div>
		)
	}
}
class Province extends Component{
	constructor(props){
		super(props)
		this.onMouseOver = (event) => {
			if(event.target.className.indexOf("row-item col-width")>-1){
				let $hover = document.getElementsByClassName('hover');
				for(let value of $hover){
					value.className = "row-item col-width";
				}
			}
			if(event.target.className=="row-item col-width"){
				event.target.className = "row-item col-width hover";
			}
		}
		this.onMouseLeave = (event) => {
			if(event.target.className=="row-item col-width hover"){
				event.target.className = "row-item col-width";
			}
		}
	}
	render(){
		return( 
			<div className="row-item-box row-children fl clearfix">
			{
				this.props.china.byProvinceId.map((thisValue, index) => {
		 			if(this.props.region_id === thisValue.region_id){
		 				let size = 0,isshow="none",selectedNum=0;
	            		for(let v of this.props.china.byCityId){
			 				if(thisValue.province_id === v.province_id){
			 					size++;
			 					if (this.props.china.selectIds.includes(v.city_id)) {
			 						selectedNum++;
			 					};
			 				}
			 			}
			 			
			 			if (selectedNum>0 && selectedNum!=size) {
			 				isshow = "block";
			 			};
			 			if (size>1) {
			            	return(	
				            		<div key={"province_key_"+index} className="row-item col-width" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
				            			<label htmlFor={thisValue.province_id}><input type="checkbox" checked={thisValue.isChecked} onChange={()=>this.props.clickProvinceCheck(thisValue.province_id)} id={thisValue.province_id} title={thisValue.province_name_cn}/>{thisValue.province_name_cn}</label>
				            			<span className="city-num" style={{display:isshow}}>{selectedNum}/{size}</span>
				            			<Citytown province_id={thisValue.province_id} {...this.props}/>
					            	</div>
					        )  
			 			}else{
			 				return(	
				            		<div key={"province_key_"+index} className="row-item col-width citypro" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
				            			<label htmlFor={thisValue.province_id}><input type="checkbox" checked={thisValue.isChecked} onChange={()=>this.props.clickProvinceCheck(thisValue.province_id)} id={thisValue.province_id} title={thisValue.province_name_cn}/>{thisValue.province_name_cn}</label>
					            	</div>
					        ) 
			 			}
		            	
			        }
	            })
			}
			</div>
		)
	}
}
class Citytown extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return( 
			<div className="city-box" style={{display:'none'}}>
				<div className="top-white" style={{height:'35px'}}></div>
				<div className="item-box">
				{
					this.props.china.byCityId.map((thisValue, index) => {
			 			if(this.props.province_id === thisValue.province_id){
			            	return (
			            		<div key={"citytown_key_"+index} className="city-item">
			            			<label htmlFor={thisValue.city_id} ><input type="checkbox" checked={thisValue.isChecked} onChange={()=>this.props.clickCityCheck(thisValue.city_id)}  id={thisValue.city_id} title={thisValue.city_name_cn}/>{thisValue.city_name_cn}</label>
				            	</div>
			            	)
				        }
		            })
				}
				</div>
			</div>
		)
	}
}
export default City;
