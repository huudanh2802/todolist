import { useEffect, useState } from "react";
import Task from "../models/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAppMain = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const currentDate = new Date();

  useEffect(() => {
    getTaskList();
  }, []);

  useEffect(() => {
    saveTaskList();
  }, [taskList]);


  const saveTaskList = async () => {
    try {
      const jsonValue = JSON.stringify(taskList);
      await AsyncStorage.setItem("task-list", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem("task-list");
      if (value !== null) {
        setTaskList(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const addTask = (newTask:string) => {
    if (newTask.length > 0) {
      const newItem: Task = {
        key: taskList.length,
        task: newTask,
        done: false,
        editing: false,
      };
      setTaskList([...taskList, newItem]);
    }
  };

  const removeTask = (id: number) => {
    setTaskList(taskList.filter((t) => t.key !== id));
  };

  const toggleDoneTask = (id: number) => {
    let updateTaskList = [...taskList];
    updateTaskList[id].done = !updateTaskList[id].done;
    setTaskList(updateTaskList);
  };

  const toggleEdit = (
    id: number,
    editTask:string
  ) => {
    let updateTaskList = [...taskList];
    updateTaskList[id].editing = !updateTaskList[id].editing;
    //Done editing
    if(!updateTaskList[id].editing){
      updateTaskList[id].task=editTask
    }
    setTaskList(updateTaskList);
  };

  return [
    {
      toggleEdit,
      toggleDoneTask,
      removeTask,
      taskList,
      currentDate,
      addTask,
    },
  ];
};
