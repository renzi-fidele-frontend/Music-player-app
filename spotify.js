const clientId = "5f4f8177ee944622bed39c2fdb3e87c0";
const redirectUri = [import.meta.env.VITE_REDIRECT_URI];
const authEndPoint = "https://accounts.spotify.com/authorize?";
const scopes = [
   "user-library-read",
   "playlist-read-private",
   "user-top-read",
   "playlist-modify-public",
   "playlist-modify-private",
   "user-library-modify",
];

export const loginEndPoint = `${authEndPoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
   "%20"
)}&response_type=token&show_dialog=true`;
