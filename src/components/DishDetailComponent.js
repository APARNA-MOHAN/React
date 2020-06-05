import React,{Component} from 'react';
import { Label, Col,Row, Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={modal:false};

        this.toggle=this.toggle.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);


    }
    
    toggle(){
        this.setState({modal:!this.state.modal});}


    handleSubmit(values){
        this.props.postComment(this.props.dishId, values.rating,values.author,values.comment);
        
    }

    render(){

        return (
            <div>
              <Button outline onClick={this.toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                <ModalBody>
                  <div className="col-12 col-md-9">
                      <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                          <Row className="form-group">
                              <Label htmlFor="rating" className="w-100 p-3">Rating</Label>
                              <Col>                        
                                 <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>                        
                                 </Control.select>
                              </Col>
                              
                          </Row>
      
      
                          <Row className="form-group">
                              <Label htmlFor="author" className="w-100 p-3">Your Name</Label>
                              <Col  >
                                  <Control.text model=".author" id="yourname" name="author" placeholder="Your Name" className="w-100 p-3 form-control" validators={{
                                                  required, minLength: minLength(3), maxLength: maxLength(15)
                                   }}/>
      
                                  <Errors className="text-danger" model=".author" show="touched" messages={{
                                                  required: 'Required',
                                                  minLength: 'Must be greater than 2 characters',
                                                  maxLength: 'Must be 15 characters or less'
                                  }}/>    
                                          
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Label htmlFor="comment" className="w-100 p-3">Comment</Label>
                              <Col>
                                  <Control.textarea  model=".comment" id="comment" name="comment" rows="6" className="w-100 p-3 form-control"></Control.textarea>
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Col >
                                  <Button type="submit" color="primary"> Submit </Button>
                              </Col>
                          </Row>
                      </LocalForm> 
                  </div>
      
                  
                </ModalBody>
                
              </Modal>
            </div>
        );

    }
    
}  

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={ baseUrl + dish.image } alt={ dish.name } />
                <CardBody>
                    <CardTitle>{ dish.name }</CardTitle>
                    <CardText>{ dish.description }</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments, postComment,dishId}) {

    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                { comments.map( (comment) => {
                    return (
                        <ul key={ comment.id } className="list-unstyled">
                            <li>{ comment.comment }</li>
                            <li> -- { comment.author },{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>
                        
                    );
                })
                }
                <CommentForm dishId={dishId} postComment={postComment}/>
                
            </div>
        ); 
    } else {
        return (
            <div></div>
        );
    }
}


const DishDetail=(props)=>{
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );

    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );

    }
    else if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>                   
                       <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                       <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                        
                    </div>
                     
                    <RenderComments comments={ props.comments} postComment={props.postComment}
                    disheId={props.dish.id}/>
    
                
                </div>
    
            </div>
            
        );

    }
    
    
        
    
}

export default DishDetail;