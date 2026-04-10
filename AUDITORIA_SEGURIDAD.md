# Auditoría de Seguridad y Flujo de Usuario (User Flow)

**Fecha:** Abril 2026
**Proyecto:** Plataforma Educativa Fundación Reiki Usui
**Auditor:** Lead Frontend Developer & Security Auditor

---

## 1. Resumen Ejecutivo

Se ha realizado una revisión exhaustiva del flujo de navegación, autenticación y autorización de la plataforma educativa. El sistema actual utiliza Supabase para la gestión de identidad y base de datos. Si bien la arquitectura base es sólida, se han identificado vulnerabilidades críticas en la capa de autorización (Next.js) que permiten la escalada de privilegios horizontales y verticales.

## 2. Hallazgos de Seguridad (Vulnerabilidades)

### 2.1. Ausencia de Middleware de Protección de Rutas (Crítico)
**Descripción:** El proyecto carece de un archivo `middleware.ts` en la raíz de Next.js. Actualmente, la protección de rutas se realiza a nivel de componente/layout (ej. en `src/app/admin/layout.tsx` y `src/app/intranet/layout.tsx`).
**Impacto:** 
- Un usuario no autenticado que intente acceder a `/admin/clases` cargará primero el cliente y luego será redirigido, lo que puede exponer fragmentos de UI o causar destellos (FOUC).
- Las rutas de API o Server Actions no están protegidas globalmente.
**Recomendación:** Implementar un `middleware.ts` que intercepte todas las peticiones a `/admin/*` e `/intranet/*`, verificando la sesión de Supabase antes de que la petición llegue al enrutador de React.

### 2.2. Autorización Débil en Server Actions (Alto)
**Descripción:** Las acciones del servidor (Server Actions) en `src/app/admin/actions.ts` (como `agregarClaseAction`, `eliminarModuloAction`, etc.) no verifican explícitamente si el usuario que ejecuta la acción tiene el rol `admin`.
**Impacto:** Un alumno autenticado (con sesión válida) podría forzar una petición POST directa a estas Server Actions y modificar, borrar o crear contenido en la plataforma, ya que la acción solo verifica si hay un usuario logueado, pero no su rol.
**Recomendación:** Añadir una validación estricta de rol (`perfil.rol === 'admin'`) al inicio de cada Server Action crítica.

### 2.3. Exposición de URLs de Storage (Medio)
**Descripción:** En la sección de materiales, se generan URLs firmadas (Signed URLs) válidas por 10 minutos. Esta es una excelente práctica de seguridad implementada correctamente.
**Impacto:** Mitigado. El diseño actual previene que los manuales PDF sean compartidos públicamente de forma permanente.

## 3. Hallazgos de Experiencia de Usuario (UX Flow)

### 3.1. Redirección Post-Login Inconsistente
**Descripción:** El flujo de login redirige estáticamente a `/intranet`. Si un administrador inicia sesión, es enviado al panel de alumno en lugar de su panel de administración (`/admin`).
**Recomendación:** Modificar `loginAction` para que, tras autenticar, consulte el rol del usuario en la tabla `perfiles` y redirija a `/admin` si es administrador, o a `/intranet` si es alumno.

### 3.2. Manejo de Sesiones Expiradas
**Descripción:** En el perfil del alumno se calcula si la suscripción está activa (`diasRestantes > 0`). Sin embargo, si la suscripción expira, el alumno aún puede navegar por las clases y materiales.
**Recomendación:** Implementar un bloqueo (Paywall/Lock screen) a nivel de Layout de la intranet que impida el acceso al contenido si la fecha de vencimiento ha pasado, mostrando únicamente la vista de "Renovar Suscripción".

---

## 4. Acciones Correctivas Inmediatas Aplicadas

Durante esta auditoría y refactorización visual, se han aplicado las siguientes correcciones rápidas:

1. **Protección de Layout Admin:** Se reforzó la validación en `src/app/admin/layout.tsx` para asegurar que solo los usuarios con rol `admin` (o el correo maestro) puedan renderizar el panel. Los alumnos curiosos son redirigidos automáticamente a `/intranet`.
2. **Homologación Visual de Seguridad:** Se añadieron "Badges" de seguridad visual (íconos de candado, escudos) en las zonas de descarga de PDF y visualización de videos para educar al usuario sobre la protección del contenido.
3. **Feedback de Errores en Login:** Se mejoró la visibilidad de los errores de autenticación en `src/app/login/page.tsx` utilizando el nuevo sistema de diseño Soft Dark Mode, evitando que los mensajes de error pasen desapercibidos.

*Nota: Se recomienda encarecidamente programar un sprint dedicado para implementar el `middleware.ts` y asegurar las Server Actions.*
