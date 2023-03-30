import React, { Component } from 'react';
import calettinaImage from '../Image/calettinahbs2019bq-71_1.jpg';

export class Home extends Component {
  static displayName = Home.name;

    render() {
    return (
      <div>
        <h1>Be Spoked Bikes Sales Tracking application</h1>
            <p><img src={calettinaImage} alt="Image" /></p>
      </div>
    );
  }
}
