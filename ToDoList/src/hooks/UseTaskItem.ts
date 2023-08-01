import { useState } from "react";

export const useTaskItem=()=>{
    const [editTask,setEditTask]= useState("");
    
    
    return [{editTask,setEditTask}];
}