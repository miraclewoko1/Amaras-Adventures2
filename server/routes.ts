import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  generateAdaptiveFeedback,
  generateReflectiveFeedback,
  generateCareerInsights,
  translateToKorean,
  type AdaptiveFeedbackRequest,
  type ReflectiveFeedbackRequest,
  type CareerInsightRequest,
} from "./ai-service";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/adaptive-feedback", async (req, res) => {
    try {
      const request: AdaptiveFeedbackRequest = req.body;
      
      if (!request.learnerName || !request.currentLevel || !request.observation) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const feedback = await generateAdaptiveFeedback(request);
      res.json(feedback);
    } catch (error) {
      console.error("Adaptive feedback error:", error);
      res.status(500).json({ error: "Failed to generate feedback" });
    }
  });

  app.post("/api/reflective-feedback", async (req, res) => {
    try {
      const request: ReflectiveFeedbackRequest = req.body;
      console.log("[Reflective Feedback] Language received:", request.language, "| isKorean:", request.language === "ko");
      
      if (!request.puzzleType || !request.stepsRecorded) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const feedback = await generateReflectiveFeedback(request);
      console.log("[Reflective Feedback] Response strategyUsed:", feedback.strategyUsed?.substring(0, 50));
      res.json(feedback);
    } catch (error) {
      console.error("Reflective feedback error:", error);
      res.status(500).json({ error: "Failed to generate feedback" });
    }
  });

  app.post("/api/career-insights", async (req, res) => {
    try {
      const request: CareerInsightRequest = req.body;
      
      if (!request.learningPatterns || !request.strengths) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const insights = await generateCareerInsights(request);
      res.json(insights);
    } catch (error) {
      console.error("Career insights error:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  app.post("/api/learner-observation", async (req, res) => {
    try {
      const { sessionId, observation } = req.body;
      
      if (!sessionId || !observation) {
        return res.status(400).json({ error: "Missing sessionId or observation" });
      }

      res.json({ 
        success: true, 
        message: "Observation recorded",
        sessionId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Learner observation error:", error);
      res.status(500).json({ error: "Failed to record observation" });
    }
  });

  app.post("/api/translate", async (req, res) => {
    try {
      const { texts } = req.body;
      
      if (!texts || !Array.isArray(texts) || texts.length === 0) {
        return res.status(400).json({ error: "Missing texts array" });
      }

      const result = await translateToKorean(texts);
      res.json(result);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    }
  });

  return httpServer;
}
