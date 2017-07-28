import React, {Component} from 'react';

const _ = require('lodash');

class ValidationMessage extends Component {

    renderValidationMessage = () => {
        if(_.isEmpty(this.props.validationMessage)){
           return null 
        }
        return(
            <span>{this.props.validationMessage}</span>
        )
    }


    render() {
        return(
            <div>
                {this.renderValidationMessage()}
            </div>
        );
    }
}

export default ValidationMessage;