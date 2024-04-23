import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f8' // Light grey background for the form
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333' // Dark grey text for better contrast
    },
    input: {
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#fff' // White background for input fields
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures that buttons are spaced apart
        marginBottom: 20
    },
    fetchButton: {
        backgroundColor: '#007bff', // Bootstrap primary blue
        color: '#ffffff', // White text color
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5 // Right margin for spacing between buttons
    },
    saveButton: {
        backgroundColor: '#28a745', // Bootstrap success green
        color: '#ffffff', // White text color
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5 // Left margin for spacing between buttons
    },
    dateText: {
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#fff' // White background for date text
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333' // Dark grey text for labels
    }
});

export default styles;
