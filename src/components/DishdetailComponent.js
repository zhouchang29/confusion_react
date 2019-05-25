import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
	
	renderDish(dish) {
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
					<div className="col-12 col-md-5 m-1">
						<h4>Comments</h4>
						{ this.renderComments(dish.comments) }
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<div></div>
			);
		}
	}

	renderComments(comments) {
		if (comments && comments.length) {
			return (
				<ul className="list-unstyled">
					{ comments.map((comment) => this.renderComment(comment)) }
				</ul>
			);
		} else {
			return (
				<div></div>
			);
		}
	}

	renderComment(comment) {
		const commentDate = new Date(comment.date);
		return (
			<li key={comment.id}>
				<p>{ comment.comment }</p>
				<p>-- { comment.author }, { commentDate.toLocaleString('en-US', { month: 'short', day: '2-digit' }) } , { commentDate.getFullYear() }</p>
			</li>
		)
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					{ this.renderDish(this.props.dish) }
				</div>
			</div>
		);
	}
}

export default DishDetail;