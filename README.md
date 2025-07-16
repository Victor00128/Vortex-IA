# 🌪️ VORTEX - IA Conversacional

```
██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗
██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝ 
╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗ 
 ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗
  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
```

## 📱 Mi Historia Personal

Qué tal, gente Soy un desarrollador cubano y les quiero compartir este proyecto que me ha costado un poco de trabajo. **Vortex** es una aplicación de chat inteligente que desarrollé completamente desde mi teléfono celular, usando solo las herramientas que tenía a mano.

No voy a mentirles este proyecto me dio muchos un dolor de cabeza. Pasé noches enteras programando desde mi móvil, lidiando con la pantalla pequeña, y mil errores que parecían no tener solución. Pero la inspiración y las ganas de crear algo útil me mantuvieron adelante.

Este trabajo lo hice con mucha dedicación porque creo que la tecnología debe estar al alcance de todos, especialmente de nosotros que a veces no tenemos los recursos más modernos pero sí tenemos la creatividad y las ganas de innovar.

## 🚀 ¿Qué hace Vortex?

Mi aplicación es como tener un asistente personal que realmente te entiende. Después de tanto esfuerzo, logré que tenga estas funcionalidades:

### 💬 Conversación Natural
- Hablas con él como si fuera una persona real
- Entiende el contexto y mantiene conversaciones fluidas
- Responde con personalidad y humor (¡a veces hasta me sorprende!)

### 🌐 Conexión en Tiempo Real
- Siempre actualizado con información fresca
- Búsquedas inteligentes cuando necesitas datos específicos

### 📱 Diseño Responsivo
- Se ve bien en cualquier dispositivo
- Desarrollado mobile-first (¡porque lo hice en el celular!)
- Interfaz intuitiva y fácil de usar

### 🎭 Personalidades Múltiples
- Puedes cambiar cómo te responde según tu estado de ánimo
- Desde formal hasta relajado y divertido

## 🛠️ Instalación

### Para PC/Laptop:

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/vortex-ia.git
cd vortex-ia
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus claves de API:
```
API_KEY_CONVERSACION=tu_clave_aqui
API_KEY_IMAGENES=tu_clave_imagenes_aqui
```

#### 4. Ejecutar en desarrollo
```bash
npm run dev
```

#### 5. Construir para producción
```bash
npm run build
```

### Para Android (usando Termux):

#### 1. Instalar Termux desde F-Droid o Google Play

#### 2. Actualizar paquetes
```bash
pkg update && pkg upgrade
```

#### 3. Instalar Node.js y Git
```bash
pkg install nodejs git
```

#### 4. Clonar el proyecto
```bash
git clone https://github.com/tu-usuario/vortex-ia.git
cd vortex-ia
```

#### 5. Instalar dependencias
```bash
npm install
```

#### 6. Configurar variables de entorno
```bash
cp .env.example .env.local
nano .env.local
```

#### 7. Ejecutar la aplicación
```bash
npm run dev
```

## 🔑 Obtener las Claves de API

### Para Conversación (Gemini):
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva clave de API
3. Cópiala y pégala en tu archivo `.env.local

## 🔧 Solución de Problemas

### La aplicación no carga
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que las claves de API estén configuradas
- Revisa los logs de consola para errores específicos

### Errores en Termux
- Ejecuta `pkg update` si hay problemas de compatibilidad
- Asegúrate de tener suficiente espacio de almacenamiento
- Algunos comandos pueden requerir permisos adicionales

### Problemas de API
- Verifica que las claves no hayan expirado
- Revisa los límites de uso de cada servicio

## 📁 Estructura del Proyecto

```
vortex-ia/
├── componentes/          # Componentes React
├── servicios/           # Servicios de API
├── public/             # Archivos estáticos
├── dist/               # Build de producción
├── index.html          # Punto de entrada
├── index.tsx           # Inicialización React
├── App.tsx             # Componente principal
├── tipos.ts            # Definiciones TypeScript
├── vite.config.ts      # Configuración Vite
├── netlify.toml        # Configuración Netlify
└── _redirects          # Redirecciones SPA
```

## 🤝 Contribuir

Si quieres ayudar a mejorar este proyecto que tanto me costó:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mejora-increible`)
3. Commit tus cambios (`git commit -m 'Agregué una mejora increíble'`)
4. Push a la rama (`git push origin feature/mejora-increible`)
5. Abre un Pull Request

## 📝 Reflexiones Finales

Este proyecto representa mucho más que código para mí. Es la prueba de que con dedicación y las herramientas correctas, puedes crear algo increíble desde cualquier lugar y con cualquier dispositivo. 

Programar desde el celular no fue fácil, pero me enseñó a ser más eficiente y creativo con los recursos limitados. Cada línea de código tiene su historia, cada función superada fue una pequeña victoria.

Espero que Vortex les sea útil y que, tal vez, inspire a otros desarrolladores a no rendirse ante las limitaciones técnicas. La creatividad y la pasión siempre encuentran la manera.

**Desarrollado con ❤️ desde 🇺🇾🇨🇺**

*"La tecnología no conoce fronteras, solo necesita manos creativas y mentes determinadas"*
