import React,{Component} from 'react';

export default class Name extends Component{
    // constructor(props) {
    //     super(props)
    // }
    render(){
        return(
        <h2>{this.props.name}</h2>
        )
    }
}