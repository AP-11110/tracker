import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm 
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={signup}
            />
            <NavLink 
                routeName="Signin"
                text="Already have an account? Sign in instead!"
            />
        </KeyboardAvoidingView>
    )
};

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
});

export default SignupScreen;