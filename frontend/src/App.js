import './App.css';
import $ from "jquery";
import { Component, createRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignupPage from './pages/register';
import LoginPage from './pages/login';
import data from './fields.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Validate } from './auth/validateauth';
import axios from 'axios';
import Module from './pages/module';
import Logout from './pages/logout';
import 'bootstrap/dist/css/bootstrap.min.css';

window.jQuery = $;
window.$ = $;
const ip = 'http://192.168.0.110:8000/'
require("jquery-ui-sortable");
require("formBuilder");

const options = {
  // controlPosition : 'left',
  controlOrder: [
    'autocomplete',
    'button'
  ]
}
class FormBuilder extends Component {

  state = { showPreview: false }
  fb = createRef();

  componentDidMount() {
    console.log(this.fb);
    const saveFormData = localStorage.getItem('formData');
    console.log("Data: ", saveFormData);
    $('#fb-editor').formBuilder({ ...options, formData: saveFormData });
    console.log("Option is: ", options)
    setTimeout(function () {
      $('.form-builder').find('.form-actions').remove();
      $('.form-builder').find('.formbuilder-icon-autocomplete').remove();
      $('ul').removeAttr('data-content');
    }, 20)
  }

  componentDidUpdate() {
    const formBuilder = $(this.fb.current).data('formBuilder');
    const json = formBuilder.actions.getData('json');
    localStorage.setItem('formData', JSON.stringify(json));
    $('ul').removeAttr('data-content');
  }

  handleButtonClick = (e) => {
    const formBuilder = $(this.fb.current).data('formBuilder');
    const json = formBuilder.actions.getData('json');
    console.log("JSON Data: ", json);
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    // saveAs(blob,'form.json');

    // e.preventDefault();

    try {
      console.log("Entered :)");
      console.log(json);
      axios.post(ip + "examserv/dynamic_table/", {
        "table_name": localStorage.getItem('table'),
        "module": localStorage.getItem('module'),
        "fields": json
      }).then(response => {
        if (response.data.status === 200) {
          console.log("Data Posted");
          $('ul').removeAttr('data-content');
        }
        else {
          console.log("Try again :(");
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  handleUpdate = (e) => {
    const formBuilder = $(this.fb.current).getData('formBuilder');
    const json = formBuilder.actions.getData('json');
    console.log("Entered :)");
    console.log(json);
    try {
      axios.put(ip + "examserv/dynamic_table/", {
        "table_name": localStorage.getItem('table'),
        "module": localStorage.getItem('token'),
        // "id": 1,
        "fields": json
      }).then(response => {
        if (response.data.status === 200) {
          console.log("Data Updated");
        }
        else {
          console.log("Try again :(");
        }
      })
    } catch (e) {
      console.log("Doesn't hit API");
    }
  }

  handleJson = () => {
    const formBuilder = $(this.fb.current).data('formBuilder');
    data.forEach(field => {
      formBuilder.actions.addField(field);
      // console.log(field);
    })
    try {
      axios.get(ip + "examserv/dynamic_table_master/")
        .then(response => {
          var c_field = JSON.parse(response.data);
          c_field.forEach(element => {
            console.log(element.fields.json_data);

          })
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log("Doesn't hit API")
    }
  }

  handlePreviewClick() {
    this.setState((prevState) => ({
      showPreview: !prevState.showPreview,
    }));
  }

  render() {
    const { showPreview } = this.state;
    return (
      <div>
        <div id='fb-editor' ref={this.fb}></div>
        <div className='container'>
          <div className='row'>
            <div>
              <button style={{ marginTop: '10px' }} onClick={this.handleButtonClick}>Submit</button>
            </div>
            <div>
              <button style={{ marginTop: '10px' }} onClick={this.handleJson}>Show</button>
            </div>
            <div>
              <button style={{ marginTop: '10px' }} onClick={this.handleUpdate}>Update</button>
            </div>
            <div>
              <button style={{ marginTop: '10px' }} onClick={this.handlePreviewClick}>{
                showPreview ? 'Hidepreview' : 'Preview'
              }</button>
              <div>
                <Logout />
              </div>
            </div>
          </div>
        </div>
        {showPreview && (
          <div className="container">
            <div className="row">
              <h2>Preview</h2>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function App() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('State');
  useEffect(() => {
    if (localStorage.getItem("State")=== false || localStorage.getItem("State") === null) {
      navigate('/');
    }
  },[navigate])
  return (
    <>
      {
        isLogin ? (
          <div>
            <Routes>
              <Route path='/validate' element={<Validate />}></Route>
              <Route path='/formbuilder' element={<FormBuilder />}></Route>
              <Route path='/module' element={<Module />}></Route>
            </Routes>
          </div>
        ) : (
          <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
              </div>
            </div>
          </div>
        )
      }
      {/* <BrowserRouter>
        <Routes>
          <Route path='/validate' element={<Validate />}></Route>
          <Route path='/formbuilder' element={<FormBuilder />}></Route>
          <Route path='/module' element={<Module />}></Route>
        </Routes>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter> */}
    </>
  )
}
export default App;
