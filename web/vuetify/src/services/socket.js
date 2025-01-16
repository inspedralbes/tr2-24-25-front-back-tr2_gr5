const API_URL = import.meta.env.VITE_URL_BACK;
import { io } from 'socket.io-client';

const socket = io("http://tr2g5.dam.inspedralbes.cat:23412");
//const socket = io('http://localhost:3001');
//"http://tr2g5.dam.inspedralbes.cat:23412"
export default socket;