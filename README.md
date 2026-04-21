# Fundación Reiki Intranet

## Proyecto de Gestión Integral para la Fundación Reiki

Este proyecto representa una solución web robusta y escalable, diseñada para optimizar la gestión interna de la Fundación Reiki. Desarrollada por **Technology of Jota** y liderada por **Juan Idarraga**, esta plataforma centraliza funcionalidades críticas para la administración de alumnos, avisos, clases y materiales, garantizando una experiencia de usuario segura y eficiente.

## Visión General del Proyecto

La `Fundación Reiki Intranet` es una aplicación web moderna construida con **Next.js (App Router)**, ofreciendo renderizado del lado del servidor (SSR) y componentes interactivos para una experiencia de usuario fluida. La integración con **Supabase** proporciona una base de datos potente y servicios de autenticación seguros, mientras que **Tailwind CSS** asegura un diseño responsivo y estéticamente coherente con la identidad visual de la fundación.

## Características Clave

*   **Gestión de Usuarios y Roles**: Sistema de autenticación y autorización basado en Supabase, con roles definidos (`admin`, `alumno`) para controlar el acceso a diferentes secciones de la plataforma.
*   **Administración de Contenidos**: Módulos dedicados para la creación y gestión de avisos, clases y materiales educativos, facilitando la comunicación y el acceso a recursos.
*   **Control de Suscripciones (Paywall)**: Implementación de un sistema de paywall dinámico que restringe el acceso a contenido premium para usuarios con suscripciones expiradas, con una interfaz clara para la renovación.
*   **Seguridad Reforzada**: Middleware global de seguridad para protección contra ataques comunes (FOUC) y blindaje de Server Actions con verificación de permisos de administrador, asegurando la integridad de los datos.
*   **Diseño Responsivo y UX Mejorada**: Interfaz de usuario optimizada para diversos dispositivos (escritorio, tablet, móvil) con retroalimentación visual (spinners de carga) para una experiencia intuitiva y sin interrupciones.
*   **Tecnologías Modernas**: Aprovecha las últimas características de Next.js, TypeScript para un código robusto y mantenible, y Tailwind CSS para un desarrollo ágil y personalizable.

## Stack Tecnológico

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Framework Frontend** | Next.js (App Router) | React framework para aplicaciones web de alto rendimiento, con SSR y optimizaciones de enrutamiento. |
| **Base de Datos & Auth** | Supabase | Plataforma de código abierto para bases de datos PostgreSQL y servicios de autenticación, en tiempo real. |
| **Estilos CSS** | Tailwind CSS | Framework CSS utility-first para un diseño rápido y altamente personalizable. |
| **Lenguaje de Programación** | TypeScript | Superset de JavaScript que añade tipado estático para mejorar la calidad y mantenibilidad del código. |
| **Entorno de Ejecución** | Node.js | Entorno de ejecución para JavaScript en el servidor. |
| **Despliegue** | Vercel | Plataforma de despliegue continuo para aplicaciones Next.js, optimizada para rendimiento. |

## Instalación y Configuración (Para Desarrollo Local)

Para ejecutar este proyecto localmente, sigue los siguientes pasos:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/Juan-David-Idarraga/fundacion-reiki.git
    cd fundacion-reiki
    ```
2.  **Instalar Dependencias**:
    ```bash
    pnpm install
    ```
3.  **Configurar Supabase**: Crea un proyecto en Supabase y configura las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) en un archivo `.env.local`.
4.  **Ejecutar la Aplicación**:
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Autor y Empresa

Este proyecto ha sido desarrollado por:

**Juan Idarraga**
*   **Empresa**: Technology of Jota
*   **Portafolio**: [Enlace a tu portafolio o LinkedIn](https://www.linkedin.com/in/juan-david-idarraga-b1a1a1a1a/) (Reemplazar con tu enlace real)

---
