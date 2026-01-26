# 3D

Este repositorio consolida el MVP histórico y la experiencia v2 dentro de **PROYECTO 2**.

## Ejecutar el MVP consolidado

1. Abre la carpeta `PROYECTO 2` (por ejemplo desde GitHub Desktop).
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor con IP pública/local habilitada:
   ```bash
   npm run dev
   ```
4. Abre el navegador en `http://<tu-ip-publica-o-local>:3000/`.

Al iniciar verás un selector **Modo** en la esquina superior izquierda para alternar entre:
- **Experiencia v2** (la versión actual).
- **MVP histórico** (la versión original consolidada).

## Notas rápidas
- El servidor ya está configurado para escuchar en `0.0.0.0:3000` desde `vite.config.ts`.
- Si usas una IP pública, asegúrate de abrir el puerto 3000 en tu router o firewall.
