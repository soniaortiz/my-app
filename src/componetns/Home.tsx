import React from 'react'
import '../App.css';

interface HomeInterface {
    repo: string,
    user: string
}

interface HomeInterfaceProps{
    updateSearchData: Function
}

export class Home extends React.Component< HomeInterfaceProps, HomeInterface>{
    constructor(props: HomeInterfaceProps) {
        super(props);
        this.state = {
            repo: '',
            user: ''
        }
    }

    updateData = (event: React.ChangeEvent<{ name?: string, value: string, id:string}>) => {

        if (event.target.id === 'repo') {
            this.setState({
                repo: event.target.value
            });
        } else if (event.target.id === 'user') {
            this.setState({
                user: event.target.value
            });
        }

    }

    search = () => {
        this.props.updateSearchData(this.state.user, this.state.repo);
    }

    render() {
        return (
            <div className={'formContainer'} data-testid={'formContainer'}>
                <h1>Git Commit History</h1>
                <div className={'searchForm'}>
                    <label htmlFor="user"> username </label>
                    <input type="text" id="user" onChange={this.updateData} />
                    <br />
                    <label htmlFor="repo"> repository name</label>
                    <input type="text" id="repo" onChange={this.updateData} />
                </div>

                <button
                    className={'searchBtn'}
                    onClick={this.state.repo && this.state.user ? this.search : undefined}
                >
                    Search
                </button>
            </div>
        )
    }
}