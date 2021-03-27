import React, { Component } from 'react'
import './PokeFetch.css';

// ComponentDidMount - get fetch and prepare to display
// ComponentDidUpdate - display darkened img and after 10 seconds display not darkened img
// ComponentWillUnmount - Cleanup the application, remove the revealed poke img and reset the component. 

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 11,
      start: false
    }
  }

  componentDidMount = () => {
    console.log('I mount here');
    this.fetchPokemon();
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('I update here');
    if (prevState.start === this.state.start) {return} else {setInterval(() => this.decrement(), 1000)};
    console.log(this.state.start);
    // clearInterval();
    // this.componentWillUnmount();
    this.revealPokemon();
  }

  // componentWillUnmount = () => {
  //   console.log("I unmount here!");
  //   this.fetchPokemon();
  //   this.setState({
  //     start: false
  //   })
  // }

  startButton = async () => {
    // this.componentDid();
    // await this.componentWillUnmount();
    this.fetchPokemon();
    this.setState(
      {
        timer: 10,
        start: true
    }
    );
  }

  decrement = () => {
    if (this.state.timer > 0) {
      this.setState(
        {timer: this.state.timer -1}
      )
    }
  }

  // componentDid = () => {
  //   setInterval(() => this.decrement(), 1000)
  // };

  revealPokemon = () => {
    if (this.state.timer === 0) {
      return (
        <div>
          <h1 className={'timer'} >Timer Display {this.state.timer}</h1>
          <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
        </div>
      )
    } else if (this.state.timer > 10) {
      return(
        <div>
        </div>
      )
    } else {
      return (
        <div>
        <h1 className={'timer'} >Timer Display {this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img style={{filter: 'brightness(0%)'}} className={'pokeImg'} src={this.state.pokeSprite} />
        </div>
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
        {/* <h1 className={'timer'} >Timer Display {this.state.timer}</h1> */}
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