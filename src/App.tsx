import React from 'react';
import './App.css';
import { CommitsList } from './componetns/CommitsList';
import { Home } from './componetns/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


class App extends React.Component<any, {
  user: string,
  repository: string
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      user: '',
      repository: ''
    }
  }

  updateSearchData = (username: string, reponame: string) => {
    this.setState({
      user: username,
      repository: reponame
    }, ()=>{
      window.location.href = `/${this.state.user}/${this.state.repository}`
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home updateSearchData={this.updateSearchData} />} />
            <Route path={`/:user/:repository`} element={<CommitsList />} />
          </Routes>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
