import React, {Component} from 'react';
import Select from 'react-select';

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