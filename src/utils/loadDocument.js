import mammoth from 'mammoth';

// Function to load and parse the .docx document
export const loadDocumentText = async (filePath) => {
    try {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value; // Extracted plain text from .docx
    } catch (error) {
        console.error("Error loading document:", error);
        return "";
    }
};
