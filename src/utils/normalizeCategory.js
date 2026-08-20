// Normaliza un string de categoría para comparar/guardar de forma consistente:
// - minúsculas
// - sin espacios al principio/final
// - sin acentos (á -> a, é -> e, etc.)
export const normalizeCategory = (texto) => {
    return texto
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // saca los acentos
};