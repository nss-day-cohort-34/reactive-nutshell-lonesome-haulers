import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ArticleCard extends Component {
  render() {
    return (
      <div className="card">
          <div className="card-content">
            <h2>Title: <span className="card-articleTitle">{this.props.article.title}</span></h2>
            <p>Synopsis: {this.props.article.synopsis}</p>
            <p>URL: {this.props.article.url}</p>
            <button type="button"
              onClick={() => {this.props.history.push(`/articles/${this.props.article.id}/edit`)}}>Edit</button>
            <button type="button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Discharge</button>
          </div>
      </div>
    );
  }
}

export default ArticleCard;