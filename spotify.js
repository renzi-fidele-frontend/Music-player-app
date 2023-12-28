const clientId = "5f4f8177ee944622bed39c2fdb3e87c0";
const redirectUri = "http://127.0.0.1:5173/";
const authEndPoint = "https://accounts.spotify.com/authorize?";
const scopes = ["user-library-read", "playlist-read-private", "user-top-read"];

export const loginEndPoint = `${authEndPoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
   "%20"
)}&response_type=token&show_dialog=true`;
