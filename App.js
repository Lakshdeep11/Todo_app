import { useState } from "react"
import { SafeAreaView, ScrollView} from 'react-native';

import { StyleSheet, Text, TextInput, View, Button, FlatList, Switch,TouchableOpacity } from 'react-native';

const App= () => {

  const [tasks, set_tasks] = useState([]);
  const [task_title, set_taskTitle] = useState('');

  const add_task = () =>{
    if(task_title.trim()){
      const new_task = { id: Date.now(), title: task_title, status: 'due' };
      set_tasks([...tasks, new_task]);
      set_taskTitle('')
    }
  };

  const change_status = (id) =>{
    set_tasks(tasks.map(task => task.id === id ? {...task, status: task.status === 'due' ? 'done' : 'due'} : task
    ));
  };

  const remove_task = (id) => {
    set_tasks(tasks.filter(task => task.id !== id));
  }
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <Text style= {styles.header}>ToDo App</Text>
      <View style={styles.container}>
        <View style={styles.add_container}>
          <TextInput value={task_title} onChangeText={set_taskTitle} placeholder= "Enter Task"/>
          <Button title = "Add Task" onPress={add_task} disabled={!task_title.trim()}/>
        </View>
      
     <FlatList style={styles.container2}
      data={tasks} renderItem={({item}) => (
        <View style={styles.list}>
          
          <Switch style={styles.slider} value={item.status==='done'} onValueChange={()=>change_status(item.id)}/>
          <Text style={styles.title}>{item.title}</Text>
          
          <TouchableOpacity style={styles.remove_button} onPress={() => remove_task(item.id)}>
              <Text>Remove</Text>
            </TouchableOpacity>
        </View>
      )}
      />
      
    </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'start',
  },
  add_container: {
    marginTop: 10,
    padding : 10,
  },
  header:{
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  list:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  title:{
    fontSize: 20,
    color: 'blue'
  },
  remove_button:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  slider:{
    width:50,
  },container2:{
    padding:10
  }
});

export default App;