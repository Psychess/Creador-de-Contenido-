import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'AI Engine',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Mock AI generation endpoint
app.post('/generate', async (req, res) => {
  const { prompt, platform, tone } = req.body;
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  res.json({
    success: true,
    data: {
      text: `Generated content for ${platform} with ${tone} tone: ${prompt}`,
      confidence: 0.95,
      alternatives: [
        'Alternative content version 1',
        'Alternative content version 2'
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`🤖 AI Engine service running on port ${PORT}`);
});