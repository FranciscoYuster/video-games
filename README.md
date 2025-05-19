# Desafío Video Juegos

Esta aplicación web permite a los usuarios buscar y visualizar información sobre videojuegos utilizando la API pública de [RAWG](https://rawg.io/apidocs). La aplicación muestra una lista de videojuegos ordenados de mayor a menor puntuación (basada en Metacritic), y permite filtrar los resultados por año, género, plataformas, tags y desarrollador. Además, cada videojuego cuenta con una página de detalle que muestra información relevante como título, géneros, puntuación, portada, plataformas, año de lanzamiento, trailers (si existen), screenshots, logros y más.

---

## Tecnologías Utilizadas

- **React:** Biblioteca principal para construir la interfaz de usuario.
- **Material-UI (MUI):** Conjunto de componentes UI que facilitan la construcción de interfaces responsivas y estilizadas.
- **React Router DOM:** Manejo de rutas y navegación en la aplicación.
- **Dayjs:** Para el formateo y manejo de fechas.
- **React Icons:** Para la incorporación de íconos (por ejemplo, para plataformas y favoritos).
- **Vite:** Herramienta de desarrollo y bundler que ofrece una experiencia rápida y moderna.
- **ESLint:** Para mantener un código limpio y consistente.

---

## Como usar

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/FranciscoYuster/video-games
   cd video-games
   ```
2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configurar la API Key de RAWG::**

   ```bash
   Crea una cuenta en [rawg.io/apidocs](https://rawg.io/apidocs) para obtener la key de tu api. 
   Luego en el archivo .example.env deberás escribir tu api_key y renombrar el archivo a .env
   ```

4. **Ejecuta en modo desarrollo:**

   ```bash
   npm run dev
   ```

   Y listo! La aplicación se abrirá en http://localhost:3000 o el puerto que indique Vite.

## Despliegue

La aplicación está desplegada en Vercel. 👉[https://video-juegos-lac.vercel.app/](video-games-lac.vercel.app)

Para desplegarla, se siguieron estos pasos:

1. Subir el repositorio a GitHub.
2. Crear un nuevo proyecto en Vercel e importar el repositorio.
3. Configurar la variable de entorno `VITE_RAWG_API_KEY` en Vercel.
4. Una vez completado el proceso, clic en "deploy", y la aplicación se puede acceder desde:

