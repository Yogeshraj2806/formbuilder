import { Component, createRef } from 'react';
import data from './fields.json';

const options = {
    centralPosition : 'left',
    controlOrder : [
        'autocomplete',
        'button'
    ]
}

class FormBuilder extends Component{
    fb = createRef();

    componentDidMount(){
        $('#fb-editor').formBuilder();
        setTimeout(function(){
            $('form-builder').find('.frmb-control').show();
        })
    }
}

const DynamicField = () => {
    return(

        <div>
            {
                data.map((input,index) => {
                    switch(input.type){
                        case 'textarea':
                            return <textarea key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></textarea>;
                        case 'number':
                            return <input key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }} ></input>
                        case 'radio-group':
                            return <textarea key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></textarea>;
                        case 'date':
                            return <input key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></input>
                        case 'file':
                            return <textarea key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></textarea>;
                        case 'checkbox-group':
                            return <input key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></input>
                       case 'autocomplete':
                            return <input key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></input>
                        case 'paragraph':
                            return <textarea key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></textarea>;
                        case 'radio-group':
                            return <input key={index} className={input.className} name={input.name} style={{ width: '30%',marginTop:'10px', marginBottom: '10px' }}></input>
                    }
                })
            }
        </div>
    )
}

export default DynamicField