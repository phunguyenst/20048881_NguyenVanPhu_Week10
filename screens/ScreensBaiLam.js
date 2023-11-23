import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setNote, deleteNote, updateNote, addNote } from "./action";

export default function ScreensBaiLam({ navigation, route }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note);

  const [newNoteName, setNewNoteName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/note")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        dispatch(setNote(json));
      });
  }, [dispatch]);

  const handleDelete = (noteId, noteName) => {
    fetch(`http://localhost:3000/note/${noteId}`, {
      method: "DELETE",
    }).then(() => {
      dispatch(
        deleteNote({
          id: noteId,
          name: noteName,
        })
      );
    });
  };

  // const handleUpdate = (noteId) => {
  //   fetch(`http://localhost:3000/note/${noteId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: newNoteName,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((updatedNote) => {
  //       // Dispatch a new setNote action after updating
  //       fetch("http://localhost:3000/note")
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setData(json);
  //           dispatch(setNote(json));
  //         });
  //       setNewNoteName("");
  //     });
  // };
  const handleUpdate = (noteId) => {
    fetch(`http://localhost:3000/note/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newNoteName,
      }),
    })
      .then((response) => response.json())
      .then((updatedNote) => {
        if (updatedNote) {
          dispatch(updateNote({ id: noteId, name: newNoteName }, updatedNote));
          setNewNoteName("");
        } else {
          console.error("Update failed. Response:", updatedNote);
        }
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };
  
  

  const handleAddNote = () => {
    fetch("http://localhost:3000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newNoteName,
      }),
    })
      .then((response) => response.json())
      .then((newNote) => {
        dispatch(addNote(newNote));
        setNewNoteName("");
      });
  };

  const handleSave = () => {
    if (newNoteName.trim() !== "") {
      handleAddNote();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          placeholder={newNoteName ? "Sửa ghi chú" : "Nhập ghi chú"}
          value={newNoteName}
          onChangeText={(text) => setNewNoteName(text)}
          style={{
            borderWidth: 1,
            width: 300,
            height: 50,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
        />
      </View>
      <View style={{ flex: 8 }}>
        <ScrollView nestedScrollEnabled>
          <FlatList
            data={notes.note}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  height: 100,
                  width: 350,
                  backgroundColor: "#6aebf9",
                  borderRadius: 10,
                  margin: 10,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.name}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setNewNoteName(item.name);
                      handleUpdate(item.id);
                    }}
                  >
                    <Feather name="edit" size={30} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id, item.name)}
                  >
                    <MaterialIcons name="delete" size={30} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          ></FlatList>
        </ScrollView>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => handleSave()}>
          <AntDesign name="pluscircle" size={70} color="aqua" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
