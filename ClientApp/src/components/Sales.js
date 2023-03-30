import React, { Component } from 'react';

export class Sales extends Component 
{
  constructor(props) {
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  
    super(props);
    this.state = { sales: [], loading: true, 
      selectedProduct: [], 
      selectedSalesPerson: [], 
      selectedCustomer : [],
      productsList : [],
      salesPersonsList :[],
      customersList : [],
      salesDate : date,
      labelStyle : ({display : 'none'})
    };
  }
  
  async fetchSales(){
    this.setState({ labelStyle: ({display : 'none'})})
    const response = await fetch('sales');
    const data = await response.json();
    if (data) {
      this.setState({ sales: data, loading: false });
    }
  };

  async fetchItems(){
    const responseP = await fetch('product');
    const dataP = await responseP.json();
    if (dataP) 
    {
      this.setState({ productsList: dataP });
    }

    const responseS = await fetch('salesperson');
    const dataS = await responseS.json();
    if (dataS) {
      this.setState({ salesPersonsList: dataS });
    }

    const responseC = await fetch('customer');
    const dataC = await responseC.json();
    if (dataC) {
      this.setState({ customersList: dataC });
    }
  };

  async InsertSales()
  {
    fetch('sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "SalesId": "",
        "ProductId": this.state.selectedProduct.productID,
        "SalesPersonId": this.state.selectedSalesPerson.salesPersonId,
        "CustomerId": this.state.selectedCustomer.customerId,
        "SalesDate": this.state.salesDate
      })
    })
    .then(response => {
      if(response.status === 400){
        this.setState({ labelStyle: ({display : 'block', color: 'red'})})
      }
      else{
        this.setState({ labelStyle: ({display : 'none'})})
        this.fetchSales();
      }
    })
    .catch(error => {
      this.setState({ labelStyle: ({display : 'none'})})
      // Handle the error
    });
};
  
  componentDidMount() {
    this.fetchSales();
    this.fetchItems();
  };

  render() {
    const columns = [
      {
        Header: 'ProductName',
        accessor: 'productName',
      },
      {
        Header: 'SalesPersonName',
        accessor: 'salesPersonName',
      },
      {
        Header: 'CustomerName',
        accessor: 'customerName',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Commission',
        accessor: 'commission',
      }
    ];

    const handleClick = (param) => {
        this.InsertSales();
      };
    
    const handleSelectProduct = (event) => {
      const selectedItemId = event.target.value;
      const selectedItem = this.state.productsList.find((item) => item.productID === selectedItemId);
      this.setState({ selectedProduct: selectedItem})
    };

    const handleSelectSalesPerson = (event) => {
      const selectedItemId = event.target.value;
      const selectedItem = this.state.salesPersonsList.find((item) => item.salesPersonId === selectedItemId);
      this.setState({ selectedSalesPerson: selectedItem})
    };

    const handleSelectCustomer = (event) => {
      const selectedItemId = event.target.value;
      const selectedItem = this.state.customersList.find((item) => item.customerId === selectedItemId);
      this.setState({ selectedCustomer: selectedItem})
    };

    const changeDate = e => {
      this.setState({ salesDate: e.target.value})
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
            {this.state.sales.map((row) => (
              <tr key={row.SalesId}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
          <div width="100%"><label style={this.state.labelStyle}>Sale is already exist !!!</label></div>
          <div>
            <div style={{padding:'10px'}}>
              Product :   &nbsp;
                <select value={this.state.selectedProduct?.productID} onChange={handleSelectProduct}>
                  <option value="">--Select an Item--</option>
                  {this.state.productsList.map((item) => (
                    <option key={item.productID} value={item.productID}>
                      {item.name}
                    </option>
                  ))}
                </select>
            </div>
            <div style={{padding:'10px'}}>
              SalesPerson : &nbsp;  
                <select value={this.state.selectedSalesPerson?.salesPersonId} onChange={handleSelectSalesPerson}>
                  <option value="">--Select an Item--</option>
                  {this.state.salesPersonsList.map((item) => (
                    <option key={item.salesPersonId} value={item.salesPersonId}>
                      {item.firstName}
                    </option>
                  ))}
                </select>
            </div>
            <div style={{padding:'10px'}}>
              Customer :   &nbsp;
                <select value={this.state.selectedCustomer?.customerId} onChange={handleSelectCustomer}>
                  <option value="">--Select an Item--</option>
                  {this.state.customersList.map((item) => (
                    <option key={item.customerId} value={item.customerId}>
                      {item.firstName}
                    </option>
                  ))}
                </select>
            </div>
            <div style={{padding:'10px'}}>
                Start Date :<input type="text" value={this.state.salesDate} onChange={changeDate} />&nbsp; 
            </div>
            <div style={{padding:'10px'}}>
              <button onClick={handleClick}>Create Sale</button>
            </div>
          </div>
        </div>
    );
  }
}
