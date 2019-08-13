import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMehBlank } from '@fortawesome/free-solid-svg-icons'

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
    $('.not-yet-commented').addClass('already-commented')
    iziToast.show({
      backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
      icon: 'fa fa-comment',
      message: 'Commentaire ajouté',
      timeout: 2500
    })
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
      $('input').val('');
  }

  addNewComment(comment){
    this.setState({
      commentsResults: this.state.commentsResults.concat(comment)
    })
  }

  formatedDate(date){
    return new Date(date).toLocaleDateString()
  }

  render(){

    let commentsRestaurant = this.state.commentsResults.map((response, index) => {
      return <div key={index}>
               <div className="collection-item">
                 <p className='date'>{this.formatedDate(response.created_at)}</p>
                 <p>{response.body}</p>
               </div>
             </div>
    });
    return (
      <div>
        <div className="modal-trigger" href="#modal2">
          <FontAwesomeIcon
            icon={faComment}
            className='super'
            onClick={() => { this.fetchComments()}}
          />
        </div>
        <div id="modal2" className="modal">
          <div className="modal-content super-wrapper row">
            <div className='comments-wrapper col s6'>
              <div className="collection">
              {commentsRestaurant.length > 0 ?
                <div className="result-wrapper row">
                  { commentsRestaurant }
                </div>
                :
                <div className='empty-comment'>
                  <div>
                    <FontAwesomeIcon
                      icon={faMehBlank}
                      className='empty-icone'
                    />
                  </div>
                  <p>Oups, littéralement rien à déclarer pour l'instant</p>
                </div>
              }
              </div>
            </div>
            <div className="modal-content col s6">
              <div className='fixed-form'>
                <div className="input-field">
                  <label>Ajoutez un commentaire</label>
                  <input
                    type="text"
                    id='body_comment'
                    className='input-field '
                  />
                </div>
                <input className='modal-close waves-effect waves-light btn' type="submit" value="Ajouter" onClick={() => { this.handleChange()}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Comments
