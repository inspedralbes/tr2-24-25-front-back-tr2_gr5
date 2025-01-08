const API_URL = import.meta.env.VITE_URL_BACK;
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default socket;