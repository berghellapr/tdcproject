import React, {Component} from 'react'
import Select from 'react-select'

const gradeMappings = {
    1: '5th A',
    2: '5th B'
  }

class App extends Component {

    constructor(){
        super()
        this.state = {
            name:'',
            last_name:'',
            DNI_student :'',
            file_number:'',
            phone_number:'',
            address: {
                street:'',
                number:'',
                zip_code:'',
            },
            grade:'',
            students: [],
            _id: '',
            selectedGrade: null, //inicialmente no hay nada, despues guarda lo seleccionado en el dropdown
            gradeOptions: [
                {value: '5th A', label: '5th A'},
                {value: '5th B', label: '5th B'}
            ],
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.addStudent = this.addStudent.bind(this)
    }
    
addStudent(e){
    e.preventDefault()

    const {
        name, last_name, DNI_student, file_number, phone_number, address:{street, number, zip_code}, grade
        } = this.state

    let errors = {}
    if(!name) {
        errors.name="Name is required"
    }

    if(!last_name){
        errors.last_name="Last Name is required"
    }

    if(!DNI_student){
        errors.DNI_student="DNI Student is required"
    }

    if(!file_number){
        errors.file_number="File number is required"
    }

    if(!phone_number){
        errors.phone_number="Phone number is required"
    }

    if(!street){
        errors.street="Street is required"
    }

    if(!number){
        errors.number="Number is required"
    }

    if(!zip_code){
        errors.zip_code="Zip Code is required"
    }

    if(!grade){
        errors.grade="Grade must be selected"
    }

    if(Object.keys(errors).length>0){
        this.setState({errors})
        return
    }

    if(this.state._id){
        fetch(`/api/students/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            M.toast({html:'Student updated!'})
            this.setState({
                name:'',
                last_name:'',
                DNI_student :'',
                file_number:'',
                phone_number:'',
                address: {
                    street:'',
                    number:'',
                    zip_code:'',
                },
                grade:'',
                students: [],
                _id: ''
            })
            this.fetchStudents()
        })

    } else {
        const requestBody = {
            name: this.state.name,
            last_name: this.state.last_name,
            DNI_student : this.state.DNI_student ,
            file_number: this.state.file_number,
            phone_number: this.state.phone_number,
            address: 
                {
                street: this.state.address.street,
                number: this.state.address.number,
                zip_code: this.state.address.zip_code
                },
                grade: this.state.grade //uso el valor numerico
        }
        fetch('/api/students', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html: 'Student Saved'})
                this.setState({
                    name:'',
                    last_name:'',
                    DNI_student :'',
                    file_number:'',
                    phone_number:'',
                    address: 
                    {
                        street:'',
                        number:'',
                        zip_code:'',
                    },
                    grade:''
                })
                this.fetchStudents()
            })
        .catch(err=>console.error(err))
    }
}

//para que apenas se monte la app, haga esto
componentDidMount(){
    this.fetchStudents()
}

fetchStudents(){
    fetch('/api/students')
        .then(res=>res.json())
        .then(data=>{
            this.setState({students: data})
            console.log(this.state.students)
        })
}

editStudent(_id){
    fetch(`/api/students/${_id}`)
        .then(res=>res.json())
        .then(data=>{console.log(data)
            this.setState({
                name: data.name,
                last_name: data.last_name,
                DNI_student : data.DNI_student ,
                file_number: data.file_number,
                phone_number: data.phone_number,
                address: 
                    {
                    street: data.address.street,
                    number: data.address.number,
                    zip_code: data.address.zip_code
                    },
                    grade: data.grade,
                _id: data._id
            })
        })
}

deleteStudent(_id){
    if(confirm('Are you sure you want to delete this student?')){
        fetch(`/api/students/${_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            M.toast({html: 'Student Deleted!'})
            this.fetchStudents()
        })
    }
}

handleChange(e){
    const {name,value} = e.target
    
    if(name==="street" || name==="number" || name==="zip_code"){
        this.setState(prevState=>({
            ...prevState,
            address: {
                ...prevState.address,
                [name]:value
            }
        }))
    } else {
        this.setState({
            [name]:value
        })
    }

    if(name==="zip_code"){
        if(value.length>5 || !/^(?:\w{1}\d{4}|\d{4})$/.test(value)){
            this.setState(prevState=>({
                errors:{
                    ...prevState.errors,
                    zip_code: "Please enter a valid Zip Code in the format 'B1665' or '1665' with a maximum of 5 characters."
                }
            }))
        } else {
            this.setState(prevState=>({
                errors:{
                    ...prevState.errors,
                    zip_code:""
                }
            }))
        }
    }
}

handleGradeChange = (selectedOption) => {
    if (selectedOption){
        const gradeValue = selectedOption.value === '5th A'? 1: 2 //asigno un nro segun la opc
        this.setState({selectedGrade: selectedOption, grade:gradeValue})
    } else {
        this.setState({selectedGrade: null, grade:''})
    }
  }  

    render(){
        const {errors} = this.state
        return(
            <div>
                {/* Navigation */}
                <nav className="cyan darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">
                        School Attendance Management System
                        </a>
                    </div>
                </nav>

                <nav className="red lighten-2">
                    <div class="nav-wrapper">
                    <div class="col s12">
                    <div class="center-align">
                        <a href="http://localhost:3000/" class="breadcrumb">Home</a>
                        <a href="http://localhost:3000/" class="breadcrumb">Users Registration</a>
                        <a href="http://localhost:3000/" class="breadcrumb">Students</a>
                    </div>
                    </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addStudent}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="name" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="Student Name"
                                            value={this.state.name}
                                            pattern="[A-Za-z]+"
                                            maxLength={15}
                                            required
                                            />
                                            <small className="note">Only alphabetic characters are allowed. Max 15 characters. </small>
                                            <small className="note" style={{color:"red"}}>{errors.name}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="last_name" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="Student Last Name"
                                            value={this.state.last_name}
                                            pattern="[A-Za-z]+"
                                            maxLength={15}
                                            required
                                            />
                                            <small className="note">Only alphabetic characters are allowed. Max 15 characters. </small>
                                            <small className="note" style={{color:"red"}}>{errors.last_name}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="DNI_student" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="Student DNI" 
                                            value={this.state.DNI_student}
                                            pattern="[0-9]+"
                                            maxLength={8}
                                            required
                                            />
                                            <small className="note">Only numbers are allowed. Max 8 numbers. </small>
                                            <small className="note" style={{color:"red"}}>{errors.DNI_student}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="file_number" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="File Number" 
                                            value={this.state.file_number}
                                            pattern="[0-9]+"
                                            maxLength={6}
                                            required
                                            />
                                            <small className="note">Only numbers are allowed. Max 6 numbers. </small>
                                            <small className="note" style={{color:"red"}}>{errors.file_number}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="phone_number" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="Student Phone Number" 
                                            value={this.state.phone_number}
                                            pattern="\+\d{1,3}\d{9,14}"
                                            maxLength={13}
                                            required
                                            />
                                            <small className="note">Please, only valid format. Eg. +541159686899 </small>
                                            <small className="note" style={{color:"red"}}>{errors.phone_number}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input 
                                            name="street" 
                                            onChange={this.handleChange}
                                            type="text" 
                                            placeholder="Street" 
                                            value={this.state.address.street}
                                            pattern="[A-Za-z]+"
                                            maxLength={15}
                                            required
                                            />
                                            <small className="note">Only alphabetic characters are allowed. Max 15 characters. </small>
                                            <small className="note" style={{color:"red"}}>{errors.street}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input name="number" onChange={this.handleChange}
                                            type="text" placeholder="Number" 
                                            value={this.state.address.number}
                                            pattern="[0-9]+"
                                            maxLength={5}
                                            required
                                            />
                                            <small className="note">Only numbers are allowed. Max 5 numbers. </small>
                                            <small className="note" style={{color:"red"}}>{errors.number}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input name="zip_code" onChange={this.handleChange}
                                            type="text" placeholder="Zip Code" 
                                            value={this.state.address.zip_code}
                                            required
                                            />
                                            <small className="note">Please, only valid format. Eg. B1156 or 1156 </small>
                                            <small className="note" style={{color:"red"}}>{errors.zip_code}</small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <Select 
                                                    name="grade"
                                                    options={this.state.gradeOptions}
                                                    value={this.state.selectedGrade}
                                                    onChange={this.handleGradeChange}
                                                    placeholder="Select Grade"
                                                    required
                                                />
                                                <small className="note" style={{color:"red"}}>{errors.grade}</small>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn cyan darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <table className="highlight" style={{ fontSize: '12px', width: '100%' }}>
                                <thead>
                                <tr>
                                    <th className="s1">Name</th>
                                    <th className="s1">Last Name</th>
                                    <th className="s1">DNI</th>
                                    <th className="s1">File Number</th>
                                    <th className="s1">Phone Number</th>
                                    <th className="s1">Street</th>
                                    <th className="s1">Number</th>
                                    <th className="s1">Zip Code</th>
                                    <th className="s1">Grade</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.students.map(student => {
                                    return (
                                    <tr key={student._id}>
                                        <td>{student.name}</td>
                                        <td>{student.last_name}</td>
                                        <td>{student.DNI_student}</td>
                                        <td>{student.file_number}</td>
                                        <td>{student.phone_number}</td>
                                        <td>{student.address.street}</td>
                                        <td>{student.address.number}</td>
                                        <td>{student.address.zip_code}</td>
                                        <td>{gradeMappings[student.grade]}</td>
                                        <td>
                                        <button
                                            className="btn cyan darken-4"
                                            onClick={() => this.editStudent(student._id)}
                                        >
                                            <i className="tiny material-icons">edit</i>
                                        </button>
                                        <button
                                            className="btn cyan darken-4"
                                            onClick={() => this.deleteStudent(student._id)}
                                            style={{ margin: '1px' }}
                                        >
                                            <i className="tiny material-icons">delete</i>
                                        </button>
                                        </td>
                                    </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <footer class="page-footer grey darken-3">
                    <div class="container">
                        <div class="row">
                        <div class="col l6 s12">
                            <h5 class="white-text">School Attendance Management System</h5>
                            <p class="grey-text text-lighten-4">Keep track of student attendance.</p>
                        </div>
                        <div class="col l4 offset-l2 s12">
                            <h5 class="white-text">Contact Us</h5>
                            <ul>
                            <li><a class="grey-text text-lighten-3" href="#!">test@example.com</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">/testexample</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">@testexample</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">+54 1160606060</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="footer-copyright">
                        <div class="container">
                        © 2023 Copyright
                        <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                        </div>
                    </div>
                    </footer>

            </div>
        )
    }
}

export default App