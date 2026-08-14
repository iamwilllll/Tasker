# ✨ TaskFlow

> A modern task management application built with React, TypeScript, and Tailwind CSS, designed to provide a fast, clear, and enjoyable experience for organizing daily work.

---

## 📌 Overview

**TaskFlow** is a task management web application focused on simplicity, productivity, and a modern visual experience.

El proyecto permite crear, consultar, completar, editar y eliminar tareas desde una interfaz intuitiva. La arquitectura está pensada para mantener una separación clara entre la interfaz, la lógica de negocio y la comunicación con la API.

The project also includes a theme system based on CSS variables and Tailwind CSS, making it easy to change the application's visual identity without modifying individual components.

### Main Goals

- 📝 Manage tasks with minimal friction.
- ⚡ Keep the interface fast and responsive.
- 🎨 Use a consistent visual system.
- 🌓 Support multiple themes.
- 📱 Provide a responsive experience across screen sizes.
- 🧩 Make the codebase easy to maintain and evolve.
- 🔌 Separate the UI from backend communication.

---

# 🚀 Stack tecnológico

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| **React**         | UI development                    |
| **TypeScript**    | Static typing and code safety     |
| **Vite**          | Development and production builds |
| **Tailwind CSS**  | Styling and utility system        |
| **CSS Variables** | Design tokens and themes          |
| **Fetch API**     | Backend communication             |
| **ESLint**        | Code quality and consistency      |

---

# 🏗️ Arquitectura

The project follows a component-oriented structure:

```text
src/
├── components/
│   ├── Header.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── TaskFilters.tsx
│   ├── TaskStats.tsx
│   └── ...
│
├── hooks/
│   └── ...
│
├── services/
│   └── ...
│
├── types/
│   └── ...
│
├── App.tsx
├── App.css
└── main.tsx
```

> The exact structure may evolve as the project grows. The main goal is to keep responsibilities isolated and avoid monolithic components.

---

# 🧠 Conceptos principales

## 1. Gestión de tareas

The application revolves around one primary entity: the **task**.

A task can contain information such as:

```ts
interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}
```

The UI uses this information to represent the current state of each task.

The main operations are:

- Create a task.
- Display tasks.
- Mark a task as completed.
- Edit a task.
- Delete a task.
- Filter tasks.
- Display statistics.

---

# 🔄 Flujo de la aplicación

The general flow can be represented as:

```text
                    ┌─────────────────┐
                    │     Usuario     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Interfaz React │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
             Crear        Editar       Eliminar
              tarea        tarea         tarea
                │            │            │
                └────────────┼────────────┘
                             ▼
                    ┌─────────────────┐
                    │  Estado / API   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ UI actualizada  │
                    └─────────────────┘
```

The goal is for presentation components to remain unaware of unnecessary infrastructure details.

---

# 🎨 Sistema de diseño

One of the project's strengths is that colors are not directly coupled to components.

Instead of:

```tsx
<div className="bg-[#ff7657]">
```

semantic tokens are used:

```tsx
<div className="bg-brand-primary">
```

This makes it possible to completely change the visual identity without updating every component.

---

# 🌈 Sistema de temas

El proyecto dispone de tres identidades visuales principales.

## ☀️ Light

### Peach · Coral · Indigo

Aesthetic:

- Warm.
- Friendly.
- Clean.
- Optimistic.
- Welcoming.

Ideal for everyday use.

---

## 🌙 Dark

### Midnight · Aqua · Lavender

Aesthetic:

- Modern.
- Technological.
- Elegant.
- Relaxed.
- Visually softer.

It is designed to preserve strong visual hierarchy without falling into the typical black-and-blue look found in many applications.

---

## ✨ Shiny

### Berry · Tangerine · Turquoise

Aesthetic:

- Creative.
- Energetic.
- Youthful.
- Expressive.
- Distinctive.

It is the boldest option in the system.

---

# 🎯 Design Tokens

El sistema visual utiliza variables semánticas como:

```css
--primary-surface-base
--task-surface-base
--primary-text-base
--secondary-text-base
--muted-text-base
--button-text-base
--input-border-base
--task-border-base
--red
--green
--brand-primary
--brand-secondary
```

Esto permite que los componentes trabajen con **intención semántica**, no con colores concretos.

For example:

```text
❌ orange-500

✅ brand-primary
```

Así, `brand-primary` puede ser coral en Light, aqua en Dark y naranja en Shiny.

---

# 🧩 Integración con Tailwind

Los tokens se exponen mediante `@theme`:

```css
@theme {
    --color-primary-surface: var(--primary-surface-base);
    --color-primary-background: var(--primary-surface-base);
    --color-task-surface: var(--task-surface-base);

    --color-primary-text: var(--primary-text-base);
    --color-secondary-text: var(--secondary-text-base);
    --color-muted-text: var(--muted-text-base);

    --color-brand-primary: var(--brand-primary);
    --color-brand-secondary: var(--brand-secondary);
}
```

De esta manera, pueden utilizarse directamente desde los componentes:

```tsx
className = 'bg-primary-surface text-primary-text';
```

o:

```tsx
className = 'bg-brand-primary text-button-text';
```

---

# 🌓 Cambio de tema

Themes are controlled through classes on the `<html>` element:

```html
<html class="light"></html>
```

```html
<html class="dark"></html>
```

```html
<html class="shiny"></html>
```

Changing the theme updates the CSS tokens, so every component automatically receives the new visual identity.

### Advantage

There is no need to do:

```tsx
if (theme === 'dark') {
    // cambiar cada color manualmente
}
```

The component simply uses the tokens.

---

# 📦 Instalación

Clone the project:

```bash
git clone <repository-url>
cd taskflow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the URL provided by Vite, usually:

```text
http://localhost:5173
```

---

# 🛠️ Scripts

Los scripts disponibles normalmente son:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Generates an optimized production build.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint to detect code-quality issues.

---

# 🔌 Backend / API

The interface is designed to communicate with a backend over HTTP.

The conceptual flow is:

```text
React
  │
  │ HTTP
  ▼
API
  │
  ▼
Base de datos
```

A service layer can centralize operations such as:

```ts
getTasks();
createTask();
updateTask();
deleteTask();
```

This avoids scattering `fetch()` calls throughout the application.

### Recommendation

Keep HTTP calls outside components whenever possible.

For example:

```text
components/
    ↓
hooks/
    ↓
services/
    ↓
API
```

En lugar de:

```text
component
    ↓
fetch()
    ↓
API
```

---

# 🧱 Componentes

## Header

Responsible for top-level navigation and global application elements.

It may contain:

- Name/logo.
- Theme selector.
- Global actions.

---

## TaskForm

Allows users to create new tasks.

Responsibilities:

- Capture input.
- Validate fields.
- Trigger the creation action.
- Reset the form after successful creation.

---

## TaskList

Responsible for rendering the task collection.

Responsibilities:

- Render tasks.
- Show empty states.
- Coordinate filters.
- Maintain a consistent structure.

---

## TaskItem

Represents an individual task.

Puede gestionar:

- Completion state.
- Editing.
- Deletion.
- Task information.

---

## TaskFilters

Allows users to change the view by status:

```text
Todas
Pendientes
Completadas
```

---

## TaskStats

Displays a summary of the current task state.

For example:

```text
Total:       24
Pendientes:  11
Completadas: 13
```

---

# ♿ Accesibilidad

The interface should follow good accessibility practices.

When adding new components:

- Use semantic HTML elements.
- Buttons should have clear labels.
- Inputs should have labels.
- Do not rely on color alone to communicate state.
- Maintain sufficient contrast.
- Ensure keyboard navigation.
- Use `aria-*` only when necessary.

Example:

```tsx
<button type="button" aria-label="Eliminar tarea">
    <Trash2 />
</button>
```

---

# 📱 Responsive Design

The interface should be designed mobile-first and then scaled up for larger screens.

La estructura recomendada:

```text
Mobile
  ↓
Tablet
  ↓
Desktop
```

Tailwind makes these breakpoints straightforward to manage:

```tsx
className="
  w-full
  sm:w-auto
  md:max-w-xl
  lg:max-w-2xl
"
```

---

# 🧪 Calidad del código

The project uses TypeScript to reduce data-related errors and enforce contracts between components.

Recommended practices:

### Small Components

Avoid oversized components.

```text
❌ App.tsx con toda la aplicación

✅ App
   ├── Header
   ├── TaskForm
   ├── TaskFilters
   ├── TaskStats
   └── TaskList
```

### Typed Props

```ts
interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}
```

### Evitar valores mágicos

```tsx
❌ #ff7657

✅ bg-brand-primary
```

---

# 🎨 Filosofía visual

The rebrand aims to move away from generic and overly corporate interfaces.

The visual direction combines:

**Juventud + claridad + personalidad + calidez**

The interface should feel:

> "Modern without feeling cold."

> "Colorful without becoming chaotic."

> "Simple without feeling basic."

> "Professional without looking corporate."

---

# 📁 Archivos importantes

| Archivo           | Responsibility                   |
| ----------------- | -------------------------------- |
| `src/App.tsx`     | Main application composition     |
| `src/App.css`     | Global styling and design tokens |
| `src/main.tsx`    | React entry point                |
| `src/components/` | Reusable components              |
| `src/hooks/`      | Reusable logic                   |
| `src/services/`   | API communication                |
| `src/types/`      | TypeScript types                 |
| `package.json`    | Dependencies and scripts         |
| `vite.config.*`   | Vite configuration               |
| `tsconfig*.json`  | TypeScript configuration         |

---

# 🔐 Variables de entorno

If the project requires an external API, environment variables are recommended:

```env
VITE_API_URL=http://localhost:3000
```

From React:

```ts
const API_URL = import.meta.env.VITE_API_URL;
```

### Important

Never put private secrets in `VITE_*` variables.

Any `VITE_*` value can be exposed in the browser.

---

# 🚀 Build de producción

To generate the build:

```bash
npm run build
```

The output will be generated in:

```text
dist/
```

It can then be deployed to platforms that support Vite/SPAs.

---

# 🔮 Roadmap

Potential future improvements:

- [ ] Autenticación de usuarios.
- [ ] Persistencia completa en base de datos.
- [ ] Drag & drop para ordenar tareas.
- [ ] Prioridades.
- [ ] Etiquetas.
- [ ] Fechas límite.
- [ ] Recordatorios.
- [ ] Búsqueda.
- [ ] Filtros avanzados.
- [ ] Animaciones de transición.
- [ ] Modo offline.
- [ ] PWA.
- [ ] Tests unitarios.
- [ ] Tests E2E.
- [ ] Sistema de notificaciones.
- [ ] Sincronización en tiempo real.
- [ ] Personalización avanzada del tema.

---

# 🧑‍💻 Desarrollo

To contribute to the project:

1. Create a branch.

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Make your changes.

3. Run the validation checks:

```bash
npm run lint
npm run build
```

4. Commit your changes:

```bash
git add .
git commit -m "feat: nueva funcionalidad"
```

5. Push the branch to the repository.

```bash
git push origin feature/nueva-funcionalidad
```

---

# 📐 Convención de commits

Conventional Commits are recommended:

```text
feat: nueva funcionalidad
fix: corrección de bug
refactor: refactorización
style: cambios visuales
docs: documentación
test: pruebas
chore: mantenimiento
```

Ejemplos:

```text
feat: agregar filtro de tareas completadas
fix: corregir eliminación de tareas
style: actualizar paleta del tema dark
refactor: separar servicio de tareas
docs: actualizar README
```

---

# 💡 Principios del proyecto

TaskFlow is built around five principles:

### 01 — Simplicidad

The application should be easy to understand from the first moment.

### 02 — Consistencia

Components should share the same visual and interaction language.

### 03 — Escalabilidad

The architecture should allow new functionality without turning the application into a monolith.

### 04 — Accesibilidad

The experience should be usable by as many people as possible.

### 05 — Personalidad

The design should have a distinct identity.

---

# 📄 Licencia

Add the license selected for the project here.

Example:

```text
MIT License
```

---

# ❤️ Filosofía final

TaskFlow is not intended to be just another task management application.

It aims to make everyday task management a more enjoyable experience:

```text
                 TASKFLOW
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Simple     Visual    Flexible
          │         │         │
          └─────────┼─────────┘
                    ▼
              Productividad
```

The combination of **React + TypeScript + Tailwind CSS + a token-based design system** provides a solid foundation for evolving the product without sacrificing clarity or consistency.

---

<p align="center">
  <strong>✨ TaskFlow</strong><br>
  Organize. Focus. Move forward.
</p>
