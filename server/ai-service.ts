import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export interface LearnerObservation {
  puzzleType: string;
  attempts: number;
  timeSpent: number;
  hintsUsed: number;
  correctFirstTry: boolean;
  patternOfErrors: string[];
  approachUsed: "visual" | "sequential" | "trial-error" | "pattern-recognition" | "unknown";
  emotionalState?: "confident" | "frustrated" | "curious" | "hesitant";
}

export interface AdaptiveFeedbackRequest {
  learnerName: string;
  age: number;
  currentLevel: {
    world: "math" | "history";
    levelId: number;
    title: string;
  };
  observation: LearnerObservation;
  learningHistory: {
    puzzleType: string;
    successRate: number;
    averageTime: number;
  }[];
}

export interface AdaptiveFeedbackResponse {
  encouragement: string;
  strategyHighlight: string;
  nextStepSuggestion: string;
  learningStyle: string;
  strengthsObserved: string[];
  growthAreas: string[];
  mascotMessage: string;
}

export interface ReflectiveFeedbackRequest {
  puzzleType: string;
  stepsRecorded: string[];
  timeSpent: number;
  hintsUsed: number;
  outcome: "success" | "partial" | "retry";
  language?: "en" | "ko";
}

export interface ReflectiveFeedbackResponse {
  strategyUsed: string;
  whatWorkedWell: string;
  alternativeApproach: string;
  encouragingNote: string;
}

export async function generateAdaptiveFeedback(
  request: AdaptiveFeedbackRequest
): Promise<AdaptiveFeedbackResponse> {
  const systemPrompt = `You are Sprout, a friendly and encouraging learning guide for young children (ages 3-7). 
Your role is to observe how children learn and provide warm, personalized feedback that:
1. Celebrates their unique approach to problem-solving
2. Highlights their natural strengths
3. Gently suggests next steps without criticism
4. Uses simple, age-appropriate language with emojis
5. Focuses on the PROCESS of learning, not just the outcome

Always be warm, patient, and encouraging. Never use negative language.
Respond in JSON format matching the AdaptiveFeedbackResponse structure.`;

  const userPrompt = `Analyze this learning observation for ${request.learnerName} (age ${request.age}):

Current Activity: ${request.currentLevel.title} (${request.currentLevel.world} world, level ${request.currentLevel.levelId})

Observation:
- Puzzle Type: ${request.observation.puzzleType}
- Attempts Made: ${request.observation.attempts}
- Time Spent: ${request.observation.timeSpent} seconds
- Hints Used: ${request.observation.hintsUsed}
- Got it right first try: ${request.observation.correctFirstTry ? "Yes" : "No"}
- Approach Used: ${request.observation.approachUsed}
- Emotional State: ${request.observation.emotionalState || "unknown"}
${request.observation.patternOfErrors.length > 0 ? `- Error Patterns: ${request.observation.patternOfErrors.join(", ")}` : ""}

Learning History Summary:
${request.learningHistory.map(h => `- ${h.puzzleType}: ${Math.round(h.successRate * 100)}% success, avg ${h.averageTime}s`).join("\n")}

Generate personalized, encouraging feedback that celebrates how this child learns.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    return {
      encouragement: parsed.encouragement || "You're doing amazing! Keep exploring! 🌟",
      strategyHighlight: parsed.strategyHighlight || "I noticed you tried different ways to solve this!",
      nextStepSuggestion: parsed.nextStepSuggestion || "Ready for another fun challenge?",
      learningStyle: parsed.learningStyle || "explorer",
      strengthsObserved: parsed.strengthsObserved || ["curiosity", "persistence"],
      growthAreas: parsed.growthAreas || [],
      mascotMessage: parsed.mascotMessage || "Sprout is so proud of you! 🌱",
    };
  } catch (error) {
    console.error("AI feedback error:", error);
    return {
      encouragement: "You're doing great! Every try helps you learn! 🌟",
      strategyHighlight: "I love how you kept trying!",
      nextStepSuggestion: "Let's try another fun puzzle!",
      learningStyle: "explorer",
      strengthsObserved: ["persistence", "curiosity"],
      growthAreas: [],
      mascotMessage: "Sprout believes in you! 🌱",
    };
  }
}

export async function generateReflectiveFeedback(
  request: ReflectiveFeedbackRequest
): Promise<ReflectiveFeedbackResponse> {
  const isKorean = request.language === "ko";
  const languageInstruction = isKorean 
    ? "Respond ENTIRELY in Korean (한국어). Use simple Korean words appropriate for young children ages 3-7."
    : "Respond in English.";
  
  const systemPrompt = `You are Sprout, a friendly learning companion for young children.
After they complete a puzzle, you help them understand what strategies they used to solve it.
Use simple, encouraging language appropriate for ages 3-7.
Focus on HOW they solved it, not just that they solved it.
${languageInstruction}
Respond in JSON format matching the ReflectiveFeedbackResponse structure.`;

  const userPrompt = `A child just completed a ${request.puzzleType} puzzle.

Here's what happened:
- Time spent: ${request.timeSpent} seconds
- Hints used: ${request.hintsUsed}
- Outcome: ${request.outcome}
- Steps they took: ${request.stepsRecorded.join(" → ")}

Generate reflective feedback that helps them understand their problem-solving approach.${isKorean ? " 모든 답변은 반드시 한국어로 작성해주세요." : ""}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 512,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    const defaultFallbacks = isKorean ? {
      strategyUsed: "여러 가지 방법을 시도해서 답을 찾았어요!",
      whatWorkedWell: "끈기 있게 노력한 점이 좋았어요!",
      alternativeApproach: "다음에는 비슷한 것끼리 모아보는 방법도 있어요!",
      encouragingNote: "훌륭한 문제 해결사가 되어가고 있어요! 🌱",
    } : {
      strategyUsed: "You tried different ideas until one worked!",
      whatWorkedWell: "Your patience helped you solve it!",
      alternativeApproach: "Next time, you could also try grouping similar things together!",
      encouragingNote: "You're becoming a great problem solver! 🌱",
    };
    return {
      strategyUsed: parsed.strategyUsed || defaultFallbacks.strategyUsed,
      whatWorkedWell: parsed.whatWorkedWell || defaultFallbacks.whatWorkedWell,
      alternativeApproach: parsed.alternativeApproach || defaultFallbacks.alternativeApproach,
      encouragingNote: parsed.encouragingNote || defaultFallbacks.encouragingNote,
    };
  } catch (error) {
    console.error("Reflective feedback error:", error);
    if (isKorean) {
      return {
        strategyUsed: "열심히 탐색해서 방법을 찾았어요!",
        whatWorkedWell: "포기하지 않은 점이 정말 대단해요!",
        alternativeApproach: "퍼즐을 푸는 방법은 여러 가지가 있어요!",
        encouragingNote: "새싹이가 자랑스러워해요! 🌱",
      };
    }
    return {
      strategyUsed: "You explored and found a way!",
      whatWorkedWell: "You didn't give up - that's amazing!",
      alternativeApproach: "There are always many ways to solve puzzles!",
      encouragingNote: "Sprout is proud of you! 🌱",
    };
  }
}

export interface CareerInsightRequest {
  learningPatterns: {
    puzzleType: string;
    successRate: number;
    enjoymentLevel: number;
    approachStyle: string;
  }[];
  strengths: string[];
  preferredActivities: string[];
}

export interface CareerInsightResponse {
  currentStrengths: string[];
  learningStyle: string;
  potentialPathways: {
    area: string;
    description: string;
    relatedActivities: string[];
  }[];
  parentNote: string;
}

export async function generateCareerInsights(
  request: CareerInsightRequest
): Promise<CareerInsightResponse> {
  const systemPrompt = `You are an educational advisor helping parents understand their child's natural strengths and learning patterns.
Based on observed learning behaviors (not test scores), provide gentle insights about potential future interests and career pathways.
Be encouraging and focus on strengths. Use simple language for parents.
IMPORTANT: These are just observations about natural tendencies, not predictions or limitations.
Respond in JSON format matching the CareerInsightResponse structure.`;

  const userPrompt = `Based on these observed learning patterns, suggest potential pathways:

Learning Patterns:
${request.learningPatterns.map(p => `- ${p.puzzleType}: ${Math.round(p.successRate * 100)}% success, enjoyment: ${p.enjoymentLevel}/5, approach: ${p.approachStyle}`).join("\n")}

Observed Strengths: ${request.strengths.join(", ")}
Preferred Activities: ${request.preferredActivities.join(", ")}

Generate insights about learning style and potential future interests (NOT predictions, just observations).`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    return {
      currentStrengths: parsed.currentStrengths || ["curiosity", "persistence"],
      learningStyle: parsed.learningStyle || "exploratory learner",
      potentialPathways: parsed.potentialPathways || [
        {
          area: "Creative Problem Solving",
          description: "Your child enjoys finding unique solutions",
          relatedActivities: ["building", "puzzles", "art"],
        },
      ],
      parentNote: parsed.parentNote || "These observations are based on how your child naturally approaches learning. Every child has unique gifts to discover!",
    };
  } catch (error) {
    console.error("Career insights error:", error);
    return {
      currentStrengths: ["curiosity", "persistence"],
      learningStyle: "unique learner",
      potentialPathways: [
        {
          area: "Many Possibilities",
          description: "Keep exploring to discover more about your child's interests!",
          relatedActivities: ["all activities"],
        },
      ],
      parentNote: "Keep playing and learning together to discover your child's natural strengths!",
    };
  }
}
