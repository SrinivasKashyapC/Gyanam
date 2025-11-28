// MongoDB API Configuration for Gnyaan Notes
// This file handles all communication with the MongoDB backend for notes storage

const API_BASE_URL = window.APP_CONFIG ? window.APP_CONFIG.apiBaseUrl : 'http://localhost:3000/api';

const MongoDBNotesAPI = {
    // Save a note to MongoDB
    async saveNote(username, topic, content) {
        try {
            console.log('📤 Saving note to MongoDB:', { username, topic });
            
            const response = await fetch(`${API_BASE_URL}/notes/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    title: topic,  // Server expects 'title', not 'topic'
                    content: content
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Note saved successfully:', result);
            return result;
        } catch (error) {
            console.error('❌ Error saving note to MongoDB:', error);
            throw error;
        }
    },

    // Get all notes for a user from MongoDB
    async getNotes(username) {
        try {
            console.log('📥 Fetching notes from MongoDB for user:', username);
            
            const response = await fetch(`${API_BASE_URL}/notes/${username}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Notes fetched successfully:', result.notes.length, 'notes');
            return result.notes;
        } catch (error) {
            console.error('❌ Error fetching notes from MongoDB:', error);
            return [];
        }
    },

    // Delete a note from MongoDB
    async deleteNote(username, noteId) {
        try {
            console.log('🗑️ Deleting note from MongoDB:', { username, noteId });
            
            const response = await fetch(`${API_BASE_URL}/notes/${username}/${noteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Note deleted successfully');
            return result;
        } catch (error) {
            console.error('❌ Error deleting note from MongoDB:', error);
            throw error;
        }
    }
};

console.log('📦 MongoDB Notes API initialized');
