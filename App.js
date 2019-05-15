import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import DiceSet from './components/DiceSet';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diceSets: [],
    };
  }

  createSet(rollSeed = {}) {
    const newSet = {
      rollData: {
        2: 0,
        3: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        20: 0,
        100: 0,
      },

      currentResult: 0,
    };

    Object.keys(rollSeed).forEach(die => {
      newSet.rollData[die] = rollSeed[die];
    });

    return newSet;
  }

  addEmptySet() {
    const setsCopy = this.state.diceSets.slice();
    setsCopy.push(this.createSet());
    this.setState({ diceSets: setsCopy });
  }

  dropSet(key) {
    if (this.state.diceSets.length === 1) return false;

    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];
    if (targetSet) {
      setsCopy.splice(setsCopy.indexOf(targetSet), 1);
      this.setState({ diceSets: setsCopy });
    }
  }

  rollSet(set) {
    const setCopy = {};
    const keys = Object.keys(set.rollData);
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
      const curDie = keys[i];
      const numRolls = set.rollData[curDie];
      const mod = Math.ceil(100 / curDie);

      for (let j = 1; j <= numRolls; j++) {
        let roll = Math.ceil((Math.random() * 100) / mod);
        total += roll;
      }
    }

    setCopy.rollData = set.rollData;
    setCopy.currentResult = total;

    return setCopy;
  }

  roll(key) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];
    const newSet = this.rollSet(targetSet);

    setsCopy.splice(setsCopy.indexOf(targetSet), 1, newSet);
    this.setState({ diceSets: setsCopy });
  }

  rollAll(sets) {
    let setsCopy = sets.slice();
    sets.forEach((set, index) => {
      setsCopy[index] = this.rollSet(set);
    });

    this.setState({ diceSets: setsCopy });
  }

  addDie(key, die) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];

    if (targetSet) {
      setsCopy[setsCopy.indexOf(targetSet)].rollData[die] += 1;
      this.setState({ diceSets: setsCopy });
    }
  }

  dropDie(key, die) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];

    if (targetSet) {
      const rollData = setsCopy[setsCopy.indexOf(targetSet)].rollData;
      setsCopy[setsCopy.indexOf(targetSet)].rollData[die] =
        rollData[die] > 0 ? rollData[die] - 1 : 0;
      this.setState({ diceSets: setsCopy });
    }
  }

  componentDidMount() {
    this.addEmptySet()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.diceSets}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <DiceSet
              rollData={item.rollData}
              result={item.currentResult}
              roll={() => this.roll(index)}
              addDie={die => this.addDie(index, die)}
              dropDie={die => this.dropDie(index, die)}
              dropSet={() => this.dropSet(index)}
            />
          )}
        />
        <Button title="Add new set" onPress={() => this.addEmptySet()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2 * Constants.statusBarHeight,
    backgroundColor: '#302E2E',
    padding: 8,
  },

});
