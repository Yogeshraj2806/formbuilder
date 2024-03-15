import './App.css';
import $ from "jquery";
import React, { Component, createRef } from 'react';
import data from './fields.json';


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const options = {
    controlPosition : 'left',
    controlOrder : [
      'autocomplete',
      'button'
    ]
  }

  class FormBuilder extends Component{
    
    fb = createRef();

    componentDidMount(){
        console.log("Welcome")
        $('#fb-editor').formBuilder();
        setTimeout(function(){
            $('form-builder').find('.frmb-control').show();
        })
    }
}

export const DynamicForm = () =>{
    
    return(
        <div>
            <h4>Json Response Form </h4>
            {
              data.map((input,index) => {
                  console.log(input.type);
                        switch(input.type){
                            case 'textarea':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid black', width:'30%' }}>
                                        <textarea className={input.className} name={input.name}></textarea>
                                    </div>
                                );
                            case 'number':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid black', width:'30%' }}>
                                        <input type='number' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'date':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid black', width:'30%' }}>
                                        <input type='date' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'file':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid black', width:'30%' }}>
                                        <input type='file' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'checkbox-group':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px',border: '1px solid black', width:'30%'  }}>
                                        <input type='checkbox-group' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'autocomplete':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px',border: '1px solid black', width:'30%' }}>
                                        <input type='autocomplete' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'paragraph':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px',border: '1px solid black', width:'30%' }}>
                                        <input type='paragraph' className={input.className} name={input.name}></input>
                                    </div>
                                );
                            case 'radio-group':
                                return (
                                    <div key={index} style={{ marginTop: '10px', marginBottom: '10px',border: '1px solid black', width:'30%' }}>
                                        <input type='radio-group' className={input.className} name={input.name} ></input>
                                    </div>
                                );
                     }
               })                
            }
        </div>
    )
}
