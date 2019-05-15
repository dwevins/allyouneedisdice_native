import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';
import { Constants } from 'expo';

export default function DiceSet(props) {
  return (
    <View style={styles.set}>
      <FlatList
        data={Object.keys(props.rollData)}
        keyExtractor={(item, index) => index}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.die}>
            <Text>
              d{item} x {props.rollData[item]}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                title="+"
                onPress={() => props.addDie(item)}
              />
              <Button
                style={styles.button}
                title="-"
                onPress={() => props.dropDie(item)}
              />
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: {props.result}</Text>
      <View>
        <Button title="Roll" buttonStyle={styles.rollButton} onPress={() => props.roll()} />
        <Button title="Drop Set" buttonStyle={styles.dropButton} onPress={() => props.dropSet()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  set: {
    backgroundColor: '#5D5962',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 40,
  },

  die: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / 4,
    backgroundColor: '#A8ADB0',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },

  rollButton: {
    backgroundColor: '#3D8B83'
  },

  dropButton: {
    backgroundColor: '#3D8B83'
  },

  total: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
