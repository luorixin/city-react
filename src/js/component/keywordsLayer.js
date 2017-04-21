import React,{Component,PropTypes} from 'react'
import {render} from 'react-dom'
import '../../css/keywordsLayer.css'


export class KeywordCon extends Component {
	constructor(props){
		super(props)
		
		this.handleclick = (e) => {
			let keyword = this.textinput.value;
			this.props.addKeyword(keyword);
			this.setState({inputValue:""});
			e.preventDefault();
			e.stopPropagation();
		}
		this.inputClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			if(e.keyCode==13){
				this.props.addKeyword(e.target.value);
				this.setState({inputValue:""});
			}
		}
		this.handlechange = (e) => {
			e.preventDefault();
			this.setState({inputValue:e.target.value});
		}
		this.spanClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			e.target.setAttribute("style","display:none");
			e.target.nextElementSibling.setAttribute("style","display:block");
			e.target.nextElementSibling.focus();
			e.target.nextElementSibling.value = e.target.title;
		}
		this.handleBlur = (e) => {
			e.preventDefault();
			e.stopPropagation();
			let oldValue = e.target.previousElementSibling.title;
			let newValue = e.target.value;
			e.target.setAttribute("style","display:none");
			e.target.previousElementSibling.setAttribute("style","display:block");
			// e.target.previousElementSibling.setAttribute("title",newValue);
			// e.target.previousElementSibling.innerHtml = "&nbsp;"+newValue;
			if(oldValue!=newValue){
				this.props.modifyKeyword(oldValue,newValue);	
			}
		}
		this.state = {
			inputValue : "",
		}
	}
	
	render(){
		let lis = this.props.initList.map((item,index) => {
			return (
				<li key={"li_"+index}>
					<span title={item} onClick={this.spanClick}>&nbsp;{item}</span>
					<input type="text" className="keywords_input" style={{"display":"none"}} defaultValue={item} onBlur={this.handleBlur}/>
					<label className="delete" onClick={(e)=>{e.preventDefault();this.props.delKeyword(item)}}><i className="fa fa-remove"></i></label>
				</li>
			);
		})
		return (
			<div className="parent_layer">
				<ul className="pannel">
					<span>Keywords (<font>{this.props.initList.length}/{this.props.maxSize}</font>) </span>
					<span className="clearAll"><a href="javascript:;" style={{"color":"#333"}} onClick={(e) => {e.preventDefault();this.props.removeAll();}}>Remove All</a></span>
				</ul>
				<div className="keywords_search">
					<input type="text" ref={(input)=>{this.textinput=input}} className="keywords_input" onKeyUp={this.inputClick} value={this.state.inputValue} onChange={this.handlechange} placeholder="Enter keywords" />
					<i className="fa fa-plus-circle" aria-hidden="true" onClick={this.handleclick}></i>
				</div>
				<ul id="1492659928620" className="tree">{lis}</ul>
				<div className="keywords_sub">
					<button type="button" className="btn btn-success" disabled={this.props.initList.length==0} onClick={this.props.suggestKeywords}>
						<i className="fa fa-lightbulb-o" style={{"color": "#fff","left":"10px"}}></i>Get suggestions
					</button>
				</div>
			</div>
		)
	}
}

export class TransferBtn extends Component {
	constructor(props){
		super(props);
		this.handleclick = (e) => {
			e.preventDefault();
			let chooseds = document.getElementsByClassName('choosed');
			let keywords = [];
			for(let value of chooseds){
				keywords.push(value.querySelector("span").title);
			}
			this.props.transferSugget(keywords);
		}
	}
	render(){
		return (
			<div className="button_layer">
				<label><a href="javascript:;" onClick={this.handleclick}><i className="fa fa-angle-left"></i></a></label>
			</div>
		)
	}
}

export class SuggestCon extends Component {
	constructor(props){
		super(props)
	}
	render(){
		let lis = this.props.suggestList.length > 0 ? this.props.suggestList.map((item,index) => {
							return (
								<li key={"suggestli_"+index} className={item.isSelected?"choosed":""}>
									<span title={item.text}  onClick={(e) => {e.preventDefault();this.props.selectSuggest(e.target.title)}}>&nbsp;{item.text}</span>
								</li>
							);
						}) : (<li className="noresult">No result(s)</li>);
		console.log(lis);
		return (
			<div className="child_layer">
				<ul className="pannel">
					<label style={{"display":"block"}}>{this.props.suggestList.length==0 ? "Suggested keywords" : "Move suggested keywords to the left column in order to get volume data"}</label>
				</ul>
				<ul id="1492659929619" className="tree">
					{

						lis
						
					}
				</ul>
			</div>
		)
	}
}
