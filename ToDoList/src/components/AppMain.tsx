import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import { useAppMain } from "../hooks/UseAppMain";

export default function AppMain() {
  const [
    { addTask, currentDate, taskList, removeTask, toggleDoneTask, toggleEdit },
  ] = useAppMain();

  return (
    <SafeAreaView style={AppMainStyle.container}>
      {/* Header */}
      <View style={AppMainStyle.header}>
        <Text style={AppMainStyle.myDayText}>My day</Text>
        <Text style={AppMainStyle.date}>{currentDate.toDateString()}</Text>
      </View>
      {/* Task List */}
      <ScrollView style={AppMainStyle.taskContainer}>
        {taskList.map(
          (e) =>
            !e.done && (
              <TaskItem
                key={e.key}
                props={{
                  toggleEdit: toggleEdit,
                  toggleDoneTask: toggleDoneTask,
                  item: e,
                  removeTask: removeTask,
                }}
              />
            )
        )}
        {taskList.map(
          (e) =>
            e.done && (
              <TaskItem
                key={e.key}
                props={{
                  toggleEdit: toggleEdit,
                  toggleDoneTask: toggleDoneTask,
                  item: e,
                  removeTask: removeTask,
                }}
              />
            )
        )}
      </ScrollView>
      {/* Add Task */}
      <AddTask props={{ addTask: addTask }} />
    </SafeAreaView>
  );
}

const AppMainStyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
  },
  taskContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 1,
    backgroundColor: "#F6F6F6",
  },
  doneContainer: {
    height: "20%",
    backgroundColor: "#F6F6F6",
  },
  date: {
    fontSize: 25,
    color: "white",
  },
  myDayText: { fontSize: 34, fontWeight: "bold", color: "white" },
  header: { margin: 10 },
});
