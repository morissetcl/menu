import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PrivateNavbar extends Component{

   constructor(props, context) {
      super(props, context);
   }

   componentDidMount(){}

   render() {
      return (
         <div className="private-nav z-depth-5">
           <li>
             <a rel="nofollow" data-method="delete" href="/users/sign_out">
                <FontAwesomeIcon icon={faSearch} className='icon-nav hide-on-med-and-up' />
                <span className='hide-on-small-only' >Déconnexion</span>
             </a>
           </li>
         </div>
      )
   }
}

document.addEventListener('DOMContentLoaded', () => {
  var new_row = document.createElement("div");
  new_row.setAttribute("class", "livesearch-container row" );

  ReactDOM.render(
    <PrivateNavbar />,
    document.body.appendChild(new_row),
  )
});

export default PrivateNavbar
