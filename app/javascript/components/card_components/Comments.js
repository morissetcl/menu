import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class Comments extends Component {

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      restaurantId: props.restaurantId,
      userId: props.userId,
      body: '',
      commentResults: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleChange() {
    var body = $('#body_comment').val();
    this.setState({body: body});
    this.handleFormSubmit(body)
  }

  getComments() {
    $.getJSON('/private/' + this.state.restaurantId + '/restaurant/' + this.state.userId + '/comments',(res) =>
    {
      this.setState({commentsResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  handleFormSubmit(body){
    let payload = JSON.stringify({comment: {body: body, user_id: this.state.userId, restaurant_id: this.state.restaurantId }})

    fetch(process.env.BASE_URL + '/private/' + this.state.restaurantId + '/restaurant/' + this.state.userId + '/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload,
      }).then((response) => {return response.json()})
      .then((comment)=>{
        this.addNewComment(comment)
      })

      iziToast.show({
        backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
        message: 'Commentaire ajouté',
        timeout: 2500
      })
  }

  addNewComment(comment){
    this.setState({
      commentResults: this.state.commentResults.concat(comment)
    })
  }

  render(){
    let commentsRestaurant = this.state.commentResults.map((response, index) => {
      return <div key={index} className='cool'>
              <p>{response}</p>
             </div>
    });
    return (
      <div>
        <div className="modal-trigger" href="#modal2">
          <FontAwesomeIcon
            icon={faCalendarWeek}
            className='super'
          />
        </div>
        <div id="modal2" class="modal bottom-sheet">
          <div className="modal-content">
            <div className='comments-wrapper'>
              <p>hahaha</p>
            </div>
            <div className="modal-content">
              <h5>Ajouter un commentaire</h5>
              <div className="input-field">
                <label>commentaire</label>
                <input
                  type="text"
                  id='body_comment'
                  className='input-field '
                />
              </div>
              <input className='modal-close' type="submit" value="Ajouter" onClick={() => { this.handleChange()}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
