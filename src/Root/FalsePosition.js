import React, { Component } from 'react'
import { Button, Input } from 'antd';
import { Table ,Card } from 'antd';
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
        title: "XL",
        dataIndex: "l",
        key: "l",
    },
    {
        title: "XR",
        dataIndex: "r",
        key: "r",
    },
    {
        title: "XM",
        dataIndex: "m",
        key: "m",
    },
    {
        title: "Error",
        dataIndex: "err",
        key: "err",
    }
];

class FalsePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: '',
      xl: 0,
      xr: 0,
      showTable: false,
      showGraph: false,
      showH: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b8fcb70b62d1904e39ba0").then(db => {
        this.setState({
            fx: db.data.data.fx
        });
        this.setState({
          xl: (parseFloat(db.data.data.xl))
        });
        this.setState({
          xr: (parseFloat(db.data.data.xr))
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
falsePosition(xl, xr) {
    var i = 0;
    var err, xmn;
    var xm = ( this.fx(xl)*xr - this.fx(xr)*xl )/( this.fx(xl) - this.fx(xr) )
    if (this.fx(xm) * this.fx(xr) > 0)
        xr = xm
    else
        xl = xm
    err = Math.abs((xmn - xm) / xmn);
    dataInTable.push({
        iteration: i,
        l: xl.toFixed(6),
        r: xr.toFixed(6),
        m: xm.toFixed(6),
        err: err.toFixed(6)
    })

    do {
        xmn = ( this.fx(xl)*xr - this.fx(xr)*xl )/( this.fx(xl) - this.fx(xr) )
        if (this.fx(xmn) * this.fx(xr) > 0)
            xr = xmn
        else
            xl = xmn
        err = Math.abs((xmn - xm) / xmn);
        xm = xmn
        dataInTable.push({
            iteration: i + 1,
            l: xl.toFixed(6),
            r: xr.toFixed(6),
            m: xm.toFixed(6),
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
              <h1 className="title">False Position</h1><br/>
              <p>F(x): <Input name="fx" size="large" style={{width: 300}} type="text" value={this.state.fx} onChange={this.handleChange} /></p>
              <p>x<sub>L</sub>: <Input name="xl" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p>
              <p>x<sub>R</sub>: <Input name="xr" size="large" style={{width: 100}} type="text" onChange={this.handleChange} /></p><br/>
              <Button ghost onClick={() => this.falsePosition(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button>
            </form>
            <br/><br/><br/><br/>
                    {this.state.showH && <h1 className="title">Graph of False Position</h1>}
                    <br/>
                    {this.state.showGraph && <Card
                        style={{ border: "1px solid black", background: "#f44aaa6", color: "#6A5ACD" }}
                    >
                        <LineChart width={700} height={250} data={dataInTable}>
                            <Line type="monotone " dataKey="err" stroke="#CD5C5C" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="iteration" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Card>
                    }
                    <br/><br/>
                    {this.state.showH && <h1 className="title">Table of False Position</h1>}
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
          
export default FalsePosition
