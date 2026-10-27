# Prototipo DIU — FabLab USM

MVP en React (solo frontend) del sistema de gestión de flujo de trabajo para FabLab USM, para el curso
Diseño de Interfaces Usuarias (INF322). Implementa las 6 hipótesis validadas en la Entrega 2 para la Persona
**Christian Carvajal (Ayudante FabLab)**.

Base: [alexarenasf/frontend-sample-app](https://github.com/alexarenasf/frontend-sample-app) (React 18 + React Router + Webpack + Sass).

## Requisitos
- Node >= 16.13.1 · npm >= 8.1.2

## Uso
```
npm install
npm run dev     # http://localhost:5050
npm run prod    # build de producción
```

## Estructura
```
src/
  components/   layout, nav lateral y banner global de alertas
  pages/        una página por hipótesis
  state/        estado compartido (React Context) con las acciones de cada sección
  data/         mock_data.js: datos de ejemplo realistas, compartidos
  stylesheets/  Sass con BEM, una carpeta por sección
```

## Rutas
| Ruta | Sección |
|---|---|
| `/` | Panel de disponibilidad |
| `/reservas` | Reservas semanales |
| `/proyectos` | Cola y traspaso de turno |
| `/maquinas` | Estado de máquinas |
| `/turnos` | Turnos de ayudantes |
| `/materiales` | Materiales y stock |

Reparto de trabajo, criterios de aceptación y flujo de Git: ver [TAREAS.md](./TAREAS.md).

## Integrantes
Luciano Catalán, Martín Casanova, Javier Escudero, Martín Espinoza, Matías Flores, Benjamín López
