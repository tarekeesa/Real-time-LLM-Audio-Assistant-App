import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const identifyQuestionsWithSmallLLM = async (transcription) => {
  console.log("Starting to identify questions with Small LLM");
  try {
    console.log("Sending transcription to Groq:", transcription);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Identify all the questions in the following text.",
        },
        {
          role: "user",
          content: `Identify all the questions in the following text:\n${transcription}`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 200,
      stream: false,
    });

    console.log("Groq response:", chatCompletion.choices[0]?.message?.content);
    return chatCompletion.choices[0]?.message?.content || "No questions identified.";
  } catch (error) {
    console.error("Error identifying questions:", error);
    return "No questions identified.";
  }
};

export const filterIrrelevantQuestions = async (historicalQuestions, documentText) => {
  console.log("Starting to filter irrelevant historical questions based on their relevance to the document");
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in prioritizing questions. Based on the provided document, filter out the irrelevant historical questions and retain only those that are highly relevant to the document.",
        },
        {
          role: "user",
          content: `Document: ${documentText}\nHistorical Questions: ${historicalQuestions.join("\n")}`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 500,
      stream: false,
    });

    console.log("Filtered relevant historical questions response:", chatCompletion.choices[0]?.message?.content);
    const relevantQuestions = chatCompletion.choices[0]?.message?.content.split("\n").filter(Boolean);
    return relevantQuestions || [];
  } catch (error) {
    console.error("Error filtering questions:", error);
    return [];
  }
};



export const answerQuestionsWithLargeLLM = async (currentQuestion, relevantPastQuestions, documentText) => {
  console.log("Starting to answer the current question using past conversation context and document knowledge");

  try {
    if (!documentText) {
      console.error("No document text provided");
      return "Document text is not available.";
    }
    if (!currentQuestion) {
      console.error("No current question provided");
      return "No current question provided.";
    }

    // Updated prompt to give human-like, tailored responses using both past conversation and document
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert sales representative. Use the relevant past questions and the document provided to give a helpful, human-like response to the current question. Your goal is to provide value without overwhelming the customer. Avoid directly referencing past conversations or the document.`,
        },
        {
          role: "user",
          content: `Current Question: ${currentQuestion}\nRelevant Past Questions: ${relevantPastQuestions.join("\n")}\nDocument: ${documentText}`,
        },
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
      temperature: 0.5,  // Friendly and human-like tone
      max_tokens: 1000,  // Limit response length for concise answers
      stream: false,
    });

    console.log("Groq response for answering questions:", chatCompletion.choices[0]?.message?.content);
    return chatCompletion.choices[0]?.message?.content || "No answers provided.";
  } catch (error) {
    console.error("Error answering questions:", error);
    return "No answers provided due to an error.";
  }
};



// export const answerQuestionsWithLargeLLM = async (currentQuestion, relevantPastQuestions, documentText) => {
//   console.log("Starting to answer the current question in a natural, conversational manner");

//   try {
//     if (!documentText) {
//       console.error("No document text provided");
//       return "Document text is not available.";
//     }
//     if (!currentQuestion) {
//       console.error("No current question provided");
//       return "No current question provided.";
//     }

//     // Updated prompt to avoid any mention of past conversations or the document source
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `You are a helpful, empathetic sales representative. Answer the customer's current question in a conversational and respectful tone, focusing on providing clear and relevant information without referring to previous conversations or external documents. Your goal is to make the customer feel understood and provide the information they need in a concise, human-like manner.`,
//         },
//         {
//           role: "user",
//           content: `Question: ${currentQuestion}`,
//         },
//       ],
//       model: "llama3-groq-70b-8192-tool-use-preview",
//       temperature: 0.5,  // Higher temperature for a friendly, human-like response
//       max_tokens: 1000,  // Limit response length to avoid overwhelming the customer
//       stream: false,
//     });

//     console.log("Groq response for answering questions:", chatCompletion.choices[0]?.message?.content);
//     return chatCompletion.choices[0]?.message?.content || "No answers provided.";
//   } catch (error) {
//     console.error("Error answering questions:", error);
//     return "No answers provided due to an error.";
//   }
// };
