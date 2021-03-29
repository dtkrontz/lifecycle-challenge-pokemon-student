import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetchClass extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',

      isRunning: false,
      seconds: 10,
      isVisible: false
    }
  }

  componentDidMount() {
    console.log('Component Mounted');
    this.interval = setInterval(() => this.countDown(), 1000);
    console.log(this.interval);
  }

  componentDidUpdate() {
    console.log('Component Updated');
    if (this.state.seconds === 0 && this.state.isVisible === false) {
      this.setState({
        isVisible: true
      })
    }
  }

  componentWillUnmount() {
    console.log('Component Unmounted!');
    clearInterval(this.interval);
  }

  countDown() {
    if (this.state.isRunning === true && this.state.seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1
      }))
    }
  }

  fetchPokemon() {
    this.setState({
      isRunning: false,
      isVisible: false,
      seconds: 10,
    })
    
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          isRunning: true,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.seconds}</h1>
        <div className={'pokeWrap'}>
          {this.state.isVisible ? (
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          ) : (
          <img 
          style={{filter: 'brightness(0%)'}} 
          className={'pokeImg'} 
          src={this.state.pokeSprite}
           />
          )}
          {this.state.isVisible ? <h1 className={'pokeName'}>{this.state.pokeName}</h1> : null} 
        </div>
      </div>
    )
  }
}

export default PokeFetchClass;