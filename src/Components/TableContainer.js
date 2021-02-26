import React, { PureComponent } from "react";
import '../Styles/componentStyle.css';
import { RotateCircleLoading } from 'react-loadingg';
import { Table } from 'react-bootstrap'

const TableContainer = (props) => {

  console.log("Get Table Data--->", props.tableData.length);
  if (props.tableData.length > 0) {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Success_Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ZipCode</th>
              <th>SSN</th>
              <th>City</th>
              <th>Address</th>
              <th>Error Message</th>
            </tr>
          </thead>
          <tbody>
            { props.tableData.map((value, index) => {
              return (
                <tr key={ index }>
                  <td>{ index + 1 }</td>
                  <td>{ value.Success_Id }</td>
                  <td>{ value.FirstName }</td>
                  <td>{ value.LastName }</td>
                  <td>{ value.ZipCode }</td>
                  <td>{ value.SSN }</td>
                  <td>{ value.city }</td>
                  <td>{ value.streetaddress }</td>
                  <td>{ value.errorMessage }</td>
                </tr>
              );
            }) }
          </tbody>
        </Table>
      </div>
    );
  }
  else {
    return (
      <div><RotateCircleLoading className="loaderClass" /></div>
    );
  }

}
export default TableContainer;
