import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurantId: props.restaurantId,
      userId: props.userId,
      body: '',
      commentsResults: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleChange() {
    var body = $('#body_comment').val();
    this.setState({body: body});
    this.handleFormSubmit(body)
  }

  fetchComments(){
    $.getJSON('/private/' + this.state.userId + '/restaurant/' + this.state.restaurantId + '/comments',(res) =>
    {
      this.setState({commentsResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  handleFormSubmit(body){
    let payload = JSON.stringify({comment: {body: body, user_id: this.state.userId, restaurant_id: this.state.restaurantId }})

    fetch(process.env.BASE_URL + '/private/' + this.state.userId + '/restaurant/' + this.state.restaurantId + '/comments', {
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
      commentsResults: this.state.commentsResults.concat(comment)
    })
  }

  render(){
    let commentsRestaurant = this.state.commentsResults.map((response, index) => {
      return <div key={index} className='cool'>
              <p>{response.body}</p>
             </div>
    });
    return (
      <div>
        <div className="modal-trigger" href="#modal2">
          <FontAwesomeIcon
            icon={faCalendarWeek}
            className='super'
            onClick={() => { this.fetchComments()}}
          />
        </div>
        <div id="modal2" class="modal bottom-sheet">
          <div className="modal-content">
            <div className='comments-wrapper'>
              {commentsRestaurant}
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
