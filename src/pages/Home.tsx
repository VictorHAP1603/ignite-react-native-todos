import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type HandleEditProps = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    if (tasks.find(task => task.title === newTaskTitle)) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    if (tasks.find(task => task.id === id)) {
      const tasksRefreshed = tasks.map(task => {
        if (task.id === id) {
          task.done = !task.done
        }
        return task
      });

      setTasks(tasksRefreshed)
    }
  }

  function handleRemoveTask(id: number) {
    if (tasks.find(task => task.id === id)) {
      Alert.alert(
        "Remover item",
        "Tem certeza que você deseja remover esse item?",
        [
          {
            text: "Sim",
            onPress: () => setTasks(tasks.filter(task => task.id !== id))
          },
          {
            text: "Não"
          }
        ]
      )

    }
  }

  function handleEditTask({ taskId, taskNewTitle }: HandleEditProps) {
    if (tasks.find(task => task.id === taskId)) {
      const tasksRefreshed = tasks.map(task => {
        if (task.id === taskId) {
          task.title = taskNewTitle
        }

        return task
      });

      setTasks(tasksRefreshed)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})