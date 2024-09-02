document.addEventListener('DOMContentLoaded', function() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBQpNSUcipXq-xkfNGYBUTs_wylFKeGo",
    authDomain: "theorbit-23.firebaseapp.com",
    databaseURL: "https://theorbit-23-default-rtdb.firebaseio.com/",
    projectId: "theorbit-23",
    storageBucket: "theorbit-23.appspot.com",
    messagingSenderId: "820925799783",
    appId: "1:820925799783:web:57e37d77c86c508d9523c2",
    measurementId: "G-NLZDRCE54H"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // List of bad words (example list)
  const badWords = [
    "abuse", "bastard", "bitch", "bollocks", "cunt", "damn", "dick", 
    "douche", "fuck", "motherfucker", "piss", "porn", "prick", "pussy", 
    "shit", "slut", "tits", "twat", "wanker", "whore",
    // Potentially harmful terms (for general protection)
    "pedo", "pedophile", "rape", "assault", "molest"
  ];

  // Function to check for bad words
  function containsBadWords(message) {
    const lowerCaseMessage = message.toLowerCase();
    return badWords.some(word => lowerCaseMessage.includes(word));
  }

  // Function to publish a blog
  function publishBlog() {
    const userName = document.getElementById('name').value.trim();
    const timeAtUser = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const blogInput = document.getElementById('in').value.trim();

    // Check if name or message is empty
    if (!userName || !blogInput) {
      alert("Name and message cannot be empty.");
      return;
    }

    // Check for bad words in the message
    if (containsBadWords(blogInput)) {
      alert("Message contains inappropriate content.");
      return;
    }

    // Push blog data to Firebase
    db.ref('blogs').push({
      userName: userName,
      time: timeAtUser,
      content: blogInput
    });

    // Clear input after publishing
    document.getElementById('in').value = '';
    document.getElementById('name').value = '';
  }

  // Event listener for Enter key press in the textarea
  document.getElementById('in').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      publishBlog();
    }
  });

  // Event listener for the publish button
  document.getElementById('publishButton').addEventListener('click', publishBlog);

  // Display blogs in real time
  const blogContainer = document.getElementById('nb');
  db.ref('blogs').on('child_added', snapshot => {
    const blogData = snapshot.val();
    const newBlog = document.createElement('p');
    newBlog.innerHTML = `<strong style="color:#34c759;">${blogData.userName}</strong> said at ${blogData.time}: ${blogData.content}`;
    blogContainer.prepend(newBlog);
  });
});
