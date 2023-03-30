import React, { Component } from 'react';

export class SalesPerson extends Component 
{
    constructor(props) {
      super(props);
      this.state = { SalesPersons: [], loading: true,
        salesFname: '',
        salesLname: '',
        salesPersonId: '',
        salesAddress: '', 
        salesPhone: ''  };
    }
  
    async fetchSalesPersons(){
      const response = await fetch('salesperson');
    const data = await response.json();
    if (data) {
      this.setState({ SalesPersons: data, loading: false });
    }
    };

    async fetchSalesPersonByID(param){
      const response = await fetch(`salesperson/getSalsePersonById/${param}`);
      const data = await response.json();
      if (data) 
      {
        this.setState({ salesFname: data.firstName,
        salesLname: data.lastName,
        salesPersonId: data.salesPersonId,
        salesAddress: data.address, 
        salesPhone: data.phone, 
        });
      }
    };

    async UpdateSalesPersonInfo(){
      fetch('salesperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "SalesPersonId": this.state.salesPersonId,
          "FirstName": this.state.salesFname,
          "LastName": this.state.salesLname,
          "Address": this.state.salesAddress,
          "Phone": this.state.salesPhone
        })
      })
      .then(response => {
        this.fetchProducts();
      })
      .catch(error => {
        // Handle the error
      });
};
  
    
  
  componentDidMount() {
      this.fetchSalesPersons();
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
      },
      {
        Header: 'EndDate',
        accessor: 'endDate',
      },
      {
        Header: 'Manager',
        accessor: 'manager',
      }
    ];

    const handleClick = (param) => {
      this.fetchSalesPersonByID(param);
      };

    const handleUpdateSalesPersonInfo = e => {
      this.UpdateSalesPersonInfo();
      this.fetchSalesPersons();
    };

    const changeHandleFName = e => {
      this.setState({ salesFname: e.target.value})
    }
    const changeHandleLName = e => {
      this.setState({ salesLname: e.target.value})
    }
    const changeHandleAddress = e => {
      this.setState({ salesAddress: e.target.value})
    }
    const changeHandlePhone = e => {
      this.setState({ salesPhone: e.target.value})
    }

    return (
        <div>
            <table class="table table-striped">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.accessor}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {this.state.SalesPersons.map((row) => (
              <tr key={row.salesPersonId}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
                 <td>
                  <button onClick={() => handleClick(row.salesPersonId)}>Select</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>

          <div>
            First Name : <input type="text" value={this.state.salesFname} onChange={changeHandleFName} />&nbsp;
            Last Name : <input type="text" value={this.state.salesLname} onChange={changeHandleLName} />&nbsp;
            Address : <input type="text" value={this.state.salesAddress} onChange={changeHandleAddress} />&nbsp;
            Phone : <input type="text" value={this.state.salesPhone} onChange={changeHandlePhone} />&nbsp;
            <button onClick={handleUpdateSalesPersonInfo}>Update Sales Person Info</button>
          </div>
        </div>
    );
  }
}
