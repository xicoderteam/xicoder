import 'dotenv/config'; // This loads your .env variables automatically
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- IMPROVED REGISTER ROUTE (Unique Checks & Validation) ---
app.post('/register', async (req, res) => {
    const { username, email, password, cf_handle } = req.body;

    // 1. COMPULSORY FIELD CHECK
    if (!username || !email || !password || !cf_handle) {
        return res.status(400).json({ error: "All fields are compulsory!" });
    }

    // 2. USERNAME RULES (No spaces)
    if (username.includes(" ")) {
        return res.status(400).json({ error: "Username cannot contain spaces" });
    }

    // 3. BASIC EMAIL VALIDATION (Check for @ and .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        // 4. CHECK IF USERNAME OR EMAIL ALREADY EXISTS
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('username, email')
            .or(`username.eq.${username},email.eq.${email}`)
            .single();

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: "This username is already taken!" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: "An account with this email already exists!" });
            }
        }

        // 5. VALIDATE CODEFORCES HANDLE & FETCH RATING
        const cfResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${cf_handle}`);
        const cfRating = cfResponse.data.result[0].rating || 0;

        // 6. FINAL INSERT
        const { error: insertError } = await supabase
            .from('users')
            .insert([{
                username,
                email,
                password_hash: password,
                codeforces_handle: cf_handle,
                cf_rating: cfRating
            }]);

        if (insertError) throw insertError;

        res.status(200).json({ message: `Success! Welcome ${username}.` });

    } catch (err) {
        // If Axios fails, it means the CF handle is invalid
        if (err.response && err.response.status === 400) {
            return res.status(400).json({ error: "Invalid Codeforces handle! Please check the spelling." });
        }
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Function to generate a random 6-character Room ID
const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};


// --- CREATE ROOM ROUTE: COMPULSORY FIELDS ---
app.post('/create-room', async (req, res) => {
    const { host_id, no_of_problems, duration } = req.body;

    // 1. COMPULSORY FIELD CHECK
    if (!host_id || !no_of_problems || !duration) {
        return res.status(400).json({ error: "host_id, no_of_problems, and duration are all compulsory!" });
    }

    const roomCode = generateRoomCode();

    try {
        const { error } = await supabase
            .from('rooms')
            .insert([{
                room_code: roomCode,
                host_id: host_id,
                no_of_problems: no_of_problems,
                duration_minutes: duration,
                status: 'waiting'
            }]);

        if (error) throw error;

        await supabase
            .from('room_participants')
            .insert([{ room_code: roomCode, user_id: host_id }]);

        res.status(200).json({ message: "Room created!", roomCode: roomCode });

    } catch (err) {
        res.status(500).json({ error: "Failed to create room" });
    }
});

// --- JOIN ROOM ROUTE: COMPULSORY FIELDS ---
app.post('/join-room', async (req, res) => {
    const { user_id, room_code } = req.body;

    // 1. COMPULSORY FIELD CHECK
    if (!user_id || !room_code) {
        return res.status(400).json({ error: "user_id and room_code are compulsory!" });
    }

    try {
        const { data: room, error: roomError } = await supabase
            .from('rooms')
            .select('room_code')
            .eq('room_code', room_code)
            .single();

        if (roomError || !room) {
            return res.status(404).json({ error: "Invalid Room ID: This room does not exist" });
        }

        const { error: joinError } = await supabase
            .from('room_participants')
            .insert([{ room_code: room_code, user_id: user_id }]);

        if (joinError) {
            if (joinError.code === '23505') {
                return res.status(400).json({ error: "You are already in this room!" });
            }
            throw joinError;
        }

        res.status(200).json({ message: "Successfully joined room " + room_code });

    } catch (err) {
        res.status(500).json({ error: "Server error during join" });
    }
});

// --- LOGIN ROUTE ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password_hash', password) // In production, use bcrypt!
            .single();

        if (error || !user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 ES Module Server running on port ${PORT}`));