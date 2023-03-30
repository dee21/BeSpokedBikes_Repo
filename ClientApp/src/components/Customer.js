import React, { Component } from 'react';

export class Customer extends Component 
{
  constructor(props) {
    super(props);
    this.state = { customers: [], loading: true };
  }
  
    async fetchCustomers(){
    const response = await fetch('customer');
    const data = await response.json();
    if (data) {
      this.setState({ customers: data, loading: false });
    }
};
  
  componentDidMount() {
    this.fetchCustomers();
  };

  render() {

    const columns = [
      {
        Header: 'FirstName',
        accessor: 'firstName',
      },
      {
        Header: 'LastName',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },,
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'StartDate',
        accessor: 'startDate',
      }
    ];

    return (
        <div>
            <table class="table table-striped">
            <thead>
              {columns.map((column) => (
                <th key={column.accessor}>{column.Header}</th>
              ))}
            </thead>
            <tbody>
            {this.state.customers.map((row) => (
              <tr key={row.CustomerId}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
    );
  }
}
