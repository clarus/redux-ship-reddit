// @flow
import React, { PureComponent } from 'react';
import * as Type from '../../type';
import * as Util from '../../util';
import * as SubredditController from './controller';

type Props = {
  dispatch: (action: SubredditController.Action) => void,
  id: string,
  link: Type.Link,
};

export default class SubredditLink extends PureComponent<void, Props, void> {
  handleClickLink = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
      this.props.dispatch({
        type: 'ClickLink',
        url: event.target.pathname,
      });
    }
  };

  renderThumbnail(thumbnail: string) {
    return (
      <figure class="image is-64x64">
        {thumbnail !== 'default' && thumbnail !== 'self' &&
          <img alt="thumbnail" src={thumbnail} />
        }
      </figure>
    );
  }

  render() {
    return (
      <div className="card is-fullwidth">
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column is-1">
                {this.renderThumbnail(this.props.link.thumbnail)}
              </div>
              <div className="column">
                <p className="title is-5">
                  <a href={this.props.link.url}>{this.props.link.title}</a>
                </p>
                {this.props.link.score} {Util.pluralize('point', this.props.link.score)} by {this.props.link.author}
                <br />
                <a onClick={this.handleClickLink} href={`/link/${this.props.id}`}>
                  {this.props.link.num_comments} {Util.pluralize('comment', this.props.link.num_comments)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
