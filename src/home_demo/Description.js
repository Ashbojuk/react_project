import React,{Component} from 'react';
import { render } from '@testing-library/react';

export default class Description extends Component{
    // constructor(props) {
    //     super(props)
    // }
    render(){
        return(
            <div>
                <h2>{this.props.description} </h2>
            </div>
        )
    }
}