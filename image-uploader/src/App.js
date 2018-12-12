import React, { Component } from 'react';
import './App.css';
import {Button, Modal, Row, Col, Input} from 'react-materialize'



class App extends Component {

  constructor(){
    super();
    this.state = {
      AllImages : [],
      selectedURL: '',
      selectedTitle: '',
      canSubmit: false,
      refresh: false,
      searchText: ''
    };
  }

  handleImageOnChange(event){  
    if(event.target.files[0]){
      this.setState({
        selectedURL: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  handleTextOnChange(event){
    if(event.target.value){
      this.setState({
        selectedURL : event.target.value
      })
    }
  }

  handleTitleTextOnChange(event){
    if(event.target.value){
      this.setState({
        selectedTitle:  event.target.value
      })
    }
  }

  onSubmit(){
    if(this.state.selectedURL && this.state.selectedTitle){
      let temp = this.state.AllImages;
      temp && temp.push({
        url: this.state.selectedURL,
        title: this.state.selectedTitle
      });

      this.setState({
        AllImages: temp
      })

      localStorage.setItem('images', JSON.stringify(this.state.AllImages))
      this.setState({refresh: !this.state.refresh})
    }
  }


  handleOnSearchtyped(event){
    this.setState({
      searchText: event.target.value,
      refresh: !this.state.refresh
    })
    console.log(this.state.refresh)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Photo uploader</span>
          <Modal
            header='Add photo'
            trigger={<Button floating large className='red Modal-trigger-button' waves='light' icon='add' />}>

            <Row className="container-fuild">
              <Col s={6}>
                <Input type="file" placeholder="Select File" label="File" s={12} onChange={this.handleImageOnChange.bind(this)}/>
              </Col>
              <Col s={6} className="Add-Border-left">
                <input type="text" placeholder="Enter URL of Image" onChange={this.handleTextOnChange.bind(this)}></input>
              </Col>
            </Row>
            <Row>
              <input type="text" placeholder="Title of the image" onChange={this.handleTitleTextOnChange.bind(this)}></input>
            </Row>

            <Row>
              <Button onClick={this.onSubmit.bind(this)}>
                UPLOAD
              </Button>
            </Row>
            
          </Modal>
          
        </header>
        <div className="search-container">
        <Input placeholder="Tree, Flash..." s={12} label="Search images" onChange={this.handleOnSearchtyped.bind(this)} />
        </div>
        <ImageContainer AllImages={this.state.AllImages} refresh={this.state.refresh} searchText={this.state.searchText}></ImageContainer>
      </div>
    );
  }
}


class ImageContainer extends Component {
  constructor(){
    super();
    this.state = {};
   
  }

  componentDidMount(){
    this.fetchImages();
  }

  componentWillReceiveProps(props){
    const { refresh, searchText } = this.props;
    
    if(props.refresh !== refresh){
      this.fetchImages( searchText );
    }
  }


  fetchImages ( searchText='' ) {
    var images = [];
    if( localStorage.getItem('images') ){
      images = JSON.parse(localStorage.getItem('images'));
    }

    if( searchText ){
      images = images.filter( image => {
        return image.title.toUpperCase().startsWith(searchText.toUpperCase()) ? 1 : 0;
      })
    }


    this.setState({
      AllImages: images
    });
  }


  handleDelete(index){
    var temp = this.state.AllImages;
    temp.splice(index, 1);

    this.setState({
      AllImages: temp
    })

    localStorage.setItem('images', JSON.stringify(this.state.AllImages))

  }
  render(){
      return (
        <Row className="image-container">
            {this.state.AllImages && this.state.AllImages.map( ( image, index ) => {
            return (
                <Col s={3} key={index}>
                  <div className="image-wrapper">
                    <img className="responsive-img" src={image.url}></img>
                  </div>
                  <Button icon="delete" onClick={this.handleDelete.bind(this, index)}>Delete</Button>
                </Col>
            )
            })}

        </Row>
      )
  }
}

export default App;
