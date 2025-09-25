import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Social Connectors',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Mock publish endpoint
app.post('/publish/:platform', async (req, res) => {
  const { platform } = req.params;
  const { content, scheduled } = req.body;
  
  // Simulate publishing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  res.json({
    success: true,
    data: {
      platform,
      publishId: `pub_${Date.now()}`,
      status: scheduled ? 'scheduled' : 'published',
      url: `https://${platform}.com/post/mock-url`
    }
  });
});

// Mock account connection status
app.get('/accounts/:platform', (req, res) => {
  const { platform } = req.params;
  
  res.json({
    success: true,
    data: {
      platform,
      connected: true,
      username: `@mockuser`,
      permissions: ['read', 'write', 'publish']
    }
  });
});

app.listen(PORT, () => {
  console.log(`🔗 Social Connectors service running on port ${PORT}`);
});