import React, { Component  } from 'react';

export class Product extends Component 
{
  constructor(props) {
    super(props);
    this.state = { 
      products: [], 
      loading: true, 
      prodId: '',
      prodText: '',
      prodPrice: '', 
      prodQty: '', 
      prodCommission: ''
    };
  }
  
  async fetchProducts(){
    const response = await fetch('product');
    const data = await response.json();
    if (data) 
    {
      this.setState({ products: data, loading: false });
    }
};

async fetchProductByID(param){
  const response = await fetch(`product/getProductById/${param}`);
  const data = await response.json();
  if (data) 
  {
    this.setState({ prodText: data.name,
    prodId: data.productID,
    prodPrice: data.salePrice, 
    prodQty: data.qty, 
    prodCommission: data.commission});
  }
};

async UpdateProduct(){
      fetch('product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Id": this.state.prodId,
          "Name": this.state.prodText,
          "Price": this.state.prodPrice,
          "Qty": this.state.prodQty,
          "Commission": this.state.prodCommission
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
    this.fetchProducts();
  };

  render() 
  {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer',
      },
      {
        Header: 'Style',
        accessor: 'style',
      },
      {
        Header: 'PurchasePrice',
        accessor: 'purchasePrice',
      },
      {
        Header: 'SalePrice',
        accessor: 'salePrice',
      },
      {
        Header: 'Qty',
        accessor: 'qty',
      },
      {
        Header: 'Commission',
        accessor: 'commission',
      }
    ];

    const handleClick = (param) => {
      this.fetchProductByID(param);
    };

    const handleUpdateProduct = e => {
      this.UpdateProduct();
      this.fetchProducts();
    };

    const changeHandleName = e => {
      this.setState({ prodText: e.target.value})
    }
    const changeHandlePrice = e => {
      this.setState({ prodPrice: e.target.value})
    }
    const changeHandleQty = e => {
      this.setState({ prodQty: e.target.value})
    }
    const changeHandleCommission = e => {
      this.setState({ prodCommission: e.target.value})
    }

    return (
        <div>
          <table class="table">
            <thead>
              <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.Header}</th>
              ))}
              </tr>
            </thead>
            <tbody>
            {this.state.products.map((row) => (
              <tr key={row.productID}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
                <td>
                  <button onClick={() => handleClick(row.productID)}>Select</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>

          <div>
            ProductName : <input type="text" value={this.state.prodText} onChange={changeHandleName} />&nbsp;
            Price : <input type="text" value={this.state.prodPrice} onChange={changeHandlePrice} />&nbsp;
            Qty : <input type="text" value={this.state.prodQty} onChange={changeHandleQty} />&nbsp;
            Commission : <input type="text" value={this.state.prodCommission} onChange={changeHandleCommission} />&nbsp;
            <button onClick={handleUpdateProduct}>Update Product</button>
          </div>
        </div>
    );
  }
}
