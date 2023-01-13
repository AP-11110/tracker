import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Spacer from '../components/Spacer';
import { withNavigation } from 'react-navigation'; 
// withNavigation will allow this file to use navigation prop without having to pass it from the parent

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default withNavigation(NavLink);
    