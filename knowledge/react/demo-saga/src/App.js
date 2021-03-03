import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { increate, increateAsync, fetch_user, fetch_todo } from './actions/counter';

// @connect(mapStateToProps, { increate, increateAsync, fetch_user, fetch_todo })
class App extends Component {

  render() {
    const { isFetch, error, user } = this.props.users;
    let data = "";
    if (isFetch) {
      data = '正在加载中。。。'
    } else if (user) {
      data = user.data[0]['name'];
    } else if (error) {
      data = error.message;
    }
    return (
      <div className="App">
        {/* 触发dispatch，发送对应的action */}
        <div className='App-header' style={{ marginBottom: 20 }}>
          <p>{this.props.counter}</p>
          <button onClick={() => this.props.increate()}>新增</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.props.increateAsync()}>异步新增</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.props.fetch_user()}>axios请求</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => this.props.fetch_todo()}>TODO</button>
        </div>
        <h2>{data}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter, // state 对应的 key, 在 reducers/index.js 中声明。
    users: state.us
  }
}

// mapStateToProps，在 reducers/index.js 中，通过 connect 导入对应的 state
// { increate, increateAsync, fetch_user } ,通过 connect 导入对应的action，在view触发相应的action
export default connect(mapStateToProps, { increate, increateAsync, fetch_user, fetch_todo })(App);