# Vortex-IA: El Chismoso Digital

¡Qué volá, mi gente! Aquí les traigo el Vortex-IA, una aplicación de chat que es más chismosa que la vecina de al lado, pero con la inteligencia de un sabio de la calle. ¡Prepárense para conversaciones que te dejan con la boca abierta y unas imágenes que te harán decir '¡Asere, qué clase de invento!'.

## ¿Qué trae este invento?

- 🗣️ **Conversación que fluye como el Malecón en un día de brisa:** Olvídate de los bots aburridos, aquí hablamos de tú a tú.
- 🎨 **Imágenes que te pintan la cara:** ¿Necesitas una imagen para tu próximo post de Instagram? ¡El Vortex-IA te la resuelve!
- 💻 **Editor de código pa' los duros:** Si eres de los que le meten mano al código, aquí tienes tu patio de juego.
- 🌐 **Conectado al mundo como un buen chismoso:** Siempre al tanto de lo que pasa, pa' que no te quedes atrás.
- 📱 **Se ve bien hasta en el Nokia de la abuela:** Diseño que se adapta a cualquier cacharro, ¡sin estrés!
- 🎯 **Personalidades pa' todos los gustos:** ¿Quieres un chismoso serio o uno que te tire un piropo? ¡Tú mandas!

## ¿Cómo se instala esta maravilla?

### 1. Clonar el repositorio (¡no te asustes, es fácil!)
```bash
git clone <tu-repositorio>
cd Vortex-IA
```

### 2. Instalar las dependencias (¡pa' que funcione como un reloj!)
```bash
npm install
```

### 3. Configurar las variables de entorno (¡el secreto de la abuela!)
Copia el archivo `.env.example` como `.env.local` y ponle tus claves (¡no se las des a nadie!):

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrégale tus claves (¡como si fuera el sazón de la comida!):
```
API_KEY_CONVERSACION=tu_clave_de_api_de_conversacion_aqui
API_KEY_IMAGENES=tu_clave_de_api_de_imagenes_aqui
```

### 4. ¡A correr en desarrollo! (¡pa' que lo veas funcionando!)
```bash
npm run dev
```

### 5. Construir pa' la calle (¡pa' que todo el mundo lo vea!)
```bash
npm run build
```

## ¿Cómo lo subo a Netlify? (¡pa' que esté en la nube!)

### Problemas Comunes y Soluciones (¡no te desesperes, que tiene arreglo!)

1. **Página en blanco en Netlify**: 
   - Asegúrate de que el archivo `netlify.toml` esté en la raíz del proyecto (¡en su sitio!)
   - Verifica que el directorio de publicación sea `dist` (¡donde tiene que estar!)
   - Confirma que el archivo `_redirects` esté en el directorio `public` (¡el que no falla!)

2. **Variables de entorno**:
   - En Netlify, ve a Site settings > Environment variables (¡el lugar de los secretos!)
   - Agrega `API_KEY_CONVERSACION` con tu clave de API de conversación
   - Agrega `API_KEY_IMAGENES` con tu clave de API de imágenes (opcional)

3. **Errores de build**:
   - Asegúrate de que Node.js versión 20 esté configurada en Netlify (¡la versión que va!)
   - Verifica que todas las dependencias estén instaladas correctamente (¡que no falte nada!)

### Configuración de Netlify (¡la receta secreta!)

El proyecto incluye un archivo `netlify.toml` con la configuración necesaria:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Pasos para desplegar (¡paso a paso, sin apuro!):

1. **Conecta tu repositorio** a Netlify (¡que se conozcan!)
2. **Configura las variables de entorno** en Netlify:
   - `API_KEY_CONVERSACION`: Tu clave de API de conversación
   - `API_KEY_IMAGENES`: Tu clave de API de imágenes (opcional)
3. **Despliega** - Netlify detectará automáticamente la configuración (¡y listo el pollo!)

## ¿Dónde consigo las claves? (¡el mapa del tesoro!)

### Clave de Conversación
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey) (¡el lugar donde nacen las ideas!)
2. Crea una nueva clave de API (¡tu pase VIP!)
3. Copia la clave y agrégala a tu archivo `.env.local` (¡guárdala como oro!)

### Clave de Imágenes (Opcional)
1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys) (¡otro lugar mágico!)
2. Crea una nueva clave de API (¡otra llave maestra!)
3. Copia la clave y agrégala a tu archivo `.env.local` (¡no la pierdas!)

## Estructura del Proyecto (¡pa' que no te pierdas!)

```
Vortex-IA/
├── componentes/          # Las piezas del rompecabezas
├── servicios/           # Los que hacen la magia por detrás
├── public/             # Lo que ve la gente
├── dist/               # El resultado final, ¡listo pa' usar!
├── index.html          # La puerta de entrada
├── index.tsx           # El cerebro de la operación
├── App.tsx             # El corazón del asunto
├── tipos.ts            # Las reglas del juego
├── vite.config.ts      # Cómo se arma el invento
├── netlify.toml        # El manual de instrucciones para Netlify
└── _redirects          # Los atajos pa' que todo fluya
```

## Solución de Problemas (¡siempre hay un plan B!)

### La aplicación no carga en Netlify (¡se puso rebelde!)
1. Verifica que el build se complete sin errores (¡que no haya tropiezos!)
2. Asegúrate de que el archivo `_redirects` esté en el directorio `public` (¡en su lugar!)
3. Confirma que las variables de entorno estén configuradas en Netlify (¡que no falte nada!)
4. Revisa los logs de build en Netlify para errores específicos (¡el chismoso de los errores!)

### Error de API Key (¡la clave no abre la puerta!)
1. Verifica que la clave de API esté configurada correctamente (¡bien escrita!)
2. Asegúrate de que la clave tenga los permisos necesarios (¡que tenga la licencia!)
3. Confirma que la clave no haya expirado (¡que no se haya vencido!)

## ¿Quieres meterle mano? (¡únete a la fiesta!)

1. Fork el proyecto (¡hazlo tuyo!)
2. Crea una rama para tu feature (`git checkout -b feature/MiInventoSantiaguero`)
3. Commit tus cambios (`git commit -m 'Le metí un cambio que te va a gustar'`)
4. Push a la rama (`git push origin feature/MiInventoSantiaguero`)
5. Abre un Pull Request (¡pa' que lo vea el mundo!)

## Licencia (¡pa' que sepas las reglas!)

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles. (¡léelo, que es importante!)


