/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
import React from 'react';
import axios from 'axios';
import { GlobalStyle, Wrapper } from '../styles/MenusStyle';
import Container from './Container';


class Menus extends React.Component {
  constructor(props) {
    super(props);
    let id = location.pathname.slice(1);
    id = (id !== '') ? parseInt(id) : Math.floor(Math.random() * 100);
    this.state = {
      restaurantData: null,
      restaurantID: id,
    };
  }

  componentDidMount() {
    this.loadMenus();
  }

  loadMenus() {
    const { restaurantID } = this.state;
    axios.get(`/${restaurantID}/menus`)
      .then((res) => {
        // this.setState({ restaurantData: res.data[0] });
        this.setState({ restaurantData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const { restaurantData } = this.state;

    return (
      <Wrapper>
        <GlobalStyle />
        <Container restaurantData={restaurantData} />
      </Wrapper>
    );
  }
}

export default Menus;
