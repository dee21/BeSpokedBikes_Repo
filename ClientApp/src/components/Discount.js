import React, { Component } from 'react';

export class Discount extends Component 
{
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }
  
    async fetchDiscounts(){
    const response = await fetch('discount');
    const data = await response.json();
    if (data) {
    }
};
  
  componentDidMount() {
    this.fetchDiscounts();
  };

  render() {
    return (
        <div>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
