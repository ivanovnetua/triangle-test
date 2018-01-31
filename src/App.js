import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {

  static propTypes = {
    title: PropTypes.object
  }

  static defaultProps = {
    triangle: {
      aInput: null,
      bInput: null,
      cInput: null
    }
  }

  state = {
    result: 'Введите данные для получения результата',
    resultClassName: 'grey',
    isValid: {
      aInput: true,
      bInput: true,
      cInput: true
    }
  }

  validateData(name) {
    const {
      aInput: { value: a },
      bInput: { value: b },
      cInput: { value: c }
    } = this.props.triangle;

    if (a > 0 && b > 0 && c > 0) {
      this.setState({
        isValid: {
          aInput: true,
          bInput: true,
          cInput: true
        }
      });

      return true
    } else {
      if (this.props.triangle[name]['value'] <= 0) {
        this.setState({
          isValid: {
            ...this.state.isValid,
            [name]: false
          }
        });
      } else {
        this.setState({
          isValid: {
            ...this.state.isValid,
            [name]: true
          }
        });
      }

      return false
    }

  }

  checkResult(event) {
    const isValidData = this.validateData(event.target.name);

    if (isValidData) {
      let {
        aInput: { value: a },
        bInput: { value: b },
        cInput: { value: c }
      } = this.props.triangle;
  
      a = parseInt(a, 10);
      b = parseInt(b, 10);
      c = parseInt(c, 10);

      if ((a < (b + c)) && (b < (a + c)) && (c < (a + b))) {
        this.setState({ result: 'Треугольник существует', resultClassName: 'green' });
      } else {
        this.setState({ result: 'Треугольник не существует', resultClassName: 'red' });
      }
    } else {
      this.setState({ result: 'Введите данные для получения результата', resultClassName: 'grey' });
    }
  }

  render() {
    const {
      props: {
        triangle
      },
      state: {
        isValid,
        result,
        resultClassName
      }
    } = this;

    return (
      <div className="App">
        <form>
          <div className='form-section'>
            <label>
              <span>Cторона "A":</span>
              <input
                type='number'
                min='0'
                name='aInput'
                ref={(input) => { triangle.aInput = input }}
                onChange={(e) => { this.checkResult(e) }}
              />
            </label>
            {!isValid.aInput ? <div className='validation-message'> Cторона "А" должна содержать числа больше 0 </div> : null}
          </div>
          <div className='form-section'>
            <label>
              <span>Cторона "В":</span>
              <input
                type='number'
                min='0'
                name='bInput'
                ref={(input) => { triangle.bInput = input }}
                onChange={this.checkResult.bind(this)}
              />
            </label>
            {!isValid.bInput ? <div className='validation-message'> Cторона "В" должна содержать числа больше 0 </div> : null}
          </div>
          <div className='form-section'>
            <label>
              <span>Cторона "C":</span>
              <input
                type='number'
                min='0'
                name='cInput'
                ref={(input) => { triangle.cInput = input }}
                onChange={this.checkResult.bind(this)}
              />
            </label>
            {!isValid.cInput ? <div className='validation-message'> Cторона "С" должна содержать числа больше 0 </div> : null}
          </div>
          <div className={`result-section ${resultClassName}`}>
            {result}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
