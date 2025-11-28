// MongoDB API Configuration for Gnyaan Quiz Results
// Similar to mongodb-config.js but specifically for quiz results

const QUIZ_API_BASE_URL = window.APP_CONFIG ? window.APP_CONFIG.apiBaseUrl : 'http://localhost:3000/api';

const MongoDBQuizAPI = {
    // Save quiz result to MongoDB
    async saveQuizResult(username, quizData) {
        try {
            console.log('📤 Saving quiz result to MongoDB:', { username, subject: quizData.subject });
            
            const response = await fetch(`${QUIZ_API_BASE_URL}/quiz-results/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    subject: quizData.subject,
                    difficulty: quizData.difficulty,
                    score: quizData.score,
                    totalQuestions: quizData.total,
                    percentage: quizData.percentage,
                    questions: quizData.questions,
                    answers: quizData.userAnswers
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Quiz result saved successfully:', result);
            return result;
        } catch (error) {
            console.error('❌ Error saving quiz result to MongoDB:', error);
            throw error;
        }
    },

    // Get all quiz results for a user from MongoDB
    async getQuizResults(username) {
        try {
            console.log('📥 Fetching quiz results from MongoDB for user:', username);
            
            const response = await fetch(`${QUIZ_API_BASE_URL}/quiz-results/${username}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Quiz results fetched successfully:', result.results.length, 'results');
            return result.results;
        } catch (error) {
            console.error('❌ Error fetching quiz results from MongoDB:', error);
            return [];
        }
    },

    // Delete a quiz result from MongoDB
    async deleteQuizResult(resultId) {
        try {
            console.log('🗑️ Deleting quiz result from MongoDB:', resultId);
            
            const response = await fetch(`${QUIZ_API_BASE_URL}/quiz-results/${resultId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Quiz result deleted successfully');
            return result;
        } catch (error) {
            console.error('❌ Error deleting quiz result from MongoDB:', error);
            throw error;
        }
    },

    // Get quiz statistics for a user
    async getQuizStats(username) {
        try {
            console.log('📊 Fetching quiz statistics from MongoDB for user:', username);
            
            const results = await this.getQuizResults(username);
            
            if (results.length === 0) {
                return {
                    totalQuizzes: 0,
                    averageScore: 0,
                    totalScore: 0,
                    subjects: []
                };
            }

            const totalQuizzes = results.length;
            const totalScore = results.reduce((sum, result) => sum + result.percentage, 0);
            const averageScore = Math.round(totalScore / totalQuizzes);
            
            // Get unique subjects
            const subjectsMap = {};
            results.forEach(result => {
                if (!subjectsMap[result.subject]) {
                    subjectsMap[result.subject] = {
                        name: result.subject,
                        count: 0,
                        totalScore: 0
                    };
                }
                subjectsMap[result.subject].count++;
                subjectsMap[result.subject].totalScore += result.percentage;
            });

            const subjects = Object.values(subjectsMap).map(subject => ({
                ...subject,
                averageScore: Math.round(subject.totalScore / subject.count)
            }));

            const stats = {
                totalQuizzes,
                averageScore,
                totalScore,
                subjects
            };

            console.log('✅ Quiz statistics calculated:', stats);
            return stats;
        } catch (error) {
            console.error('❌ Error fetching quiz statistics:', error);
            return {
                totalQuizzes: 0,
                averageScore: 0,
                totalScore: 0,
                subjects: []
            };
        }
    }
};

console.log('📦 MongoDB Quiz API initialized');
