/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Alert, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Left, List, ListItem, Body, Text, Thumbnail, Item, Icon, Input, Button, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      pencarian: ''
    };
  }

  searchRestaurant = () => {
    let url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
    let config = {
      headers: { 'user-key': '4d1301c8cfa12abd7ed79d6b0585f4d8' }
    };
    axios.get(url, config)
      .then((info) => {
        this.setState({
          restaurant: info.data.restaurants,
        })
        console.log(info.data.restaurants)
      })
  }
  render() {
    const data = this.state.restaurant.map((item, index) => {
      let nama = item.restaurant.name;
      let kota = item.restaurant.location.city;
      let alamat = item.restaurant.location.address;
      let harga = item.restaurant.average_cost_for_two * 198.37;
      let number_string = harga.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);
      if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.')
      }
      let Image = item.restaurant.thumb;
      let imageNotFound = 'https://www.google.com/search?q=page+not+found&safe=strict&client=firefox-b-d&source=lnms&tbm=isch&sa=X&ved=0ahUKEwid0OOHqL3gAhUUbo8KHeW6An4Q_AUIECgD&biw=1760&bih=921#imgrc=vkkKGsRXvtLP1M:'
      if (Image == false) {
        foto = imageNotFound
      }
      return (
        <ListItem avatar key={index}>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{ url: Image }} />
                  <Body>
                    <Text> {nama} </Text>
                    <Text note> {kota} </Text>
                  </Body>
                </Left>
                <Right>
                  <Text>Rp {rupiah}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{ url: Image }} style={{ height: 150, width: 300, flex: 1 }} />
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Icon active name="pin" />
                  <Text>{alamat}</Text>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: 'red' }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari Menu Makanan" onChangeText={(x) => this.setState({ search: x })} />
          </Item>
          {/* <Text>{this.state.search}</Text> */}
        </Header>
        <Text></Text>

        <Button style={{ backgroundColor: 'red', width: 520, justifyContent: 'center' }}
          onPress={() => { this.cariresto() }}><Text>Lihat Daftar Restoo</Text></Button>
        <Content>
          <ScrollView>
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}
