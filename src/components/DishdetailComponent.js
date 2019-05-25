import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Media } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments) {
        if (comments != null) {
            let cmnts = comments.map((comment) => {
                return(
                    <Media list className="list-unstyled">
                        <div key={comment.id}>
                            <Media tag="li">
                                <Media body>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: '2-digit'})}</p>
                                </Media>
                            </Media>
                        </div>
                    </Media>
                );
            });
            return (<div>{cmnts}</div>);
        }
        else {
            return (<div></div>);
        }
    }

    render(){
        if (this.props.dish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(null)}
                    </div>
                </div>
            );
        }
        
    }
}

export default DishDetail;