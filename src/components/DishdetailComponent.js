import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, 
	Modal, ModalBody, ModalHeader, Button, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			 isModalOpen : false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
	}

	render(){
		return(
			<React.Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comments
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={12}>Rating</Label>
								<Col md={12}>
									<Control.select model=".rating" name="rating" id="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={12}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".author" name="author" id="author" placeholder="Your Name"
									validators={{minLength: minLength(3), maxLength: maxLength(15)}} 
									className="form-control"/>
									<Errors className="text-danger" model=".author" show="touched" 
									messages={{
										minLength: "Must be greater than 2 characters",
										maxLength: "Must be 15 characters or less"
									}}/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={12}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" name="comment" id="comment" 
									className="form-control" rows="6"/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={10}>
									<Button type="submit" color="primary">Submit</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	};

	toggleModal(){
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}
}

function RenderDish({dish}) {
	if (dish != null) {
		return (
			<React.Fragment>
				<div className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div> 
			</React.Fragment>
		);
	} else {
		return (
			<div></div>
		);
	}
}

function RenderComments({comments}) {
	if (comments && comments.length) {
		return (
			<React.Fragment>
				<ul className="list-unstyled">
					{ comments.map((comment) => {
						const commentDate = new Date(comment.date);
						return (
							<li key={comment.id}>
								<p>{ comment.comment }</p>
								<p>-- { comment.author }, { commentDate.toLocaleString('en-US', { month: 'short', day: '2-digit' }) } , { commentDate.getFullYear() }</p>
							</li>
						)
					}) }
				</ul>
				<CommentForm />
			</React.Fragment>
		);
	} else {
		return (
			<CommentForm />
		);
	}
}

const DishDetail = (props) => {
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<RenderDish dish={props.dish}/>
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<RenderComments comments={props.comments}/>
				</div>
			</div>
		</div>
	);
}


export default DishDetail;