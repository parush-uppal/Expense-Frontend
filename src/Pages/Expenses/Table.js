import React from 'react'
import { useLocation } from 'react-router-dom';


export default function Table() {
const location = useLocation();
console.log(location.state.data)
  return (
    <div>
      <main class=" pt-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> Data Table
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    id="example"
                    class="table table-striped data-table"
                    style={{width: "100%"}}
                  >
                    <thead>
                        
                      <tr>
                        <th>Year</th>
                        <th>Annual Salary</th>
                        <th>Annual Savings</th>
                        <th>Annual Expenses</th>
                        <th>Total Saved</th>
                      </tr>
                    </thead>
                    <tbody>
                    {location.state.data.map((data, idx) => {
          return (
            <tr>
                        <td>{data.year}</td>
                        <td>{data.annualSalary}</td>
                        <td>{data.annualSavings}</td>
                        <td>{data.annualExpense}</td>
                        <td>{data.totalSaved}</td>
                      </tr>
          );
        })}
                      
                    </tbody>
                    
                    <tfoot>
                      <tr>
                      <th>Year</th>
                        <th>Annual Salary</th>
                        <th>Annual Savings</th>
                        <th>Annual Expenses</th>
                        <th>Total Saved</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </main>
    </div>
  )
}