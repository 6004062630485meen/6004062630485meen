import React from 'react'
import { useState } from 'react'
import { Row, Col } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';

function Jacobi() {
  let [n, setn] = useState(2)
  const [xans,setxans] = useState(Array(n).fill(0))
  var x, temp, matrixA, matrixB, x0, x1, ans, sum, error=1, k=0

  const jacobi = () => {
    x1 = Array(n).fill(0)
    while(error.toFixed(6) > 0.000001){
        for(let i=0; i<n; i++){
          sum = 0
          for(let j=0; j<n; j++){
            if(i!==j)
              sum = sum + (matrixA[i][j]*x0[j])
          }
          x1[i] = (1/matrixA[i][i]) * (matrixB[i]-sum)
        }
        if(k!==0)
          error = Math.abs((x1[n-1] - x0[n-1]) / x1[n-1])
        if(k===0)
          error = 1
        x0 = x1
        k++
    }
    return x0
  }

  const runcode = () => {
    x = jacobi()
    setxans(x)
  }

  const createInput = () => {
    temp = Array.from(Array(n), _ => Array(n + 1).fill(0))
    matrixA = Array.from(Array(n), _ => Array(n).fill(0))
    matrixB = Array(n).fill(0)
    x0 = Array(n).fill(0)
    return (
      <div>
        <tr>
          <th></th>
          {createHead()}
          {(n > 0) ? <th>B</th> : ""}
        </tr>
        {createRow()}
      </div>
      
    );
  }

  const createHead = () => {
    return temp.map((x, j) => <th>x<sub>{j + 1}</sub></th>);
  }

  const createRow = () => {
    return temp.map((x, i) => (
      <tr>
        <th>{i + 1}</th>
        {createCol(i)}
      </tr>
    ));
  }

  const createCol = (i) => {
    return temp[0].map((x, j) => (
      <td>
        <InputNumber defaultValue={0} size="small" onChange={value => {
          if (j === n){
            matrixB[i] = value
          } else {
            matrixA[i][j] = value
          }
        }}
        />
      </td>
    ));
  }

  const createAns = () => {
    ans = Array(n).fill(0)
    return ans.map((x, j) => <p>x<sub>{j + 1}</sub> = {xans[j]}</p>);
  }

  return (
    <div className="has-text-centered">
        <section class="hero is-info">
          <div style={{ padding: 24, minHeight: 360, overflowX: 'auto' }}>
            <h1 className="title">Jacobi Iteration Method</h1>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <div className="gutter-box">
                    matrix
                    <InputNumber style={{ marginLeft: 10 }} defaultValue={n} min={2} max={10} step={1} onChange={value => setn(value)} />
                  </div>
                </Col>
              </Row>
              <div style={{ marginTop: 24 }} >
                {createInput(n)}
              </div>
              <Row style={{ marginTop: 24 }} gutter={16}>
                <Col className="gutter-row" span={3}>
                  <div className="gutter-box">
                    <Button ghost onClick={runcode} style={{ width: 100 }}>Submit</Button>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 24 }} gutter={16}>
                <Col className="gutter-row" span={10}>
                  <div>
                    <Card title="answer" bordered={false} style={{ width: 300 }}>
                      {createAns(n)}
                    </Card>
                  </div>
                </Col>
              </Row>
          </div>
        </section>
      </div>
  );
}

export default Jacobi
