import React, { Component } from 'react';


class ArticleCard extends Component {
  render() {
    const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
    if (this.props.article.userId === currentUser.id) {
    return (
      <div className="card">
          <div className="card-content">
            <h2>Title: <span className="card-articleTitle">{this.props.article.title}</span></h2>
            <p>Synopsis: {this.props.article.synopsis}</p>
            <p>URL: {this.props.article.url}</p>
            <p>Created: {this.props.article.timestamp}</p>
            <button type="button"
              onClick={() => {this.props.history.push(`/articles/${this.props.article.id}/edit`)}}>Edit</button>
            <button type="button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Discharge</button>
          </div>
      </div>
    );
    } else {
       return  <></>
    } 
  }
}

export default ArticleCard;