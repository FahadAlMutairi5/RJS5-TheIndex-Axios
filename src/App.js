import React, { Component } from "react";

import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";
import ReactLoading from 'react-loading';
class App extends Component {
  state = {
    currentAuthor: null,
    authors:[],
    loading: true,
  };

   async componentDidMount(){
    try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/")
      const authors = response.data ;
      this.setState({authors:authors, loading:false})
    } catch(e) {
      console.error(e);
    }
  }

  selectAuthor =  (author) => {
    this.setState({loading:true} , async () => {
      try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/"+author.id);
      const authors = response.data;
      this.setState({ currentAuthor: authors, loading:false})
    } catch(e) {
      // statements
      console.error(e);
    }
    })
    
    
  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ authors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.state.loading ? <ReactLoading type={"spin"} color={"#ffffff"} height={'20%'} width={'20%'} /> :this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
