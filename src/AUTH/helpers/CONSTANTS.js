const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPLASH_TIMEOUT = 3000;

const signUpData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  birthday: '',
};

const ModalMessage = {
  forgotPass: 'Email found. Now you can reset your password successfully!',
  resetPass: 'Your password has been reset successfully!',
  signUpPin: 'Yay! Your PIN code has been created. Continue to B-Wallet!',
};


 const sortMessagesByDate = messages =>
   messages.sort((a, b) => new Date(b.date) - new Date(a.date));

 function convertTimestampToDate(timestamp) {
   try {
     const date = new Date(
       timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000),
     );

     // Arrays with month names and day names
     const monthNames = [
       'Jan',
       'Feb',
       'Mar',
       'Apr',
       'May',
       'Jun',
       'Jul',
       'Aug',
       'Sep',
       'Oct',
       'Nov',
       'Dec',
     ];
     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

     // Format the date components
     const hours = date.getHours();
     const minutes = date.getMinutes();
     const period = hours >= 12 ? 'PM' : 'AM';
     const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
     const formattedMinutes = minutes.toString().padStart(2, '0');
     const day = dayNames[date.getDay()]; // Get day name from array
     const month = monthNames[date.getMonth()]; // Get month name from array
     const dayOfMonth = date.getDate();
     const year = date.getFullYear();

     // Construct the formatted string
     const formattedDate = `${formattedHours}:${formattedMinutes} ${period} ${day} ${month} ${dayOfMonth}, ${year}`;
     return formattedDate;
   } catch (error) {
     console.error('Error converting timestamp to date:', error);
     return new Date().toDateString(); // Fallback to current date string
   }
 }


 const obfuscateKey = key => {
   const visibleChars = 70;
   if (key.length > visibleChars * 2) {
     const start = key.slice(0, visibleChars);
     const end = key.slice(-visibleChars);
     const obfuscatedLength = key.length - visibleChars * 2;
     const obfuscated = '***'.padEnd(obfuscatedLength + 3, '*');
     return `${start}${obfuscated}${end}`;
   }
   return key;
 };

 function formatTimestamp(timestamp) {
   const {seconds, nanoseconds} = timestamp;
   const milliseconds = nanoseconds / 1e6;
   const date = new Date(seconds * 1000 + milliseconds);
   return date.toISOString();
 }

 const CONSTANTS = {
   formatTimestamp,
   obfuscateKey,
   convertTimestampToDate,
   SPLASH_TIMEOUT,
   sortMessagesByDate,
   emailRegex,
   ModalMessage,
   signUpData,
 };

export default CONSTANTS;
