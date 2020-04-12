import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const myIcon = <Icon name="plus" size={30} color="black" />;
const checkIcon = <Icon name="check-square-o" size={30} />;
const unckeckIcon = <Icon name="square-o" size={30} />;


function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
    >
      <Text style={[
        styles.item,
        {
          color: selected ? '#F1573B' : '#ffff',
        },
      ]}>{selected ? checkIcon : unckeckIcon} {(title.length > 20) ? ((title).substring(0, 20 - 3) + '...') : title}</Text>
    </TouchableOpacity>
  );
}
const allData = []
export default function App() {
  const [selectedFilter, setSelectedFilter] = React.useState("1");
  const [selected, setSelected] = React.useState(new Map());
  const [data, addData] = React.useState([]);
  const [newtodo, setNewtodo] = React.useState('');
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.appHeader}>BABY SHARK</Text>
      <Text style={styles.subHeader}>TODO-dodododododododododo</Text>
      <View style={styles.addContainer}>
        <TextInput placeholder='Add a To-Do' value={newtodo} onChangeText={setNewtodo} style={styles.addtxt} />
        <TouchableOpacity
          onPress={() => {
            if (newtodo != "") {
              let todo = {
                id: Math.random().toString(36).substring(7),
                title: newtodo,
              }
              if (selectedFilter == "1" || selectedFilter == "2")
                addData(data => [...data, todo]);

              setNewtodo("");
              allData.push(todo)
            }
          }
          }
        >
          <Text style={styles.addBtn}>{myIcon}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            addData(data => [...allData]);
            setSelectedFilter("1")
          }}
        >
          <Text style={[{ backgroundColor: selectedFilter == "1" ? '#F1573B' : '#ffff' }, styles.filterBtn]} >ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addData(allData.filter(item => !selected.get(item.id)));
            setSelectedFilter("2");
          }}
        >
          <Text style={[{ backgroundColor: selectedFilter == "2" ? '#F1573B' : '#ffff' }, styles.filterBtn]}>ACTIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addData(allData.filter(item => selected.get(item.id)));
            setSelectedFilter("3");
          }}
        >
          <Text style={[{ backgroundColor: selectedFilter == "3" ? '#F1573B' : '#ffff' }, styles.filterBtn]}>DONE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listHolder}>
        {/* <FlatList data={data} keyExtractor={item => item.id} extraData={selected} renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>} /> */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
      </View>
      {/* <simpleLineIcone size={30} name="plus" color="#F1573B"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F001F',
    alignItems: 'center',
    // justifyContent: 'space-around',
    flex: 1,
    height: screenHeight,
  },
  appHeader: {
    marginTop: 20,
    color: '#F1573B',
    fontSize: 40,
    fontWeight: "bold",
    flex: 2,
  },
  subHeader: {
    marginTop: 2,
    color: '#ffff',
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
  },
  addContainer: {
    backgroundColor: '#0F001F',
    justifyContent: "space-between",
    flexDirection: 'row',
    height: 30,
    flex: 2,
  },
  addBtn: {
    backgroundColor: '#F1573B',
    borderRadius: 25,
    width: 30,
    textAlign: 'center',
    justifyContent: 'space-around',
    height: 30,
    marginLeft: 5,
  },
  filterContainer: {
    backgroundColor: '#0F001F',
    flexDirection: 'row',
    height: 30,
    flex: 2,
  },
  filterBtn: {
    // backgroundColor: '#fff',
    borderRadius: 25,
    width: 100,
    margin: 5,
    textAlign: 'center',
    fontSize: 25,
  },
  addtxt: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 300,
    justifyContent: 'space-around',
    height: 30,
    fontSize: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listHolder: {
    flex: 10,
    width: screenWidth,
  },
  item: {
    marginLeft: 5,
    fontSize: 35,
    justifyContent: 'center',
    textOverflow: 'ellipsis',
  }
});
