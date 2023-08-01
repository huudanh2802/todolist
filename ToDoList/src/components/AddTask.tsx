import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import { useAddTask } from "../hooks/UseAddTask";

type AddTaskProps = {
  addTask: (newTask: string) => void;
};

export default function AddTask({ props }: { props: AddTaskProps }) {
  const [{ newTask, setNewTask }] = useAddTask();

  return (
    <View style={{ backgroundColor: "#F6F6F6" }}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        placeholder="Enter new Task"
        style={AddTaskStyle.input}
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <TouchableHighlight
        style={AddTaskStyle.touchable}
        onPress={() => {
          props.addTask(newTask);
          setNewTask("");
        }}
      >
        <Text style={AddTaskStyle.text}>Create new task</Text>
      </TouchableHighlight>
    </View>
  );
}

const AddTaskStyle = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    padding: 8,
    margin: 16,
    fontSize: 20,
    justifyContent: "center",
  },
  touchable: {
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    flexDirection: "row",
    padding: 8,
    margin: 16,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
