import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    passwordInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 4,
    },
    button: {
        backgroundColor: '#ca780c',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    eventFormKeyboardAvoidingView: {
        flex: 1,
    },
    eventFormContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 48,
    },
    eventFormTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    eventImagePicker: {
        height: 200,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        overflow: 'hidden',
    },
    eventImagePickerText: {
        color: '#888',
        fontSize: 14,
    },
    eventImagePreview: {
        width: '100%',
        height: '100%',
    },
    eventFormInput: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    eventFormRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventFormHalfInput: {
        width: '48%',
    },
    eventFormButton: {
        backgroundColor: '#ca780c',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    eventFormButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    eventFormLogoutButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    eventFormLogoutText: {
        color: '#888',
        fontSize: 14,
    },
});

export default styles;