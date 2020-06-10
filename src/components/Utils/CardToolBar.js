import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../contexts/ApiContext';
import StoryApiService from '../../services/story-api-service';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from 'react-share';

export class CardToolBar extends Component {
  static contextType = ApiContext;
  deleteStoryHandler = (id) => {
    StoryApiService.deleteStory(id).then(console.log('deleted'));
  };
  render() {
    let buttons = [
      EmailShareButton,
      FacebookShareButton,
      LinkedinShareButton,
      RedditShareButton,
      TumblrShareButton,
      TwitterShareButton,
    ];
    // Allow users to edit or delete their stories by id
    const tools =
      ((
        <Link to={`story/edit/${this.props.id}`}>
          <button>Edit</button>
        </Link>
      ),
        (
          <button onClick={this.deleteStoryHandler(this.props.id)}>
            Delete
          </button>
        ));
        // need to make sure we're storing using id in context
    if (this.context.user === this.props.author) {
      buttons = [...buttons, tools];
    }
    return <div className='tool-bar'>{buttons}</div>;
  }
}

export default CardToolBar;
