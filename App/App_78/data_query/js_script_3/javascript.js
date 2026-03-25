const pusher = new Pusher("YOUR_APP_KEY", { cluster: "ap2" });
const channel = pusher.subscribe("my-channel");

channel.bind("my-event", function(data) {
  console.log("Received:", data);
});
