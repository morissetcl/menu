import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMehBlank } from '@fortawesome/free-solid-svg-icons'
import { getComments } from '../../apis/Comments'

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurantId: props.restaurantId,
      userId: props.userId,
      body: '',
      commentsResults: [],
      isCommented: props.isCommented
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleChange() {
    this.handleFormSubmit(this.state.body);
    this.setState({ isCommented: true, body: '' }, () => console.log(''))
    iziToast.show({
      backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
      icon: 'fa fa-comment',
      message: 'Commentaire ajouté',
      timeout: 2500
    })
  }

  updateInputValue(e) {
    this.setState({
      body: e.target.value
    });
  }

  fetchComments(){
    getComments(this.state.userId, this.state.restaurantId).then(data => {
      this.setState({commentsResults: data });
    });
  }

  handleFormSubmit(body){
    let payload = JSON.stringify({ comment: { body: body, user_id: this.state.userId, restaurant_id: this.state.restaurantId } })

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
                 <p  className='comment-body'>{response.body}</p>
               </div>
             </div>
    });
    return (
      <div className={this.state.isCommented ? "already-commented" : "not-yet-commented"}>
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
                    value= {this.state.body}
                    onChange={(e) => {this.updateInputValue(e)}}
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
