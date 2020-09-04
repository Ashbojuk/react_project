import React, { Component } from 'react';
import Price from './Price';
import Name from './Name.js';
import Description from './Description';

class Product extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
       
        return (

            <div>
                <Name name={this.props.name} />
                <Price price={this.props.price} />
                <Description description={this.props.description} />

            </div>
        )
    }
}
export default Product;
