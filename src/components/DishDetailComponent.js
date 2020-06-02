import React,{useState} from 'react';
import { Label, Col,Row, Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const CommentForm = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);


    const handleSubmit=(values)=>{
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        
    }
    
  
    return (
      <div>
        <Button outline onClick={toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-9">
                <LocalForm onSubmit={(values)=>handleSubmit(values)}>
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
                            <Control.textarea className="w-100 p-3" model=".comment" id="comment" name="comment" rows="6" className="w-100 p-3 form-control"></Control.textarea>
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
  


function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={ dish.image } alt={ dish.name } />
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

function RenderComments({comments}) {

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
                <CommentForm/>
                
            </div>
        ); 
    } else {
        return (
            <div></div>
        );
    }
}


const DishDetail=(props)=>{
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
                 
                <RenderComments comments={ props.comments}/>

            
            </div>

        </div>
        
    );
    
    
        
    
}

export default DishDetail;