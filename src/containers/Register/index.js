import React, { PureComponent } from 'react';
import './index.css';
import HomeComponent from '../Home/index';

class RegisterComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            nickName: '',
            gender: '',
            birthDate: '',
            picture: '',
            submitted: false
        }

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleUpload = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            this.setState({
                picture: event.target.result
            })
        }
    }


    register = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true
        })
    }


    render() {
        if(this.state.submitted) {
            return (
            <HomeComponent nickName={this.state.nickName} picture={this.state.picture}/>
            )
        }

        else {
            return(
                <center>
                <div>
                    <h2>Register Here</h2>
                    <form onSubmit={this.register}>
                        <table>
                            <tbody>
                        <tr>
                            <td align="left">First Name*</td>
                            <td align="left">
                                <input type="text" name="firstName" onChange={this.handleChange} required/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">Last Name*</td>
                            <td align="left">
                                <input type="text" name="lastName" onChange={this.handleChange} required/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">Nick Name*</td>
                            <td align="left">
                                <input type="text" name="nickName" onChange={this.handleChange} required/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">Gender</td>
                            <td align="left">
                                <input type="radio" name="gender" value="male" onChange={this.handleChange}/> Male
                                <input type="radio" name="gender" value="female" onChange={this.handleChange}/> Female
                                <input type="radio" name="gender" value="other" onChange={this.handleChange}/> Other
                            </td>
                        </tr>
                        <tr>
                            <td align="left">Birthday:</td>
                            <td align="left">
                                <input type="date" name="birthDate" onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">Profile Picture*</td>
                            <td align="left">
                                <input type="file" name="picture" onChange={this.handleUpload} required/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">
                                <input type="submit" value="submit" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
              </div>
            </center>
            )
        }
        
    }
}

export default RegisterComponent;
