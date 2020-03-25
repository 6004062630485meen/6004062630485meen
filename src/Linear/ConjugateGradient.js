import React from 'react'
import { useState } from 'react'
import { Row, Col } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';
import { det } from 'mathjs';

function Conjugate() {
  let [n, setn] = useState(2)
  const [xans,setxans] = useState(Array(n).fill(0))
  var x, temp, matrixA, matrixB, matrixC, ans

  const conjugate = () => {
    matrixC = Array.from(Array(n), _ => Array(n).fill(0))
    x = Array(n).fill(0)
    for(let k=0; k<n; k++){
      for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
          if(j===k){
            matrixC[i][j] = matrixB[i]
          } else {
            matrixC[i][j] = matrixA[i][j]
          }
        }
      }
      x[k] = Math.round(det(matrixC)/det(matrixA))
    }
    return x
  }

  const runcode = () => {
    x = conjugate()
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
            <h1 className="title">Conjugate Gradient Method</h1>
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

export default Conjugate
