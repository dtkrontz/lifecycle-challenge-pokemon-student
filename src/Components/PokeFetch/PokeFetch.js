import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
    }
  }

  startButton = () => {
    this.setState(
      {timer: 10}
    );
    this.fetchPokemon();
    this.componentDid();
  }

  decrement = () => {
    if (this.state.timer > 0) {
      this.setState(
        {timer: this.state.timer -1}
      )
    }
  }

  componentDid = () => {
    setInterval(() => this.decrement(), 1000)
  };

  revealPokemon = () => {
    if (this.state.timer === 0) {
      return (
          <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      )
    } else {
      return (
        <div className={'pokeWrap'}>
          <img style={{filter: 'brightness(0%)'}} className={'pokeImg'} src={this.state.pokeSprite} />
        </div>
      )
    }
  }

  fetchPokemon() {
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
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.startButton()}>Start!</button>
        <h1 className={'timer'} >Timer Display {this.state.timer}</h1>
        {this.revealPokemon()}
        {/* <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div> */}
      </div>
    )
  }
}

export default PokeFetch;