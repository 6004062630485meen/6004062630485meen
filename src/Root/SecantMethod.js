import React, { Component } from 'react'
import { Button, Input } from 'antd';
import { Table, Card } from 'antd';
import { compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import api from '../api';

var dataInTable=[];
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration",
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x",
    },
    {
        title: "Error",
        dataIndex: "err",
        key: "err",
    }
];

class SecantMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: '',
      x0: 0,
      x1: 0,
      showTable: false,
      showGraph: false,
      showH: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b925970b62d1904e39ba2").then(db => {
        this.setState({
            fx: db.data.data.fx
        });
        this.setState({
          x0: (parseFloat(db.data.data.x0))
        });
        this.setState({
          x1: (parseFloat(db.data.data.x1))
        });
        
    });
    
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  fx(X) {
    var expr = compile(this.state.fx);
    var scope = { x: parseFloat(X) };
    return expr.evaluate(scope);
  }

  secant(x0, x1) {
    var i = 0;
    var err, x, f1;
    do {
        f1 = (this.fx(x0)-this.fx(x1))/(x0-x1);
        x = x1 - (this.fx(x1)/f1);
        x0 = x1
        x1 = x
        err = Math.abs((x1 - x0) / x1);
        dataInTable.push({
            iteration: i,
            x0: x0.toFixed(6),
            x1: x1.toFixed(6),
            x: x.toFixed(6),
            err: err.toFixed(6)
        })
        i++;
    } while (err.toFixed(6) > 0.000001)
    this.setState({
        showTable: true,
        showGraph: true,
        showH: true
    })
  }

  render() {
    return (
      <div className="has-text-centered">
        <section class="hero is-danger">
          <div style={{ padding: 24, minHeight: 360, overflowX: 'auto' }}>
            <form>
              <h1 className="title">Secant Method</h1><br/>
              <p>F(x): <Input name="fx" size="large" style={{width: 300}} type="text" value={this.state.fx} onChange={this.handleChange} /></p>
              <p>x<sub>0</sub>: <Input name="x0" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <p>x<sub>1</sub>: <Input name="x1" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <Button ghost onClick={() => this.secant(parseFloat(this.state.x0), parseFloat(this.state.x1))}>Submit</Button>
            </form>
            <br/><br/><br/><br/>
                    {this.state.showH && <h1 className="title">Graph of Secant Method</h1>}
                    <br/>
                    {this.state.showGraph && <Card
                        style={{ border: "1px solid black", background: "#f44aaa6", color: "#6A5ACD" }}
                    >
                        <LineChart width={700} height={350} data={dataInTable}>
                            <Line type="monotone " dataKey="err" stroke="#CD5C5C" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="iteration" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Card>
                    }
                    <br/><br/>
                    {this.state.showH && <h1 className="title">Table of Secant Method</h1>}
                    <br/>
                    {this.state.showTable &&
                        <Table
                        style={{ width: 800}}columns={columns} dataSource={dataInTable} pagination={{ pageSize: 10 }} scroll={{ y: 300 }} />
                    }
          </div>
        </section>
      </div>
    );
  }
}
          
export default SecantMethod
