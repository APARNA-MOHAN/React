const CommentForm = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);


    const handleSubmit=(values)=>{
        props.addComment(props.dishId, values.rating,values.author,values.comment);
        
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