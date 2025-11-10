export type MessageCard = {
    id: string;         // Identificador único del mensaje
    sender: string;     // Nombre del remitente del mensaje
    message: string;    // Contenido del mensaje
    timestamp: string;  // Marca de tiempo del mensaje
    isUser: boolean;    // Indica si el mensaje es del usuario actual
}