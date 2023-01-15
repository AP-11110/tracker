import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { useContext, useCallback } from 'react';
import '../_mockLocation';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { AntDesign } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);

  const callback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording])
  const [err] = useLocation(isFocused || recording, callback);

  return (
      <SafeAreaView forceInset={{ top: 'always' }} >
          <Text h2>Create a Track</Text>
          <Map />
          {err ? <Text>Please enable location services</Text> : null}
          <TrackForm />
      </SafeAreaView>
  )
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <AntDesign name="plus" size={24} color="black" />
}

const styles = StyleSheet.create({});

// will allow access to isFocused
export default withNavigationFocus(TrackCreateScreen);




