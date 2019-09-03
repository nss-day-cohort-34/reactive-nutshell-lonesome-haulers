import React, { Component } from "react"
import ArticleManager from '../../modules/ArticleManager';
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

class AddArticleModal extends Component {
    state = {
        articleTitle: "",
        articleSynopsis: "",
        articleURL: "",
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create article object, invoke the ArticleManager post method, and redirect to the full article list
    */
    constructNewArticle = evt => {
        evt.preventDefault();
        if (this.state.articleTitle === "" || this.state.articleSynopsis === "" || this.state.articleURL === "") {
            window.alert("Please input an article title, synopsis, and URL");
        } else {
            this.setState({ loadingStatus: true });
            const article = {
                title: this.state.articleTitle,
                synopsis: this.state.articleSynopsis,
                url: this.state.articleURL
            };

            // Create the article and redirect user to article list
            ArticleManager.post(article)
            .then(() => this.props.didMountFunction());
            this.closeModal();
        }
    };
    
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
          contentLabel="Add Article Modal"
        >
            {/* your text here */}
            <h1>New Article</h1>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="articleTitle">Title</label>
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="articleTitle"
                        placeholder="Title"
                        /><br></br>
                        <label htmlFor="articleSynopsis">Synopsis</label>
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="articleSynopsis"
                        placeholder="Synopsis"
                        /><br></br>
                        <label htmlFor="articleURL">URL</label>
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="articleURL"
                        placeholder="URL"
                        />
                        
                    </div>
                    <div className="alignRight">
                        <button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewArticle}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </ReactModal>
            <h1>articles</h1>
            <button onClick={this.openModal}>Add New Article</button>
            </>
        )
    }
}

export default AddArticleModal;