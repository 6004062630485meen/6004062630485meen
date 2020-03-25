import React from 'react'
import { useState } from 'react'
import { Row, Col } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';

function LU() {
  let [n, setn] = useState(2)
  const [xans,setxans] = useState(Array(n).fill(0))
  var x, temp, matrixA, matrixB, ans

  const lu = () => {
    let i, j, k, sum
    var matrixL = Array.from(Array(n), _ => Array(n).fill(0))
    var matrixU = Array.from(Array(n), _ => Array(n).fill(0))
    x = Array(n).fill(0)
    var Y = Array(n).fill(0)
    for (i = 0; i < n; i++) { 
      for (j = 0; j < n; j++) {
            if (j === 0){
              matrixL[i][j] = matrixA[i][j]
            } else if (i >= j){
                sum = 0
                for (k = 0; k < n; k++)
                    sum += (matrixL[i][k] * matrixU[k][j])
                    
                    matrixL[i][j] = (matrixA[i][j] - sum)
            }
            if (i === j){
                matrixU[i][j] = 1
            } else if (i < j){
                sum = 0
                for (k = 0; k < n; k++)
                    sum += (matrixL[i][k] * matrixU[k][j])
                    
                    matrixU[i][j] = (matrixA[i][j] - sum)/matrixL[i][i]
           	}
      } 
    }
    console.log(matrixL.toString())
    console.log(matrixU.toString())
    Y = matrixB
    for(i=0; i<n; i++) {
        for(j=0; j<i; j++) {
            Y[i] -= matrixL[i][j] * Y[j]
        }
    }
    console.log(Y.toString())
    for(i=n-1; i>=0; i--)
    {
        x[i]= Y[i];
        for(j=i+1; j<n; j++)
        {
            x[i] -= matrixU[i][j] * x[j]
        }
        x[i] /= Math.round(matrixU[i][i])
    }
    console.log(x.toString())
    return x
  }

  const runcode = () => {
    x = lu()
    setxans(x)
  }

  const createInput = () => {
    temp = Array.from(Array(n), _ => Array(n + 1).fill(0))
    matrixA = Array.from(Array(n), _ => Array(n).fill(0))
    matrixB = Array(n).fill(0)
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
          if (j === n) {
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
            <h1 className="title">LU Decomposition</h1>
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

export default LU
