# 🏋️‍♂️ GymPro

Aplicación móvil para gestionar rutinas de entrenamiento y llevar seguimiento del progreso personal, construida con **React Native** y **Expo**.

Proyecto desarrollado en talleres de la materia *Desarrollo de Aplicaciones Móviles* y evolucionado en el examen práctico "Mejoras y Extensión de GymPro".

## ✨ Características

- 📋 CRUD completo de rutinas de entrenamiento (crear, editar, eliminar, listar)
- 🔍 Filtro de rutinas por grupo muscular (Todos, Pecho, Espalda, Piernas)
- ✅ Validaciones de formulario: nombre y grupo muscular obligatorios, duración numérica entre 10 y 180 minutos
- ⭐ Rutina destacada con selección única (al marcar una, la anterior se desmarca automáticamente)
- 📊 Pantalla de Progreso calculada dinámicamente: total de rutinas, duración total, duración promedio y grupo muscular con más rutinas
- 💾 Persistencia local completa con **SQLite** (rutinas y rutina destacada sobreviven al cerrar la app)
- 🧭 Navegación por pestañas inferiores (*bottom tabs*) con diseño personalizado
- 🎨 Interfaz rediseñada con paleta oscura y acentos coral

## 🛠️ Tech Stack

| Categoría | Tecnología |
|---|---|
| Framework | [Expo](https://expo.dev/) ~57 |
| UI | React Native 0.86 + React 19 |
| Lenguaje | TypeScript |
| Navegación | React Navigation (bottom-tabs, drawer, native-stack) |
| Estado global | Context API |
| Base de datos | expo-sqlite |
| Animaciones / gestos | react-native-reanimated, react-native-worklets, react-native-gesture-handler |
| Íconos | @expo/vector-icons |

## 📋 Prerrequisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- npm o yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (se ejecuta vía `npx`, no requiere instalación global)
- Para probar en dispositivo físico: la app [Expo Go](https://expo.dev/go) instalada en tu celular
- Opcional: Android Studio (emulador Android) o Xcode (simulador iOS, solo macOS)

## 🚀 Instalación

1. Cloná el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd gympro
   ```

2. Instalá las dependencias:
   ```bash
   npm install
   ```

3. Iniciá el proyecto:
   ```bash
   npm start
   ```

4. Escaneá el código QR con la app **Expo Go** (Android/iOS) o presioná `a` / `i` en la terminal para abrir un emulador.

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Inicia la app en un emulador/dispositivo Android |
| `npm run ios` | Inicia la app en un simulador/dispositivo iOS (requiere macOS) |
| `npm run web` | Inicia la app en el navegador |

## 📁 Estructura del proyecto

```
gympro/
├── screeens/                  # Pantallas de la aplicación
│   ├── ProgressScreen.tsx     # Resumen dinámico + rutina destacada
│   ├── RoutineListScreen.tsx  # Listado, filtro por grupo muscular
│   └── AddRoutineScreen.tsx   # Formulario de creación/edición con validaciones
├── navigation/                # Configuración de navegación
│   └── TabNavigator.tsx
├── context/                   # Contextos de React (estado global)
│   └── RoutineContext.tsx     # CRUD + rutina destacada + SQLite
├── index.ts                   # Punto de entrada de la app
├── videos.txt                 # Enlaces a los videos explicativos del examen
└── package.json
```

> **Nota:** la carpeta de pantallas se llama `screeens` (así, con doble "e") en el proyecto actual. Se documenta tal cual para evitar errores de importación.

## 🗄️ Modelo de datos

La app persiste las rutinas en una tabla `routines` de SQLite:

| Campo | Tipo (SQLite) | Tipo (TypeScript) | Descripción |
|---|---|---|---|
| `id` | INTEGER | `number` | Identificador único |
| `name` | TEXT | `string` | Nombre de la rutina |
| `muscleGroup` | TEXT | `string` | Grupo muscular trabajado |
| `duration` | INTEGER | `number` | Duración en minutos (10–180) |
| `createAt` | TEXT | `string` | Fecha de creación |
| `featured` | INTEGER (0/1) | `boolean` | Si la rutina está destacada |

El acceso a estos datos se maneja mediante `RoutineContext`, que expone:

- `routines` — lista de rutinas cargadas desde SQLite
- `addRoutine(routine)` — agrega una nueva rutina (con validación previa en el formulario)
- `updateRoutine(id, routine)` — edita una rutina existente
- `deleteRoutine(id)` — elimina una rutina
- `setFeaturedRoutine(id)` — marca una rutina como destacada; internamente desmarca todas (`UPDATE routines SET featured = 0`) antes de marcar la elegida (`UPDATE routines SET featured = 1 WHERE id = ?`), garantizando que solo exista una destacada a la vez
- `cargando` — indica si hay una operación en curso

### Regla de rutina destacada

Solo puede existir **una** rutina destacada al mismo tiempo. Al seleccionar una nueva, la anterior se desmarca automáticamente y el cambio se persiste en SQLite, por lo que la selección se mantiene incluso al cerrar y reabrir la aplicación.

### Validaciones del formulario (`AddRoutineScreen`)

| Campo | Regla |
|---|---|
| Nombre | Obligatorio |
| Grupo muscular | Obligatorio |
| Duración | Numérica, entre 10 y 180 minutos |

Las validaciones aplican tanto al crear como al editar, y el formulario no navega de regreso a la lista mientras existan errores.

### Cálculos de `ProgressScreen`

Todos los valores se calculan en tiempo real a partir de `routines` (no están escritos de forma fija):

- Total de rutinas
- Duración total
- Duración promedio
- Grupo muscular con mayor cantidad de rutinas
- Rutina destacada actual

## 🎥 Entregables del examen

- `videos.txt` — contiene los enlaces al video de explicación del código y al video de la aplicación final funcionando.
- Repositorio GitHub actualizado con el proyecto evolucionado.

## 🤝 Contribuir

1. Hacé un fork del proyecto
2. Creá una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Hacé commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Hacé push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abrí un Pull Request

## 📄 Licencia

Proyecto privado (`"private": true`) — desarrollado con fines académicos.
