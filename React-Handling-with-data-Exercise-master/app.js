import React, { Component } from 'react';
import axios from 'axios';
import './data.css';

class App extends Component {
    state = {
        userList:[],
        itemToDisplay: {},
        isEditing: false,
    };

    displayData = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response)=>{
                this.setState({
                    userList: response.data
                });
            })
            .catch((error)=>{
                alert('Error while fetching users.');
                console.log('error', error)
            })
    };

    selectUser = (user) => {
        this.setState({
            itemToDisplay: Object.assign({}, user),
            isEditing: false
        });
    };

    handleEditClick = () => {
        this.setState({
            isEditing: true
        })
    };

    inputChangeHandler = (event, key) => {
        const { itemToDisplay } = this.state;
        itemToDisplay[key] = event.target.value;
        this.setState({itemToDisplay});
    };

    deleteUser = () => {
        const { itemToDisplay, userList } = this.state;
        const updatedList = userList.filter((user) => {
            return (user.id !== itemToDisplay.id);
        });

        this.setState({
            userList: updatedList,
            itemToDisplay: {}
        });
    };

    saveUserChanges = () => {
        const { itemToDisplay, userList } = this.state;
        const updatedList = userList.map((user) => {
            return (user.id !== itemToDisplay.id) ? user : Object.assign({}, itemToDisplay);
        });

        this.setState({
            userList: updatedList,
            isEditing: false
        });
    };
    hideUserDetails = () => {
        this.setState({
            isEditing: false,
            itemToDisplay:{}
        });
    };
    render() {
        const { itemToDisplay, userList, isEditing } = this.state;
        const userListMarkup = userList.map((user)=>{
            return (
                <li key={user.id} onClick={() => this.selectUser(user)}>{user.username}</li>
            )
        });

        return (
            <div className="App">
                <div>
                    <h3>Click to get all user Details!</h3>
                    <button className="button-style" onClick={this.displayData}>Get Users</button>
                </div>

                <ul className="user-list">
                    { userListMarkup }
                </ul>
                {
                    itemToDisplay.id ? (
                        <div className="user-details">
                            <div>
                                <label>Id:</label><br/>
                                <input type="text" className="bg-grey" value={itemToDisplay.id} disabled />
                            </div>
                            <div>
                                <label>Name:</label><br/>
                                <input type="text" value={itemToDisplay.name} onChange={(event) => this.inputChangeHandler(event, 'name')} disabled={!isEditing} />
                            </div>
                            <div>
                                <label>User-Name:</label><br/>
                                <input type="text" className="bg-grey" value={itemToDisplay.username} disabled />
                            </div>
                            <div>
                                <label>Phone:</label><br/>
                                <input type="text" value={itemToDisplay.phone} onChange={(event) => this.inputChangeHandler(event, 'phone')} disabled={!isEditing} />
                            </div>
                            <div>
                                <label>Email:</label><br/>
                                <input type="text" className="bg-grey" value={itemToDisplay.email} disabled />
                            </div>
                            <div>
                                <label>Website:</label><br/>
                                <input type="text" value={itemToDisplay.website} onChange={(event) => this.inputChangeHandler(event, 'website')} disabled={!isEditing} />
                            </div>

                            {
                                isEditing ? (
                                    <div>
                                        <button className="form" onClick={this.saveUserChanges}>Save Changes</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="form" onClick={this.handleEditClick}>Edit</button>
                                        <button className="form" onClick={this.deleteUser}>Delete</button>
                                    </div>
                                )
                            }
                            <span className="close-icon" onClick={this.hideUserDetails}> X </span>
                        </div>
                    ):null
                }
            </div>
        );
    }
}

export default App;


/*import React from 'react';
import vishal from 'axios';
import "./counter.css";
class App extends  React.Component{
    constructor(){
        super();

        this.state = {
            value:''
        }
    }

    render(){
        return(
            <div>
                <h1>Home</h1>
            </div>
        )
    }
    componentDidMount() {
       vishal.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
            console.log("response====>>>>>");
            console.log(response);
            console.log(response.data);
            console.log(response.status);
        })
            .catch(function(response){
                console.log("error======>>>>>");
                console.log(response);
                console.log("error");
            });


    }
}
export default App;
*/