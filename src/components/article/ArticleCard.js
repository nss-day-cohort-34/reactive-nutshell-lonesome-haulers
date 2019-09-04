import React, { Component } from 'react';
import { Button } from 'reactstrap';


let styles = {
  backgroundColor: 'cornsilk',
};

class ArticleCard extends Component {
  render() {
    const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
    if (this.props.article.userId === currentUser.id) {
    return (
      <div className="card">
          <div className="card-content">
            <h2>Title: <span className="card-articleTitle">{this.props.article.title}</span></h2>
            <p>Synopsis: {this.props.article.synopsis}</p>
            <p>URL: <a href={this.props.article.url}>{this.props.article.url}</a></p>
            <p>Created: {this.props.article.timestamp}</p>
            <Button outline color="dark" size="sm"
              onClick={() => {this.props.history.push(`/articles/${this.props.article.id}/edit`)}}>Edit</Button>
            <Button outline color="danger" size="sm" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete</Button>
          </div>
      </div>
    );
    } else {
       return  <>
       <div className="card">
          <div className="card-content" style={styles}>
            <h2><i>Title: <span className="card-articleTitle">{this.props.article.title}</span></i></h2>
            <p><i>Synopsis: {this.props.article.synopsis}</i></p>
            <p><i>URL: <a href={this.props.article.url}>{this.props.article.url}</a></i></p>
            <p><i>Created: {this.props.article.timestamp}</i></p>
          </div>
      </div></>
    } 
  }
}

export default ArticleCard;