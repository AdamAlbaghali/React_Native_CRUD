import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

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
      <Text style={styles.title}>Item List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={input}
        onChangeText={setInput}
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={[styles.button, editId ? styles.updateButton : styles.addButton]}
        onPress={editId ? updateItem : addItem}
      >
        <Text style={styles.buttonText}>{editId ? "Update" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.value}</Text>
            <View style={styles.itemButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editItem(item.id)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  updateButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 8,
  },
});

export default App;
