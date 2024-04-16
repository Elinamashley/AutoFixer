import Toast from 'react-native-toast-message';

// Reusable function for handling API errors and dispatching alert messages
const apiErrorHandler = (dispatch, error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const status = error.response.status;
    const errorMessages = error.response.data.errors || [];

    // Assuming errorMessages is an array of error objects
    errorMessages.forEach(errorObj => {
      const errorMessage = `Error: ${errorObj.msg}`;
      dispatch(
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        }),
      );
    });

    // Log the errors in the console for debugging
    console.log('API errors:', errorMessages);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request setup error:', error.message);
   dispatch(Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Error setting up the request',
    }));
  }
};

export default apiErrorHandler;

//import Toast from 'react-native-toast-message';

// Reusable function for handling API errors and dispatching alert messages
// const apiErrorHandler = (dispatch, error) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     const status = error.response.status;
//     const errorMessages = error.response.data.errors || [];

//     if (status >= 200 && status < 300) {
//       // Success response
//       dispatch(
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Request successful',
//         })
//       );
//     } else {
//       // Error response
//       errorMessages.forEach((errorObj) => {
//         const errorMessage = `Error: ${errorObj.msg}`;
//         dispatch(
//           Toast.show({
//             type: 'error',
//             text1: 'Error',
//             text2: errorMessage,
//           })
//         );
//       });
//       // Log the errors in the console
//       console.log('API errors:', errorMessages);
//     }
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.error('Request setup error:', error.message);
//     dispatch(
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Error setting up the request',
//       })
//     );
//   }
// };

// export default apiErrorHandler;
