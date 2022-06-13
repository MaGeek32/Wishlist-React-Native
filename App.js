
import { StyleSheet, View, FlatList, Button } from 'react-native'
import { useState } from 'react'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import { StatusBar } from 'expo-status-bar'

export default function App () {


  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVistible, setModalIsVisible] = useState(false)

  function startAddGoalHandler () {
    setModalIsVisible(true)
  }

  function endAddGoalHandler () {
    setModalIsVisible(false)
  }

  function addGoalHandeler (enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
    endAddGoalHandler()
  };


  function deleteGoalHandeler (id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal'
          color="#a065ec"
          onPress={startAddGoalHandler} />
        <GoalInput
          visible={modalIsVistible}
          onAddGoal={addGoalHandeler}
          onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>

          <FlatList data={courseGoals}
            renderItem={(itemData) => {

              return <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandeler} />
            }}
            keyExtractor={(item, index) => {
              return item.id
            }}
            alwaysBounceVertical={false}>



          </FlatList>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,


  },


  goalsContainer: {
    flex: 5,
  },



})
