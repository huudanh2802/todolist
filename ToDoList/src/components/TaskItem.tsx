import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Item from "../models/Task";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTaskItem } from "../hooks/UseTaskItem";
type TaskItemProps = {
  item: Item;
  removeTask: (id: number) => void;
  toggleDoneTask: (id: number) => void;
  toggleEdit: (id: number, editTask: string) => void;
};

export default function TaskItem({ props }: { props: TaskItemProps }) {
  const [{ editTask, setEditTask }] = useTaskItem();
  return (
    <View style={TaskItemStyle.container}>
      <BouncyCheckbox

        onPress={() => props.toggleDoneTask(props.item.key)}
        isChecked={props.item.done}
      />

      <TextInput
        style={[TaskItemStyle.input,props.item.done?TaskItemStyle.done:null]}
        editable={props.item.editing}
        numberOfLines={1}
        value={props.item.editing ? editTask : props.item.task}
        onChangeText={(text) => setEditTask(text)}
      ></TextInput>
      {!props.item.done && (
        <View style={TaskItemStyle.actionContainer}>
          <Icon
            name={props.item.editing ? "check" : "edit"}
            size={28}
            style={{ marginLeft: "5%" }}
            color="cadetblue"
            onPress={() => {
              props.toggleEdit(props.item.key, editTask);
              setEditTask(props.item.task);
            }}
          />
          <Icon
            onPress={() => props.removeTask(props.item.key)}
            name="trash"
            size={28}
            color="red"
          />
        </View>
      )}
    </View>
  );
}

const TaskItemStyle = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 20,
    margin: 16,
    backgroundColor: "white",
  },
  actionContainer: {
    marginRight: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
  },
  input: {
    fontSize: 20,
    color: "black",
    width: "65%",
  },
  done:{
    textDecorationLine:"line-through"
  }
});
