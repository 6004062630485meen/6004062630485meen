import React, { Component } from 'react'
import { Button, Input } from 'antd';
import { Card, Col, Row } from 'antd';
import { compile, derivative } from 'mathjs';

class Oh4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: '',
      f1: '',
      h: 0,
      x: 0,
      y: 0,
      error: 0,
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

  f1(X) {
    var expr1 = derivative(this.state.fx, 'x');
    var scope1 = { x: parseFloat(X) };
    return expr1.evaluate(scope1);
  }

  oh4(h, x) {
    this.y = ( -(this.fx(x+(2*h))) + (8*this.fx(x+h)) - (8*this.fx(x-h)) + this.fx(x-(2*h)) )/(12*h);
    var x_real = this.f1(x);
    this.error = Math.abs((x_real - this.y) / x_real);
    this.setState({
        showH: true
    })
  }

  render() {
    return (
      <div className="has-text-centered">
        <section class="hero is-danger">
          <div className="container">
            <form>
              <h1 className="title">O(h<sup>4</sup>)</h1><br/>
              <p>F(x): <Input name="fx" size="large" style={{width: 300}} type="text" value={this.state.fx} onChange={this.handleChange} /></p>
              <p>h: <Input name="h" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <p>x: <Input name="x" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <Button ghost onClick={() => this.oh4(parseFloat(this.state.h), parseFloat(this.state.x))}>Submit</Button>
            </form>
            <br/><br/>
                    {this.state.showH && 
                      <div className="site-card-wrapper" style={{ padding: 24, minHeight: 360, overflowX: 'auto' }}>
                        <Row gutter={16}>
                          <Col span={6}></Col>
                          <Col span={6}>
                            <Card title="f'(x)" bordered={false}>
                              {this.y}
                            </Card>
                          </Col>
                          <Col span={6}>
                            <Card title="Error" bordered={false}>
                              {this.error}
                            </Card>
                          </Col>
                          <Col span={6}></Col>
                        </Row>
                      </div>
                    }
          </div>
        </section>
      </div>
    );
  }
}
          
export default Oh4