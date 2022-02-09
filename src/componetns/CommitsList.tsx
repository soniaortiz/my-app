import React from 'react'
import '../App.css';
let user = 'sonia';

interface ComponentListStateInterface {
    commitsArray: Array<any>,
    page: number,
    requestError: Boolean,
    username: String,
    repository: String
}

export class CommitsList extends React.Component<any, ComponentListStateInterface>{

    constructor(props: any) {
        super(props);
        this.state = {
            commitsArray: [],
            page: 1,
            requestError: false,
            username:  '',
            repository: ''
        }
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.makeGitRequest();
        })
    }

    formatCommitDate(commitDate: Date) {
        const newDate = new Date(commitDate);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate);
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        const commitTime = `${newDate.getUTCHours()}:${newDate.getUTCMinutes()} ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(newDate)}`
        return <>{month} {day}, {year} at {commitTime} </>;
    }

    createList() {
        return <ul className={'ulCommitList'}>
            {
                <div className={'commitFeed'}>
                    <h1 className={'desciption'}>Commit Feed</h1>
                    <h3 className={'desciption'}>Showing results for {this.state.username}</h3>

                    {this.state.commitsArray.map(({ commit, html_url }) => {
                        const formatedCommitDate = this.formatCommitDate(commit.author.date);

                        return <div className={"results"}>
                            <li className={'listItem'}>
                                <span className={'spanCommitItem'}>
                                    {formatedCommitDate}
                                </span>

                                <span className={'spanCommitItem'}>
                                    <a href={html_url}>
                                        {`${commit.message.substring(0, 35)}...`}
                                    </a>
                                </span>

                                <span>
                                    {commit.author.name}
                                </span>
                            </li>
                        </div>
                    })}

                    <button onClick={this.loadMore}>Load More</button>
                </div>
            }
        </ul>
    }

    makeGitRequest() {
        window.fetch(`https://api.github.com/repos/${this.state.username}/${this.state.repository}/commits?per_page=100&page=${this.state.page}`)
            .then((data) => {
                return data.json();
            })
            .then((response) => {
                if (response.message) {
                    this.setState({
                        requestError: true
                    });
                } else {
                    this.setState({
                        commitsArray: response
                    });
                }

            })
            .catch((e) => {
                this.setState({
                    requestError: true
                });
            });
    }

    componentDidMount() {
        let searchPath = window.location.pathname.split('/');
        this.setState({
            username:  searchPath[1],
            repository: searchPath[2]
        },()=>{
            this.makeGitRequest();
        })
        
    }

    render() {

        if (this.state.commitsArray.length) {
            return this.createList()
        }

        if (!this.state.requestError) {
            return (<div>Loading...</div>);
        }

        return <div>Sorry we couldn't find any data</div>
    }
}