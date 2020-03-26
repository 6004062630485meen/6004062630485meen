import React, { Component } from 'react'
import { Button, Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { compile } from 'mathjs';

class Trapezoidal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: '',
      a: 0,
      b: 0,
      n: 0,
      result: 0,
      showH: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  fx(X) {
    var expr = compile(this.state.fx);
    var scope = { x: parseFloat(X) };
    return expr.evaluate(scope);
  }

  trape(a, b, n) {
    var i = 0, x = a;
    var f = [];
    var h = (b - a)/n;
    while(i <= n){
      f.push(this.fx(x));
      x+=h
      i++
    }
    for (var j = 1, sum = 0; j < n; sum += f[j++]);
    this.result = (h/2)*(f[0]+f[n]+2*sum);
    //point = Math.abs((this.real(a,b) - result) / this.real(a,b));
    this.setState({
        showH: true
    })
  }

  render() {
    return (
      <div className="has-text-centered">
        <section class="hero is-warning">
          <div style={{ padding: 24, minHeight: 360, overflowX: 'auto' }}>
            <form>
              <h1 className="title">Composite Trapezoidal Rule</h1><br/>
              <p>F(x): <Input name="fx" size="large" style={{width: 300}} type="text" value={this.state.fx} onChange={this.handleChange} /></p>
              <p>a: <Input name="a" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <p>b: <Input name="b" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <p>n: <Input name="n" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p><br/>
              <Button ghost onClick={() => this.trape(parseFloat(this.state.a), parseFloat(this.state.b), parseInt(this.state.n))}>Submit</Button>
            </form>
            <br/><br/>
                    {this.state.showH && 
                      <div className="site-card-wrapper">
                        <Row justify="center">
                          <Col span={24}>
                            <Card title="I" bordered={false}>
                              {(this.result).toFixed(6)}
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    }
          </div>
        </section>
      </div>
    );
  }
}
          
export default Trapezoidal
