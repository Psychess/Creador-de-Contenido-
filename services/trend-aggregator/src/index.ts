import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Trend Aggregator',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Mock trend collection endpoint
app.get('/collect', async (req, res) => {
  const { platform } = req.query;
  
  res.json({
    success: true,
    data: {
      platform: platform || 'all',
      trendsCollected: 15,
      lastUpdate: new Date().toISOString()
    }
  });
});

// Schedule trend collection every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('🔄 Collecting trends from all platforms...');
  // In production, this would call external APIs
});

app.listen(PORT, () => {
  console.log(`📈 Trend Aggregator service running on port ${PORT}`);
});