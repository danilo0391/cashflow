import React, { Component } from 'react';
import UserService from "./UserService";

class ListUsersComponent extends Component {
  constructor(){
    super();
    this.state={
      users : []
    }
  }

  componentDidMount(){
    UserService.getUsers().then((res)=>{
      this.setState({users: res.data});
    });
  }

    render() {
      return (
        <div>
          <h2 className="text-center"> User List</h2>
          <div className="row">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </tbody>
              <tbody>
                {
                  this.state.users.map(
                    users=>
                    <tr key={users.id}>
                      <td> {users.name} </td>
                      <td> {users.surname} </td>
                      <td> {users.username} </td>
                      <td> {users.email} </td>
                      <td> {users.password} </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
  
  export default ListUsersComponent;
