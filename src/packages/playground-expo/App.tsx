import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'

const CounterState = new SimpleStateManager(0)

const increment = () => { CounterState.set(c => c + 1) }

export default function App() {
  const counter = useSimpleStateValue(CounterState)
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={{ fontSize: 16 }}>
        Counter: {counter}
      </Text>
      <Button
        onPress={increment}
        title='Increment'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
