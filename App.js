import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // CRUD Operations
  const addItem = () => {
    if (input.trim()) {
      setItems([...items, { id: Date.now().toString(), value: input }]);
      setInput("");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const item = items.find((item) => item.id === id);
    setInput(item.value);
    setEditId(id);
  };

  const updateItem = () => {
    if (editId) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...item, value: input } : item
        )
      );
      setInput("");
      setEditId(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={input}
        onChangeText={setInput}
      />
      <Button
        title={editId ? "Update" : "Add"}
        onPress={editId ? updateItem : addItem}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.value}</Text>
            <Button title="Edit" onPress={() => editItem(item.id)} />
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default App;
