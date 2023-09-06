import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //
import './App.css';

function App() {
  const [rows, setRows] = useState([{ sign: '+', value: 0, enabled: true }]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    updateResult();
  }, [rows]);

  const updateResult = () => {
    let sum = 0;
    for (const row of rows) {
      if (row.enabled) {
        sum += row.sign === '+' ? row.value : -row.value;
      }
    }
    setResult(sum);
  };

  const addRow = () => {
    const newRow = { sign: '+', value: 0, enabled: true };
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const toggleRow = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].enabled = !updatedRows[index].enabled;
    setRows(updatedRows);
  };

  const handleValueChange = (index, newValue) => {
    const updatedRows = [...rows];
    updatedRows[index].value = newValue;
    setRows(updatedRows);
  };

  const handleSignChange = (index, newSign) => {
    const updatedRows = [...rows];
    updatedRows[index].sign = newSign;
    setRows(updatedRows);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4">React Calculator (Adder)</h1>
          <button className="btn btn-primary mb-3" onClick={addRow}>
            Add Row
          </button>
        </div>
      </div>

      <div className="row">
        {rows.map((row, index) => (
          <div key={index} className="col-md-12 mb-2">
            <div className="row">
              <div className='col-md-2'>
                <div class="form-group">
                  <select
                    value={row.sign}
                    onChange={(e) => handleSignChange(index, e.target.value)}
                    className="form-control d-inline-block mr-2"
                  >
                    <option value="+">Add (+)</option>
                    <option value="-">Subtract (-)</option>
                  </select>
                </div>
              </div>
              <div className='col-md-7'>
                <div class="form-group">
                <input
                    type="text"
                    value={row.value}
                    onChange={(e) => handleValueChange(index, parseInt(e.target.value))}
                    className="form-control d-inline-block mr-2"
                  />
                </div>
              </div>
              <div className='col-md-3'>
                <div class="form-group">
                  <button onClick={() => removeRow(index)} className="btn btn-danger ml-2 mr-5">
                    Remove
                  </button>
                  <button
                    onClick={() => toggleRow(index)}
                    className={`btn ${row.enabled ? 'btn-danger' : 'btn-success'}`}
                  >
                    {row.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-12">
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export default App;
