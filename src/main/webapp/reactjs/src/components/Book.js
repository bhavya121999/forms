import React,{Component} from "react";
import {Card,Form,Button,Col} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave,faPlusSquare,faUndo} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import MyToast from "./MyToast"

export default class Book extends Component {



constructor(props){
	super(props);
	this.state = this.initialState;
	this.state.show=false
	this.bookChange=this.bookChange.bind(this);
	this.submitBook=this.submitBook.bind(this);

}

initialState = {
firstName:"",lastName:"",password:"",email:""
}

resetBook=() => {
this.setState(() => this.initialState)
}

submitBook= event =>{


	event.preventDefault();

	const book = {
	         firstName:  this.state.firstName,
    		 lastName: this.state.lastName,
    		 password: this.state.password,
    		 email: this.state.email


	};

	axios.post("http://localhost:8080/forms",book)
	.then(response => {
	if(response.data!=null){
	this.setState({"show":true});
	setTimeout(() => this.setState({"show":false}),3000);
	}
	else{
	this.setState({"show":false});

	}});
	this.setState(this.initialState);
}

bookChange =event =>{
	this.setState({
		[event.target.name]:event.target.value
	})
}

render(){

const {firstName,lastName,password,email}=this.state;
	return (

	<div>
	<div style={{"display":this.state.show ? "block" : "none"}}>
	 <MyToast children = {{show:this.state.show, message:"Book Saved Successfully."}}/>
	 </div>
	 <Card className={"border border-dark bg-dark text-white"}>
     		<Card.Header><FontAwesomeIcon icon={faPlusSquare} />Add New Book</Card.Header>
     		<Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">

     		<Card.Body>
     		<Form.Row>
     		<Form.Group as= {Col} controlId="formGridfirstName">
     		<Form.Label>FirstName</Form.Label>
     		<Form.Control required autoComplete="off"
     		type="test"
     		name="firstName"
     		value={firstName}
     		onChange={this.bookChange}
     		className={"bg-dark text-white"}
     		placeholder="Enter First Name" />

     		</Form.Group>

     		<Form.Group as= {Col} controlId="formGridlastName">
     		<Form.Label>LastName</Form.Label>
     		<Form.Control required autoComplete="off"
     		type="test"
     		name="lastName"
     		value={lastName}
     		onChange={this.bookChange}
     		className={"bg-dark text-white"}
     		placeholder="Enter Last Name" />

     		</Form.Group>
             </Form.Row>


     		<Form.Row>
     		<Form.Group as= {Col} controlId="formGridpassword">
     		<Form.Label>Password</Form.Label>
     		<Form.Control required autoComplete="off"
     		 type="test"
     		name="password"
     		value={password}
     		onChange={this.bookChange}
     		className={"bg-dark text-white"}
     		placeholder="Enter Password" />

     		</Form.Group>
     		<Form.Group as= {Col} controlId="formGridemail">
     		<Form.Label>Email</Form.Label>
     		<Form.Control required autoComplete="off"
     		type="test"
     		name="email"
     		value={email}
     		onChange={this.bookChange}
     		className={"bg-dark text-white"}
     		placeholder="Enter Email" />

     		</Form.Group>
             </Form.Row>





             <Card.Footer style={{"textAlign":"right"}}>
     		<Button size="sm" variant="primary" type="submit">
     		<FontAwesomeIcon icon={faSave} />Submit
     		</Button>{" "}
     		<Button size="sm" variant="primary" type="reset">
             		<FontAwesomeIcon icon={faUndo} />Reset
             		</Button>
     		</Card.Footer>

     		</Card.Body>
     		</Form>
     		</Card>

	</div>








		);
}
}
