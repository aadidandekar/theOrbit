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

  // Function to publish a blog
  function publishBlog() {
    const userName = document.getElementById('name').value;
    const timeAtUser = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const blogInput = document.getElementById('in').value;

    // Push blog data to Firebase
    db.ref('blogs').push({
      userName: userName,
      time: timeAtUser,
      content: blogInput
    });

    // Clear input after publishing
    document.getElementById('in').value = '';
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
