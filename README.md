# Puzzles Project

Este proyecto está configurado con Vite y React para crear una aplicación web de puzzles.

## Configuración del Proyecto

### Estructura de Archivos
```
├── public/          # Archivos estáticos
├── src/            # Código fuente
│   ├── components/ # Componentes React
│   │   ├── Timer/              # Componente del temporizador
│   │   ├── DifficultyContainer/# Selector de dificultad
│   │   ├── CompletionMessage/  # Mensaje de finalización
│   │   ├── PuzzleContainer/    # Contenedor principal del puzzle
│   │   └── PuzzlePiece/        # Componente de pieza individual
│   ├── App.jsx     # Componente principal
│   ├── App.css     # Estilos del componente principal
│   ├── main.jsx    # Punto de entrada
│   └── index.css   # Estilos globales
├── index.html      # Página principal
├── package.json    # Dependencias y scripts
├── vite.config.js  # Configuración de Vite
└── .gitignore      # Archivos ignorados por Git
```

### Componentes
El proyecto está organizado en los siguientes componentes principales:

- **Timer**: Maneja la funcionalidad del temporizador del juego
- **DifficultyContainer**: Permite al usuario seleccionar el nivel de dificultad
- **CompletionMessage**: Muestra un mensaje cuando el puzzle se completa
- **PuzzleContainer**: Contenedor principal que maneja la lógica del puzzle
- **PuzzlePiece**: Representa cada pieza individual del puzzle

### Configuración de Git
El proyecto incluye un `.gitignore` configurado para ignorar:
- Dependencias (`node_modules/`)
- Archivos compilados (`dist/`)
- Archivos de entorno (`.env`)
- Archivos de editor (`.vscode/`, `.idea/`)
- Archivos de log

### Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

### Desarrollo
Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

### Construcción
Para crear la versión de producción:
```bash
npm run build
``` 