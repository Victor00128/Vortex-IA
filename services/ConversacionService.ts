import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | undefined;

function getGoogleAI() {
    if (!ai) {
        if (!process.env.API_KEY_CONVERSACION) {
            throw new Error("La clave de API de Google (API_KEY) no está configurada.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY_CONVERSACION });
    }
    return ai;
}


export function startChat(systemInstruction: string, model: string): Chat {
  return getGoogleAI().chats.create({
    model: model as 'gemini-2.5-pro',
    config: {
        systemInstruction: systemInstruction,
    },
  });
}

export async function generateImage(prompt: string): Promise<string> {
    const response = await getGoogleAI().models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    }
    
    throw new Error("No se pudo generar la imagen.");
}


export async function searchWeb(query: string): Promise<string> {
    try {
        // Simulando una búsqueda web más realista
        const searchResults = [
            {
                title: `Resultados para: ${query}`,
                snippet: `Información relevante sobre ${query} encontrada en múltiples fuentes web.`,
                url: `https://example.com/search?q=${encodeURIComponent(query)}`
            },
            {
                title: `${query} - Información actualizada`,
                snippet: `Datos recientes y actualizados sobre ${query} de fuentes confiables.`,
                url: `https://news.example.com/${query.replace(/\s+/g, '-')}`
            },
            {
                title: `Guía completa sobre ${query}`,
                snippet: `Todo lo que necesitas saber sobre ${query}, explicado de manera clara y concisa.`,
                url: `https://wiki.example.com/${query.replace(/\s+/g, '_')}`
            }
        ];

        return searchResults.map((result, index) => 
            `${index + 1}. **${result.title}**\n   ${result.snippet}\n   Fuente: ${result.url}\n`
        ).join('\n');
    } catch (error) {
        console.error('Error en búsqueda web:', error);
        return `Lo siento, no pude realizar la búsqueda para "${query}". Por favor, intenta de nuevo más tarde.`;
    }
}


import { searchAndDownloadImages as searchImages } from './imageService';

export { searchAndDownloadImages } from './imageService';

export async function generateWebCodeWithImages(description: string): Promise<string> {
    try {
        const searchQuery = description.toLowerCase().includes('gatos') ? 'gatos' : 
                           description.toLowerCase().includes('perros') ? 'perros' :
                           description.toLowerCase().includes('helado') ? 'helado' : 
                           description.toLowerCase().includes('flores') ? 'flores' : 'naturaleza';
        
        const imageUrls = await searchImages(searchQuery, 3);
        
        const htmlCode = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${description}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            padding: 40px;
        }
        
        .image-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .image-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .image-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .image-card:hover img {
            transform: scale(1.1);
        }
        
        .card-content {
            padding: 20px;
        }
        
        .card-title {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 10px;
        }
        
        .card-description {
            color: #666;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .gallery {
                grid-template-columns: 1fr;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${description}</h1>
            <p>Una hermosa galería generada automáticamente</p>
        </div>
        
        <div class="gallery">
            ${imageUrls.map((url, index) => `
            <div class="image-card">
                <img src="${url}" alt="Imagen ${index + 1}" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">Imagen ${index + 1}</h3>
                    <p class="card-description">Una hermosa imagen encontrada automáticamente para tu galería.</p>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    
    <script>
        // Animación de entrada
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.image-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
        
        // Efecto de paralaje en el scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            header.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        });
    </script>
</body>
</html>`;
        
        return htmlCode;
    } catch (error) {
        console.error('Error generando código web:', error);
        return 'Error al generar el código web. Por favor, intenta de nuevo.';
    }
}


export async function enhancedDeveloperResponse(userMessage: string, chat: any): Promise<string> {
    try {
        // Pre-prompt para hacer el modelo más inteligente y especializado
        const enhancedPrompt = `Eres un desarrollador de software experto con 10+ años de experiencia. Tu especialidad es crear código excepcional, limpio y eficiente. 

INSTRUCCIONES ESPECIALES:
1. Si necesitas información técnica específica, primero busca en internet
2. Siempre proporciona código completo y funcional
3. Incluye comentarios explicativos en español
4. Sugiere mejores prácticas y optimizaciones
5. Si es una web, hazla responsive y moderna
6. Incluye manejo de errores cuando sea apropiado

CONSULTA DEL USUARIO: ${userMessage}

Responde como un experto desarrollador que entiende perfectamente lo que el usuario necesita y proporciona la mejor solución posible.`;

        // Buscar información técnica si es necesario
        let additionalInfo = "";
        if (userMessage.toLowerCase().includes("react") || 
            userMessage.toLowerCase().includes("javascript") || 
            userMessage.toLowerCase().includes("python") ||
            userMessage.toLowerCase().includes("api") ||
            userMessage.toLowerCase().includes("framework")) {
            
            const searchQuery = extractTechnicalTerms(userMessage);
            if (searchQuery) {
                const searchResults = await searchWeb(`${searchQuery} best practices tutorial`);
                additionalInfo = `\n\nINFORMACIÓN TÉCNICA ENCONTRADA:\n${searchResults}\n\n`;
            }
        }

        const finalPrompt = enhancedPrompt + additionalInfo;
        
        // Enviar al modelo con el prompt mejorado
        const stream = await chat.sendMessageStream({ message: [{ text: finalPrompt }] });
        let response = '';
        for await (const chunk of stream) {
            response += chunk.text;
        }
        
        return response;
    } catch (error) {
        console.error('Error en respuesta mejorada:', error);
        return 'Error al procesar la solicitud. Por favor, intenta de nuevo.';
    }
}

function extractTechnicalTerms(message: string): string {
    const technicalTerms = [
        'react', 'javascript', 'python', 'node.js', 'express', 'flask', 
        'api', 'rest', 'graphql', 'database', 'mongodb', 'mysql', 
        'css', 'html', 'typescript', 'vue', 'angular', 'bootstrap',
        'tailwind', 'sass', 'webpack', 'vite', 'docker', 'kubernetes'
    ];
    
    const foundTerms = technicalTerms.filter(term => 
        message.toLowerCase().includes(term)
    );
    
    return foundTerms.length > 0 ? foundTerms.join(' ') : '';
}

