/*
 * Interruptores para mostrar u ocultar partes de la web.
 * Cambiá a `true` y volvé a publicar para que aparezcan.
 */

// Kinima Photography: sección en la home, página /fotografia, link del footer,
// motivo "Compré un paquete" en el formulario y preguntas frecuentes relacionadas.
export const SHOW_PHOTOGRAPHY = true;

// Imagen del dispositivo: guardala en /public y poné el nombre del archivo, por ejemplo "dispositivo.jpg".
// Mientras sea null, se muestra un espacio reservado.
export const DEVICE_IMAGE = "dispositivo.jpg";

// Robotec, sponsor principal. Si querés que aparezca el botón a su web o Instagram, poné el link acá,
// por ejemplo "https://www.instagram.com/robotec.uy/". Mientras sea null, el botón no se muestra.
export const ROBOTEC_URL = "https://www.robotec.com.uy/";

// Formulario de contacto en Vercel: creá una clave gratis en https://web3forms.com con el mail kinima.uruguay@gmail.com
// y pegala acá, por ejemplo "a1b2c3d4-....". Las consultas te llegan a ese mail.
// Mientras sea null, el formulario usa Netlify Forms (solo funciona si la web está en Netlify).
export const WEB3FORMS_KEY = "41e77e41-ae57-44d6-ac66-8e84a5bf9d21";
