import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable,  } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

function MultiSelect({ items, onSelectedItemsChange }) {

  const [showItems, setShowItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  function handleItemPress(pressedItemId) {
    let newSelectedItems = [...selectedItems];
    let i = newSelectedItems.indexOf(pressedItemId);
    if(i >= 0) {
      newSelectedItems.splice(i, 1);
    }
    else {
      newSelectedItems.push(pressedItemId);
    }

    setSelectedItems(newSelectedItems);
    onSelectedItemsChange && onSelectedItemsChange(newSelectedItems);
  }

  return (
    <View style={styles.multiSelectWrapper}>
      <Pressable style={styles.multiSelect} onPress={() => setShowItems(!showItems)}>
        <View style={styles.multiSelectTextBox}>
          <Text>{selectedItems.length} item(s) selected</Text>
        </View>
        <View>
          <Icon name={showItems ? 'arrow-upward' : 'arrow-downward'} size={24} color="black" />
        </View>
      </Pressable>
      {
      showItems && <View style={styles.multiSelectItems}>
        { items.map((item) =>
          <Pressable
            key={item.id}
            onPress={() => handleItemPress(item.id)}
            style={[styles.multiSelectItem, selectedItems.includes(item.id) && styles.multiSelectItemChecked]}><Text>{item.name}</Text>
          </Pressable> )
        }
      </View>
      }
    </View>
    );
}

export default function App() {
  const items = [
    { name: 'Nissan Sunny', id: 100 },
    { name: 'Toyota Corolla', id: 101 },
    { name: 'Honda Civic', id: 102 },
    { name: 'Kawasaki KX', id: 400 },
    { name: 'Ducati Panigale', id: 401 },
    { name: 'BMW Roadster', id: 402 },
  ];

  function handleSelectedItemsChange(items) {
    console.log('Selected: ', items);
  }

  return (
    <View style={styles.container}>
      <MultiSelect items={items} onSelectedItemsChange={handleSelectedItemsChange}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 200
  },
  multiSelectWrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 40
  },
  multiSelect: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
  },
  multiSelectTextBox: {
    flex: 1
  },
  multiSelectItems: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    borderRadius: 6
  },
  multiSelectItem: {
    backgroundColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  multiSelectItemChecked: {
    backgroundColor: '#ccc'
  },
});
