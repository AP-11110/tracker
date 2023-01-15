import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {/* there are other events such as onDidFocus, onWillBlur, onDidBlur */}
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm 
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <NavLink 
                routeName="Signup"
                text="Don't have an account? Sign up instead!"
            />
        </KeyboardAvoidingView>
    )
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;