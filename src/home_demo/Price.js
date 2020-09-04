import React,{Component} from 'react';


export default class Price extends Component{
    // constructor(props) {
    //     super(props)
    // }
    state={
        price:this.props.price
    }
    handleClick=()=>{
         let {price}=this.state;
        if(price.includes('$')){
            price=parseFloat(price)*487+'֏';
        }
        else if(price.includes('֏')){
            price=parseFloat(price)/487+'$';
        }
        else {
            alert('input $ or ֏ currency');
        }
        
    
    this.setState({
        price:price
    });
}
    render(){
        return(

            <div>
                <h2>{this.state.price} <button onClick={this.handleClick}>
                    Change the currency</button></h2>
            </div>
        )
    }
}
