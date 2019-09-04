import React, { Component } from "react"
import ArticleManager from "../../modules/ArticleManager"
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

class ArticleEditForm extends Component {
    //set the initial state
    state = {
      articleTitle: "",
      articleSynopsis: "",
      articleURL: "",
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    updateExistingArticle = evt => {
      evt.preventDefault()
      const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
      const newDate = new Date();
      const timestamp = newDate.toUTCString();
      this.setState({ loadingStatus: true });
      const editedArticle = {
        id: this.props.match.params.articleId,
        title: this.state.articleTitle,
        synopsis: this.state.articleSynopsis,
        url: this.state.articleURL,
        timestamp: timestamp,
        userId: currentUser.id
      };
      
      ArticleManager.update(editedArticle)
      .then(() => this.props.history.push("/articles"))
    }

    componentDidMount() {
      ArticleManager.get(this.props.match.params.articleId)
      .then(article => {
          this.setState({
            articleTitle: article.title,
            articleSynopsis: article.synopsis,
            articleURL: article.url,
          });
      });
    }

    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
    
      openModal() {
        this.setState({modalIsOpen: true});
      }
    
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    render() {
      return (
        <>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Article Modal"
        >
        <form>
          <fieldset>
            <div className="formgrid">
              <label htmlFor="articleTitle">Title</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="articleTitle"
                value={this.state.articleTitle}
              />

              <label htmlFor="articleSynopsis">Synopsis</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="articleSynopsis"
                value={this.state.articleSynopsis}
              />
              <label htmlFor="articleURL">URL</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="articleURL"
                value={this.state.articleURL}
              />
            </div>
            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingArticle}
                className="btn btn-primary"
              >Submit</button>
            </div>
          </fieldset>
        </form>
        </ReactModal>
            <h1 className="feature__name">Articles</h1>
            <button onClick={this.openModal}>Edit Article</button>
        </>
      );
    }
}

export default ArticleEditForm